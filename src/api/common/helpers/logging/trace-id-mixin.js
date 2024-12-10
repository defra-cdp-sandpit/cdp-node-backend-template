import { getTraceId } from '@defra/hapi-tracing'

export function traceIdMixin() {
  const mixinValues = {}
  const traceId = getTraceId()

  if (traceId) {
    mixinValues.trace = { id: traceId }
  }
  return mixinValues
}
