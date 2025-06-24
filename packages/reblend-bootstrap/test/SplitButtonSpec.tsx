import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from 'reblend-testing-library';
import SplitButton from '../src/SplitButton';
import DropdownItem from '../src/DropdownItem';

describe('<SplitButton>', () => {
  const simple = (
    <SplitButton data-testid="test-wrapper" title="Title" id="test-id">
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
      <DropdownItem>Item 4</DropdownItem>
    </SplitButton>
  );

  it('should open the menu when dropdown button is clicked', async () => {
    await render(simple);
    const splitButtonElem = screen.getByTestId('test-wrapper');

    expect(splitButtonElem.classList).not.toContain('show');
    fireEvent.click(splitButtonElem.children[1]);

    expect(splitButtonElem.classList).toContain('show');
  });

  it('should not open the menu when other button is clicked', async () => {
    await render(simple);
    const splitButtonElem = screen.getByTestId('test-wrapper');

    expect(splitButtonElem.classList).not.toContain('show');
    fireEvent.click(splitButtonElem.children[0]);
    expect(splitButtonElem.classList).not.toContain('show');
  });

  it('should invoke onClick when SplitButton.Button is clicked (prop)', async () => {
    const onClickSpy = jest.fn();

    await render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        onClick={onClickSpy}
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = screen.getByTestId('test-wrapper');

    fireEvent.click(splitButtonElem.firstElementChild!);

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should not invoke onClick when SplitButton.Toggle is clicked (prop)', async () => {
    const onClickSpy = jest.fn();

    await render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        onClick={onClickSpy}
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = screen.getByTestId('test-wrapper');
    fireEvent.click(splitButtonElem.children[1]);

    expect(onClickSpy).not.toHaveBeenCalled();
  });

  it('Should pass disabled to both buttons', async () => {
    await render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        disabled
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = screen.getByTestId('test-wrapper');

    expect(splitButtonElem.getAttribute('disabled')).toBeDefined();
    expect(splitButtonElem.children[0].getAttribute('disabled')).toBeDefined();
    expect(splitButtonElem.children[1].getAttribute('disabled')).toBeDefined();
  });

  it('Should set target attribute on anchor', async () => {
    await render(
      <SplitButton
        title="Title"
        id="test-id"
        data-testid="test-wrapper"
        href="/some/unique-thing/"
        target="_blank"
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = screen.getByTestId('test-wrapper');
    expect(splitButtonElem.firstElementChild!.tagName).toEqual('A');
    expect(splitButtonElem.firstElementChild!.getAttribute('href')).toEqual(
      '/some/unique-thing/',
    );
    expect(splitButtonElem.firstElementChild!.getAttribute('target')).toEqual(
      '_blank',
    );
  });

  it('should set accessible label on toggle', async () => {
    await render(simple);
    const toggleLabelElem = screen.getByText('Toggle dropdown');
    expect(toggleLabelElem.classList).toContain('visually-hidden');
  });

  it('should set aria-label on toggle from toggleLabel', async () => {
    await render(
      <SplitButton title="Title" id="test-id" toggleLabel="Label">
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const labelElem = screen.getByText('Label');
    expect(labelElem.classList).toContain('visually-hidden');
  });

  it('should set type attribute from type', async () => {
    await render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        type="submit"
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = screen.getByTestId('test-wrapper');
    expect(splitButtonElem.firstElementChild!.getAttribute('type')).toEqual(
      'submit',
    );
  });
});
