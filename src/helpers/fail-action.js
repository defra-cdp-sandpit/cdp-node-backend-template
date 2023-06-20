function failAction(request, h, error) {
  const informativeErrorMessage = error?.details?.reduce(
    (errorMessages, detail) => {
      const parameterName = detail?.path?.at(0)
      const parameterErrorMessage = detail?.message

      if (errorMessages[parameterName]) {
        errorMessages[parameterName].push(parameterErrorMessage)
      }

      if (!errorMessages[parameterName]) {
        errorMessages[parameterName] = [parameterErrorMessage]
      }

      return errorMessages
    },
    {}
  )

  h.request.logger.error(informativeErrorMessage)

  throw error
}

export { failAction }
