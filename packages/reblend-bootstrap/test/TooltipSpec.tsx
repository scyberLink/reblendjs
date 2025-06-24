import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Tooltip from '../src/Tooltip';

describe('Tooltip', () => {
  it('Should output a tooltip with content', async () => {
    await render(
      <Tooltip data-testid="test-tooltip" placement="right">
        <strong>Tooltip Content</strong>
      </Tooltip>,
    );

    const classList = screen.getByTestId('test-tooltip').classList;
    expect(classList).toContain('tooltip');
    expect(classList).toContain('bs-tooltip-end');

    expect(
      screen.getByTestId('test-tooltip').getAttribute('x-placement')!,
    ).toEqual('right');
  });
});
