import pino from 'pino'

import { appConfig } from '~/src/config'
const ecsFormat = require('@elastic/ecs-pino-format')

function createLogger() {
  return pino({
    enabled: !appConfig.get('isTest'),
    level: appConfig.get('logLevel'),
    ...(appConfig.get('isDevelopment')
      ? { transport: { target: 'pino-pretty' } }
      : ecsFormat())
  })
}

export { createLogger }
