import Boom from '@hapi/boom'
import isNull from 'lodash/isNull.js'

import { findExampleData } from '~/src/api/example/helpers/find-example-data.js'

const exampleFindOneController = {
  handler: async (request, h) => {
    const entity = await findExampleData(request.db, request.params.exampleId)

    if (isNull(entity)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', entity }).code(200)
  }
}

export { exampleFindOneController }
