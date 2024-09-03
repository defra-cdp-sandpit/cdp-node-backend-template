import { fetcher } from '~/src/integration-tests/tests/helpers/fetcher.js'

describe('MongoDB endpoints', () => {
  beforeAll(async () => {
    // Add test data
    await fetcher('/examples', {
      method: 'post',
      body: JSON.stringify({ id: 'one', name: 'Example One' })
    })
    await fetcher('/examples', {
      method: 'post',
      body: JSON.stringify({ id: 'two', name: 'Example Two' })
    })
  })

  afterAll(async () => {
    // Clear down previous data
    await fetcher('/examples/one', { method: 'delete' })
    await fetcher('/examples/two', { method: 'delete' })
  })

  describe('GET /examples', () => {
    test('Should provide expected response', async () => {
      const { json, response } = await fetcher('/examples')

      expect(json).toEqual({
        message: 'success',
        examples: [
          {
            id: 'one',
            name: 'Example One',
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          },
          {
            id: 'two',
            name: 'Example Two',
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }
        ]
      })
      expect(response.ok).toBe(true)
      expect(response.status).toBe(200)
    })
  })

  describe('GET /examples/{exampleId}', () => {
    test('Should provide expected response', async () => {
      const { json, response } = await fetcher('/examples/one')

      expect(json).toEqual({
        message: 'success',
        example: {
          id: 'one',
          name: 'Example One',
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        }
      })
      expect(response.ok).toBe(true)
      expect(response.status).toBe(200)
    })
  })
})
