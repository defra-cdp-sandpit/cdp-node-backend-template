import { MongoClient } from 'mongodb'

import { mongoOptions } from '~/src/helpers/mongodb/mongo-options.js'
import { getSecureContext } from '~/src/helpers/secure-context/get-secure-context.js'

/**
 * @param {MongoOptions} options
 * @param {object} secureContext
 */
function getMongo(options, secureContext) {
  return {
    getClient() {
      if (this.client) {
        return this.client
      }

      this.client = MongoClient.connect(options.mongoUrl, {
        retryWrites: options.retryWrites,
        readPreference: options.readPreference,
        ...(secureContext && { secureContext })
      })

      return this.client
    },
    async getDb() {
      const client = await this.getClient()
      return client.db(mongoOptions.databaseName)
    }
  }
}

export default getMongo(mongoOptions, getSecureContext())
/**
 * @import {MongoOptions} from '~/src/helpers/mongodb/mongo-options.js'
 */
