import hapiPino from 'hapi-pino'

import { loggerOptions } from '~/src/api/common/helpers/logging/logger-options.js'

/**
 * @satisfies {ServerRegisterPluginObject<Options>}
 */
const requestLogger = {
  plugin: hapiPino,
  options: loggerOptions
}

export { requestLogger }

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 * @import { Options } from 'hapi-pino'
 */
