import { renderHook } from 'reblend-testing-library'

import useIsInitialRenderRef from '../cjs/useIsInitialRenderRef'
import Reblend, { useEffectAfter } from 'reblendjs'

describe('useIsInitialRenderRef', () => {
  it('should not be true until the second committed render', async () => {
    let count = 0

    // TODO: test with strict mode
    const { rerender } = await renderHook(function useIsInitial() {
      const ref = useIsInitialRenderRef()

      useEffectAfter(async () => {
        if (ref.current) return

        count++
      })
    })

    expect(count).toEqual(0)

    await rerender(null)

    expect(count).toEqual(1)
  })
})
