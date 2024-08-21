import { ecsFormat } from '@elastic/ecs-pino-format'

import { config } from '~/src/config/index.js'

/**
 * @type {{ecs: Omit<LoggerOptions, "mixin"|"transport">, "pino-pretty": {transport: {target: string}}}}
 */
const formatters = {
  ecs: ecsFormat(),
  'pino-pretty': { transport: { target: 'pino-pretty' } }
}

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
  ...formatters[config.get('log.format')]
}

/**
 * @import { Options } from 'hapi-pino'
 * @import { LoggerOptions } from 'pino'
 */
