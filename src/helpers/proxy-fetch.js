import { config } from '~/src/config'
import { ProxyAgent, fetch as undiciFetch } from 'undici'

const nonProxyFetch = (url, opts) => {
  return undiciFetch(url, {
    ...opts
  })
}

const proxyFetch = (url, opts) => {
  const httpsProxy = config.get('httpsProxy')
  if (!httpsProxy) {
    return nonProxyFetch(url, opts)
  } else {
    return undiciFetch(url, {
      ...opts,
      dispatcher: new ProxyAgent({
        uri: httpsProxy,
        keepAliveTimeout: 10,
        keepAliveMaxTimeout: 10
      })
    })
  }
}

export { proxyFetch }
