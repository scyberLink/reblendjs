import * as Reblend from 'reblendjs';
import { render, fireEvent } from 'reblend-testing-library';

import { expect, describe, it } from '@jest/globals';
import DropdownItem from '../src/DropdownItem';
import SelectableContext from '../src/SelectableContext';

describe('<DropdownItem>', () => {
  it('should output a nav item as button', () => {
    const { getByText } = render(<DropdownItem>test</DropdownItem>);

    expect(getByText('test').tagName).toEqual('BUTTON');
  });

  it('should trigger onClick', () => {
    const onClickSpy = jest.fn();
    const { getByText } = render(
      <DropdownItem onClick={onClickSpy}>test</DropdownItem>,
    );
    fireEvent.click(getByText('test'));

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should not trigger onClick if disabled', () => {
    const onClickSpy = jest.fn();
    const { getByText } = render(
      <DropdownItem onClick={onClickSpy} disabled>
        test
      </DropdownItem>,
    );
    fireEvent.click(getByText('test'));
    expect(onClickSpy).not.toHaveBeenCalled();
  });

  it('should call onSelect if a key is defined', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <SelectableContext.Provider value={onSelect}>
        <DropdownItem eventKey="abc">test</DropdownItem>
      </SelectableContext.Provider>,
    );

    fireEvent.click(getByText('test'));
    expect(onSelect.mock.calls.at(-1)![0]).toEqual('abc');
  });

  it('should not call onSelect onClick stopPropagation called', () => {
    const onSelect = jest.fn();
    const handleClick = (e: Reblend.MouseEvent) => {
      e.stopPropagation();
    };
    const { getByText } = render(
      <SelectableContext.Provider value={onSelect}>
        <DropdownItem eventKey="abc" onClick={handleClick}>
          test
        </DropdownItem>
      </SelectableContext.Provider>,
    );

    fireEvent.click(getByText('test'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
