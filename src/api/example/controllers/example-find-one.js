import Boom from '@hapi/boom'
import isNull from 'lodash/isNull.js'

import { findExampleData } from '~/src/api/example/helpers/find-example-data.js'
import { statusCodes } from '~/src/api/common/constants/status-codes.js'

/**
 * @satisfies {Partial<ServerRoute>}
 */
const exampleFindOneController = {
  /**
   * @param { Request & MongoDBPlugin } request
   * @param { ResponseToolkit } h
   * @returns { Promise<*> }
   */
  handler: async (request, h) => {
    const entity = await findExampleData(request.db, request.params.exampleId)
    if (isNull(entity)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', entity }).code(statusCodes.ok)
  }
}

export { exampleFindOneController }

/**
 * @import { Request, ResponseToolkit, ServerRoute} from '@hapi/hapi'
 * @import { MongoDBPlugin } from '~/src/api/common/helpers/mongodb.js'
 */
