import { describe, expect, it } from '@jest/globals';
import { render } from 'reblend-testing-library';
import ModalBody from '../src/ModalBody';

describe('ModalBody', () => {
  it('uses "div" by default', async () => {
    const { getByTestId } = render(
      <ModalBody data-testid="test-modal" className="custom-class">
        <strong>Content</strong>
      </ModalBody>,
    );

    const elem = getByTestId('test-modal');
    expect(elem.tagName).toEqual('DIV');
    expect(elem.classList).toContain('modal-body');
    expect(elem.classList).toContain('custom-class');
    expect(elem.querySelector('strong')!.textContent).toEqual('Content');
  });

  it('should allow custom elements instead of "div"', async () => {
    const { getByTestId } = render(
      <ModalBody data-testid="test-modal" as="section">
        <strong>Content</strong>
      </ModalBody>,
    );
    expect(getByTestId('test-modal').classList).toContain('modal-body');
    expect(getByTestId('test-modal').tagName).toEqual('SECTION');
  });
});
