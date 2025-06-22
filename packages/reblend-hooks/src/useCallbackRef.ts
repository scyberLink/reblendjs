import { useState } from 'reblendjs'

/**
 * A convenience hook around `useState` designed to be paired with
 * the component [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) api.
 * Callback refs are useful over `useRef()` when you need to respond to the ref being set
 * instead of lazily accessing it in an effect.
 *
 * ```ts
 * const {item, ref} = useCallbackRef<HTMLDivElement>()
 *
 * useEffect(() => {
 *   if (!item) return
 *
 *   const calendar = new FullCalendar.Calendar(item)
 *
 *   return () => {
 *     calendar.destroy()
 *   }
 * }, [item])
 *
 * return <div ref={attachRef} />
 * ```
 *
 * @category refs
 */
export default function useCallbackRef<TValue = unknown>(): {
  item: TValue | null
  ref: (ref: TValue | null) => void
} {
  const [item, ref] = useState<TValue | null>(null)

  return { item, ref } as any as {
    item: TValue | null
    ref: (ref: TValue | null) => void
  }
}
