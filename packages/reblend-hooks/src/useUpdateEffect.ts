import { StateEffectiveFunction, useEffect, useRef } from 'reblendjs'

/**
 * Runs an effect only when the dependencies have changed, skipping the
 * initial "on mount" run. Caution, if the dependency list never changes,
 * the effect is **never run**
 *
 * ```ts
 *  const ref = useRef<HTMLInput>(null);
 *
 *  // focuses an element only if the focus changes, and not on mount
 *  useUpdateEffect(() => {
 *    const element = ref.current?.children[focusedIdx] as HTMLElement
 *
 *    element?.focus()
 *
 *  }, () => [focusedIndex])
 * ```
 * @param effect An effect to run on mount
 *
 * @category effects
 */
export function useUpdateEffect<T>(fn: StateEffectiveFunction<T>, deps: () => T) {
  let isFirst = true
  useEffect<T>((meta) => {
    if (isFirst) {
      isFirst = false
      return
    }
    return fn(meta)
  }, deps as any)
}
