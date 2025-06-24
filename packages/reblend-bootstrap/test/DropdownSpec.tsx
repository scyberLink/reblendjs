import * as Reblend from 'reblendjs';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from 'reblend-testing-library';
import Dropdown from '../src/Dropdown';
import { DropDirection } from '../src/DropdownContext';
import InputGroup from '../src/InputGroup';

describe('<Dropdown>', () => {
  const dropdownChildren = [
    <Dropdown.Toggle id="test-id" key="toggle">
      Child Title
    </Dropdown.Toggle>,
    <Dropdown.Menu data-testid="menu" key="menu">
      <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
      <Dropdown.Item>Item 2</Dropdown.Item>
      <Dropdown.Item>Item 3</Dropdown.Item>
      <Dropdown.Item>Item 4</Dropdown.Item>
    </Dropdown.Menu>,
  ];

  const simpleDropdown = <Dropdown>{dropdownChildren}</Dropdown>;

  it('renders div with dropdown class', async () => {
    const { container } = render(simpleDropdown);
    expect(container.firstElementChild!.classList).toContain('dropdown');
  });

  ['up', 'end', 'start'].forEach((dir) => {
    it(`renders div with drop${dir} class`, async () => {
      const { container } = render(
        <Dropdown title="Dropup" drop={dir as DropDirection}>
          {dropdownChildren}
        </Dropdown>,
      );

      expect(container.firstElementChild!.classList).not.toContain('dropdown');
      expect(container.firstElementChild!.classList).toContain(`drop${dir}`);
    });
  });

  it('renders div with drop=down-centered', async () => {
    const { container } = render(
      <Dropdown title="Drop" drop="down-centered">
        {dropdownChildren}
      </Dropdown>,
    );

    expect(container.firstElementChild!.classList).not.toContain('dropdown');
    expect(container.firstElementChild!.classList).toContain('dropdown-center');
  });

  it('renders div with drop=up-centered', async () => {
    const { container } = render(
      <Dropdown title="Drop" drop="up-centered">
        {dropdownChildren}
      </Dropdown>,
    );

    expect(container.firstElementChild!.classList).not.toContain('dropdown');
    expect(container.firstElementChild!.classList).toContain('dropup-center');
    expect(container.firstElementChild!.classList).toContain('dropup');
  });

  it('renders toggle with Dropdown.Toggle', async () => {
    await render(simpleDropdown);

    const toggle = screen.getByText('Child Title');
    expect(toggle.getAttribute('aria-expanded')).toEqual('false');
  });

  it('forwards align="end" to menu', async () => {
    const Menu = (
      ({ show: _, close: _1, align, ...props }) => (
        <div {...props} data-align={align} ref={ref} />
      ),
    );

    const { container } = render(
      <Dropdown align="end" show>
        <Dropdown.Toggle id="test-id" key="toggle">
          Child Title
        </Dropdown.Toggle>

        <Dropdown.Menu key="menu" as={Menu}>
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    expect(container.querySelector('[data-align="end"]')).toBeDefined();
  });

  it('toggles open/closed when clicked', async () => {
    const { container } = render(simpleDropdown);
    const dropdown = container.firstElementChild!;
    const toggle = screen.getByText('Child Title');

    expect(dropdown.classList).not.toContain('show');
    fireEvent.click(toggle);
    expect(dropdown.classList).toContain('show');

    expect(screen.getByTestId('menu').classList).toContain('dropdown-menu');
    expect(screen.getByTestId('menu').classList).toContain('show');

    fireEvent.click(toggle);
    expect(dropdown.classList).not.toContain('show');
    expect(toggle.getAttribute('aria-expanded')).toEqual('false');
  });

  it('closes when child Dropdown.Item is selected', async () => {
    const onToggleSpy = jest.fn();

    const { container } = render(
      <Dropdown show onToggle={onToggleSpy}>
        <Dropdown.Toggle id="test-id" key="toggle">
          Child Title
        </Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" key="menu">
          <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
          <Dropdown.Item>Item 4</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    expect(container.firstElementChild!.classList).toContain('show');

    fireEvent.click(screen.getByTestId('item1'));
    expect(onToggleSpy).toHaveBeenCalledWith(false, expect.anything());
  });

  it('has aria-labelledby same id as toggle button', async () => {
    await render(
      <Dropdown show>
        <Dropdown.Toggle data-testid="toggle">Toggle</Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" key="menu">
          <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    expect(screen.getByTestId('toggle').id).toEqual(
      screen.getByTestId('menu').getAttribute('aria-labelledby'),
    );
  });

  describe('DOM event and source passed to onToggle', () => {
    it('passes open, event, and source correctly when opened with click', async () => {
      const onToggleSpy = jest.fn();
      await render(<Dropdown onToggle={onToggleSpy}>{dropdownChildren}</Dropdown>);

      expect(onToggleSpy).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText('Child Title'));

      expect(onToggleSpy).toHaveBeenCalledTimes(1);
      expect(onToggleSpy).toHaveBeenCalledWith(
        true,
        expect.objectContaining({ source: 'click' }),
      );
    });

    it('passes open, event, and source correctly when closed with click', async () => {
      const onToggleSpy = jest.fn();
      await render(
        <Dropdown show onToggle={onToggleSpy}>
          {dropdownChildren}
        </Dropdown>,
      );

      const toggle = screen.getByText('Child Title');

      expect(onToggleSpy).not.toHaveBeenCalled();

      fireEvent.click(toggle);

      expect(onToggleSpy).toHaveBeenCalledWith(
        false,
        expect.objectContaining({ source: 'click' }),
      );
    });

    it('passes open, event, and source correctly when child selected', async () => {
      const onToggleSpy = jest.fn();
      await render(
        <Dropdown onToggle={onToggleSpy}>
          <Dropdown.Toggle data-testid="toggle">Toggle</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={1} data-testid="item1">
              Item 1
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      fireEvent.click(screen.getByTestId('toggle'));

      expect(onToggleSpy).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByTestId('item1'));

      expect(onToggleSpy).toHaveBeenCalledTimes(2);
      expect(onToggleSpy).toHaveBeenCalledWith(
        false,
        expect.objectContaining({ source: 'select' }),
      );
    });

    it('passes open, event, and source correctly when opened with keydown', async () => {
      const onToggleSpy = jest.fn();
      await render(
        <Dropdown onToggle={onToggleSpy}>
          <Dropdown.Toggle data-testid="toggle">Toggle</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={1} data-testid="item1">
              Item 1
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>,
      );

      fireEvent.keyDown(screen.getByTestId('toggle'), { key: 'ArrowDown' });

      expect(onToggleSpy).toHaveBeenCalledTimes(1);
      expect(onToggleSpy).toHaveBeenCalledWith(
        true,
        expect.objectContaining({ source: 'keydown' }),
      );
    });

    it('Should render .show on the dropdown toggle when outside an InputGroup', async () => {
      await render(<Dropdown show>{dropdownChildren}</Dropdown>);
      expect(screen.getByText('Child Title').classList).toContain('show');
    });
  });

  it('should use each components bsPrefix', async () => {
    await render(
      <Dropdown defaultShow bsPrefix="my-dropdown" data-testid="dropdown">
        <Dropdown.Toggle data-testid="toggle" bsPrefix="my-toggle">
          Child Title
        </Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" bsPrefix="my-menu">
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    expect(screen.getByTestId('dropdown').classList).toContain('show');
    expect(screen.getByTestId('dropdown').classList).toContain('my-dropdown');
    expect(screen.getByTestId('toggle').classList).toContain('my-toggle');
    expect(screen.getByTestId('menu').classList).toContain('my-menu');
  });

  it('Should have div as default component', async () => {
    await render(
      <Dropdown defaultShow bsPrefix="my-dropdown" data-testid="dropdown">
        <Dropdown.Toggle data-testid="toggle" bsPrefix="my-toggle">
          Child Title
        </Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" bsPrefix="my-menu">
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    expect(screen.getByTestId('dropdown').tagName).toEqual('DIV');
  });

  it('Should also accept a custom component', async () => {
    const customComponent = (
      (
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          show,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          close,
          ...props
        },
        ref,
      ) => <div ref={ref} id="custom-component" {...props} />,
    );
    await render(
      <Dropdown.Menu data-testid="menu" show as={customComponent}>
        <Dropdown.Item>Example Item</Dropdown.Item>
      </Dropdown.Menu>,
    );

    expect(screen.getByTestId('menu').id).toEqual('custom-component');
  });

  describe('InputGroup Dropdowns', () => {
    it('should not render a .dropdown element when inside input group', async () => {
      await render(
        <InputGroup>
          <Dropdown data-testid="dropdown">{dropdownChildren}</Dropdown>
        </InputGroup>,
      );

      expect(screen.queryByTestId('dropdown')).toBeNull();
    });

    it('should render .show on the dropdown toggle', async () => {
      await render(
        <InputGroup>
          <Dropdown show>{dropdownChildren}</Dropdown>
        </InputGroup>,
      );

      expect(screen.getByText('Child Title').classList).toContain('show');
    });
  });

  describe('autoClose behaviour', () => {
    describe('autoClose="true"', () => {
      it('should close on outer click', async () => {
        const onToggleSpy = jest.fn();

        await render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose>
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(document.body);

        expect(onToggleSpy).toHaveBeenCalledWith(false, expect.anything());
      });
    });

    describe('autoClose="inside"', () => {
      it('should close on child selection', async () => {
        const onToggleSpy = jest.fn();

        await render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="inside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(screen.getByTestId('item1'));

        expect(onToggleSpy).toHaveBeenCalledWith(false, expect.anything());
      });

      it('should not close on outer click', async () => {
        const onToggleSpy = jest.fn();

        await render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="inside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(document.body);

        expect(onToggleSpy).not.toHaveBeenCalled();
      });
    });

    describe('autoClose="outside"', () => {
      it('should not close on child selection', async () => {
        const onToggleSpy = jest.fn();

        await render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="outside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(screen.getByTestId('item1'));

        expect(onToggleSpy).not.toHaveBeenCalled();
      });

      it('should close on outer click', async () => {
        const onToggleSpy = jest.fn();

        await render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="outside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(document.body);

        expect(onToggleSpy).toHaveBeenCalledWith(false, expect.anything());
      });
    });

    describe('autoClose="false"', () => {
      it('should not close on child selection', async () => {
        const onToggleSpy = jest.fn();

        await render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose={false}>
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(screen.getByTestId('item1'));

        expect(onToggleSpy).not.toHaveBeenCalled();
      });

      it('should not close on outer click', async () => {
        const onToggleSpy = jest.fn();

        await render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose={false}>
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>,
        );

        fireEvent.click(document.body);

        expect(onToggleSpy).not.toHaveBeenCalled();
      });
    });
  });
});
