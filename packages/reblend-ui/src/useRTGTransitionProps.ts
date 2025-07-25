import { cloneElement, useCallback, useRef } from 'reblendjs';
import { useMergedRefs } from 'reblend-hooks';
import {
  TransitionProps as RTGTransitionProps,
  TransitionStatus,
} from 'react-transition-group/Transition';
import { getChildRef } from './utils';

export type TransitionProps = RTGTransitionProps & {
  children:
    | Reblend.ReactElement
    | ((
        status: TransitionStatus,
        props: Record<string, unknown>,
      ) => Reblend.ReactNode);
};

/**
 * Normalizes RTG transition callbacks with nodeRef to better support
 * strict mode.
 *
 * @param props Transition props.
 * @returns Normalized transition props.
 */
export default function useRTGTransitionProps({
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  addEndListener,
  children,
  ...props
}: TransitionProps) {
  const nodeRef = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(nodeRef, getChildRef(children));

  const normalize =
    (callback?: (node: HTMLElement, param: any) => void) => (param: any) => {
      if (callback && nodeRef.current) {
        callback(nodeRef.current, param);
      }
    };

  const handleEnter = useCallback(normalize(onEnter), [onEnter]);
  const handleEntering = useCallback(normalize(onEntering), [onEntering]);
  const handleEntered = useCallback(normalize(onEntered), [onEntered]);
  const handleExit = useCallback(normalize(onExit), [onExit]);
  const handleExiting = useCallback(normalize(onExiting), [onExiting]);
  const handleExited = useCallback(normalize(onExited), [onExited]);
  const handleAddEndListener = useCallback(normalize(addEndListener), [
    addEndListener,
  ]);

  return {
    ...props,
    nodeRef,
    ...(onEnter && { onEnter: handleEnter }),
    ...(onEntering && { onEntering: handleEntering }),
    ...(onEntered && { onEntered: handleEntered }),
    ...(onExit && { onExit: handleExit }),
    ...(onExiting && { onExiting: handleExiting }),
    ...(onExited && { onExited: handleExited }),
    ...(addEndListener && { addEndListener: handleAddEndListener }),
    children:
      typeof children === 'function'
        ? (((status: TransitionStatus, innerProps: Record<string, unknown>) =>
            // TODO: Types for RTG missing innerProps, so need to cast.
            children(status, {
              ...innerProps,
              ref: mergedRef,
            })) as any)
        : cloneElement(children as Reblend.ReactElement<any>, {
            ref: mergedRef,
          }),
  };
}
