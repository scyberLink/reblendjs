import { useReducer } from 'reblendjs'

/**
 * Returns a function that triggers a component update. the hook equivalent to
 * `this.forceUpdate()` in a class component. In most cases using a state value directly
 * is preferable but may be required in some advanced usages of refs for interop or
 * when direct DOM manipulation is required.
 *
 * ```ts
 * const forceUpdate = useForceUpdate();
 *
 * const updateOnClick = useCallback(() => {
 *  forceUpdate()
 * }, [forceUpdate])
 *
 * return <button type="button" onClick={updateOnClick}>Hi there</button>
 * ```
 */
export function useForceUpdate(): () => void {
  // The toggling state value is designed to defeat Reblend optimizations for skipping
  // updates when they are strictly equal to the last state value
  const [, dispatch] = useReducer((revision) => revision + 1, 0)
  return dispatch as any
}
