import tls from 'node:tls'

import { config } from '~/src/config/index.js'
import { getTrustStoreCerts } from '~/src/helpers/secure-context/get-trust-store-certs.js'

const enableSecureContext = config.get('enableSecureContext')
/**
 * Creates a new secure context loaded from Base64 encoded certs
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const secureContext = {
  plugin: {
    name: 'secure-context',
    register(server) {
      if (enableSecureContext) {
        const originalCreateSecureContext = tls.createSecureContext

        tls.createSecureContext = function (options = {}) {
          const trustStoreCerts = getTrustStoreCerts(process.env)

          if (!trustStoreCerts.length) {
            server.logger.info('Could not find any TRUSTSTORE_ certificates')
          }

          const secureContext = originalCreateSecureContext(options)

          trustStoreCerts.forEach((cert) => {
            secureContext.context.addCACert(cert)
          })

          return secureContext
        }
      }

      server.decorate('server', 'getSecureContext', tls.createSecureContext)
    }
  }
}

export { secureContext }

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
