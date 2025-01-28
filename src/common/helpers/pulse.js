import hapiPulse from 'hapi-pulse'
import { createLogger } from './logging/logger.js'

const tenSeconds = 10 * 1000

/**
 * Plug-in to handle cleanly shutting down the service.
 * @satisfies { import('@hapi/hapi').ServerRegisterPluginObject<*> }
 */
const pulse = {
  plugin: hapiPulse,
  options: {
    logger: createLogger(),
    timeout: tenSeconds
  }
}

export { pulse }
