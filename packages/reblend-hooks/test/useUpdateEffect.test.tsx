import { renderHook } from './helpers'
import useUpdateEffect from '../cjs/useUpdateEffect'
import { useProps } from 'reblendjs'

describe('useUpdateEffect', () => {
  it('should run update after value changes', async () => {
    const teardown = jest.fn()
    const spy = jest.fn(() => teardown)

    const [, wrapper] = await renderHook(
      function useUpdateE({ value }) {
        let props = null
        useProps(({ current: c }) => {
          props = c as any
        })
        useUpdateEffect(spy, () => props)
      },
      { value: 1, other: false },
    )

    expect(spy).not.toHaveBeenCalled()
    expect(teardown).not.toHaveBeenCalled()

    await wrapper.setProps({ value: 2 })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(teardown).not.toHaveBeenCalled()

    // unrelated render
    await wrapper.setProps({ value: 2 })

    expect(spy).toHaveBeenCalledTimes(1)

    await wrapper.setProps({ value: 3, other: true })

    expect(spy).toHaveBeenCalledTimes(2)
    await wrapper.unmount()
    expect(teardown).toHaveBeenCalledTimes(1)
  })
})
