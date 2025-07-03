import { render, fireEvent, screen, waitFor } from 'reblend-testing-library';
import Dropdown from '../cjs/Dropdown';
import DropdownItem from '../cjs/DropdownItem';
import Reblend from 'reblendjs';

describe('<Dropdown>', () => {
  const Menu = ({
    usePopper,
    rootCloseEvent,
    renderSpy,
    popperConfig,
    renderMenuOnMount = true,
    ...props
  }: any) => (
    <Dropdown.Menu
      flip
      usePopper={usePopper}
      popperConfig={popperConfig}
      rootCloseEvent={rootCloseEvent}
    >
      {(menuProps, meta) => {
        const { show, hasShown } = meta;
        renderSpy && renderSpy(meta);
        if (!renderMenuOnMount && !hasShown) {
          return null;
        }

        return (
          <div
            {...props}
            {...menuProps}
            data-show={show}
            className="menu"
            data-testid="menu"
            style={{ display: show ? 'flex' : 'none' }}
          />
        );
      }}
    </Dropdown.Menu>
  );

  const Toggle = (props: any) => (
    <Dropdown.Toggle>
      {(toggleProps) => (
        <button
          {...props}
          {...toggleProps}
          id="test-id"
          data-testid="toggle"
          type="button"
          className="toggle"
        />
      )}
    </Dropdown.Toggle>
  );

  const SimpleDropdown = ({
    children,
    menuSpy,
    usePopper,
    renderMenuOnMount,
    ...outer
  }: any) => (
    <Dropdown {...outer}>
      {children || (
        <>
          <Toggle key="toggle">Toggle</Toggle>,
          <Menu
            key="menu"
            renderSpy={menuSpy}
            usePopper={usePopper}
            renderMenuOnMount={renderMenuOnMount}
          >
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
            <Dropdown.Item>Item 4</Dropdown.Item>
          </Menu>
        </>
      )}
    </Dropdown>
  );

  let focusableContainer: HTMLElement;

  beforeEach(async () => {
    focusableContainer = document.createElement('div');
    document.body.appendChild(focusableContainer);
  });

  afterEach(async () => {
    document.body.removeChild(focusableContainer);
  });

  it('renders toggle with Dropdown.Toggle', async () => {
    await render(<SimpleDropdown />);

    const buttonNode = screen.getByTestId('toggle');

    expect(buttonNode.textContent).toMatch(/Toggle/);

    expect(buttonNode.hasAttribute('aria-haspopup')).toEqual(false);
    expect(buttonNode.getAttribute('aria-expanded')).toEqual('false');
    expect(buttonNode.getAttribute('id')).toBeTruthy();
  });

  it('forwards placement to menu', async () => {
    const renderSpy = jest.fn((meta) => {
      expect(meta.placement).toEqual('bottom-end');
    });

    await render(
      <SimpleDropdown
        show
        placement="bottom-end"
        usePopper={false}
        menuSpy={renderSpy}
      />,
    );

    expect(renderSpy).toHaveBeenCalled();
  });

  // NOTE: The onClick event handler is invoked for both the Enter and Space
  // keys as well since the component is a button. I cannot figure out how to
  // get ReactTestUtils to simulate such though.
  it('toggles open/closed when clicked', async () => {
    const { container } = await render(<SimpleDropdown />);

    expect(container.querySelector('.show')).toBeNull();

    fireEvent.click(container.querySelector('button[aria-expanded="false"]')!);

    expect(container.querySelector('div[data-show="true"]')).toBeTruthy();

    fireEvent.click(container.querySelector('button[aria-expanded="true"]')!);

    expect(container.querySelector('.show')).toBeNull();
    expect(
      container.querySelector('button[aria-expanded="false"]'),
    ).toBeTruthy();
  });

  it('closes when clicked outside', async () => {
    const closeSpy = jest.fn();
    const { container } = await render(<SimpleDropdown onToggle={closeSpy} />);

    fireEvent.click(container.querySelector('.toggle')!);

    fireEvent.click(document.body);

    expect(closeSpy).toHaveBeenCalledTimes(2);

    expect(closeSpy.mock.calls.at(-1)![0]).toEqual(false);
  });

  it('closes when mousedown outside if rootCloseEvent set', async () => {
    const closeSpy = jest.fn();

    const { container } = await render(
      <Dropdown onToggle={closeSpy}>
        <div>
          <Toggle>Toggle</Toggle>,
          <Menu rootCloseEvent="mousedown">
            <button type="button">Item 1</button>
            <button type="button">Item 2</button>
          </Menu>
        </div>
      </Dropdown>,
    );

    fireEvent.click(container.querySelector('.toggle')!);

    fireEvent.mouseDown(document.body);

    expect(closeSpy).toHaveBeenCalledTimes(2);
    expect(closeSpy.mock.calls.at(-1)![0]).toEqual(false);
  });

  it('when focused and closed toggles open when the key "down" is pressed', async () => {
    const closeSpy = jest.fn();
    const { container } = await render(<SimpleDropdown onToggle={closeSpy} />, {
      container: focusableContainer,
    });

    fireEvent.keyDown(container.querySelector('.toggle')!, {
      key: 'ArrowDown',
    });

    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy.mock.calls.at(-1)![0]).toEqual(true);
  });

  it('closes when item is clicked', async () => {
    const onToggle = jest.fn();

    const root = await render(<SimpleDropdown show onToggle={onToggle} />);

    fireEvent.click(root.getByText('Item 4'));

    expect(onToggle.mock.calls[0][0]).toEqual(false);
  });

  it('does not close when onToggle is controlled', async () => {
    const onToggle = jest.fn();

    const root = await render(<SimpleDropdown show onToggle={onToggle} />);

    fireEvent.click(root.getByText('Toggle'));

    fireEvent.click(root.getByText('Item 1'));

    expect(onToggle.mock.calls[0][0]).toEqual(false);

    expect(root.container.querySelector('div[data-show="true"]')).toBeTruthy();
  });

  it('has aria-labelledby same id as toggle button', async () => {
    const root = await render(<SimpleDropdown defaultShow />);

    expect(root.getByText('Toggle').getAttribute('id')).toEqual(
      root.container.querySelector('.menu')!.getAttribute('aria-labelledby'),
    );
  });

  it('has aria-haspopup when menu has role=menu and not otherwise', async () => {
    let root = await render(
      <Dropdown>
        <div>
          <Toggle>Toggle</Toggle>,
          <Menu role="menu">
            <DropdownItem>Item 1</DropdownItem>
            <DropdownItem>Item 2</DropdownItem>
          </Menu>
        </div>
      </Dropdown>,
    );

    expect(root.getByText('Toggle').hasAttribute('aria-haspopup')).toEqual(
      true,
    );
    // doesn't really work across rerenders b/c the menu ref doesn't change
    root.unmount();

    root = await render(
      <Dropdown>
        <div>
          <Toggle>Toggle</Toggle>,
          <Menu>
            <DropdownItem>Item 1</DropdownItem>
            <DropdownItem>Item 2</DropdownItem>
          </Menu>
        </div>
      </Dropdown>,
    );

    expect(root.getByText('Toggle').hasAttribute('aria-haspopup')).toEqual(
      false,
    );
  });

  describe('focusable state', () => {
    it('when focus should not be moved to first item when focusFirstItemOnShow is `false`', async () => {
      await render(
        <Dropdown focusFirstItemOnShow={false}>
          <div>
            <Toggle>Toggle</Toggle>,
            <Menu>
              <button type="button">Item 1</button>
            </Menu>
          </div>
        </Dropdown>,
        { container: focusableContainer },
      );

      const toggle = screen.getByTestId('toggle');

      toggle.focus();

      await fireEvent.click(toggle);

      expect(document.activeElement).toEqual(toggle);
    });

    it('when focused and closed sets focus on first menu item when the key "down" is pressed for role="menu"', async () => {
      await render(
        <Dropdown>
          <div>
            <Toggle>Toggle</Toggle>,
            <Menu role="menu">
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
            </Menu>
          </div>
        </Dropdown>,
        { container: focusableContainer },
      );

      const toggle = screen.getByTestId('toggle');

      toggle.focus();

      fireEvent.keyDown(toggle, {
        key: 'ArrowDown',
      });

      await waitFor(() =>
        expect(document.activeElement).toEqual(
          screen.getByRole('button', { name: 'Item 1' }),
        ),
      );
    });

    it('when focused and closed sets focus on first menu item when the focusFirstItemOnShow is true', async () => {
      await render(
        <Dropdown focusFirstItemOnShow>
          <div>
            <Toggle>Toggle</Toggle>,
            <Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
            </Menu>
          </div>
        </Dropdown>,
        { container: focusableContainer },
      );

      const toggle = screen.getByTestId('toggle');

      toggle.focus();

      fireEvent.keyDown(toggle, {
        key: 'ArrowDown',
      });

      expect(document.activeElement).toEqual(
        screen.getByRole('button', { name: 'Item 1' }),
      );
    });

    it('when open and the key "Escape" is pressed the menu is closed and focus is returned to the button', async () => {
      await render(<SimpleDropdown defaultShow />, {
        container: focusableContainer,
      });

      const firstItem = screen.getByRole('button', { name: 'Item 1' });

      firstItem.focus();

      expect(document.activeElement).toEqual(firstItem);

      fireEvent.keyDown(firstItem, {
        key: 'Escape',
      });

      expect(document.activeElement).toEqual(screen.getByTestId('toggle'));
    });

    it('when open and a search input is focused and the key "Escape" is pressed the menu stays open', async () => {
      const toggleSpy = jest.fn();
      const root = await render(
        <Dropdown defaultShow onToggle={toggleSpy}>
          <Toggle key="toggle">Toggle</Toggle>,
          <Menu key="menu">
            <input type="search" data-testid="input" />
          </Menu>
        </Dropdown>,
        {
          container: focusableContainer,
        },
      );

      const input = root.getByTestId('input');

      input.focus();
      expect(document.activeElement).toEqual(input);

      fireEvent.keyDown(input, { key: 'Escape' });

      expect(document.activeElement).toEqual(input);

      expect(toggleSpy).not.toHaveBeenCalled();
    });

    it('when open and the key "tab" is pressed the menu is closed and focus is progress to the next focusable element', async () => {
      await render(
        <div>
          <SimpleDropdown defaultShow />
          <input type="text" id="next-focusable" />
        </div>,
        { container: focusableContainer },
      );

      const toggle = screen.getByTestId('toggle');

      toggle.focus();

      fireEvent.keyDown(toggle, { key: 'Tab' });
      fireEvent.keyUp(toggle, { key: 'Tab' });

      expect(toggle.getAttribute('aria-expanded')).toEqual('false');

      // simulating a tab event doesn't actually shift focus.
      // at least that seems to be the case according to SO.
      // hence no assert on the input having focus.
    });
  });

  it('should not call onToggle if the menu ref not defined and "tab" is pressed', async () => {
    const onToggleSpy = jest.fn();
    const root = await render(
      <SimpleDropdown onToggle={onToggleSpy} renderMenuOnMount={false} />,
      {
        container: focusableContainer,
      },
    );

    const toggle = root.getByText('Toggle');
    toggle.focus();

    fireEvent.keyDown(toggle, { key: 'Tab' });
    fireEvent.keyUp(toggle, { key: 'Tab' });

    expect(onToggleSpy).not.toHaveBeenCalled();
  });

  it('should not call onToggle if the menu is hidden and "tab" is pressed', async () => {
    const onToggleSpy = jest.fn();
    const root = await render(<SimpleDropdown onToggle={onToggleSpy} />, {
      container: focusableContainer,
    });

    const toggle = root.getByText('Toggle');
    toggle.focus();

    fireEvent.keyDown(toggle, { key: 'Tab' });
    fireEvent.keyUp(toggle, { key: 'Tab' });

    expect(onToggleSpy).not.toHaveBeenCalled();
  });

  describe('popper config', () => {
    it('can add modifiers', async () => {
      const spy = jest.fn();
      const popper = {
        modifiers: [
          {
            name: 'test',
            enabled: true,
            phase: 'write',
            fn: spy,
          },
        ],
      };

      await render(
        <Dropdown show>
          <div>
            <Toggle>Toggle</Toggle>
            <Menu popperConfig={popper}>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
            </Menu>
          </div>
        </Dropdown>,
      );

      await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    });
  });
});
