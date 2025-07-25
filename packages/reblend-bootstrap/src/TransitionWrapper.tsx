import React, { useCallback, useRef } from 'reblendjs';
import Transition, {
  type TransitionProps,
  type TransitionStatus,
} from 'react-transition-group/Transition';
import { useMergedRefs } from 'reblend-hooks';

export type TransitionWrapperProps = TransitionProps & {
  childRef?: Reblend.Ref<unknown>;
  children:
    | Reblend.ReactElement
    | ((
        status: TransitionStatus,
        props: Record<string, unknown>,
      ) => Reblend.ReactNode);
};

// Normalizes Transition callbacks when nodeRef is used.
const TransitionWrapper = Reblend.forwardRef<
  Transition<any>,
  TransitionWrapperProps
>(
  (
    {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      addEndListener,
      children,
      childRef,
      ...props
    }
  ) => {
    const nodeRef = useRef<HTMLElement>(null);
    const mergedRef = useMergedRefs(nodeRef, childRef);

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

    return (
      <Transition
        ref={ref}
        {...props}
        onEnter={handleEnter}
        onEntered={handleEntered}
        onEntering={handleEntering}
        onExit={handleExit}
        onExited={handleExited}
        onExiting={handleExiting}
        addEndListener={handleAddEndListener}
        nodeRef={nodeRef}
      >
        {typeof children === 'function'
          ? (((status: TransitionStatus, innerProps: Record<string, unknown>) =>
              // TODO: Types for RTG missing innerProps, so need to cast.
              children(status, {
                ...innerProps,
                ref: mergedRef,
              })) as any)
          : Reblend.cloneElement(
              children as Reblend.ReactElement,
              {
                ref: mergedRef,
              } as any,
            )}
      </Transition>
    );
  },
);

TransitionWrapper.displayName = 'TransitionWrapper';

export default TransitionWrapper;
