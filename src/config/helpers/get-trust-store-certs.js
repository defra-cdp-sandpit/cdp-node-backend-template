function getTrustStoreCerts(envs) {
  return Object.entries(envs)
    ?.map(([key, value]) => (key.startsWith('TRUSTSTORE_') ? value : null))
    .filter(Boolean)
}

export { getTrustStoreCerts }
