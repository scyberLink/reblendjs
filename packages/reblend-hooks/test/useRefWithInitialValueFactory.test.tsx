import { renderHook } from './helpers'
import useRefWithInitialValueFactory from '../lib/useRefWithInitialValueFactory'
import Reblend from 'reblendjs'

describe('useRefWithInitialValueFactory', () => {
  it('should set a ref value using factory once', async () => {
    const spy = jest.fn((v: number) => v)

    const [ref, wrapper] = await renderHook(
      function useRefWithInitialValueF({ value }) {
        return useRefWithInitialValueFactory(() => spy(value))
      },
      { value: 2 },
    )

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2)

    expect(ref.current).toEqual(2)

    wrapper.setProps({ value: 1 })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(ref.current).toEqual(2)
  })
})
