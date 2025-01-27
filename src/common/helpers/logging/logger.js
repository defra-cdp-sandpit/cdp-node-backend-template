import { pino } from 'pino'

import { loggerOptions } from '~/src/api/common/helpers/logging/logger-options.js'

function createLogger() {
  return pino(loggerOptions)
}

export { createLogger }
