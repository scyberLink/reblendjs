import * as Reblend from 'reblendjs';
import useRTGTransitionProps, {
  TransitionProps,
} from './useRTGTransitionProps';

export type RTGTransitionProps = TransitionProps & {
  component: Reblend.ElementType;
};

// Normalizes Transition callbacks when nodeRef is used.
const RTGTransition: Reblend.FC<RTGTransitionProps> = ({ component: Component, ref, ...props }) => {
  const transitionProps = useRTGTransitionProps(props as any);

  return <Component ref={ref} {...transitionProps} />;
};

RTGTransition.displayName = 'RTGTransition';

export default RTGTransition;
