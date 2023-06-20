import { appConfig } from '~/src/config'
import hapiPino from 'hapi-pino'

const requestLogger = {
  plugin: hapiPino,
  options: {
    enabled: !appConfig.get('isTest'),
    level: appConfig.get('logLevel'),
    ...(appConfig.get('isDevelopment') && {
      transport: { target: 'pino-pretty' }
    })
  }
}

export { requestLogger }
