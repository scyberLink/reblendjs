/*! tests an impl adapted from https://github.com/xnimorz/use-debounce/blob/master/test/useDebouncedCallback.test.tsx itself adapted from lodash*/
import { renderHook, act, waitFor } from 'reblend-testing-library'

import useDebouncedCallback from '../cjs/useDebouncedCallback'
import Reblend from 'reblendjs'

describe('useDebouncedCallback', () => {
  beforeEach(async () => {
    jest.useFakeTimers()
  })

  afterEach(async () => {
    jest.useRealTimers()
  })

  it('should return a function that debounces input callback', async () => {
    const callback = jest.fn()

    const { result } = await renderHook(function useDebounced() {
      return useDebouncedCallback(callback, 500)
    })

    await result.current(1)
    await result.current(2)
    await result.current(3)

    expect(callback).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(3)
  })

  it('will call leading callback immediately (but only once, as trailing is set to false)', async () => {
    const callback = jest.fn()

    const { result } = await renderHook(function useDebounced() {
      return useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
        trailing: false,
      })
    })

    await result.current(1)
    expect(callback).toHaveBeenCalledTimes(1)
    jest.runOnlyPendingTimers()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('will call leading callback as well as next debounced call', async () => {
    const callback = jest.fn()

    const { result } = await renderHook(function useDebounced() {
      return useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
      })
    })

    await result.current()
    await result.current()
    await result.current()

    expect(callback).toHaveBeenCalledTimes(1)
    jest.runOnlyPendingTimers()
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('will call three callbacks if no debounced callbacks are pending', async () => {
    const callback = jest.fn()

    const { result } = await renderHook(function useDebounced() {
      return useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
      })
    })

    await result.current()
    await result.current()
    await result.current()

    expect(callback).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(1001)
    await result.current()

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('will call a second leading callback if no debounced callbacks are pending with trailing false', async () => {
    const callback = jest.fn()

    const { result } = await renderHook(function useDebounced() {
      return useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
        trailing: false,
      })
    })

    await result.current()
    setTimeout(async () => {
      await result.current()
    }, 1001)
    expect(callback).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1001)
    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(2)
    })
  })

  it('Subsequent calls to the debounced function return the result of the last func invocation.', async () => {
    const callback = jest.fn(() => 42)

    const { result } = await renderHook(function useDebounced() {
      return useDebouncedCallback(callback, 1000)
    })
    let retVal

    retVal = await result.current()

    expect(callback).toHaveBeenCalledTimes(0)
    expect(retVal).toBeUndefined()
    jest.runAllTimers()
    expect(callback).toHaveBeenCalledTimes(1)
    let subsequentResult = await result.current()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(subsequentResult).toBe(42)
  })

  it('Returns the value when leading  immediately', async () => {
    const callback = jest.fn(() => 42)

    const { result } = await renderHook(function useDebounced() {
      return useDebouncedCallback(callback, { wait: 1000, leading: true })
    })

    let retVal = await result.current()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(retVal).toEqual(42)
  })

  it("won't call both on the leading edge and on the trailing edge if leading and trailing are set up to true and function call is only once", async () => {
    const callback = jest.fn()

    const { result } = await renderHook(function useDebounced() {
      return useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
      })
    })

    await result.current()
    expect(callback).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('will call both on the leading edge and on the trailing edge if leading and trailing are set up to true and there are more than 1 function call', async () => {
    const callback = jest.fn()

    const { result } = await renderHook(function useDebounced() {
      return useDebouncedCallback(callback, {
        wait: 1000,
        leading: true,
      })
    })
    await result.current()
    await result.current()
    expect(callback).toHaveBeenCalledTimes(1)

    jest.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('will call callback if maxWait time exceed', async () => {
    const callback = jest.fn()

    const { result } = await renderHook(function useDebounced() {
      return useDebouncedCallback(callback, {
        wait: 500,
        maxWait: 600,
      })
    })

    expect(callback).toHaveBeenCalledTimes(0)

    await result.current()
    console.log('ran 1')

    jest.advanceTimersByTime(700)

    expect(callback).toHaveBeenCalledTimes(1)
    console.log('run 2')
    await result.current()
    jest.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
