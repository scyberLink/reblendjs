import { renderHook } from 'reblend-testing-library'
import { useMounted } from '..'

describe('useMounted', () => {
  it('should return a function that returns mount state', async () => {
    const { result, unmount } = await renderHook(useMounted)

    expect(result.current()).toEqual(true)

    await unmount()

    expect(() => result.current()).toThrow(/Cannot read properties of null/)
  })
})
