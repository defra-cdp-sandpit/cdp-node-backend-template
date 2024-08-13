import Hapi from '@hapi/hapi'
import { health } from '~/src/api/health/index.js'

describe('#healthController', () => {
  const server = Hapi.server()

  beforeAll(async () => {
    await server.register([health])
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop()
  })

  test('Should provide expected response', async () => {
    const result = await server.inject({
      method: 'GET',
      url: '/health'
    })

    expect(result.statusCode).toBe(200)
    expect(result.payload).toBe(JSON.stringify({ message: 'success' }))
  })
})
