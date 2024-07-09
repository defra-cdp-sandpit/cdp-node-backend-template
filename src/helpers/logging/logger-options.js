import ecsFormat from '@elastic/ecs-pino-format'

import { config } from '~/src/config/index.js'

const loggerOptions = {
  enabled: !config.get('isTest'),
  ignorePaths: ['/health'],
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'res.headers'],
    remove: true
  },
  level: config.get('logLevel'),
  ...(config.get('isDevelopment')
    ? { transport: { target: 'pino-pretty' } }
    : ecsFormat())
}

export { loggerOptions }
