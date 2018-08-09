import { DatastoreSpool } from '@fabrix/fabrix/dist/common/spools/datastore'
import * as Waterline from 'waterline'
import { Validator } from './validator'
import { Transformer } from './transformer'


import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

/**
 * Waterline Spool
 *
 * Allow the fabrix application to interface with the Waterline ORM.
 */
export class WaterlineSpool extends DatastoreSpool {

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })
  }

  /**
   * Validate the database config, and api.model definitions
   */
  validate () {
    return Promise.all([
      Validator.validateDatabaseConfig(this.app.config.get('stores')),
      // Validator.validateModels(this.app.api.models)
    ])
  }

  /**
   * Merge configuration into models, load Waterline collections.
   */
  configure () {
    this.wl = new Waterline()
  }

  /**
   * Initialize Waterline. This will compile the schema and connect to the
   * database.
   */
  initialize () {
    this.models = Transformer.transformModels(this.app)
    this.adapters = Transformer.transformAdapters(this.app)
    this.connections = Transformer.transformConnections(this.app)

    Object.values(this.models).map(model => {
      this.wl.loadCollection(Waterline.Collection.extend(model))
    })

    const wlConfig = { adapters: this.adapters, connections: this.connections }
    return new Promise((resolve, reject) => {
      this.wl.initialize(wlConfig, (err, orm) => {
        if (err) {
          return reject(err)
        }

        this.orm = orm
        this.app.orm = Transformer.transformWaterlineOrm(this.orm)
        resolve()
      })
    })
  }

  unload () {
    return new Promise((resolve, reject) => {
      this.wl.teardown(resolve)
    })
  }
}
