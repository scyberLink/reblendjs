import * as Reblend from 'reblendjs';
import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import ToggleButton from '../src/ToggleButton';

describe('ToggleButton', () => {
  it('should forward refs to the label', async () => {
    const ref = Reblend.createRef<HTMLLabelElement>();
    await render(
      <ToggleButton id="id" ref={ref} value={1}>
        Option
      </ToggleButton>,
    );

    expect(ref.current!.tagName).toEqual('LABEL');
  });

  it('should add an inputRef', async () => {
    const ref = Reblend.createRef<HTMLInputElement>();
    await render(
      <ToggleButton id="id" inputRef={ref} value={1}>
        Option
      </ToggleButton>,
    );

    expect(ref.current!.tagName).toEqual('INPUT');
  });

  it('should not have a role on the label button', async () => {
    await render(
      <ToggleButton id="id" value={1}>
        Option
      </ToggleButton>,
    );

    expect(screen.getByText('Option').getAttribute('role')).not.toBeTruthy();
  });
});
