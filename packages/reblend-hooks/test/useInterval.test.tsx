import { renderHook, act } from 'reblend-testing-library'

import useInterval from '../lib/useInterval'
import Reblend from 'reblendjs'

describe('useTimeout', () => {
  it('should set an interval', async () => {
    jest.useFakeTimers()

    let spy = jest.fn()

    function Wrapper() {
      useInterval(spy, 100)

      return <span />
    }

    await renderHook(function useInt() {
      return useInterval(spy, 100)
    })

    expect(spy).not.toHaveBeenCalled()
    await act(async () => {
      jest.runOnlyPendingTimers()
    })
    expect(spy).toHaveBeenCalledTimes(1)
    await act(async () => {
      jest.runOnlyPendingTimers()
    })
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should run immediately when argument is set', async () => {
    jest.useFakeTimers()
    let spy = jest.fn()

    await renderHook(function useInt() {
      return useInterval(spy, 100, false, true)
    })

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should not run when paused', async () => {
    jest.useFakeTimers()
    let spy = jest.fn()

    await renderHook(function useInt() {
      return useInterval(spy, 100, true)
    })

    jest.runOnlyPendingTimers()
    expect(spy).not.toHaveBeenCalled()
  })

  it('should stop running on unmount', async () => {
    jest.useFakeTimers()
    let spy = jest.fn()

    const { unmount } = await renderHook(function useInt() {
      return useInterval(spy, 100)
    })

    await unmount()

    jest.runOnlyPendingTimers()
    expect(spy).not.toHaveBeenCalled()
  })
})
