import { constants as httpConstants } from 'http2'

const health = {
  plugin: {
    name: 'health',
    register: (server) => {
      server.route({
        method: 'GET',
        path: '/health',
        handler: (_request, h) => h.response({ message: 'success' }).code(statusCodes.ok)
      })
    }
  }
}

export { health }
