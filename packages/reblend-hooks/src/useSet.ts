import useForceUpdate from './useForceUpdate'
import { useMemo } from 'reblendjs'

export class ObservableSet<V> extends Set<V> {
  private readonly listener: (map: ObservableSet<V>) => void

  constructor(listener: (map: ObservableSet<V>) => void, init?: Iterable<V>) {
    super(init as any)

    this.listener = listener
  }

  add(value: V): this {
    super.add(value)
    // When initializing the Set, the base Set calls this.add() before the
    // listener is assigned so it will be undefined
    if (this.listener) this.listener(this)
    return this
  }

  delete(value: V): boolean {
    const result = super.delete(value)
    this.listener(this)
    return result
  }

  clear(): void {
    super.clear()
    this.listener(this)
  }
}

/**
 * Create and return a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) that triggers rerenders when it's updated.
 *
 * ```ts
 * const {set} = useSet<number>([1,2,3,4]);
 *
 * return (
 *  <>
 *    {Array.from(set, id => (
 *      <div>
 *        id: {id}. <button onClick={() => set.delete(id)}>X</button>
 *      </div>
 *    )}
 *  </>
 * )
 * ```
 *
 * @param init initial Set values
 */
function useSet<V>(init?: Iterable<V>): { set: ObservableSet<V> } {
  const forceUpdate = useForceUpdate()
  const set = useMemo(() => new ObservableSet<V>(forceUpdate, init), [])
  return { set }
}

export default useSet
