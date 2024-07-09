import {
  exampleFindOneController,
  exampleFindAllController
} from '~/src/api/example/controllers/index.js'

const example = {
  plugin: {
    name: 'example',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/example',
          ...exampleFindAllController
        },
        {
          method: 'GET',
          path: '/example/{exampleId}',
          ...exampleFindOneController
        }
      ])
    }
  }
}

export { example }
