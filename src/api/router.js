import { health } from '~/src/api/health'
import { example } from '~/src/api/example'

const router = {
  plugin: {
    name: 'Router',
    register: async (server) => {
      await server.register([health, example])
    }
  }
}

export { router }
