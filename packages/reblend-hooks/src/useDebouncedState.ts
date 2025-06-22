import { StateFunction, useReducer } from 'reblendjs'
import useDebouncedCallback, {
  UseDebouncedCallbackOptions,
} from './useDebouncedCallback'

/**
 * Similar to `useState`, except the setter function is debounced by
 * the specified delay. Unlike `useState`, the returned setter is not "pure" having
 * the side effect of scheduling an update in a timeout, which makes it unsafe to call
 * inside of the component render phase.
 *
 * ```ts
 * const [value, setValue] = useDebouncedState('test', 500)
 *
 * setValue('test2')
 * ```
 *
 * @param initialState initial state value
 * @param delayOrOptions The milliseconds delay before a new value is set, or options object
 */
export default function useDebouncedState<T>(
  initialState: T | (() => T),
  delayOrOptions: number | UseDebouncedCallbackOptions,
): { state: T; debouncedSetState: StateFunction<T> } {
  const useDebouncedStateReturnObject: {
    state: T
    debouncedSetState: StateFunction<T>
  } = {} as any

  const [_useDebouncedStateState, setUseDebouncedStateState] = useReducer<T, T>(
    (_prev, newState) => {
      useDebouncedStateReturnObject.state = newState
      return newState
    },
    null as any,
  )

  useDebouncedStateReturnObject.debouncedSetState = useDebouncedCallback(
    setUseDebouncedStateState,
    delayOrOptions,
  )
  setUseDebouncedStateState(initialState)

  return useDebouncedStateReturnObject
}
