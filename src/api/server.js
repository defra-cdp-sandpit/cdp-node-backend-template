import path from 'path'
import hapi from '@hapi/hapi'

import { config } from '~/src/config/index.js'
import { router } from '~/src/api/router.js'
import { requestLogger } from '~/src/helpers/logging/request-logger.js'
import { mongoDb } from '~/src/helpers/mongodb.js'
import { failAction } from '~/src/helpers/fail-action.js'
import { secureContext } from '~/src/helpers/secure-context/index.js'
import { pulse } from '~/src/helpers/pulse.js'

const enablePulse = config.get('enablePulse')

async function createServer() {
  const server = hapi.server({
    port: config.get('port'),
    routes: {
      validate: {
        options: {
          abortEarly: false
        },
        failAction
      },
      files: {
        relativeTo: path.resolve(config.get('root'), '.public')
      },
      security: {
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: false
        },
        xss: 'enabled',
        noSniff: true,
        xframe: true
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  // Hapi Plugins:
  // requestLogger - automatically logs incoming requests
  // pulse         - provides shutdown handlers
  // mongoDb       - sets up mongo connection pool and attaches to `server` and `request` objects
  // secureContext - loads CA certificates from environment config
  // router        - routes used in the app

  // Add request logger before all other plugins, so we can see errors
  await server.register(requestLogger)

  if (enablePulse) {
    await server.register(pulse)
  }

  await server.register([secureContext, mongoDb, router])

  return server
}

export { createServer }
