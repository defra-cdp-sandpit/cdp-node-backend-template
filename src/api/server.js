import path from 'path'
import hapi from '@hapi/hapi'

import { config } from '~/src/config'
import { router } from '~/src/api/router'
import { requestLogger } from '~/src/helpers/logging/request-logger'
import { mongoPlugin } from '~/src/helpers/mongodb'
import { failAction } from '~/src/helpers/fail-action'
import { populateDb } from '~/src/helpers/db/populate-db'
import { secureContext } from '~/src/helpers/secure-context'

const isProduction = config.get('isProduction')
const appPathPrefix = config.get('appPathPrefix')

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

  await server.register({ plugin: mongoPlugin, options: {} })

  if (!appPathPrefix || appPathPrefix === '/') {
    await server.register(router)
  } else {
    await server.register(router, {
      routes: { prefix: appPathPrefix }
    })
  }

  await server.register(populateDb)

  return server
}

export { createServer }
