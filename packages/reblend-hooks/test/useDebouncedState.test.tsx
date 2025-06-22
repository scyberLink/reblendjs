import { render, act, waitFor } from 'reblend-testing-library'
import { useDebouncedState } from '..'
import Reblend from 'reblendjs'

describe('useDebouncedState', () => {
  it('should return a function that debounces input callback', async () => {
    jest.useFakeTimers()

    let outerSetValue

    function Wrapper() {
      const debouncedState = useDebouncedState(0, 500)
      outerSetValue = debouncedState.debouncedSetState
      return <span>{debouncedState.state}</span>
    }

    const wrapper = await render(<Wrapper />)
    expect(wrapper.getByText('0')).toBeTruthy()
    await outerSetValue((cur: number) => cur + 1)
    await outerSetValue((cur: number) => cur + 1)
    await outerSetValue((cur: number) => cur + 1)
    await outerSetValue((cur: number) => cur + 1)
    await outerSetValue((cur: number) => cur + 1)
    expect(wrapper.getByText('0')).toBeTruthy()
    jest.runOnlyPendingTimers()
    await waitFor(() => {
      expect(wrapper.getByText('1')).toBeTruthy()
    })
  })
})
