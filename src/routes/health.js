import { constants } from 'http2'

const health = {
  method: 'GET',
  path: '/health',
  handler: (_request, h) => h.response({ message: 'success' }).code(constants.HTTP_STATUS_OK)
}

export { health }
