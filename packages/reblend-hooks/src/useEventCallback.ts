import { useCallback } from 'reblendjs'

export function useEventCallback<
  TCallback extends (...args: any[]) => any,
>(fn?: TCallback | null): TCallback {
  return useCallback((...args: any[]) => {
    return fn && fn(...args)
  }) as any
}
