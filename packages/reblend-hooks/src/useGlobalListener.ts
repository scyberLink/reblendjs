import { useEventListener } from './useEventListener'
import { useCallback } from 'reblendjs'

export type DocumentEventHandler<K extends keyof DocumentEventMap> = (
  this: Document,
  ev: DocumentEventMap[K],
) => any

/**
 * Attaches an event handler outside directly to the `document`
 *
 * ```ts
 * useGlobalListener('keydown', (event) => {
 *  console.log(event.key)
 * })
 * ```
 *
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
export function useGlobalListener<K extends keyof DocumentEventMap>(
  event: K,
  handler: DocumentEventHandler<K>,
  capture: boolean | AddEventListenerOptions = false,
) {
  const documentTarget = useCallback(() => document)

  return useEventListener(documentTarget, event, handler, capture)
}
