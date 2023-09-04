import { MongoClient } from 'mongodb'

import { appConfig } from '~/src/config'

const mongoPlugin = {
  name: 'mongodb',
  version: '1.0.0',
  register: async function (server) {
    const mongoOptions = {
      retryWrites: false,
      readPreference: 'secondary'
    }

    const mongoUrl = new URL(appConfig.get('mongoUri'))
    const databaseName = appConfig.get('mongoDatabase')

    server.logger.info('Setting up mongodb')

    const client = await MongoClient.connect(mongoUrl.toString(), mongoOptions)
    const db = client.db(databaseName)
    await createIndexes(db)

    server.logger.info(`mongodb connected to ${databaseName}`)

    server.decorate('server', 'mongoClient', client)
    server.decorate('server', 'db', db)
    server.decorate('request', 'db', db)
  }
}

async function createIndexes(db) {
  await db.collection('entities').createIndex({ id: 1 })
}

export { mongoPlugin }
