import { describe, expect, it } from '@jest/globals';
import { render } from 'reblend-testing-library';
import PlaceholderButton from '../src/PlaceholderButton';

describe('<PlaceholderButton>', () => {
  it('should render a placeholder', async () => {
    const { container } = render(<PlaceholderButton />);
    expect(container.firstElementChild!.className).toContain('placeholder');
  });

  it('should render size', async () => {
    const { container } = render(<PlaceholderButton size="lg" />);
    expect(container.firstElementChild!.className).toContain('placeholder-lg');
  });

  it('should render animation', async () => {
    const { container } = render(<PlaceholderButton animation="glow" />);
    expect(container.firstElementChild!.className).toContain(
      'placeholder-glow',
    );
  });
});
