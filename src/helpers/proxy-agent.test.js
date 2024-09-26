import { proxyAgent } from '~/src/helpers/proxy-agent.js'
import { config } from '~/src/config/index.js'

describe('#proxy-agent', () => {
  test('should return null when no proxy is setup', () => {
    config.set('httpsProxy', null)
    config.set('httpProxy', null)
    expect(proxyAgent()).toBeNull()
  })

  test('should return a proxy agent when a proxy is given', () => {
    // @ts-expect-error 2345
    config.set('httpsProxy', 'http://user:pass@localhost:3128')
    expect(proxyAgent()).not.toBeNull()
    expect(proxyAgent()?.agent).not.toBeNull()
  })
})
