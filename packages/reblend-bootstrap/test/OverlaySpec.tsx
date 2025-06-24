import * as Reblend from 'reblendjs';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Overlay from '../src/Overlay';
import Popover from '../src/Popover';

describe('<Overlay>', () => {
  it('should forward ref to the overlay', async () => {
    const ref = Reblend.createRef<any>();
    await render(
      <Overlay ref={ref} show target={ref.current}>
        <Popover id="my-overlay">test</Popover>
      </Overlay>,
    );

    expect(ref.current.id).toEqual('my-overlay');
  });

  it('should use Fade internally if transition=true', async () => {
    const ref = Reblend.createRef<any>();
    await render(
      <Overlay show transition ref={ref} target={ref.current}>
        <Popover id="my-overlay" data-testid="test">
          test
        </Popover>
      </Overlay>,
    );
    const popoverElem = screen.getByTestId('test');
    expect(popoverElem.classList).toContain('fade');
  });

  it('should not use Fade if transition=false', async () => {
    const ref = Reblend.createRef<any>();
    await render(
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
