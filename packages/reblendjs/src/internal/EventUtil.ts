/* eslint-disable @typescript-eslint/no-explicit-any */

import * as ReblendTyping from 'reblend-typing'

/**
 * Wraps an event callback function, ensuring that the event callback is always called.
 *
 * @param {((e: Event) => any) | string} [eventCallback] - The event callback to be wrapped.
 * @returns {(e: Event) => void} A function that invokes the event callback.
 */
export function fn(
  component: ReblendTyping.Component<any, any>,
  eventCallback: ((e: Event) => any) | string,
): (e: Event) => void {
  return (e) => {
    if (!eventCallback) {
      return
    }
    if (typeof eventCallback === 'function') {
      eventCallback.call(component, e)
    } else if (typeof eventCallback === 'string') {
      new Function('e', eventCallback).call(component, e)
    } else {
      throw new Error(`Event callback must be a function or a string, but received: ${typeof eventCallback}`)
    }
  }
}
