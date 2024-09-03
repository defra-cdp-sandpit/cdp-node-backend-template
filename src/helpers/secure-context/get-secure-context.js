import tls from 'node:tls'

import { config } from '~/src/config/index.js'
import { getTrustStoreCerts } from '~/src/helpers/secure-context/get-trust-store-certs.js'
import { createLogger } from '~/.server/helpers/logging/logger.js'

function getSecureContext() {
  const isSecureContextEnabled = config.get('isSecureContextEnabled')
  const logger = createLogger()

  if (!isSecureContextEnabled) {
    logger.info('Custom secure context is disabled')
    return
  }

  const originalCreateSecureContext = tls.createSecureContext

  tls.createSecureContext = function (options = {}) {
    const trustStoreCerts = getTrustStoreCerts(process.env)

    if (!trustStoreCerts.length) {
      logger.info('Could not find any TRUSTSTORE_ certificates')
    }

    const secureContext = originalCreateSecureContext(options)

    trustStoreCerts.forEach((cert) => {
      // eslint-disable-next-line -- Node.js API not documented
      secureContext.context.addCACert(cert)
    })

    return secureContext
  }

  return tls.createSecureContext()
}

export { getSecureContext }
