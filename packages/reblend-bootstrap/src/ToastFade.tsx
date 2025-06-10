import * as Reblend from 'reblendjs';
import Transition, {
  ENTERING,
  EXITING,
} from 'react-transition-group/Transition';
import Fade, { type FadeProps } from './Fade';

const fadeStyles = {
  [ENTERING]: 'showing',
  [EXITING]: 'showing show',
};

const ToastFade = ((props) => (
  <Fade {...props} ref={ref} transitionClasses={fadeStyles} />
));

ToastFade.displayName = 'ToastFade';

export default ToastFade;
