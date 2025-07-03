import Reblend from 'reblendjs';
import { render, fireEvent } from 'reblend-testing-library';

import { expect, describe, it } from '@jest/globals';
import DropdownItem from '../cjs/DropdownItem';
import SelectableContext from '../cjs/SelectableContext';

describe('<DropdownItem>', () => {
  it('should output a nav item as button', async () => {
    const { getByText } = await render(<DropdownItem>test</DropdownItem>);

    expect(getByText('test').tagName).toEqual('BUTTON');
  });

  it('should trigger onClick', async () => {
    const onClickSpy = jest.fn();
    const { getByText } = await render(
      <DropdownItem onClick={onClickSpy}>test</DropdownItem>,
    );
    fireEvent.click(getByText('test'));

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should not trigger onClick if disabled', async () => {
    const onClickSpy = jest.fn();
    const { getByText } = await render(
      <DropdownItem onClick={onClickSpy} disabled>
        test
      </DropdownItem>,
    );
    fireEvent.click(getByText('test'));
    expect(onClickSpy).not.toHaveBeenCalled();
  });

  it('should call onSelect if a key is defined', async () => {
    const onSelect = jest.fn();
    await SelectableContext.update(onSelect);
    const { getByText } = await render(
      <DropdownItem eventKey="abc">test</DropdownItem>,
    );

    fireEvent.click(getByText('test'));
    expect(onSelect.mock.calls.at(-1)![0]).toEqual('abc');
  });

  it('should not call onSelect onClick stopPropagation called', async () => {
    const onSelect = jest.fn();
    await SelectableContext.update(onSelect);
    const handleClick = (e: Reblend.MouseEvent) => {
      e.stopPropagation();
    };
    const { getByText } = await render(
      <DropdownItem eventKey="abc" onClick={handleClick}>
        test
      </DropdownItem>,
    );

    fireEvent.click(getByText('test'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
