import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from 'reblend-testing-library';
import ModalHeader from '../src/ModalHeader';

describe('ModalHeader', () => {
  it('uses "div" by default', async () => {
    await render(
      <ModalHeader data-testid="test-modal" className="custom-class">
        <strong>Content</strong>
      </ModalHeader>,
    );

    expect(screen.getByTestId('test-modal').tagName).toEqual('DIV');
    expect(screen.getByTestId('test-modal').classList).toContain(
      'modal-header',
    );
    expect(screen.getByTestId('test-modal').classList).toContain(
      'custom-class',
    );
    expect(
      screen.getByTestId('test-modal').querySelector('strong')!.textContent,
    ).toEqual('Content');
  });

  it('has closeButton without a containing Modal and renders', async () => {
    await render(<ModalHeader data-testid="test-modal" closeButton />);

    expect(screen.getByTestId('test-modal').tagName).toEqual('DIV');
    expect(
      screen.getByTestId('test-modal').querySelector('button'),
    ).toBeDefined();
  });

  it('Should trigger onHide when modal is closed', async () => {
    const onHideSpy = jest.fn();
    await render(
      <ModalHeader data-testid="test-modal" closeButton onHide={onHideSpy} />,
    );

    fireEvent.click(screen.getByTestId('test-modal').querySelector('button')!);
    expect(onHideSpy).toHaveBeenCalledTimes(1);
  });

  it('should render close button variant', async () => {
    await render(
      <ModalHeader data-testid="test-modal" closeButton closeVariant="white" />,
    );

    const button = screen.getByTestId('test-modal').querySelector('button')!;

    expect(button).toBeDefined();
    expect(button.classList).toContain('btn-close-white');
  });
});
