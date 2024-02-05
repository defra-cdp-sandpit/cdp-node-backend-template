import { getTrustStoreCerts } from '~/src/config/helpers/get-trust-store-certs'

describe('#getTrustStoreCerts', () => {
  const mockProcessEnvWithCerts = {
    TRUSTSTORE_CA_ONE: 'mock-cert-doris',
    TRUSTSTORE_CA_TWO: 'mock-cert-poppy',
    TRUSTSTORE_CA_THREE: 'mock-cert-sparkle',
    UNRELATED_ENV: 'not-a-cert'
  }

  test('Should provide expected result with "certs"', () => {
    expect(getTrustStoreCerts(mockProcessEnvWithCerts)).toEqual([
      'mock-cert-doris',
      'mock-cert-poppy',
      'mock-cert-sparkle'
    ])
  })

  test('Should provide expected empty array', () => {
    expect(getTrustStoreCerts({})).toEqual([])
  })
})
