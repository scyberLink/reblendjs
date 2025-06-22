import useToggleState from '../cjs/useToggleState'
import { act, renderHook } from 'reblend-testing-library'
import Reblend from 'reblendjs'

describe('useToggleState', () => {
  it('should toggle', async () => {
    let { result } = await renderHook(useToggleState, {
      initialProps: false,
    })

    expect(result.current.show).toEqual(false)

    await act(() => result.current.toggleShow())

    expect(result.current.show).toEqual(true)

    await act(() => result.current.toggleShow(true))

    expect(result.current.show).toEqual(true)

    await act(() => result.current.toggleShow())

    expect(result.current.show).toEqual(false)
  })
})
