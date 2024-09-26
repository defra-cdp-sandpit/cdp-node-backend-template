import { mongoDb } from '~/src/helpers/mongodb.js'
import { Server } from '@hapi/hapi'
import { requestLogger } from '~/src/helpers/logging/request-logger.js'
import { MongoClient } from 'mongodb'

jest.mock('mongodb', () => {
  return {
    MongoClient: {
      connect: jest.fn().mockResolvedValue({
        db: jest.fn().mockReturnValue({
          collection: jest.fn().mockReturnValue({
            createIndex: jest.fn().mockResolvedValue({})
          })
        }),
        close: jest.fn()
      })
    }
  }
})

describe('mongoDb plugin', () => {
  let server

  beforeEach(async () => {
    server = new Server()
    await server.register(requestLogger)
    await server.register({
      plugin: mongoDb.plugin,
      options: {
        mongoUrl: 'mongodb://localhost:27017',
        databaseName: 'testDatabase',
        retryWrites: false,
        readPreference: 'secondary'
      }
    })
  })

  afterEach(async () => {
    await server.stop()
  })

  test('should connect to MongoDB and decorate server', () => {
    expect(server.db).toBeDefined()
    expect(server.locker).toBeDefined()
    expect(MongoClient.connect).toHaveBeenCalled()
  })

  test('should close Mongo client on server stop', async () => {
    await server.stop()
    expect(server.mongoClient.close).toHaveBeenCalledWith(true)
  })
})
