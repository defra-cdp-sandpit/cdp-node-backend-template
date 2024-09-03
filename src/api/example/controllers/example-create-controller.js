import Joi from 'joi'

import { createExampleData } from '~/src/api/example/helpers/create-example-data.js'
import { findExampleData } from '~/src/api/example/helpers/find-example-data.js'

/**
 * @typedef {MongoDBPlugin & Request & {payload: ExampleData}} Req
 * @typedef {ResponseToolkit} ResponseToolkit
 */

/**
 * Example controller
 * Finds all entries in a mongodb collection
 * @satisfies {Partial<ServerRoute>}
 */
const exampleCreateController = {
  options: {
    validate: {
      payload: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      })
    }
  },
  /**
   * @param { Req } request
   * @param { ResponseToolkit } h
   * @returns {Promise<*>}
   */
  handler: async (request, h) => {
    await createExampleData(request.db, request.payload)
    const example = await findExampleData(
      request.db,
      /** @type {ObjectId} */ request.payload.id
    )

    return h.response({ message: 'success', example }).code(200)
  }
}

export { exampleCreateController }
/**
 * @import { ServerRoute, Request, ResponseToolkit} from '@hapi/hapi'
 * @import { MongoDBPlugin } from '~/src/helpers/mongodb.js'
 * @import { ExampleData } from '~/src/api/example/helpers/create-example-data.js'
 */
