import Boom from '@hapi/boom'
import { isNull } from 'lodash'

import { getEntity } from '~/src/api/example/helpers/get-entity'

const entityController = {
  handler: async (request, h) => {
    try {
      const entity = await getEntity(request.db, request.params.entityId)

      if (isNull(entity)) {
        return Boom.boomify(Boom.notFound())
      }

      return h.response({ message: 'success', entity }).code(200)
    } catch (error) {
      return Boom.boomify(error)
    }
  }
}

export { entityController }
