import Reblend, { useEffect, useProps } from 'reblendjs'
import { render, renderHook, waitFor } from 'reblend-testing-library'

import { useDebouncedValue } from '..'

describe('useDebouncedValue', () => {
  beforeEach(async () => {
    jest.useFakeTimers()

    return async () => {
      jest.useRealTimers()
    }
  })

  it('should return a function that debounces input callback', async () => {
    let count = 0

    const { rerender, result } = await renderHook(
      function useDebounced({ value }) {
        const debouncedValue = useDebouncedValue(value, 500)

        useProps<any>(
          async ({
            current: {
              initialProps: { value },
            },
            initial,
          }) => {
            !initial && (await debouncedValue.setValue(value))
          },
        )

        useEffect(() => {
          count++
        }, [debouncedValue.state])

        return debouncedValue
      },
      { initialProps: { value: 0 } },
    )

    expect(result.current.state).toBe(0)

    await rerender({ value: 1 })
    await rerender({ value: 2 })
    await rerender({ value: 3 })
    await rerender({ value: 4 })
    await rerender({ value: 5 })

    expect(result.current.state).toBe(0)

    jest.advanceTimersByTime(10000)

    expect(result.current.state).toBe(5)

    await waitFor(() => {
      expect(count).toBe(2)
    })
  })

  it('will update value immediately if leading is set to true', async () => {
    function Wrapper({ text }) {
      const debouncedValue = useDebouncedValue(text, {
        wait: 1000,
        leading: true,
      })
      useProps<any>(async ({ current: { text }, initial }) => {
        !initial && (await debouncedValue.setValue(text))
      })

      return <div role="test">{debouncedValue.state}</div>
    }
    const { rerender, getByText } = await render(<Wrapper text={'Hello'} />)

    expect(getByText('Hello')).toBeTruthy()

    await rerender(<Wrapper text={'Hello world'} />)
    expect(getByText('Hello world')).toBeTruthy()

    await rerender(<Wrapper text={'Hello again'} />)

    // timeout shouldn't have been called yet after leading call was executed
    expect(getByText('Hello world')).toBeTruthy()

    jest.runAllTimers()
    await waitFor(() => {
      expect(getByText('Hello again')).toBeTruthy()
    })
  })

  it('should use isEqual function if supplied', async () => {
    const isEqual = jest.fn((_left: string, _right: string): boolean => true)

    function Wrapper({ text }) {
      const debouncedValue = useDebouncedValue(text, { wait: 1000, isEqual })
      useProps<any>(async ({ current: { text }, initial }) => {
        !initial && (await debouncedValue.setValue(text))
      })
      return <div role="test">{debouncedValue.state}</div>
    }

    const { rerender, getByRole } = await render(<Wrapper text={'Hello'} />)

    expect(isEqual).toHaveBeenCalledTimes(1)
    await rerender(<Wrapper text="Test" />)
    jest.runAllTimers()
    expect(isEqual).toHaveBeenCalledTimes(2)
    expect(isEqual).toHaveBeenCalledWith('Hello', 'Test')

    expect((getByRole('test') as any).textContent).toEqual('Hello')
  })
})
