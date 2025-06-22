import { renderHook, act } from 'reblend-testing-library'
import useAnimationFrame from '../lib/useAnimationFrame'
import Reblend from 'reblendjs'

describe('useAnimationFrame', () => {
  let rafSpy, rafCancelSpy

  beforeAll(async () => {
    rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb) => {
        return setTimeout(() => cb(1)) as any
      })

    rafCancelSpy = jest
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation((handle) => {
        clearTimeout(handle)
      })
  })

  afterAll(async () => {
    rafSpy.mockRestore()
    rafCancelSpy.mockRestore()
  })

  it('should requestAnimationFrame', async () => {
    jest.useFakeTimers()

    let spy = jest.fn()

    const { result } = await renderHook(useAnimationFrame)

    await act(() => result.current!.request(spy))

    expect(spy).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should cancel a request', async () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    const { result } = await renderHook(useAnimationFrame)

    await act(async () => {
      result.current.request(spy)

      result.current.cancel()
    })
    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should cancel a request on unmount', async () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    const { result, unmount } = await renderHook(useAnimationFrame)

    await act(() => result.current!.request(spy))

    await unmount()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalledTimes(0)
  })
})
