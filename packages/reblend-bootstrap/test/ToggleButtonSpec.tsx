import * as Reblend from 'reblendjs';
import { describe, expect, it } from 'vitest';
import { render, screen } from 'reblend-testing-library';
import ToggleButton from '../src/ToggleButton';

describe('ToggleButton', () => {
  it('should forward refs to the label', () => {
    const ref = Reblend.createRef<HTMLLabelElement>();
    render(
      <ToggleButton id="id" ref={ref} value={1}>
        Option
      </ToggleButton>,
    );

    expect(ref.current!.tagName).toEqual('LABEL');
  });

  it('should add an inputRef', () => {
    const ref = Reblend.createRef<HTMLInputElement>();
    render(
      <ToggleButton id="id" inputRef={ref} value={1}>
        Option
      </ToggleButton>,
    );

    expect(ref.current!.tagName).toEqual('INPUT');
  });

  it('should not have a role on the label button', () => {
    render(
      <ToggleButton id="id" value={1}>
        Option
      </ToggleButton>,
    );

    expect(screen.getByText('Option').getAttribute('role')).not.toBeTruthy();
  });
});
