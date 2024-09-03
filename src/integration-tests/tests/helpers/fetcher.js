import nodeFetch from 'node-fetch'

import { config } from '~/src/config/index.js'

// TODO replace node-fetch with native Node,js fetch, after updating Node to v22
/**
 * Integration test fetch helper
 * @param {string} path
 * @param {RequestInit} [fetchOptions]
 * @returns {Promise<{response: Response, json: any}>}
 */
async function fetcher(path, fetchOptions = {}) {
  const port = config.get('port')
  const appBaseUrl = `http://localhost:${port}`

  const response = await nodeFetch(`${appBaseUrl}${path}`, {
    ...fetchOptions,
    method: fetchOptions?.method ?? 'get',
    headers: {
      'Content-Type': 'application/json',
      ...(fetchOptions?.headers && fetchOptions.headers)
    }
  })
  const json = await response.json()

  return { json, response }
}

export { fetcher }
/**
 * @import {RequestInit, Response} from 'node-fetch'
 */
