import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Feedback from '../src/Feedback';

describe('<Feedback>', () => {
  it('Should have div as default component', async () => {
    await render(<Feedback data-testid="test" />);

    expect(screen.getByTestId('test').tagName).toEqual('DIV');
  });

  it('Should render valid feedback', async () => {
    await render(<Feedback type="valid" data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('valid-feedback');
  });

  it('Should render invalid feedback', async () => {
    await render(<Feedback type="invalid" data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('invalid-feedback');
  });

  it('Should render valid feedback tooltip', async () => {
    await render(<Feedback type="valid" tooltip data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('valid-tooltip');
  });

  it('Should render invalid feedback tooltip', async () => {
    await render(<Feedback type="invalid" tooltip data-testid="test" />);

    expect(screen.getByTestId('test').classList).toContain('invalid-tooltip');
  });
});
