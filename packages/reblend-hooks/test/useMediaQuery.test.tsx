import useMediaQuery from '../cjs/useMediaQuery'

import { renderHook, act } from 'reblend-testing-library'
import Reblend, { useProps } from 'reblendjs'

describe('useMediaQuery', () => {
  it('should match immediately if possible', async () => {
    const wrapper = await renderHook(
      function useMediaQ({ query }) {
        const obj = useMediaQuery(query)
        useProps<any>(
          ({
            current: {
              initialProps: { query },
            },
            initial,
          }) => {
            !initial && obj.setQuery(query)
          },
        )
        return obj
      },
      {
        initialProps: { query: 'min-width: 100px' },
      },
    )

    expect(window.innerWidth).toBeGreaterThanOrEqual(100)
    expect(wrapper.result.current.matches).toEqual(true)

    await act(async () => {
      await wrapper.rerender({ query: 'min-width: 2000px' })
    })

    expect(window.innerWidth).toBeLessThanOrEqual(2000)
    expect(wrapper.result.current.matches).toEqual(false)
  })

  it('should clear if no media is passed', async () => {
    const wrapper = await renderHook(
      function useMediaQ({ query }) {
        const obj = useMediaQuery(query)
        useProps<any>(
          ({
            current: {
              initialProps: { query },
            },
            initial,
          }) => {
            !initial && obj.setQuery(query)
          },
        )
        return obj
      },
      {
        initialProps: { query: null },
      },
    )

    expect(wrapper.result.current.matches).toEqual(false)

    await act(async () => {
      await wrapper.rerender('')
    })

    expect(wrapper.result.current.matches).toEqual(false)
  })
})
