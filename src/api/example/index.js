import {
  exampleCreateController,
  exampleFindOneController,
  exampleFindAllController,
  exampleDeleteController
} from '~/src/api/example/controllers/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const example = {
  plugin: {
    name: 'example',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/examples',
          ...exampleFindAllController
        },
        {
          method: 'POST',
          path: '/examples',
          ...exampleCreateController
        },
        {
          method: 'DELETE',
          path: '/examples/{id}',
          ...exampleDeleteController
        },
        {
          method: 'GET',
          path: '/examples/{id}',
          ...exampleFindOneController
        }
      ])
    }
  }
}

export { example }

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
