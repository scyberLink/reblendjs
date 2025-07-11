import { useCallbackRef } from 'reblend-hooks';
import * as Reblend from 'reblendjs';

import useWaypoint, {
  WaypointOptions,
  WaypointEvent,
  Position,
} from './useWaypoint';

export { Position };
export type { WaypointEvent };

const defaultRenderComponent = (ref: Reblend.RefCallback<any>) => (
  <span ref={ref} style={{ fontSize: 0 }} />
);

export interface WaypointProps extends WaypointOptions {
  renderComponent?: (ref: Reblend.RefCallback<any>) => Reblend.ReactElement;

  /**
   * The callback fired when a waypoint's position is updated. This generally
   * fires as a waypoint enters or exits the viewport but will also be called
   * on mount.
   */
  onPositionChange: (
    details: WaypointEvent,
    entry: IntersectionObserverEntry,
  ) => void;
}

/**
 * A component that tracks when it enters or leaves the viewport. Implemented
 * using IntersectionObserver, polyfill may be required for older browsers.
 */
function Waypoint({
  renderComponent = defaultRenderComponent,
  onPositionChange,
  ...options
}: WaypointProps) {
  const [element, setElement] = useCallbackRef<Element>();

  useWaypoint(element, onPositionChange, options);

  return renderComponent(setElement);
}

export default Waypoint;
