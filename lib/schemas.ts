import * as joi from 'joi'
export const Schemas = {
  databaseConfig: joi.object(),

  models: joi.object().keys({
    autoPK: joi.boolean(),
    autoCreatedAt: joi.boolean(),
    autoUpdatedAt: joi.boolean(),
    attributes: joi.object()
  })
}

