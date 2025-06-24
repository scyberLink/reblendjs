import { describe, expect, it } from '@jest/globals';
import { render } from 'reblend-testing-library';
import Stack from '../src/Stack';

describe('<Stack>', () => {
  it('should render a vertical stack by default', async () => {
    const { container } = render(<Stack />);
    expect(container.firstElementChild!.className).toContain('vstack');
  });

  it('should render direction', async () => {
    const { container } = render(<Stack direction="horizontal" />);
    expect(container.firstElementChild!.className).toContain('hstack');
  });

  it('should render gap', async () => {
    const { container } = render(<Stack gap={2} />);
    expect(container.firstElementChild!.classList).toContain('gap-2');
  });

  it('should render responsive gap', async () => {
    const { container } = render(<Stack gap={{ md: 2 }} />);
    expect(container.firstElementChild!.classList).toContain('gap-md-2');
  });
});
