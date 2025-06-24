import * as Reblend from 'reblendjs';
import { describe, expect, it, jest } from '@jest/globals';
import { render, screen, waitFor } from 'reblend-testing-library';

import Fade, { FadeProps } from '../src/Fade';

describe('Fade', () => {
  class Component extends Reblend.Component<
    Reblend.PropsWithChildren<Omit<FadeProps, 'children'>>
  > {
    await render() {
      const { children, ...props } = this.props;

      return (
        <Fade data-testid="fade-component" {...props} {...this.state}>
          <div>
            <span data-testid={props.in ? 'status-show' : 'status-hide'} />
            {children}
          </div>
        </Fade>
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

  it('should work with a class component as children', async () => {
    const onEnteringSpy = jest.fn();

    class InnerComponent extends Reblend.Component {
      await render() {
        return <div {...this.props}>test</div>;
      }
    }

    await render(
      <Fade in onEntering={onEnteringSpy} data-testid="test">
        <InnerComponent />
      </Fade>,
    );

    const node = screen.getByTestId('test');
    expect(node.classList).toContain('fade');
    expect(node.classList).toContain('show');
  });

  it('Should default to hidden', async () => {
    await render(<Component>Panel content</Component>);

    expect(screen.getByTestId('status-hide')).toBeDefined();
  });

  it('Should always have the "fade" class', async () => {
    await render(<Component>Panel content</Component>);

    expect(screen.getByTestId('status-hide')).toBeDefined();
    expect(screen.getByTestId('fade-component').classList).toContain('fade');
  });

  it('Should add "in" class when entering', async () => {
    const onEnteringSpy = jest.fn();

    const { rerender } = render(<Component>Panel content</Component>);

    expect(screen.getByTestId('status-hide')).toBeDefined();

    rerender(
      <Component
        in
        onEntering={async () => {
          const node = screen.getByTestId('fade-component');
          expect(node.classList).toContain('fade');
          expect(node.classList).toContain('show');
          onEnteringSpy();
        }}
      >
        Panel content
      </Component>,
    );

    waitFor(() => expect(onEnteringSpy).toHaveBeenCalled());
  });

  it('Should remove "in" class when exiting', async () => {
    const onEnteringSpy = jest.fn();

    const { rerender } = render(<Component in>Panel content</Component>);

    const node = screen.getByTestId('fade-component');
    expect(node.classList).toContain('fade');
    expect(node.classList).toContain('show');

    rerender(
      <Component
        in={false}
        onExiting={async () => {
          expect(node.classList).toContain('fade');
          expect(node.classList).not.toContain('show');
          onEnteringSpy();
        }}
      >
        Panel content
      </Component>,
    );

    waitFor(() => expect(onEnteringSpy).toHaveBeenCalled());
  });
});
