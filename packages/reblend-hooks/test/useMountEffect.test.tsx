import { renderHook } from './helpers'

import useMountEffect from '../lib/useMountEffect'
import Reblend from 'reblendjs'

describe('useMountEffect', () => {
  it('should run update only on mount', async () => {
    const teardown = jest.fn()
    const spy = jest.fn(() => teardown)

    const [, wrapper] = await renderHook(
      function useMount() {
        return useMountEffect(spy)
      },
      { value: 1, other: false },
    )

    expect(spy).toHaveBeenCalledTimes(1)

    await wrapper.setProps({ value: 2 })

    expect(spy).toHaveBeenCalledTimes(1)

    await wrapper.setProps({ value: 2, other: true })

    expect(spy).toHaveBeenCalledTimes(1)

    await wrapper.unmount()

    expect(teardown).toHaveBeenCalledTimes(1)
  })
})
