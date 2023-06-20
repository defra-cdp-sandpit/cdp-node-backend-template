const catchAll = function (request, h) {
  const { response } = request

  if (!response.isBoom) {
    return h.continue
  }

  if (response.output.statusCode !== 404) {
    request.logger.error(response?.stack)
  }

  return h
    .response({
      message: response.output.payload.error
    })
    .code(response.output.statusCode)
}

export { catchAll }
