import path from 'path'
import hapi from '@hapi/hapi'

import { config } from '~/src/config/index.js'
import { router } from '~/src/api/router.js'
import { requestLogger } from '~/src/helpers/logging/request-logger.js'
import { mongoDb } from '~/src/helpers/mongodb.js'
import { failAction } from '~/src/helpers/fail-action.js'
import { secureContext } from '~/src/helpers/secure-context/index.js'
import { pulse } from '~/src/helpers/pulse.js'

const isProduction = config.get('isProduction')

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

  await server.register(requestLogger)

  if (isProduction) {
    await server.register(secureContext)
  }

  // The mongoDb plugin adds access to mongo by adding `db` to the server and request object.
  // Also adds an instance of mongoClient to just the server object.
  await server.register([pulse, mongoDb, router])

  return server
}

export { createServer }
