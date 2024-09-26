import { failAction } from '~/src/helpers/fail-action.js'

describe('#fail-action', () => {
  test('should throw an error', () => {
    // @ts-expect-error TS2345
    expect(() => failAction({}, null, new Error('test'))).toThrow('test')
  })
})
