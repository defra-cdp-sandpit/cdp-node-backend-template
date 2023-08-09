import Boom from '@hapi/boom'
import { isNull } from 'lodash'

import { getEntity } from '~/src/api/example/helpers/get-entity'

const entityController = {
  handler: async (request, h) => {
    const entity = await getEntity(request.db, request.params.entityId)

    if (isNull(entity)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', entity }).code(200)
  }
}

export { entityController }
