import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import ModalFooter from '../src/ModalFooter';

describe('ModalFooter', () => {
  it('uses "div" by default', async () => {
    await render(
      <ModalFooter data-testid="test-modal" className="custom-class">
        <strong>Content</strong>
      </ModalFooter>,
    );

    const elem = screen.getByTestId('test-modal');
    expect(elem.tagName).toEqual('DIV');
    expect(elem.classList).toContain('modal-footer');
    expect(elem.classList).toContain('custom-class');
    expect(elem.querySelector('strong')!.textContent).toEqual('Content');
  });

  it('should allow custom elements instead of "div"', async () => {
    await render(
      <ModalFooter data-testid="test-modal" as="section">
        <strong>Content</strong>
      </ModalFooter>,
    );
    expect(screen.getByTestId('test-modal').classList).toContain(
      'modal-footer',
    );
    expect(screen.getByTestId('test-modal').tagName).toEqual('SECTION');
  });
});
