import qsa from 'dom-helpers/querySelectorAll';
import * as Reblend from 'reblendjs';
import { useContext, useEffect, useRef } from 'reblendjs';
import { useForceUpdate } from 'reblend-hooks';
import { useMergedRefs } from 'reblend-hooks';
import NavContext from './NavContext';
import SelectableContext, { makeEventKey } from './SelectableContext';
import TabContext from './TabContext';
import {
  EventKey,
  DynamicComponent,
  SelectCallback,
} from './types';
import { dataAttr, dataProp } from './DataKey';
import NavItem, { UseNavItemOptions, NavItemProps } from './NavItem';

export type { UseNavItemOptions, NavItemProps };

const noop = () => {};

export interface NavProps
  extends Omit<Reblend.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /**
   * Key for the currently active NavItem.
   */
  activeKey?: EventKey;

  /**
   * Element used to render the component.
   */
  as?: Reblend.ElementType;

  /**
   * A callback fired when a NavItem has been selected.
   */
  onSelect?: SelectCallback;
}

const EVENT_KEY_ATTR = dataAttr('event-key');

const Nav: Reblend.FC<NavProps> = ({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  onSelect,
  activeKey,
  role,
  onKeyDown,
  ref,
  ...props
}) => {
  // A ref and forceUpdate for refocus, b/c we only want to trigger when needed
  // and don't want to reset the set in the effect
  const forceUpdate = useForceUpdate();
  const needsRefocusRef = useRef(false);

  const [parentOnSelect] = useContext(SelectableContext);
  const [tabContext] = useContext(TabContext);

  let getControlledId, getControllerId;

  if (tabContext) {
    role = role || 'tablist';
    activeKey = tabContext.activeKey;
    // TODO: do we need to duplicate these?
    getControlledId = tabContext.getControlledId;
    getControllerId = tabContext.getControllerId;
  }

  const listNode = useRef<HTMLElement | null>(null);

  const getNextActiveTab = (offset: number) => {
    const currentListNode = listNode.current;
    if (!currentListNode) return null;

    const items = qsa(
      currentListNode,
      `[${EVENT_KEY_ATTR}]:not([aria-disabled=true])`,
    );

    const activeChild = currentListNode.querySelector<HTMLElement>(
      '[aria-selected=true]',
    );
    if (!activeChild || activeChild !== document.activeElement) return null;

    const index = items.indexOf(activeChild);
    if (index === -1) return null;

    let nextIndex = index + offset;
    if (nextIndex >= items.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = items.length - 1;
    return items[nextIndex];
  };

  const handleSelect = (key: string | null, event: Reblend.SyntheticEvent) => {
    if (key == null) return;
    onSelect?.(key, event);
    parentOnSelect?.(key, event);
  };

  const handleKeyDown = (event: Reblend.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);

    if (!tabContext) {
      return;
    }

    let nextActiveChild;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextActiveChild = getNextActiveTab(-1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextActiveChild = getNextActiveTab(1);
        break;
      default:
        return;
    }
    if (!nextActiveChild) return;

    event.preventDefault();

    handleSelect(nextActiveChild.dataset[dataProp('EventKey')] || null, event);

    needsRefocusRef.current = true;
    forceUpdate();
  };

  useEffect(() => {
    if (listNode.current && needsRefocusRef.current) {
      const activeChild = listNode.current.querySelector<HTMLElement>(
        `[${EVENT_KEY_ATTR}][aria-selected=true]`,
      );

      activeChild?.focus();
    }

    needsRefocusRef.current = false;
  });

  const mergedRef = useMergedRefs(ref as any, listNode);
  return (
    <Component
      {...props}
      onKeyDown={handleKeyDown}
      ref={mergedRef}
      role={role}
    />
  );
};

export default Object.assign(Nav, { Item: NavItem });
