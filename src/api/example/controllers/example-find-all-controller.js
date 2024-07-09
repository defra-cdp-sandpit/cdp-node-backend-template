import { findAllExampleData } from '~/src/api/example/helpers/find-all-example-data.js'

const exampleFindAllController = {
  handler: async (request, h) => {
    const entities = await findAllExampleData(request.db)

    return h.response({ message: 'success', entities }).code(200)
  }
}

export { exampleFindAllController }
