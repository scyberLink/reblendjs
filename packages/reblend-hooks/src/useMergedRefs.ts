import { useMemo } from 'reblendjs'

type CallbackRef<T> = (ref: T | null) => void
type Ref<T> = Reblend.Ref<T> | CallbackRef<T>

function toFnRef<T>(ref?: Ref<T> | null) {
  return !ref || typeof ref === 'function'
    ? ref
    : (value: T | null) => {
        ref.current = value as T
      }
}

export function mergeRefs<T>(refA?: Ref<T> | null, refB?: Ref<T> | null) {
  const a = toFnRef(refA)
  const b = toFnRef(refB)
  return (value: T | null) => {
    if (a) a(value)
    if (b) b(value)
  }
}

/**
 * Create and returns a single callback ref composed from two other Refs.
 *
 * ```tsx
 * const Button = ((props, ref) => {
 *   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
 *   const mergedRef = useMergedRefs(ref, attachRef);
 *
 *   return <button ref={mergedRef} {...props}/>
 * })
 * ```
 *
 * @param refA A Callback or mutable Ref
 * @param refB A Callback or mutable Ref
 * @category refs
 */
export function useMergedRefs<T>(refA?: Ref<T> | null, refB?: Ref<T> | null) {
  return mergeRefs(refA, refB)
}
