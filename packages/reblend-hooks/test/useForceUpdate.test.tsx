import { act, renderHook } from 'reblend-testing-library'

import useForceUpdate from '../cjs/useForceUpdate'
import Reblend, { useEffect } from 'reblendjs'

describe('useForceUpdate', () => {
  it('should return a function that returns mount state', async () => {
    let count = 0

    const { result } = await renderHook(function useForce() {
      useEffect(() => {
        count++
      })
      return useForceUpdate()
    })

    expect(count).toEqual(1)
    await act(async () => {
      result.current()
    })

    expect(count).toEqual(2)
  })
})
