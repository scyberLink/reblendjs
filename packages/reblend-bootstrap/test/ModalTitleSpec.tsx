import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import ModalTitle from '../src/ModalTitle';

describe('ModalTitle', () => {
  it('uses "div" by default', async () => {
    await render(
      <ModalTitle data-testid="test-modal" className="custom-class">
        <strong>Content</strong>
      </ModalTitle>,
    );

    const elem = screen.getByTestId('test-modal');
    expect(elem.tagName).toEqual('DIV');
    expect(elem.classList).toContain('h4');
    expect(elem.classList).toContain('modal-title');
    expect(elem.classList).toContain('custom-class');
    expect(elem.querySelector('strong')!.textContent!).toEqual('Content');
  });

  it('should allow custom elements instead of "div"', async () => {
    await render(
      <ModalTitle data-testid="test-modal" as="h4">
        <strong>Content</strong>
      </ModalTitle>,
    );

    expect(screen.getByTestId('test-modal').classList).toContain('modal-title');
    expect(screen.getByTestId('test-modal').tagName).toEqual('H4');
  });
});
