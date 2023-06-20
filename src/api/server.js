import path from 'path'
import hapi from '@hapi/hapi'

import { appConfig } from '~/src/config'
import { router } from '~/src/api/router'
import { requestLogger } from '~/src/helpers/request-logger'
import { mongoPlugin } from '~/src/helpers/mongodb'
import { failAction } from '~/src/helpers/fail-action'
import { catchAll } from '~/src/helpers/errors'
import { populateDb } from '~/src/helpers/db/populate-db'

async function createServer() {
  const server = hapi.server({
    port: appConfig.get('port'),
    routes: {
      validate: {
        options: {
          abortEarly: false
        },
        failAction
      },
      files: {
        relativeTo: path.resolve(appConfig.get('root'), '.public')
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  await server.register({ plugin: mongoPlugin, options: {} })

  await server.register(requestLogger)

  await server.register(router, {
    routes: { prefix: appConfig.get('appPathPrefix') }
  })

  await server.register(populateDb)

  server.ext('onPreResponse', catchAll)

  return server
}

export { createServer }
