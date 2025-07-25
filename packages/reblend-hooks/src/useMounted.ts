import { useRef, useEffect } from 'reblendjs'

/**
 * Track whether a component is current mounted. Generally less preferable than
 * properlly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @returns a function that returns the current isMounted state of the component
 *
 * ```ts
 * const [data, setData] = useState(null)
 * const isMounted = useMounted()
 *
 * useEffect(() => {
 *   fetchdata().then((newData) => {
 *      if (isMounted()) {
 *        setData(newData);
 *      }
 *   })
 * })
 * ```
 */
export function useMounted(): () => boolean {
  const mounted = useRef(false)
  const isMounted = useRef(() => mounted.current!)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return isMounted.current!
}
