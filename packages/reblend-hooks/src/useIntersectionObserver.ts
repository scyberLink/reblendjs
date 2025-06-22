import { StateFunction, useEffect, useReducer, useState } from 'reblendjs'

import { useEventCallback } from './useEventCallback'

/**
 * Setup an [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) on
 * a DOM Element that returns it's entries as they arrive.
 *
 * @param element The DOM element to observe
 * @param init IntersectionObserver options with a notable change,
 * unlike a plain IntersectionObserver `root: null` means "not provided YET",
 * and the hook will wait until it receives a non-null value to set up the observer.
 * This change allows for easier syncing of element and root values in a Reblend Context
 */
export function useIntersectionObserver<TElement extends Element>(
  element: TElement | null | undefined,
  options?: IntersectionObserverInit,
): {
  entries: undefined | IntersectionObserverEntry[] | null
  setElement: StateFunction<TElement | null | undefined>
  setRoot: StateFunction<TElement | null | undefined>
}
/**
 * Setup an [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) on
 * a DOM Element. This overload does not trigger component updates when receiving new
 * entries. This allows for finer grained performance optimizations by the consumer.
 *
 * @param element The DOM element to observe
 * @param callback A listener for intersection updates.
 * @param init IntersectionObserver options with a notable change,
 * unlike a plain IntersectionObserver `root: null` means "not provided YET",
 * and the hook will wait until it receives a non-null value to set up the observer.
 * This change allows for easier syncing of element and root values in a React
 * context.
 *
 */
export function useIntersectionObserver<TElement extends Element>(
  element: TElement | null | undefined,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): {
  entries: undefined | IntersectionObserverEntry[] | null
  setElement: StateFunction<TElement | null | undefined>
  setRoot: StateFunction<TElement | null | undefined>
}
export function useIntersectionObserver<TElement extends Element>(
  element: TElement | null | undefined,
  callbackOrOptions?: IntersectionObserverCallback | IntersectionObserverInit,
  maybeOptions?: IntersectionObserverInit,
): {
  entries: undefined | IntersectionObserverEntry[] | null
  setElement: StateFunction<TElement | null | undefined>
  setRoot: StateFunction<TElement | null | undefined>
} {
  let callback: IntersectionObserverCallback | undefined
  let options: IntersectionObserverInit
  const [entries, setEntry] = useState<IntersectionObserverEntry[] | null>(null)

  if (typeof callbackOrOptions === 'function') {
    callback = callbackOrOptions
    options = maybeOptions || {}
  } else {
    options = callbackOrOptions || {}
  }
  const handler = useEventCallback(callback || setEntry)
  const { threshold, root, rootMargin } = options

  let observer: any = null

  const [_root, setRoot] = useReducer<typeof element, typeof element>(
    //@ts-ignore
    (state, newRoot) => {
      observer =
        newRoot !== null &&
        typeof IntersectionObserver !== 'undefined' &&
        new IntersectionObserver(handler as any, {
          threshold,
          root: newRoot,
          rootMargin,
        })
      if (observer && _element) {
        setElement(_element)
      }
      return newRoot
    },
    null,
  )
  setRoot(root as any)

  const [_element, setElement] = useReducer<typeof element, typeof element>(
    (state, newElement) => {
      if (!newElement || !observer) return newElement

      observer.observe(newElement!)

      return newElement
    },
    null,
  )

  setElement(element)

  const useIntersectionObserverReturn = {
    entries: callback ? undefined : entries || [],
    setElement,
    setRoot,
  }

  useEffect(() => {
    useIntersectionObserverReturn.entries = callback ? undefined : entries || []
    return () => {
      observer && observer.unobserve(_element!)
    }
  }, [observer, _element, entries])

  return useIntersectionObserverReturn
}
