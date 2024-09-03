import Joi from 'joi'

import { deleteExampleData } from '~/src/api/example/helpers/delete-example-data.js'

/**
 * @typedef {MongoDBPlugin & Request & {params: {exampleId: string}}} Req
 * @typedef {ResponseToolkit} ResponseToolkit
 */

/**
 * Example controller
 * Finds all entries in a mongodb collection
 * @satisfies {Partial<ServerRoute>}
 */
const exampleDeleteController = {
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      })
    }
  },
  /**
   * @param { Req } request
   * @param { ResponseToolkit } h
   * @returns {Promise<*>}
   */
  handler: async (request, h) => {
    const id = request.params.id
    await deleteExampleData(request.db, id)

    return h.response({ message: 'success', id }).code(200)
  }
}

export { exampleDeleteController }
/**
 * @import { ServerRoute, Request, ResponseToolkit} from '@hapi/hapi'
 * @import { MongoDBPlugin } from '~/src/helpers/mongodb.js'
 */
