import pino from 'pino'
import { appConfig } from '~/src/config'

function createLogger() {
  return pino({
    enabled: !appConfig.get('isTest'),
    level: appConfig.get('logLevel'),
    ...(appConfig.get('isDevelopment') && {
      transport: { target: 'pino-pretty' }
    })
  })
}

export { createLogger }
