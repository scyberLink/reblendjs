import { describe, expect, it } from '@jest/globals';
import { render } from 'reblend-testing-library';
import Toast from '../src/Toast';

describe('Toast.Body', () => {
  it('will pass all props to the created div and renders its children', async () => {
    const content = <strong>Content</strong>;
    const { container } = render(
      <Toast.Body className="custom-class">{content}</Toast.Body>,
    );
    expect(container.firstElementChild!.classList).toContain('custom-class');
    expect(container.firstElementChild!.classList).toContain('toast-body');
  });
});
