import Boom from '@hapi/boom'
import isNull from 'lodash/isNull.js'

import { findExampleData } from '~/src/api/example/helpers/find-example-data.js'

/**
 *
 * @satisfies {Partial<ServerRoute>}
 */
const exampleFindOneController = {
  /**
   * @param { Request & MongoDBPlugin } request
   * @param { ResponseToolkit } h
   * @returns {Promise<*>}
   */
  handler: async (request, h) => {
    const example = await findExampleData(request.db, request.params.id)
    if (isNull(example)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', example }).code(200)
  }
}

export { exampleFindOneController }

/**
 * @import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi'
 * @import { MongoDBPlugin } from '~/src/helpers/mongodb.js'
 */
