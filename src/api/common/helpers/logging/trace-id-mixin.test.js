import { traceIdMixin } from '~/src/api/common/helpers/logging/trace-id-mixin.js'
import { getTraceId } from '@defra/hapi-tracing'

jest.mock('@defra/hapi-tracing', () => ({
  getTraceId: jest.fn(),
  name: 'mock-hapi-tracing'
}))

describe('traceIdMixin', () => {
  test('adds traceId when set', () => {
    getTraceId.mockReturnValue('1234')
    expect(traceIdMixin()).toEqual({ trace: { id: '1234' } })
  })

  test('doesnt add traceId if its not set', () => {
    getTraceId.mockReturnValue(null)
    expect(traceIdMixin()).toEqual({})
  })
})
