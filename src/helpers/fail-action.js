function failAction(request, h, error) {
  request.logger.error(error, error.message)

  throw error
}

export { failAction }
