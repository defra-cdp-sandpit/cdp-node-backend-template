import { config } from '~/src/config'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { Url } from 'url'

const proxyAgent = () => {
  const proxy = config.get('httpsProxy') ?? config.get('httpProxy')

  if (!proxy) {
    return null
  } else {
    const proxyUrl = new Url(proxy)
    return {
      url: proxyUrl,
      agent: new HttpsProxyAgent(proxyUrl)
    }
  }
}

export { proxyAgent }
