import { LockManager } from 'mongo-locks'

import mongo from '~/src/helpers/mongodb/get-mongo.js'
import { mongoOptions } from '~/src/helpers/mongodb/mongo-options.js'

/**
 * @satisfies { import('@hapi/hapi').ServerRegisterPluginObject<*> }
 */
export const mongoDb = {
  plugin: {
    name: 'mongodb',
    version: '1.0.0',
    /**
     *
     * @param { import('@hapi/hapi').Server } server
     * @param {{mongoUrl: string, databaseName: string, retryWrites: boolean, readPreference: string}} options
     * @returns {Promise<void>}
     */
    register: async function (server, options) {
      server.logger.info('Setting up mongodb')

      const db = await mongo.getDb()
      const client = await mongo.getClient()
      const databaseName = options.databaseName
      const locker = new LockManager(db.collection('mongo-locks'))

      await createIndexes(db)

      server.logger.info(`mongodb connected to ${databaseName}`)

      // @ts-expect-error TS2769
      server.decorate('server', 'mongoClient', client)
      // @ts-expect-error TS2769
      server.decorate('server', 'db', db)
      // @ts-expect-error TS2769
      server.decorate('server', 'locker', locker)
      // @ts-expect-error TS2769
      server.decorate('request', 'db', db)
      // @ts-expect-error TS2769
      server.decorate('request', 'locker', locker)

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      server.events.on('stop', async () => {
        server.logger.info('Closing Mongo client')
        await client.close(true)
      })
    }
  },
  options: {
    databaseName: mongoOptions.databaseName
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
