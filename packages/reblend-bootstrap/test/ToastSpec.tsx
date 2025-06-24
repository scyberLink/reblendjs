import * as Reblend from 'reblendjs';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, fireEvent, render } from 'reblend-testing-library';
import Toast from '../src/Toast';

const getToast = ({
  delay = 500,
  onCloseSpy,
  autohide = true,
  show = true,
}) => (
  <Toast delay={delay} onClose={onCloseSpy} show={show} autohide={autohide}>
    <Toast.Header>header-content</Toast.Header>
    <Toast.Body>body-content</Toast.Body>
  </Toast>
);

describe('<Toast>', () => {
  let clock: ReturnType<typeof jest.useFakeTimers>;

  beforeEach(async () => {
    clock = jest.useFakeTimers();
  });

  afterEach(async () => {
    clock.useRealTimers();
  });

  it('should apply bg prop', async () => {
    const { container } = render(<Toast bg="primary">Card</Toast>);
    expect(container.firstElementChild!.classList).toContain('bg-primary');
    expect(container.firstElementChild!.classList).toContain('toast');
  });

  it('should render an entire toast', async () => {
    const { container } = render(
      <Toast>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );

    ['fade', 'toast', 'show'].map((className) =>
      expect(container.firstElementChild!.classList).toContain(className),
    );

    (
      [
        ['role', 'alert'],
        ['aria-live', 'assertive'],
        ['aria-atomic', 'true'],
      ] as const
    ).map(([attrName, attrVal]) =>
      expect(
        container.firstElementChild!.attributes.getNamedItem(attrName)!
          .textContent,
      ).toEqual(attrVal),
    );
  });

  it('should render without transition if animation is false', async () => {
    const { container } = render(
      <Toast animation={false}>
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );

    ['toast', 'show'].map((className) =>
      expect(container.firstElementChild!.classList).toContain(className),
    );
  });

  it('should trigger the onClose event after clicking on the close button', async () => {
    const onCloseSpy = jest.fn();

    const { container } = render(
      <Toast onClose={onCloseSpy}>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    fireEvent.click(
      container.firstElementChild!.getElementsByTagName('button')[0],
    );
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger the onClose event after the autohide delay', async () => {
    const onCloseSpy = jest.fn();
    await render(
      <Toast onClose={onCloseSpy} delay={500} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.advanceTimersByTime(1000);
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should not trigger the onClose event if autohide is not set', async () => {
    const onCloseSpy = jest.fn();
    await render(
      <Toast onClose={onCloseSpy}>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    clock.advanceTimersByTime(3000);
    expect(onCloseSpy).not.toHaveBeenCalled();
  });

  it('should clearTimeout after unmount', async () => {
    const onCloseSpy = jest.fn();
    const { unmount } = render(
      <Toast delay={500} onClose={onCloseSpy} show autohide>
        <Toast.Header>header-content</Toast.Header>
        <Toast.Body>body-content</Toast.Body>
      </Toast>,
    );
    await unmount();
    clock.advanceTimersByTime(1000);
    expect(onCloseSpy).not.toHaveBeenCalled();
  });

  it('should not reset autohide timer when element re-renders with same props', async () => {
    const onCloseSpy = jest.fn();
    const toast = getToast({ onCloseSpy });
    const { rerender } = render(toast);

    clock.advanceTimersByTime(250);

    // Trigger render with no props changes.
    rerender(toast);

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should not reset autohide timer when delay is changed', async () => {
    const onCloseSpy = jest.fn();
    const { rerender } = render(getToast({ delay: 500, onCloseSpy }));

    clock.advanceTimersByTime(250);

    rerender(getToast({ delay: 10000, onCloseSpy }));

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should not reset autohide timer when onClosed is changed', async () => {
    const onCloseSpy = jest.fn();
    const onCloseSpy2 = jest.fn();

    const { rerender } = render(getToast({ onCloseSpy }));

    clock.advanceTimersByTime(250);

    rerender(getToast({ onCloseSpy: onCloseSpy2 }));

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).not.toHaveBeenCalled();
    expect(onCloseSpy2).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose if autohide is changed from true to false', async () => {
    const onCloseSpy = jest.fn();
    const { rerender } = render(getToast({ onCloseSpy, autohide: true }));

    clock.advanceTimersByTime(250);

    rerender(getToast({ onCloseSpy, autohide: false }));

    clock.advanceTimersByTime(300);
    expect(onCloseSpy).not.toHaveBeenCalled();
  });

  it('should not call onClose if show is changed from true to false', async () => {
    const onCloseSpy = jest.fn();
    const { rerender } = render(getToast({ show: true, onCloseSpy }));

    await act(async () => {
      clock.advanceTimersByTime(100);
    });

    rerender(getToast({ show: false, onCloseSpy }));

    await act(async () => {
      clock.advanceTimersByTime(300);
    });

    expect(onCloseSpy).not.toHaveBeenCalled();
  });

  it('should render with bsPrefix', async () => {
    const { container } = render(
      <Toast bsPrefix="my-toast">
        <Toast.Header />
        <Toast.Body />
      </Toast>,
    );
    expect(container.firstElementChild!.tagName).toEqual('DIV');
    expect(container.firstElementChild!.classList).toContain('my-toast');
  });

  it('Should pass transition callbacks to Transition', async () => {
    const increment = jest.fn();

    const Elem = async () => {
      const [show, setShow] = Reblend.useState(false);
      Reblend.useEffect(async () => {
        setShow(true);
      }, []);

      return (
        <Toast
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
          <Toast.Header />
          <Toast.Body>Body</Toast.Body>
        </Toast>
      );
    };

    await render(<Elem />);

    await act(async () => {
      clock.advanceTimersByTime(250);
    });

    // Trigger onExit.
    await act(async () => {
      clock.advanceTimersByTime(250);
    });

    expect(increment).toHaveBeenCalledTimes(6);
  });
});
