import * as Reblend from 'reblendjs';
import { useEffect } from 'reblendjs';
import { describe, expect, it, jest } from '@jest/globals';
import ModalManager from '@restart/ui/ModalManager';
import { fireEvent, render, screen, waitFor } from 'reblend-testing-library';
import Offcanvas from '../src/Offcanvas';

const noop = async () => {};

describe('<Offcanvas>', () => {
  it('Should render the modal content', async () => {
    await render(
      <Offcanvas show onHide={noop}>
        <strong data-testid="test">Message</strong>
      </Offcanvas>,
    );
    const strongElem = screen.getByTestId('test');
    expect(strongElem.tagName).toEqual('STRONG');
    expect(strongElem.textContent).toEqual('Message');
  });

  it('Should set `visibility: visible` to `offcanvas`', async () => {
    await render(
      <Offcanvas data-testid="test" show>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');

    expect(offcanvasElem.tagName).toEqual('DIV');
    expect(offcanvasElem.classList).toContain('offcanvas');
    expect(offcanvasElem.style.visibility).toEqual('visible');
  });

  it('Should close the offcanvas when the modal close button is clicked', async () => {
    const onHideSpy = jest.fn();

    await render(
      <Offcanvas show onHide={onHideSpy}>
        <Offcanvas.Header closeButton />
        <strong>Message</strong>
      </Offcanvas>,
    );
    const buttonElem = document.getElementsByClassName('btn-close')[0];

    expect(buttonElem.classList).toContain('btn-close');

    fireEvent.click(buttonElem);

    await waitFor(() => expect(onHideSpy).toHaveBeenCalled());
  });

  it('Should pass className to the offcanvas', async () => {
    await render(
      <Offcanvas show className="myoffcanvas" onHide={noop} data-testid="test">
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');
    expect(offcanvasElem.classList).toContain('myoffcanvas');
  });

  it('Should pass backdropClassName to the backdrop', async () => {
    await render(
      <Offcanvas show backdropClassName="custom-backdrop" onHide={noop}>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const backdropElem =
      document.getElementsByClassName('offcanvas-backdrop')[0];
    expect(backdropElem.classList).toContain('custom-backdrop');
  });

  it('Should pass style to the offcanvas', async () => {
    await render(
      <Offcanvas show style={{ color: 'red' }} onHide={noop} data-testid="test">
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');
    expect(offcanvasElem.style.color).toEqual('red');
  });

  it('Should pass transition callbacks to Transition', async () => {
    const increment = jest.fn();
    const Elem = async () => {
      const [show, setShow] = Reblend.useState(true);
      return (
        <Offcanvas
          show={show}
          onHide={noop}
          onExit={increment}
          onExiting={increment}
          onExited={increment}
          onEnter={increment}
          onEntering={increment}
          onEntered={async () => {
            increment();
            setShow(false);
          }}
        >
          <strong>Message</strong>
        </Offcanvas>
      );
    };

    await render(<Elem />);

    await waitFor(() => expect(increment).toHaveBeenCalledTimes(6));
  });

  it('Should close when backdrop clicked', async () => {
    const onHideSpy = jest.fn();
    await render(
      <Offcanvas show onHide={onHideSpy}>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const backdropElem =
      document.getElementsByClassName('offcanvas-backdrop')[0];

    fireEvent.click(backdropElem);

    expect(onHideSpy).toHaveBeenCalled();
  });

  it('should not close when static backdrop is clicked', async () => {
    const onHideSpy = jest.fn();
    await render(
      <Offcanvas show onHide={onHideSpy} backdrop="static">
        <strong>Message</strong>
      </Offcanvas>,
    );
    const backdropElem =
      document.getElementsByClassName('offcanvas-backdrop')[0];

    fireEvent.click(backdropElem);

    expect(onHideSpy).not.toHaveBeenCalled();
  });

  // TODO: unsure if we need this, since it seems like Offcanvas is still undergoing some
  // changes upstream.
  // it('Should close when anything outside offcanvas clicked and backdrop=false', async () => {
  //   const onHideSpy = jest.fn();
  //   await render(
  //     <>
  //       <Offcanvas show onHide={onHideSpy} backdrop={false}>
  //         <strong>Message</strong>
  //       </Offcanvas>
  //       <button type="button" id="mybutton">
  //         my button
  //       </button>
  //     </>,
  //   );

  //   fireEvent.click(document.body);

  //   onHideSpy).toHaveBeenCalled()
  // });

  it('Should not call onHide if the click target comes from inside the offcanvas', async () => {
    const onHideSpy = jest.fn();
    await render(
      <>
        <Offcanvas show onHide={onHideSpy} data-testid="test">
          <strong>Message</strong>
        </Offcanvas>
        <div id="outside">outside</div>
      </>,
    );
    const offcanvasElem = screen.getByTestId('test');
    fireEvent.click(offcanvasElem);

    expect(onHideSpy).not.toHaveBeenCalled();
  });

  it('Should set aria-labelledby to the role="dialog" element if aria-labelledby set', async () => {
    await render(
      <Offcanvas
        show
        onHide={noop}
        aria-labelledby="offcanvas-title"
        data-testid="test"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvas-title">
            Offcanvas heading
          </Offcanvas.Title>
        </Offcanvas.Header>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');
    expect(offcanvasElem.classList).toContain('show');
    expect(offcanvasElem.getAttribute('role')).toEqual('dialog');
    expect(offcanvasElem.getAttribute('aria-labelledby')).toEqual(
      'offcanvas-title',
    );
  });

  it('Should call onEscapeKeyDown when keyboard is true', async () => {
    const onEscapeKeyDownSpy = jest.fn();
    await render(
      <Offcanvas
        show
        onHide={noop}
        keyboard
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Offcanvas>,
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });
    expect(onEscapeKeyDownSpy).toHaveBeenCalled();
  });

  it('Should not call onEscapeKeyDown when keyboard is false', async () => {
    const onEscapeKeyDownSpy = jest.fn();
    await render(
      <Offcanvas
        show
        onHide={noop}
        keyboard={false}
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Offcanvas>,
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });
    expect(onEscapeKeyDownSpy).not.toHaveBeenCalled();
  });

  it('Should use custom props manager if specified', async () => {
    const addSpy = jest.fn();

    class MyModalManager extends ModalManager {
      // @ts-expect-error test only method
      add() {
        addSpy();
      }
    }

    const managerRef = Reblend.createRef<any>();
    (managerRef as any).current = new MyModalManager();

    await render(
      <Offcanvas show onHide={noop} manager={managerRef.current}>
        <strong>Message</strong>
      </Offcanvas>,
    );

    await waitFor(() => expect(addSpy).toHaveBeenCalled());
  });

  it('should not change overflow style when scroll=true', async () => {
    const containerRef = Reblend.createRef<any>();

    await render(
      <div ref={containerRef} style={{ height: '2000px', overflow: 'scroll' }}>
        <Offcanvas show onHide={noop} container={containerRef} scroll>
          <strong>Message</strong>
        </Offcanvas>
      </div>,
    );

    expect(containerRef.current.style.overflow).toEqual('scroll');
  });

  it('should set responsive class', async () => {
    await render(
      <Offcanvas data-testid="test" responsive="lg" show onHide={noop}>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');
    expect(offcanvasElem.classList).toContain('offcanvas-lg');
  });

  it('should render offcanvas when show=false', async () => {
    await render(
      <Offcanvas data-testid="test" responsive="lg" onHide={noop}>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');
    expect(offcanvasElem.getAttribute('role')).to.not.exist;
  });

  it('should not mount, unmount and mount content on show', async () => {
    const InnerComponent = ({ onMount, onUnmount }) => {
      useEffect(async () => {
        onMount();
        return async () => {
          onUnmount();
        };
      }, []);

      return <div>Content</div>;
    };

    const onMountSpy = jest.fn();
    const onUnmountSpy = jest.fn();

    const { unmount } = render(
      <Offcanvas data-testid="test" onHide={noop} show>
        <InnerComponent onMount={onMountSpy} onUnmount={onUnmountSpy} />
      </Offcanvas>,
    );

    expect(onMountSpy).toHaveBeenCalledTimes(1);

    await unmount();

    expect(onUnmountSpy).toHaveBeenCalledTimes(1);
  });
});
