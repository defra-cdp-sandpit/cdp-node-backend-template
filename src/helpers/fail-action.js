import { createLogger } from '~/src/helpers/logging/logger.js'

const logger = createLogger()

/**
 *
 * @param { import('@hapi/hapi').Request } request
 * @param { import('@hapi/hapi').ResponseToolkit } _h
 * @param { Error|undefined } error
 * @returns { never }
 */
export function failAction(request, _h, error) {
  logger.error(error, error?.message)
  throw error
}
