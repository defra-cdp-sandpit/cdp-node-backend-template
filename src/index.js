import process from 'node:process'
import { createLogger } from '~/src/helpers/logging/logger.js'
import { startServer, stopServer } from '~/src/helpers/server/index.js'

const logger = createLogger()
const server = await startServer()

process.on('unhandledRejection', (error) => {
  logger.info('Unhandled rejection')
  logger.error(error)
  process.exitCode = 1
})
process.on('SIGINT', () => stopServer(server))
process.on('SIGTERM', () => stopServer(server))
