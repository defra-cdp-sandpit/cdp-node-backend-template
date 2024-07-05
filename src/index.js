import { createLogger } from '~/src/helpers/logging/logger.js'
import { startServer, stopServer } from '~/src/helpers/server/index.js'

const logger = createLogger()
const serverPromise = startServer()

process.on('unhandledRejection', (error) => {
  logger.info('Unhandled rejection')
  logger.error(error)
  process.exitCode = 1
})
process.on('SIGINT', () => serverPromise.then(stopServer))
process.on('SIGTERM', () => serverPromise.then(stopServer))
