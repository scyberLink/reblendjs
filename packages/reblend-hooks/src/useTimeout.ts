import { Ref, useEffect, useRef, useState } from 'reblendjs'
import useMounted from './useMounted'

/*
 * Browsers including Internet Explorer, Chrome, Safari, and Firefox store the
 * delay as a 32-bit signed integer internally. This causes an integer overflow
 * when using delays larger than 2,147,483,647 ms (about 24.8 days),
 * resulting in the timeout being executed immediately.
 *
 * via: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
const MAX_DELAY_MS = 2 ** 31 - 1

function setChainedTimeout(
  handleRef: Ref<any>,
  fn: () => void,
  timeoutAtMs: number,
) {
  const delayMs = timeoutAtMs - Date.now()

  handleRef.current =
    delayMs <= MAX_DELAY_MS
      ? setTimeout(fn, delayMs)
      : setTimeout(
          () => setChainedTimeout(handleRef, fn, timeoutAtMs),
          MAX_DELAY_MS,
        )
}

type TimeoutState = {
  fn: () => void
  delayMs: number
}
/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 *
 * ```tsx
 * const { set, clear } = useTimeout();
 * const [hello, showHello] = useState(false);
 * //Display hello after 5 seconds
 * set(() => showHello(true), 5000);
 * return (
 *   <div className="App">
 *     {hello ? <h3>Hello</h3> : null}
 *   </div>
 * );
 * ```
 */
export default function useTimeout() {
  const [useTimeoutState, setuseTimeoutState] = useState<TimeoutState | null>(
    null,
  )
  const isMounted = useMounted()

  // types are confused between node and web here IDK
  const handleRef = useRef<any>(null)

  useEffect(() => {
    if (!useTimeoutState) {
      return
    }

    const { fn, delayMs } = useTimeoutState

    const task = () => {
      if (isMounted()) {
        setuseTimeoutState(null)
      }
      fn()
    }

    if (delayMs <= MAX_DELAY_MS) {
      // For simplicity, if the timeout is short, just set a normal timeout.
      handleRef.current = setTimeout(task, delayMs)
    } else {
      setChainedTimeout(handleRef, task, Date.now() + delayMs)
    }
    const handle = handleRef.current

    return () => {
      // this should be a no-op since they are either the same or `handle`
      // already expired but no harm in calling twice
      if (handleRef.current !== handle) {
        clearTimeout(handle)
      }

      clearTimeout(handleRef.current)
      handleRef.current === null
    }
  }, [useTimeoutState])

  return {
    set: async (fn: () => void, delayMs = 0): Promise<void> => {
      if (!isMounted()) return
      await setuseTimeoutState({ fn, delayMs })
    },
    clear: async () => {
      clearTimeout(handleRef.current)
      await setuseTimeoutState(null)
    },
    isPending: () => !!useTimeoutState,
    handleRef,
  }
}
