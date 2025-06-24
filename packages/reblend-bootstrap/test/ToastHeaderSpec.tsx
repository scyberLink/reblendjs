import { describe, expect, it } from '@jest/globals';
import { render } from 'reblend-testing-library';
import Toast from '../src/Toast';

describe('Toast.Header', () => {
  it('will pass all props to the created div and renders its children', async () => {
    const { container } = render(
      <Toast.Header>
        <strong>content</strong>
      </Toast.Header>,
    );
    expect(container.firstElementChild!.tagName).toEqual('DIV');

    expect(container.firstElementChild!.firstElementChild!.tagName).toEqual(
      'STRONG',
    );

    expect(container.firstElementChild!.classList).toContain('toast-header');
  });

  it('should render close button variant', async () => {
    const { container } = render(
      <Toast.Header closeButton closeVariant="white">
        <strong>content</strong>
      </Toast.Header>,
    );
    expect(
      container.firstElementChild!.getElementsByTagName('button')[0].classList,
    ).toContain('btn-close-white');
  });
});
