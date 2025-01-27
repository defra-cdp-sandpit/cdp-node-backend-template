import { createLogger } from '~/src/api/common/helpers/logging/logger.js'

const logger = createLogger()

/**
 *
 * @param { import('@hapi/hapi').Request } _request
 * @param { import('@hapi/hapi').ResponseToolkit } _h
 * @param { Error|undefined } error
 * @returns { never }
 */
export function failAction(_request, _h, error) {
  logger.warn(error, error?.message)
  throw error
}
