import { useTimeout } from './useTimeout'

export interface UseDebouncedCallbackOptions {
  wait: number
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

export interface UseDebouncedCallbackOptionsLeading
  extends UseDebouncedCallbackOptions {
  leading: true
}

const EMPTY: unique symbol = Symbol('EMPTY')

/**
 * Creates a debounced function that will invoke the input function after the
 * specified wait.
 *
 * > Heads up! debounced functions are not pure since they are called in a timeout
 * > Don't call them inside render.
 *
 * @param fn a function that will be debounced
 * @param waitOrOptions a wait in milliseconds or a debounce configuration
 */
export function useDebouncedCallback<TCallback extends (...args: any[]) => any>(
  fn: TCallback,
  options: UseDebouncedCallbackOptionsLeading,
): (...args: Parameters<TCallback>) => Promise<ReturnType<TCallback>>

/**
 * Creates a debounced function that will invoke the input function after the
 * specified wait.
 *
 * > Heads up! debounced functions are not pure since they are called in a timeout
 * > Don't call them inside render.
 *
 * @param fn a function that will be debounced
 * @param waitOrOptions a wait in milliseconds or a debounce configuration
 */
export function useDebouncedCallback<TCallback extends (...args: any[]) => any>(
  fn: TCallback,
  waitOrOptions: number | UseDebouncedCallbackOptions,
): (...args: Parameters<TCallback>) => ReturnType<TCallback>

export function useDebouncedCallback<TCallback extends (...args: any[]) => any>(
  fn: TCallback,
  waitOrOptions: number | UseDebouncedCallbackOptions,
): (...args: Parameters<TCallback>) => ReturnType<TCallback> {
  let lastCallTime: number | null = null
  let lastInvokeTime = 0
  let returnValue: ReturnType<TCallback> | typeof EMPTY = EMPTY

  let isTimerSet = false
  let lastArgs: unknown[] | null = null

  const {
    wait,
    maxWait,
    leading = false,
    trailing = true,
  } = typeof waitOrOptions === 'number'
    ? ({ wait: waitOrOptions } as UseDebouncedCallbackOptions)
    : waitOrOptions

  const timeout = useTimeout()

  const hasMaxWait = !!maxWait

  const leadingEdge = async (time: number) => {
    // Reset any `maxWait` timer.
    lastInvokeTime = time

    // Start the timer for the trailing edge.
    isTimerSet = true
    await timeout.set(timerExpired, wait)

    if (!leading) {
      return returnValue === EMPTY ? undefined : returnValue
    }

    return await invokeFunc(time)
  }

  const trailingEdge = async (time: number) => {
    isTimerSet = false

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return await invokeFunc(time)
    }

    lastArgs = null
    return returnValue === EMPTY ? undefined : returnValue
  }

  const timerExpired = async () => {
    var time = Date.now()

    if (shouldInvoke(time)) {
      return await trailingEdge(time)
    }

    const timeSinceLastCall = time - (lastCallTime ?? 0)
    const timeSinceLastInvoke = time - lastInvokeTime!
    const timeWaiting = wait - timeSinceLastCall

    // console.log('g', Math.min(timeWaiting, maxWait - timeSinceLastInvoke))

    // Restart the timer.
    await timeout.set(
      timerExpired,
      hasMaxWait
        ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting,
    )
  }

  const invokeFunc = async (time: number) => {
    const args = lastArgs ?? []

    lastArgs = null
    lastInvokeTime = time

    const retValue = await fn(...args)
    returnValue = retValue
    return retValue
  }

  const shouldInvoke = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime ?? 0)
    const timeSinceLastInvoke = time - lastInvokeTime!

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === null ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (hasMaxWait && timeSinceLastInvoke >= maxWait)
    )
  }

  return (async (...args: any[]) => {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastCallTime = time

    if (isInvoking) {
      if (!isTimerSet) {
        return await leadingEdge(lastCallTime)
      }

      if (hasMaxWait) {
        // Handle invocations in a tight loop.
        isTimerSet = true
        await timeout.set(timerExpired, wait)
        return await invokeFunc(lastCallTime)
      }
    }

    if (!isTimerSet) {
      isTimerSet = true
      await timeout.set(timerExpired, wait)
    }

    return returnValue === EMPTY ? undefined : returnValue
  }) as ReturnType<TCallback>
}
