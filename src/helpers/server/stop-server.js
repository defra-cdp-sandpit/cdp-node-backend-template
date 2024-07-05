import process from 'node:process'
import { createLogger } from '~/src/helpers/logging/logger'

const logger = createLogger()

async function stopServer(server) {
  try {
    await server.stop({ timeout: 10000 })
    logger.info('Stopped hapi server')
    process.exitCode = 0
  } catch (error) {
    logger.error(error, 'Error encountered when stopping hapi server')
    process.exitCode = 1
  }
}

export { stopServer }
