import { useContext, useCallback, useEffect } from 'reblendjs';
import Reblend from 'reblendjs';
import DropdownContext, { DropdownContextValue } from './DropdownContext';

export const isRoleMenu = (el: HTMLElement) =>
  el.getAttribute('role')?.toLowerCase() === 'menu';

export interface UseDropdownToggleProps {
  ref: DropdownContextValue['setToggle'];
  onClick: Reblend.MouseEventHandler;
  'aria-expanded': boolean;
  'aria-haspopup'?: true;
}

export interface UseDropdownToggleMetadata {
  show: DropdownContextValue['show'];
  toggle: DropdownContextValue['toggle'];
}

const noop = () => {};

/**
 * Wires up Dropdown toggle functionality, returning a set a props to attach
 * to the element that functions as the dropdown toggle (generally a button).
 *
 * @memberOf Dropdown
 */
export function useDropdownToggle(): {
  props: UseDropdownToggleProps;
  meta: UseDropdownToggleMetadata;
} {
  const [dropdownContextValue] = useContext(DropdownContext);
  const handleClick = useCallback((e) => {
    dropdownContextValue?.toggle(!dropdownContextValue?.show, e as any);
  });

  const props: UseDropdownToggleProps = {
    ref: dropdownContextValue?.setToggle || noop,
    onClick: handleClick,
    'aria-expanded': !!dropdownContextValue?.show,
  };

  const meta: UseDropdownToggleMetadata = {
    show: dropdownContextValue?.show!,
    toggle: dropdownContextValue?.toggle!,
  };

  useEffect(() => {
    if (
      dropdownContextValue?.menuElement &&
      isRoleMenu(dropdownContextValue?.menuElement)
    ) {
      props['aria-haspopup'] = true;
    }
    meta.show = dropdownContextValue?.show!;
  });

  return { props, meta };
}

export interface DropdownToggleProps {
  /**
   * A render prop that returns a Toggle element. The `props`
   * argument should spread through to **a component that can accept a ref**. Use
   * the `onToggle` argument to toggle the menu open or closed
   *
   * @type {Function ({
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     aria-haspopup: true
   *     aria-expanded: boolean
   *   },
   *   meta: {
   *     show: boolean,
   *     toggle: (show: boolean) => void,
   *   }
   * }) => Reblend.Element}
   */
  children: [
    (
      props: UseDropdownToggleProps,
      meta: UseDropdownToggleMetadata,
    ) => Reblend.ReactNode,
  ];
}

/**
 * Also exported as `<Dropdown.Toggle>` from `Dropdown`.
 *
 * @displayName DropdownToggle
 * @memberOf Dropdown
 */
function DropdownToggle({ children }: DropdownToggleProps) {
  const dropDownToggle = useDropdownToggle();

  return (
    <>
      {children.map((child) =>
        child(dropDownToggle.props, dropDownToggle.meta),
      )}
    </>
  );
}

DropdownToggle.displayName = 'DropdownToggle';

/** @component */
export default DropdownToggle;
