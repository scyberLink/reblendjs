import { StateFunction, useEffect, useState } from 'reblendjs'

/**
 * Creates a `setInterval` that is properly cleaned up when a component unmounted
 *
 * ```tsx
 *  function Timer() {
 *    const [timer, setTimer] = useState(0)
 *    useInterval(() => setTimer(i => i + 1), 1000)
 *
 *    return <span>{timer} seconds past</span>
 *  }
 * ```
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 */
export function useInterval(
  fn: () => void,
  ms: number,
): { setPause: StateFunction<boolean> }

/**
 * Creates a pausable `setInterval` that is properly cleaned up when a component unmounted
 *
 * ```tsx
 *  const [paused, setPaused] = useState(false)
 *  const [timer, setTimer] = useState(0)
 *
 *  useInterval(() => setTimer(i => i + 1), 1000, paused)
 *
 *  return (
 *    <span>
 *      {timer} seconds past
 *
 *      <button onClick={() => setPaused(p => !p)}>{paused ? 'Play' : 'Pause' }</button>
 *    </span>
 * )
 * ```
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 * @param paused Whether or not the interval is currently running
 */
export function useInterval(
  fn: () => void,
  ms: number,
  paused: boolean,
): { setPause: StateFunction<boolean> }

/**
 * Creates a pausable `setInterval` that _fires_ immediately and is
 * properly cleaned up when a component unmounted
 *
 * ```tsx
 *  const [timer, setTimer] = useState(-1)
 *  useInterval(() => setTimer(i => i + 1), 1000, false, true)
 *
 *  // will update to 0 on the first effect
 *  return <span>{timer} seconds past</span>
 * ```
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 * @param paused Whether or not the interval is currently running
 * @param runImmediately Whether to run the function immediately on mount or unpause
 * rather than waiting for the first interval to elapse
 *

 */
export function useInterval(
  fn: () => void,
  ms: number,
  paused: boolean,
  runImmediately: boolean,
): { setPause: StateFunction<boolean> }

export function useInterval(
  fn: () => void,
  ms: number,
  paused: boolean = false,
  runImmediately: boolean = false,
): { setPause: StateFunction<boolean> } {
  const [_pause, setPause] = useState(paused)
  let handle: number
  const fnRef = fn
  // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.
  const pausedRef = paused
  const tick = () => {
    if (pausedRef) return
    fnRef!()
    schedule() // eslint-disable-line no-use-before-define
  }

  const schedule = () => {
    clearTimeout(handle)
    handle = setTimeout(tick, ms) as any
  }

  useEffect(() => {
    if (runImmediately) {
      tick()
    } else {
      schedule()
    }
    return () => clearTimeout(handle)
  }, [_pause, runImmediately])

  return { setPause }
}
