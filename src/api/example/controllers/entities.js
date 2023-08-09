import { getEntities } from '~/src/api/example/helpers/get-entities'

const entitiesController = {
  handler: async (request, h) => {
    const entities = await getEntities(request.db)

    return h.response({ message: 'success', entities }).code(200)
  }
}

export { entitiesController }
