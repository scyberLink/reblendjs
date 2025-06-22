import { useEventCallback } from './useEventCallback'
import {
  deepEqualIterative,
  StateFunction,
  useEffect,
  useReducer,
  useState,
} from 'reblendjs'

/**
 * Observe mutations on a DOM node or tree of DOM nodes.
 * Depends on the `MutationObserver` api.
 *
 * ```tsx
 * const [element, attachRef] = useCallbackRef(null);
 *
 * useMutationObserver(element, { subtree: true }, (records) => {
 *
 * });
 *
 * return (
 *   <div ref={attachRef} />
 * )
 * ```
 *
 * @param element The DOM element to observe
 * @param config The observer configuration
 * @param callback A callback fired when a mutation occurs
 */
export function useMutationObserver(
  element: Element | null | undefined,
  config: MutationObserverInit,
  callback?: MutationCallback,
): {
  records: MutationRecord[] | void
  setElement: StateFunction<Element | null | undefined>
  setConfig: (newConfig: MutationObserverInit) => void
} {
  const [records, setRecords] = useState<MutationRecord[] | null>(null)
  const handler = useEventCallback(
    callback || ((_records) => setRecords(_records)),
  )
  // The behavior around reusing mutation observers is confusing
  // observing again _should_ disable the last listener but doesn't
  // seem to always be the case, maybe just in JSDOM? In any case the cost
  // to redeclaring it is gonna be fairly low anyway, so make it simple
  const observer = new MutationObserver(handler)

  const [_element, setElement] = useReducer<typeof element, typeof element>(
    (state, newElement) => {
      if (!newElement) return
      observer.observe(newElement, config)
      return newElement
    },
    null,
  )

  setElement(element)

  let currentConfig = config

  function setConfig(newConfig: MutationObserverInit) {
    if (_element && !deepEqualIterative(currentConfig, newConfig)) {
      currentConfig = newConfig
      observer.disconnect()
      observer.observe(_element, currentConfig)
    }
  }

  const useMutationObserverReturnObject = {
    setElement,
    setConfig,
    records: callback ? void 0 : records || [],
  }

  useEffect(() => {
    useMutationObserverReturnObject.records = callback ? void 0 : records || []

    return () => {
      observer.disconnect()
    }
  }, records)

  return useMutationObserverReturnObject
}
