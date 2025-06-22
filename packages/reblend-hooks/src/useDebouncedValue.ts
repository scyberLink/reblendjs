import { StateFunction } from 'reblendjs'
import useDebouncedState from './useDebouncedState'
import { UseDebouncedCallbackOptions } from './useDebouncedCallback'

const defaultIsEqual = (a: any, b: any) => a === b

export type UseDebouncedValueOptions = UseDebouncedCallbackOptions & {
  isEqual?: (a: any, b: any) => boolean
}

/**
 * Debounce a value change by a specified number of milliseconds. Useful
 * when you want need to trigger a change based on a value change, but want
 * to defer changes until the changes reach some level of infrequency.
 *
 * @param value
 * @param waitOrOptions
 * @returns
 */
function useDebouncedValue<TValue>(
  value: TValue,
  waitOrOptions: number | UseDebouncedValueOptions = 500,
): { state: TValue; setValue: StateFunction<TValue> } {
  let previousValue: TValue | null = value

  const debounceState = useDebouncedState(value, waitOrOptions)

  const isEqual =
    typeof waitOrOptions === 'object'
      ? waitOrOptions.isEqual || defaultIsEqual
      : defaultIsEqual

  ;(debounceState as any).setValue = async (val: TValue) => {
    if (!isEqual || !isEqual(previousValue, val)) {
      previousValue = val
      await debounceState.debouncedSetState(val)
    }
  }
  ;(debounceState as any).setValue(value)

  return debounceState as any
}

export default useDebouncedValue
