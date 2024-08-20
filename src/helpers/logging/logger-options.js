import { ecsFormat } from '@elastic/ecs-pino-format'

import { config } from '~/src/config/index.js'

/**
 * @satisfies {Options}
 */
export const loggerOptions = {
  enabled: config.get('log.enabled'),
  ignorePaths: ['/health'],
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'res.headers'],
    remove: true
  },
  level: config.get('log.level'),
  ...(config.get('log.format') === 'ecs'
    ? /** @type {Omit<LoggerOptions, 'mixin' | 'transport'>} */ (ecsFormat())
    : { transport: { target: 'pino-pretty' } })
}

/**
 * @import { Options } from 'hapi-pino'
 * @import { LoggerOptions } from 'pino'
 */
