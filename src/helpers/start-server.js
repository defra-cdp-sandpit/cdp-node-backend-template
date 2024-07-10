import { config } from '~/src/config/index.js'
import { createServer } from '~/src/api/server.js'
import { createLogger } from '~/src/helpers/logging/logger.js'

async function startServer() {
  try {
    const server = await createServer()
    await server.start()

    server.logger.info('Server started successfully')
    server.logger.info(
      `Access your backend on http://localhost:${config.get('port')}`
    )
    return server
  } catch (error) {
    const logger = createLogger()
    logger.info('Server failed to start :(')
    logger.error(error)
  }
}

export { startServer }
