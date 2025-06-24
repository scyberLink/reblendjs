import { useEventCallback } from 'reblend-hooks';
import { useMergedRefs } from 'reblend-hooks';
import { Reblend, useEffect, useRef } from 'reblendjs';
import { TransitionProps } from './types';
import { getChildRef } from './utils';

function NoopTransition({
  children,
  in: inProp,
  onExited,
  mountOnEnter,
  unmountOnExit,
}: TransitionProps) {
  const ref = useRef(null);
  const hasEnteredRef = useRef(inProp);
  const handleExited = useEventCallback(onExited);

  useEffect(() => {
    if (inProp) hasEnteredRef.current = true;
    else {
      handleExited(ref.current!);
    }
  }, [inProp, handleExited]);

  const combinedRef = useMergedRefs(ref, getChildRef(children));

  const child = cloneElement(children, { ref: combinedRef });

  if (inProp) return child;

  if (unmountOnExit) {
    return null;
  }
  if (!hasEnteredRef.current && mountOnEnter) {
    return null;
  }

  return child;
}

export default NoopTransition;
