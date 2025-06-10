import * as Reblend from 'reblendjs';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import FormCheck, { FormCheckProps } from './FormCheck';

type SwitchProps = Omit<FormCheckProps, 'type'>;

const Switch: DynamicRefForwardingComponent<typeof FormCheck, SwitchProps> =
  ((props) => (
    <FormCheck {...props} ref={ref} type="switch" />
  ));

Switch.displayName = 'Switch';

export default Object.assign(Switch, {
  Input: FormCheck.Input,
  Label: FormCheck.Label,
});
