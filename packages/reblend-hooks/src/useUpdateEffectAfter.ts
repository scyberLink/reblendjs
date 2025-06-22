import { StateEffectiveFunction, useEffectAfter, useRef } from 'reblendjs'

/**
 * Runs after effect only when the dependencies have changed, skipping the
 * initial "on mount" run. Caution, if the dependency list never changes,
 * the effect is **never run**
 *
 * ```ts
 *  const ref = useRef<HTMLInput>(null);
 *
 *  // focuses an element only if the focus changes, and not on mount
 *  useUpdateEffectAfter(() => {
 *    const element = ref.current?.children[focusedIdx] as HTMLElement
 *
 *    element?.focus()
 *
 *  }, [focusedIndex])
 * ```
 * @param effect An effect to run on mount
 *
 * @category effects
 */
function useUpdateEffectAfter<T>(fn: StateEffectiveFunction<T>, deps: () => T) {
  const isFirst = useRef(true)
  useEffectAfter((meta) => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    return fn(meta)
  }, deps as any)
}

export default useUpdateEffectAfter
