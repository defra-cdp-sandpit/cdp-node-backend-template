import { findAllExampleData } from '~/src/api/example/helpers/find-all-example-data.js'

/**
 * Example controller
 * Finds all entries in a mongodb collection
 * @satisfies {Partial<ServerRoute>}
 */
const exampleFindAllController = {
  /**
   * @param { Request & MongoDBPlugin } request
   * @param { ResponseToolkit } h
   * @returns {Promise<*>}
   */
  handler: async (request, h) => {
    const examples = await findAllExampleData(request.db)

    return h.response({ message: 'success', examples }).code(200)
  }
}

export { exampleFindAllController }

/**
 * @import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi'
 * @import { MongoDBPlugin } from '~/src/helpers/mongodb.js'
 */
