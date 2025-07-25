import { describe, expect, it } from '@jest/globals';
import { render } from 'reblend-testing-library';
import Placeholder from '../src/Placeholder';

describe('<Placeholder>', () => {
  it('should render a placeholder', async () => {
    const { container } = render(<Placeholder />);
    expect(container.firstElementChild!.className).toContain('placeholder');
  });

  it('should render size', async () => {
    const { container } = render(<Placeholder size="lg" />);
    expect(container.firstElementChild!.className).toContain('placeholder-lg');
  });

  it('should render animation', async () => {
    const { container } = render(<Placeholder animation="glow" />);
    expect(container.firstElementChild!.className).toContain(
      'placeholder-glow',
    );
  });

  it('should render bg', async () => {
    const { container } = render(<Placeholder bg="primary" />);
    expect(container.firstElementChild!.className).toContain('bg-primary');
  });
});
