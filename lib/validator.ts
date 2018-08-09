import * as joi from 'joi'
import { Schemas } from './schemas'

export const Validator = {
  validateDatabaseConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, Schemas.databaseConfig, (err, value) => {
        if (err) {
          return reject(err)
        }
        return resolve(value)
      })
    })
  }
}

