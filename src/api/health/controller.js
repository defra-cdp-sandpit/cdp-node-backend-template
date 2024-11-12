import { statusCodes } from '~/src/api/common/constants/status-codes.js'

/**
 * A generic health-check endpoint. Used by the platform to check if the service is up and handling requests.
 * @satisfies {Partial<ServerRoute>}
 */
const healthController = {
  handler: (_request, h) =>
    h.response({ message: 'success' }).code(statusCodes.ok)
}

export { healthController }

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
