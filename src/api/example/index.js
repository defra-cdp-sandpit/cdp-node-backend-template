import {
  entityController,
  entitiesController
} from '~/src/api/example/controllers'

const example = {
  plugin: {
    name: 'entities',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/entities',
          ...entitiesController
        },
        {
          method: 'GET',
          path: '/entities/{entityId}',
          ...entityController
        }
      ])
    }
  }
}

export { example }
