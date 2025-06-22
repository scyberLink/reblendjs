import { renderHook } from './helpers'
import { useThrottledEventHandler } from '..'
import { waitFor } from '@testing-library/dom'
import Reblend from 'reblendjs'

describe('useThrottledEventHandler', () => {
  it('should throttle and use return the most recent event', async () => {
    const spy = jest.fn()

    const [handler, wrapper] = await renderHook(
      function useThrottledE({ fn }) {
        return useThrottledEventHandler(fn)
      },
      { fn: spy },
    )

    const events = [
      new MouseEvent('pointermove'),
      new MouseEvent('pointermove'),
      new MouseEvent('pointermove'),
    ]

    events.forEach(handler)

    expect(spy).not.toHaveBeenCalled()

    await waitFor(async () => {
      expect(spy).toHaveBeenCalledTimes(1)
    })

    expect(spy).toHaveBeenCalledWith(events[events.length - 1])

    await wrapper.unmount()
    //Note the component using the hooks has be unmounted and its state destroyed
    // so as per reblend hooks they cannot stand alone unlike react hooks
    expect(() => handler(new MouseEvent('pointermove'))).toThrow(
      /Cannot read properties of null/,
    )
  })

  it('should clear pending handler calls', async () => {
    const spy = jest.fn()

    const [handler, wrapper] = await renderHook(
      useThrottledEventHandler as any,
      {
        initialProps: spy,
      },
    )
    ;[
      new MouseEvent('pointermove'),
      new MouseEvent('pointermove'),
      new MouseEvent('pointermove'),
    ].forEach(handler)

    expect(spy).not.toHaveBeenCalled()

    handler.clear()

    await waitFor(async () => {
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })
})
