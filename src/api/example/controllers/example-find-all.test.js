import { createServer } from '~/src/api/index.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

describe('#exampleFindAllController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    await server.db.collection('example-data').insertMany([
      { exampleId: 'four', exampleData: 'data' },
      { exampleId: 'five', exampleData: 'data' }
    ])
  })

  afterEach(async () => {
    await server.db.collection('example-data').deleteMany({})
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/example'
    })

    expect(result).toEqual({
      message: 'success',
      entities: [
        { exampleId: 'four', exampleData: 'data' },
        { exampleId: 'five', exampleData: 'data' }
      ]
    })
    expect(statusCode).toBe(statusCodes.ok)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
