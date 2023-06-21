import { MongoClient } from 'mongodb'

import { appConfig } from '~/src/config'
import { createLogger } from '~/src/helpers/logger'

const logger = createLogger()

const mongoPlugin = {
  name: 'mongodb',
  version: '1.0.0',
  register: async function (server) {
    const mongoOptions = {
      retryWrites: false,
      readPreference: 'secondary',
      tlsAllowInvalidCertificates: true, // TODO: use the trust store
      tlsAllowInvalidHostnames: true
    }

    const username = appConfig.get('mongoUsername')
    const password = appConfig.get('mongoPassword')
    const mongoUrl = new URL(appConfig.get('mongoUri'))
    const databaseName = appConfig.get('mongoDatabase')

    logger.info('Setting up mongodb')

    if (username && password) {
      mongoUrl.username = username
      mongoUrl.password = password
    }

    const client = await MongoClient.connect(mongoUrl.toString(), mongoOptions)
    const db = client.db(databaseName)
    await createIndexes(db)

    logger.info(`mongodb connected to ${databaseName}`)

    server.decorate('server', 'mongoClient', client)
    server.decorate('server', 'db', db)
    server.decorate('request', 'db', db)
  }
}

async function createIndexes(db) {
  await db.collection('entities').createIndex({ id: 1 })
}

export { mongoPlugin }
