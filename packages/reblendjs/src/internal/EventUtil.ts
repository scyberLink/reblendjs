/* eslint-disable @typescript-eslint/no-explicit-any */
export class EventUtil {
  /**
   * Wraps an event callback function, ensuring that the event callback is always called.
   *
   * @param {(e: Event) => any} [eventCallback=() => {}] - The event callback to be wrapped.
   * @returns {(e: Event) => void} A function that invokes the event callback.
   */
  static fn(eventCallback: (e: Event) => any = () => {}): (e: Event) => void {
    return async (e) => eventCallback && eventCallback(e)
  }
}
