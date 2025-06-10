import * as Reblend from 'reblendjs';
import { describe, expect, it } from 'vitest';
import { render, screen } from 'reblend-testing-library';
import Overlay from '../src/Overlay';
import Popover from '../src/Popover';

describe('<Overlay>', () => {
  it('should forward ref to the overlay', () => {
    const ref = Reblend.createRef<any>();
    render(
      <Overlay ref={ref} show target={ref.current}>
        <Popover id="my-overlay">test</Popover>
      </Overlay>,
    );

    expect(ref.current.id).toEqual('my-overlay');
  });

  it('should use Fade internally if transition=true', () => {
    const ref = Reblend.createRef<any>();
    render(
      <Overlay show transition ref={ref} target={ref.current}>
        <Popover id="my-overlay" data-testid="test">
          test
        </Popover>
      </Overlay>,
    );
    const popoverElem = screen.getByTestId('test');
    expect(popoverElem.classList).toContain('fade');
  });

  it('should not use Fade if transition=false', () => {
    const ref = Reblend.createRef<any>();
    render(
      <Overlay show transition={false} ref={ref} target={ref.current}>
        <Popover id="my-overlay" data-testid="test">
          test
        </Popover>
      </Overlay>,
    );
    const popoverElem = screen.getByTestId('test');
    expect(popoverElem.classList).not.toContain('fade');
  });
});
