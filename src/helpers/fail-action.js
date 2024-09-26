import { createLogger } from '~/src/helpers/logging/logger.js'

const logger = createLogger()

/**
 *
 * @param { import('@hapi/hapi').Request } _request
 * @param { import('@hapi/hapi').ResponseToolkit } _h
 * @param { Error|undefined } error
 * @returns { never }
 */
export function failAction(_request, _h, error) {
  logger.error(error, error?.message)
  throw error
}
