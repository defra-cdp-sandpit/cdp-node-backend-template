import { config } from '~/src/config'
import { createServer } from '~/src/api/server'
import { createLogger } from '~/src/helpers/logging/logger'

const logger = createLogger()

process.on('unhandledRejection', (error) => {
  logger.info('Unhandled rejection')
  logger.error(error)
  process.exit(1)
})

async function startServer() {
  const server = await createServer()
  await server.start()

  server.logger.info('Server started successfully')
  server.logger.info(
    `Access your backend on http://localhost:${config.get('port')}${config.get(
      'appPathPrefix'
    )}`
  )
}

startServer().catch((error) => {
  logger.info('Server failed to start :(')
  logger.error(error)
})
