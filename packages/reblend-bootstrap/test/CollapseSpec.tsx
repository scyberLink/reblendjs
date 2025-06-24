import * as Reblend from 'reblendjs';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render, screen, RenderResult, waitFor } from 'reblend-testing-library';
import Collapse, { CollapseProps } from '../src/Collapse';

describe('<Collapse>', () => {
  class Component extends Reblend.Component<
    Reblend.PropsWithChildren<Omit<CollapseProps, 'children'>>
  > {
    await render() {
      const { children, ...props } = this.props;

      return (
        <Collapse
          getDimensionValue={() => 15}
          data-testid="collapse-component"
          {...props}
          {...this.state}
        >
          <div>
            <span data-testid={props.in ? 'status-show' : 'status-hide'} />
            {children}
          </div>
        </Collapse>
      );
    }
  }

  it('should not throw an error with StrictMode', async () => {
    await render(
      <Reblend.StrictMode>
        <Component in>Panel content</Component>
      </Reblend.StrictMode>,
    );
  });

  it('Should default to collapsed', async () => {
    await render(<Component data-testid="test">Panel content</Component>);

    expect(screen.getByTestId('test').classList).not.toContain('show');
    expect(screen.getByTestId('status-hide')).toBeDefined();
  });

  it('Should have collapse class', async () => {
    await render(<Component>Panel content</Component>);

    expect(screen.getByTestId('collapse-component').classList).toContain(
      'collapse',
    );
  });

  describe('from collapsed to expanded', () => {
    let renderResult: RenderResult;

    beforeEach(async () => {
      renderResult = render(<Component>Panel content</Component>);
    });

    it('Should have collapsing class', async () => {
      renderResult.rerender(<Component in>Panel content</Component>);

      expect(screen.getByTestId('collapse-component').classList).toContain(
        'collapsing',
      );
    });

    it('Should set initial 0px height', async () => {
      const onEnterSpy = jest.fn();
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(
        <Component
          in
          onEnter={async () => {
            expect(node.style.height).toEqual('0px');
            onEnterSpy();
          }}
        >
          Panel content
        </Component>,
      );

      await waitFor(() => expect(onEnterSpy).toHaveBeenCalled());
    });

    it('Should set node to height', async () => {
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(<Component in>Panel content</Component>);

      expect(node.style.height).toEqual(`${node.scrollHeight}px`);
    });

    it('Should transition from collapsing to not collapsing', async () => {
      const node = screen.getByTestId('collapse-component');

      renderResult.rerender(<Component in>Panel content</Component>);

      expect(node.classList).toContain('collapsing');

      await waitFor(() => expect(node.classList).toContain('collapse'));
      expect(node.classList).toContain('show');
    });

    it('Should clear height after transition complete', async () => {
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(<Component in>Panel content</Component>);

      expect(node.style.height).toEqual(`${node.scrollHeight}px`);

      await waitFor(() => expect(node.style.height).toEqual(''));
    });
  });

  describe('from expanded to collapsed', () => {
    let renderResult: RenderResult;

    beforeEach(async () => {
      renderResult = render(<Component in>Panel content</Component>);
    });

    it('Should have collapsing class', async () => {
      renderResult.rerender(<Component in={false}>Panel content</Component>);

      const node = screen.getByTestId('collapse-component');
      expect(node.classList).toContain('collapsing');
    });

    it('Should set initial height', async () => {
      const onExitSpy = jest.fn();
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(
        <Component
          in={false}
          onExit={async () => {
            expect(node.style.height).toEqual('15px');
            onExitSpy();
          }}
        >
          Panel content
        </Component>,
      );

      await waitFor(() => expect(onExitSpy).toHaveBeenCalled());
    });

    it('Should set node to height', async () => {
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(<Component in={false}>Panel content</Component>);

      expect(node.style.height).toEqual('');
    });

    it('Should transition from collapsing to not collapsing', async () => {
      const node = screen.getByTestId('collapse-component');

      renderResult.rerender(<Component in={false}>Panel content</Component>);

      expect(node.classList).toContain('collapsing');

      await waitFor(() => expect(node.classList).toContain('collapse'));
    });

    it('Should have no height after transition complete', async () => {
      const node = screen.getByTestId('collapse-component');

      expect(node.style.height).toEqual('');

      renderResult.rerender(<Component in={false}>Panel content</Component>);

      await waitFor(() => expect(node.style.height).toEqual(''));
    });
  });

  describe('expanded', () => {
    it('Should have collapse and in class', async () => {
      await render(<Component in>Panel content</Component>);

      const node = screen.getByTestId('collapse-component');
      expect(node.classList).toContain('collapse');
      expect(node.classList).toContain('show');
    });
  });

  describe('dimension', () => {
    it('Should not have width in class', async () => {
      await render(<Component>Panel content</Component>);

      const node = screen.getByTestId('collapse-component');
      expect(node.className.includes('width')).toEqual(false);
    });

    it('Should have collapse-horizontal in class', async () => {
      await render(<Component dimension={() => 'width'}>Panel content</Component>);

      const node = screen.getByTestId('collapse-component');
      expect(node.classList).toContain('collapse-horizontal');
    });
  });

  describe('with a role', () => {
    it('sets aria-expanded true when expanded', async () => {
      const { getByRole } = render(
        <Component role="menuitem" in>
          Panel content
        </Component>,
      );

      expect(getByRole('menuitem', { expanded: true })).toBeDefined();
    });

    it('sets aria-expanded false when collapsed', async () => {
      const { getByRole } = render(
        <Component role="menuitem" in={false}>
          Panel content
        </Component>,
      );

      expect(getByRole('menuitem', { expanded: false })).toBeDefined();
    });
  });
});
