import Boom from '@hapi/boom'

import { getEntities } from '~/src/api/example/helpers/get-entities'

const entitiesController = {
  handler: async (request, h) => {
    try {
      const entities = await getEntities(request.db)

      return h.response({ message: 'success', entities }).code(200)
    } catch (error) {
      return Boom.boomify(error)
    }
  }
}

export { entitiesController }
