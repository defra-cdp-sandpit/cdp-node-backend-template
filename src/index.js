import process from 'node:process'
import { createLogger } from '~/src/helpers/logging/logger.js'
import { startServer } from '~/src/helpers/start-server.js'

await startServer()

process.on('unhandledRejection', (error) => {
  const logger = createLogger()
  logger.info('Unhandled rejection')
  logger.error(error)
  process.exitCode = 1
})
