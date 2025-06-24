import * as Reblend from 'reblendjs';
import type { Placement } from './usePopper';

export type DropdownContextValue = {
  toggle: (
    nextShow: boolean,
    event?: Reblend.SyntheticEvent | KeyboardEvent | MouseEvent,
  ) => void;
  menuElement: HTMLElement | null;
  toggleElement: HTMLElement | null;
  setMenu: (ref: HTMLElement | null) => void;
  setToggle: (ref: HTMLElement | null) => void;

  show: boolean;
  placement?: Placement;
};

const DropdownContext = Reblend.createContext<DropdownContextValue | null>(null);

export default DropdownContext;
