import { MongoClient } from 'mongodb'
import { LockManager } from 'mongo-locks'

import { config } from '~/src/config/index.js'

/**
 * @typedef {import('mongodb').ReadPreferenceLike} ReadPreferenceLike
 */

/**
 * @satisfies { import('@hapi/hapi').ServerRegisterPluginObject<*> }
 */
export const mongoDb = {
  plugin: {
    name: 'mongodb',
    version: '1.0.0',
    /**
     * @param { import('@hapi/hapi').Server } server
     * @param {{mongoUrl: string, databaseName: string, retryWrites: boolean, readPreference: ReadPreferenceLike}} options
     * @returns {Promise<void>}
     */
    register: async function (server, options) {
      server.logger.info('Setting up mongodb')

      const secureContext = server.getSecureContext()
      const client = await MongoClient.connect(options.mongoUrl, {
        retryWrites: options.retryWrites,
        readPreference: options.readPreference,
        ...(secureContext && { secureContext })
      })

      const databaseName = options.databaseName
      const db = client.db(databaseName)
      const locker = new LockManager(db.collection('mongo-locks'))

      await createIndexes(db)

      server.logger.info(`mongodb connected to ${databaseName}`)

      server.decorate('server', 'mongoClient', () => client)
      server.decorate('server', 'db', () => db)
      server.decorate('request', 'db', () => db)
      server.decorate('server', 'locker', () => locker)
      server.decorate('request', 'locker', () => locker)

      server.events.on('stop', () => {
        server.logger.info('Closing Mongo client')
        client.close(true).catch((err) => {
          server.logger.error(`Error closing Mongo client: ${err}`)
        })
      })
    }
  },
  options: {
    mongoUrl: config.get('mongoUri'),
    databaseName: config.get('mongoDatabase'),
    retryWrites: false,
    readPreference: 'secondary'
  }
}

/**
 * @param {import('mongodb').Db} db
 * @returns {Promise<void>}
 */
async function createIndexes(db) {
  await db.collection('mongo-locks').createIndex({ id: 1 })

  // Example of how to create a mongodb index. Remove as required
  await db.collection('example-data').createIndex({ id: 1 })
}

/**
 * To be mixed in with Request|Server to provide the db decorator
 * @typedef {{db: import('mongodb').Db, locker: import('mongo-locks').LockManager }} MongoDBPlugin
 */
