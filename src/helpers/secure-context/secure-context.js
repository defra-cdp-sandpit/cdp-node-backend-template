import tls from 'node:tls'
import { config } from '~/src/config/index.js'

import { getTrustStoreCerts } from '~/src/helpers/secure-context/get-trust-store-certs.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const secureContext = {
  plugin: {
    name: 'secure-context',
    register(server) {
      if (config.get('enableSecureContext')) {
        const originalCreateSecureContext = tls.createSecureContext

        tls.createSecureContext = function (options = {}) {
          const trustStoreCerts = getTrustStoreCerts(process.env)

          if (!trustStoreCerts.length) {
            server.logger.info('Could not find any TRUSTSTORE_ certificates')
          }

          const secureContext = originalCreateSecureContext(options)

          trustStoreCerts.forEach((cert) => {
            // eslint-disable-next-line -- Node.js API not documented
            secureContext.context.addCACert(cert)
          })

          return secureContext
        }

        // @ts-expect-error TS2769
        server.decorate('server', 'secureContext', tls.createSecureContext())
      } else {
        server.logger.info('Custom secure context is disabled')
      }
    }
  }
}

export { secureContext }

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
