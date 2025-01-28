import { health } from '../routes/health.js'
import { example } from '../routes/example.js'

export const router = {
  plugin: {
    name: 'router',
    async register (server) {
      // Application specific routes, add your own routes here.
      const appSpecificRoutes = [example]

      server.route([health].concat(appSpecificRoutes))
    }
  }
}
