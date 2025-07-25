import * as Reblend from 'reblendjs';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from 'reblend-testing-library';
import type { ModalHandle } from '@restart/ui/Modal';
import ModalManager from '@restart/ui/ModalManager';
import Modal from '../src/Modal';

describe('<Modal>', () => {
  it('Should forward ref to BaseModal', async () => {
    const ref = Reblend.createRef<ModalHandle>();
    await render(
      <Modal show animation={false} ref={ref}>
        <strong>Message</strong>
      </Modal>,
    );
    expect(ref.current!.dialog).toBeDefined();
  });

  it('Should render the modal content', async () => {
    await render(
      <Modal show animation={false} data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    expect(
      screen.getByTestId('modal').querySelector('strong')!.textContent,
    ).toEqual('Message');
  });

  it('Should sets `display: block` to `div.modal` when animation is false', async () => {
    const ref = Reblend.createRef<ModalHandle>();
    await render(
      <Modal show animation={false} ref={ref}>
        <strong>Message</strong>
      </Modal>,
    );

    expect(ref.current!.dialog!.style.display).toEqual('block');
  });

  it('Should close the modal when the modal dialog is clicked', async () => {
    const onHideSpy = jest.fn();

    await render(
      <Modal show onHide={onHideSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    // the modal-dialog element is pointer-events: none;
    fireEvent.click(screen.getByRole('dialog'));

    await waitFor(() => expect(onHideSpy).toHaveBeenCalled());
  });

  it('Should not close the modal when the "static" dialog is clicked', async () => {
    const onHideSpy = jest.fn();
    await render(
      <Modal show onHide={onHideSpy} backdrop="static" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('modal'));
    expect(onHideSpy).not.toHaveBeenCalled();
  });

  it('Should show "static" dialog animation when backdrop is clicked', async () => {
    await render(
      <Modal show backdrop="static">
        <strong>Message</strong>
      </Modal>,
    );

    const modalDialog = screen.getByRole('dialog');
    fireEvent.click(modalDialog);
    expect(screen.getByRole('dialog').classList).toContain('modal-static');
  });

  it('Should show "static" dialog animation when esc pressed and keyboard is false', async () => {
    await render(
      <Modal show backdrop="static" keyboard={false}>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(screen.getByRole('dialog'), {
      keyCode: 27,
    });
    expect(screen.getByRole('dialog').classList).toContain('modal-static');
  });

  it('Should not show "static" dialog animation when esc pressed and keyboard is true', async () => {
    await render(
      <Modal show backdrop="static" keyboard>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(screen.getByRole('dialog'), {
      keyCode: 27,
    });
    expect(screen.getByRole('dialog').classList).not.toContain('modal-static');
  });

  it('Should not show "static" dialog animation modal backdrop is not "static"', async () => {
    await render(
      <Modal show backdrop data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('modal'));
    expect(screen.getByRole('dialog').classList).not.toContain('modal-static');
  });

  it('Should close the modal when the modal close button is clicked', async () => {
    const onHideSpy = jest.fn();

    await render(
      <Modal show onHide={onHideSpy}>
        <Modal.Header closeButton data-testid="close-btn" />
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('close-btn').querySelector('button')!);

    await waitFor(() => expect(onHideSpy).toHaveBeenCalled());
  });

  it('Should pass className to the dialog', async () => {
    await render(
      <Modal show className="mymodal">
        <strong>Message</strong>
      </Modal>,
    );

    expect(screen.getByRole('dialog').classList).toContain('mymodal');
  });

  it('Should use backdropClassName to add classes to the backdrop', async () => {
    await render(
      <Modal show backdropClassName="my-modal-backdrop">
        <strong>Message</strong>
      </Modal>,
    );

    expect(document.querySelector('.modal-backdrop')!.classList).toContain(
      'my-modal-backdrop',
    );
  });

  it('Should pass size to the dialog', async () => {
    await render(
      <Modal show size="sm" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    expect(screen.getByTestId('modal').classList).toContain('modal-sm');
  });

  it('Should pass fullscreen as bool to the dialog', async () => {
    await render(
      <Modal show fullscreen data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    expect(screen.getByTestId('modal').classList).toContain('modal-fullscreen');
  });

  it('Should pass fullscreen as string to the dialog', async () => {
    await render(
      <Modal show fullscreen="sm-down" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    expect(screen.getByTestId('modal').classList).toContain(
      'modal-fullscreen-sm-down',
    );
  });

  it('Should allow custom breakpoints for fullscreen', async () => {
    await render(
      <Modal show fullscreen="custom-down" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    expect(screen.getByTestId('modal').classList).toContain(
      'modal-fullscreen-custom-down',
    );
  });

  it('Should pass centered to the dialog', async () => {
    await render(
      <Modal show centered data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    expect(screen.getByTestId('modal').classList).toContain(
      'modal-dialog-centered',
    );
  });

  it('Should pass scrollable to the dialog', async () => {
    await render(
      <Modal show scrollable data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    expect(screen.getByTestId('modal').classList).toContain(
      'modal-dialog-scrollable',
    );
  });

  it('Should pass dialog style to the dialog', async () => {
    await render(
      <Modal show style={{ color: 'red' }}>
        <strong>Message</strong>
      </Modal>,
    );

    expect(screen.getByRole('dialog').style.color).toEqual('red');
  });

  it('Should pass dialogClassName to the dialog', async () => {
    await render(
      <Modal show dialogClassName="my-dialog" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    expect(screen.getByTestId('modal').classList).toContain('my-dialog');
  });

  it('Should pass contentClassName to .modal-content', async () => {
    await render(
      <Modal show contentClassName="my-content" data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    const modalContent = screen
      .getByTestId('modal')
      .querySelector('.modal-content')!;
    expect(modalContent.classList).toContain('my-content');
  });

  it('Should use dialogAs', async () => {
    function CustomDialog() {
      return <div className="custom-dialog" tabIndex={-1} />;
    }

    await render(
      <Modal show dialogAs={CustomDialog}>
        <strong>Message</strong>
      </Modal>,
    );

    expect(document.querySelector('.custom-dialog')).toBeDefined();
  });

  it('Should pass transition callbacks to Transition', async () => {
    const increment = jest.fn();
    const Elem = async () => {
      const [show, setShow] = Reblend.useState(true);
      return (
        <Modal
          show={show}
          onEnter={increment}
          onEntering={increment}
          onEntered={async () => {
            increment();
            setShow(false);
          }}
          onExit={increment}
          onExiting={increment}
          onExited={increment}
        >
          <strong>Message</strong>
        </Modal>
      );
    };

    await render(<Elem />);

    await waitFor(() => expect(increment).toHaveBeenCalledTimes(6));
  });

  describe('cleanup', () => {
    let offSpy: ReturnType<typeof jest.spyOn>;

    beforeEach(async () => {
      offSpy = jest.spyOn(window, 'removeEventListener');
    });

    afterEach(async () => {
      offSpy.mockReset();
    });

    it('should remove resize listener when unmounted', async () => {
      class Component extends Reblend.Component {
        state = {
          show: true,
        };

        await render() {
          if (!this.state.show) {
            return null;
          }

          return <Modal show>Foo</Modal>;
        }
      }

      const { rerender } = render(<Component />);
      rerender(<Modal show={false}>Foo</Modal>);

      expect(offSpy).toHaveBeenCalledWith(
        'resize',
        expect.anything(),
        undefined,
      );
    });
  });

  it('Should close once it was clicked outside of the Modal', async () => {
    const onHideSpy = jest.fn();
    await render(
      <Modal show onHide={onHideSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.click(screen.getByRole('dialog'));
    expect(onHideSpy).toHaveBeenCalled();
  });

  it('Should not call onHide if the click target comes from inside the dialog', async () => {
    const onHideSpy = jest.fn();
    await render(
      <Modal show onHide={onHideSpy} data-testid="modal">
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.mouseDown(screen.getByTestId('modal'));
    fireEvent.mouseUp(screen.getByRole('dialog'));
    fireEvent.click(screen.getByRole('dialog'));

    expect(onHideSpy).not.toHaveBeenCalled();
  });

  it('Should set aria-labelledby to the role="dialog" element if aria-labelledby set', async () => {
    await render(
      <Modal show aria-labelledby="modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>,
    );

    expect(screen.getByRole('dialog').getAttribute('aria-labelledby')).toEqual(
      'modal-title',
    );
  });

  it('Should set aria-describedby to the role="dialog" element if aria-describedby set', async () => {
    await render(
      <Modal show aria-describedby="modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>,
    );

    expect(screen.getByRole('dialog').getAttribute('aria-describedby')).toEqual(
      'modal-title',
    );
  });

  it('Should set aria-label to the role="dialog" element if aria-label set', async () => {
    const labelValue = 'modal-label';
    await render(
      <Modal show aria-label={labelValue}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Modal heading</Modal.Title>
        </Modal.Header>
      </Modal>,
    );

    expect(screen.getByRole('dialog').getAttribute('aria-label')).toEqual(
      labelValue,
    );
  });

  it('Should call onEscapeKeyDown when keyboard is true', async () => {
    const onEscapeKeyDownSpy = jest.fn();
    await render(
      <Modal show keyboard onEscapeKeyDown={onEscapeKeyDownSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(screen.getByRole('dialog'), {
      keyCode: 27,
    });

    expect(onEscapeKeyDownSpy).toHaveBeenCalled();
  });

  it('Should not call onEscapeKeyDown when keyboard is false', async () => {
    const onEscapeKeyDownSpy = jest.fn();
    await render(
      <Modal show keyboard={false} onEscapeKeyDown={onEscapeKeyDownSpy}>
        <strong>Message</strong>
      </Modal>,
    );

    fireEvent.keyDown(screen.getByRole('dialog'), {
      keyCode: 27,
    });

    expect(onEscapeKeyDownSpy).not.toHaveBeenCalled();
  });

  it('Should not hide modal when keyboard is false', async () => {
    function ModalTest() {
      const [show, setShow] = Reblend.useState(false);

      return (
        <>
          <Modal show={show} onHide={() => setShow(false)} keyboard={false}>
            <strong>Message</strong>
          </Modal>
          <button type="button" onClick={() => setShow((s) => !s)}>
            Button
          </button>
        </>
      );
    }

    await render(<ModalTest />);

    // Show the modal.
    fireEvent.click(screen.getByRole('button'));

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeDefined();

    // Escape key.
    fireEvent.keyDown(dialog, {
      keyCode: 27,
    });

    // TODO: Ugly, but temp until we move to new test runner/assertion lib.
    try {
      await waitFor(() => expect(screen.queryByRole('dialog')).nottoBeTruthy());
    } catch (err) {
      // Expected an error.
      return;
    }

    throw new Error('Dialog does not exist');
  });

  it('Should use custom props manager if specified', async () => {
    const addSpy = jest.fn();

    class MyModalManager extends ModalManager {
      // @ts-expect-error Test function
      add() {
        addSpy();
      }
    }

    const managerRef: Reblend.MutableRefObject<ModalManager | null> =
      Reblend.createRef<ModalManager | null>();
    managerRef.current = new MyModalManager() as any;

    await render(
      <Modal show manager={managerRef.current as any}>
        <strong>Message</strong>
      </Modal>,
    );

    await waitFor(() => expect(addSpy).toHaveBeenCalled());
  });
});
