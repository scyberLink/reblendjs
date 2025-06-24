import * as Reblend from 'reblendjs';
import { render, fireEvent } from 'reblend-testing-library';
import { expect, describe, it, jest } from '@jest/globals';

import NavContext from '../src/NavContext';
import NavItem from '../src/NavItem';
import SelectableContext from '../src/SelectableContext';

describe('<NavItem>', () => {
  it('should output a nav item as button', () => {
    const { getByText } = render(<NavItem>test</NavItem>);

    expect(getByText('test').tagName).toEqual('BUTTON');
  });

  it('should output custom role', () => {
    const { getByRole } = render(<NavItem role="abc">test</NavItem>);
    expect(getByRole('abc')).toBeTruthy();
  });

  it('should set role to tab if inside nav context', () => {
    const { getByRole } = render(
      <NavContext.Provider
        value={{
          role: 'tablist',
          activeKey: 'key',
          getControlledId: jest.fn(),
          getControllerId: jest.fn(),
        }}
      >
        <NavItem>test</NavItem>
      </NavContext.Provider>,
    );

    expect(getByRole('tab')).toBeTruthy();
  });

  it('should not override custom role if inside nav context', () => {
    const { getByRole } = render(
      <NavContext.Provider
        value={{
          role: 'tablist',
          activeKey: 'key',
          getControlledId: jest.fn(),
          getControllerId: jest.fn(),
        }}
      >
        <NavItem role="abc">test</NavItem>
      </NavContext.Provider>,
    );

    expect(getByRole('abc')).toBeTruthy();
  });

  it('should use active from nav context', () => {
    const { getByText } = render(
      <NavContext.Provider
        value={{
          role: 'tablist',
          activeKey: 'key',
          getControlledId: jest.fn(),
          getControllerId: jest.fn(),
        }}
      >
        <NavItem eventKey="key">test</NavItem>
      </NavContext.Provider>,
    );

    expect(getByText('test').getAttribute('data-rr-ui-active')).toEqual(
      'true',
    );
  });

  it('should set disabled attributes when nav item is disabled and role is tab', () => {
    const { getByText } = render(
      <NavItem role="tab" disabled>
        test
      </NavItem>,
    );
    const node = getByText('test');
    expect(node.getAttribute('aria-disabled')).toEqual('true');
    expect(node.tabIndex).toEqual(-1);
  });

  it('should trigger onClick', () => {
    const onClickSpy = jest.fn();
    const { getByText } = render(<NavItem onClick={onClickSpy}>test</NavItem>);
    fireEvent.click(getByText('test'));
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should not trigger onClick if disabled', () => {
    const onClickSpy = jest.fn();
    const { getByText } = render(
      // Render as div because onClick won't get triggered with Button when disabled.
      <NavItem as="div" onClick={onClickSpy} disabled>
        test
      </NavItem>,
    );
    fireEvent.click(getByText('test'));
    expect(onClickSpy).not.toHaveBeenCalled();
  });

  it('should call onSelect if a key is defined', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <SelectableContext.Provider value={onSelect}>
        <NavItem eventKey="abc">test</NavItem>
      </SelectableContext.Provider>,
    );

    fireEvent.click(getByText('test'));
    expect(onSelect.mock.calls[0][0]).toEqual('abc');
  });

  it('should not call onSelect onClick stopPropagation called', () => {
    const onSelect = jest.fn();
    const handleClick = (e: Reblend.MouseEvent) => {
      e.stopPropagation();
    };
    const { getByText } = render(
      <SelectableContext.Provider value={onSelect}>
        <NavItem eventKey="abc" onClick={handleClick}>
          test
        </NavItem>
      </SelectableContext.Provider>,
    );

    fireEvent.click(getByText('test'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
