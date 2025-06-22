import useTimeout from '../cjs/useTimeout'
import { render, waitFor } from 'reblend-testing-library'
import Reblend from 'reblendjs'

describe('useTimeout', () => {
  it('should set a timeout', async () => {
    jest.useFakeTimers()
    let spy = jest.fn()
    let timeout!: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }
    await render(<Wrapper />)
    await timeout.set(spy, 100)
    expect(timeout.isPending()).toBe(true)
    expect(spy).not.toHaveBeenCalled()
    jest.runAllTimers()
    await waitFor(() => {
      expect(timeout.isPending()).toBe(false)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  it('should clear a timeout', async () => {
    jest.useFakeTimers()

    let spy = jest.fn()

    let timeout!: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()
      return <span />
    }

    await render(<Wrapper />)
    await timeout.set(spy, 100)
    expect(timeout.isPending()).toBe(true)
    await timeout!.clear()
    jest.runAllTimers()
    expect(timeout.isPending()).toBe(false)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should clear a timeout on unmount', async () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let timeout: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()
      return <span />
    }

    const wrapper = await render(<Wrapper />)

    await timeout!.set(spy, 100)
    await wrapper.unmount()
    jest.runAllTimers()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should handle very large timeouts', async () => {
    jest.useFakeTimers()

    let spy = jest.fn()
    let timeout: ReturnType<typeof useTimeout>

    function Wrapper() {
      timeout = useTimeout()

      return <span />
    }

    await render(<Wrapper />)

    const MAX = 2 ** 31 - 1

    await timeout!.set(spy, MAX + 100)
    // some time to check that it didn't overflow and fire immediately
    jest.advanceTimersByTime(100)

    expect(spy).toHaveBeenCalledTimes(0)
    jest.runAllTimers()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
