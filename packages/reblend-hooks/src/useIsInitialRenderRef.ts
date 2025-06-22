import { useEffectAfter, useRef } from 'reblendjs'

/**
 * Returns ref that is `true` on the initial render and `false` on subsequent renders.
 *
 * This hook *must* be used before any effects that read it's value to be accurate.
 */
export default function useIsInitialRenderRef() {
  const effectCount = useRef(0)
  const isInitialRenderRef = useRef(true)

  useEffectAfter(() => {
    effectCount.current! += 1

    if (effectCount.current >= 2) {
      isInitialRenderRef.current = false
    }
  })

  return isInitialRenderRef
}
