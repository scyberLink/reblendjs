import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import { AccordionHeader } from '../src';

describe('<AccordionHeader>', () => {
  it('should apply aria-controls to the button', async () => {
    await render(<AccordionHeader aria-controls="test" />);

    expect(screen.getByRole('button').getAttribute('aria-controls')).toEqual(
      'test',
    );
  });
});
