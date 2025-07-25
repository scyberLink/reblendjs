import * as Reblend from 'reblendjs';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from 'reblend-testing-library';
import Carousel, { CarouselRef } from '../src/Carousel';
import ThemeProvider from '../src/ThemeProvider';

describe('<Carousel>', () => {
  const CarouselItemTestId = 'carousel-item-test';

  const items = [
    <Carousel.Item key={1} data-testid={CarouselItemTestId}>
      Item 1 content
    </Carousel.Item>,
    <Carousel.Item key={2} data-testid={CarouselItemTestId}>
      Item 2 content
    </Carousel.Item>,
    <Carousel.Item key={3} data-testid={CarouselItemTestId}>
      Item 3 content
    </Carousel.Item>,
  ];

  it('should not throw an error with StrictMode', async () => {
    const ref = Reblend.createRef<CarouselRef>();

    await render(
      <Reblend.StrictMode>
        <Carousel ref={ref} interval={null}>
          {items}
        </Carousel>
      </Reblend.StrictMode>,
    );

    await act(async () => {
      ref.current!.next();
    });
  });

  it('should show the first item by default and render all', async () => {
    const { container } = render(<Carousel>{items}</Carousel>);

    const carouselItems = screen.getAllByTestId(CarouselItemTestId);
    expect(carouselItems[0].classList).toContain('active');
    expect(carouselItems[1].classList).not.toContain('active');
    expect(
      container.querySelectorAll('.carousel-indicators > button'),
    ).toHaveLength(items.length);
  });

  it('should show the correct item with defaultActiveIndex', async () => {
    await render(<Carousel defaultActiveIndex={1}>{items}</Carousel>);

    const carouselItems = screen.getAllByTestId(CarouselItemTestId);
    expect(carouselItems[0].classList).not.toContain('active');
    expect(carouselItems[1].classList).toContain('active');
  });

  it('should handle falsy children', async () => {
    const { container } = render(
      <Carousel>
        {null}
        <Carousel.Item data-testid={CarouselItemTestId}>
          Item 1 content
        </Carousel.Item>
        {false}
        {undefined}
        <Carousel.Item data-testid={CarouselItemTestId}>
          Item 2 content
        </Carousel.Item>
      </Carousel>,
    );

    const carouselItems = screen.getAllByTestId(CarouselItemTestId);
    expect(carouselItems[0].classList).toContain('active');
    expect(carouselItems[0].innerText).toEqual('Item 1 content');
    expect(
      container.querySelectorAll('.carousel-indicators > button'),
    ).toHaveLength(2);
  });

  it('should call onSelect when indicator selected', async () => {
    const onSelect = jest.fn();

    const { getByLabelText } = render(
      <Carousel activeIndex={1} onSelect={onSelect} interval={null}>
        {items}
      </Carousel>,
    );

    fireEvent.click(getByLabelText('Slide 1'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(0, expect.anything());
  });

  it('should render custom indicator labels', async () => {
    const indicatorLabels = ['custom1', 'custom2', 'custom3'];

    const { getByLabelText } = render(
      <Carousel
        activeIndex={1}
        interval={null}
        indicatorLabels={indicatorLabels}
      >
        {items}
      </Carousel>,
    );

    for (let i = 0; i < indicatorLabels.length; i++) {
      expect(
        getByLabelText(indicatorLabels[i], { selector: '[aria-label]' }),
      ).toBeDefined();
    }
  });

  it('should render variant', async () => {
    await render(
      <Carousel
        activeIndex={1}
        interval={null}
        variant="dark"
        data-testid="test"
      >
        {items}
      </Carousel>,
    );

    const carousel = screen.getByTestId('test');
    expect(carousel.classList).toContain('carousel');
    expect(carousel.classList).toContain('carousel-dark');
  });

  describe('ref testing', () => {
    it('should allow refs to be attached and expose next, prev functions', async () => {
      const ref = Reblend.createRef<CarouselRef>();
      const onSelectSpy = jest.fn();
      const onSlidSpy = jest.fn();

      await render(
        <Carousel
          ref={ref}
          onSelect={onSelectSpy}
          onSlid={onSlidSpy}
          defaultActiveIndex={1}
        >
          {items}
        </Carousel>,
      );

      expect(ref.current).toHaveProperty('next');
      expect(ref.current).toHaveProperty('prev');
      expect(ref.current).toHaveProperty('element');

      await act(async () => {
        ref.current!.next();
      });

      await waitFor(() => expect(onSelectSpy).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(onSlidSpy).toHaveBeenCalledWith(2, 'start'));

      await act(async () => {
        ref.current!.next();
      });

      await waitFor(() => expect(onSelectSpy).toHaveBeenCalledTimes(2));
    });
  });

  it(`should call onSlide with previous index and direction`, async () => {
    const onEventSpy = jest.fn();

    const { getByLabelText } = render(
      <Carousel defaultActiveIndex={1} interval={null} onSlide={onEventSpy}>
        {items}
      </Carousel>,
    );

    fireEvent.click(
      getByLabelText('Slide 1', {
        selector: '.carousel-indicators button',
      }),
    );

    expect(onEventSpy).toHaveBeenCalledWith(0, 'end');
  });

  it(`should call onSlide with next index and direction`, async () => {
    const onEventSpy = jest.fn();

    const { getByLabelText } = render(
      <Carousel defaultActiveIndex={1} interval={null} onSlide={onEventSpy}>
        {items}
      </Carousel>,
    );

    fireEvent.click(
      getByLabelText('Slide 3', {
        selector: '.carousel-indicators button',
      }),
    );

    expect(onEventSpy).toHaveBeenCalledWith(items.length - 1, 'start');
  });

  it(`should call onSlid with previous index and direction`, async () => {
    const onEventSpy = jest.fn();

    const { getByLabelText } = render(
      <Carousel defaultActiveIndex={1} interval={null} onSlid={onEventSpy}>
        {items}
      </Carousel>,
    );

    fireEvent.click(
      getByLabelText('Slide 1', {
        selector: '.carousel-indicators button',
      }),
    );

    await waitFor(() => expect(onEventSpy).toHaveBeenCalledWith(0, 'end'));
  });

  it(`should call onSlid with next index and direction`, async () => {
    const onEventSpy = jest.fn();

    const { getByLabelText } = render(
      <Carousel defaultActiveIndex={1} interval={null} onSlid={onEventSpy}>
        {items}
      </Carousel>,
    );

    fireEvent.click(
      getByLabelText('Slide 3', {
        selector: '.carousel-indicators button',
      }),
    );

    await waitFor(() =>
      expect(onEventSpy).toHaveBeenCalledWith(items.length - 1, 'start'),
    );
  });

  describe('Buttons and labels with and without wrapping', () => {
    it('should show back button control on the first image if wrap is true', async () => {
      const { container } = render(
        <Carousel controls wrap>
          {items}
        </Carousel>,
      );

      expect(
        container.querySelectorAll('a.carousel-control-prev'),
      ).toHaveLength(1);
    });

    it('should show next button control on the last image if wrap is true', async () => {
      const lastElementIndex = items.length - 1;

      const { container } = render(
        <Carousel defaultActiveIndex={lastElementIndex} controls wrap>
          {items}
        </Carousel>,
      );

      expect(
        container.querySelectorAll('a.carousel-control-next'),
      ).toHaveLength(1);
    });

    it('should not show the prev button on the first image if wrap is false', async () => {
      const { container } = render(
        <Carousel controls wrap={false}>
          {items}
        </Carousel>,
      );

      expect(
        container.querySelectorAll('a.carousel-control-prev'),
      ).toHaveLength(0);
    });

    it('should not show the next button on the last image if wrap is false', async () => {
      const lastElementIndex = items.length - 1;

      const { container } = render(
        <Carousel defaultActiveIndex={lastElementIndex} controls wrap={false}>
          {items}
        </Carousel>,
      );

      expect(
        container.querySelectorAll('a.carousel-control-next'),
      ).toHaveLength(0);
    });
  });

  it('should allow the user to specify a previous and next icon', async () => {
    await render(
      <Carousel
        controls
        defaultActiveIndex={1}
        prevIcon={<span className="ficon ficon-left" data-testid="prev-icon" />}
        nextIcon={
          <span className="ficon ficon-right" data-testid="next-icon" />
        }
      >
        {items}
      </Carousel>,
    );

    expect(screen.getByTestId('prev-icon').classList).toContain('ficon-left');
    expect(screen.getByTestId('next-icon').classList).toContain('ficon-right');
  });

  it('should allow user to specify a previous and next SR label', async () => {
    const { container } = render(
      <Carousel
        controls
        defaultActiveIndex={1}
        prevLabel="Previous awesomeness"
        nextLabel="Next awesomeness"
      >
        {items}
      </Carousel>,
    );

    const labels = container.querySelectorAll<HTMLElement>('.visually-hidden');

    expect(labels).toHaveLength(2);
    expect(labels[0].innerText).toContain('Previous awesomeness');
    expect(labels[1].innerText).toContain('Next awesomeness');
  });

  it('should not render labels when values are null or undefined', async () => {
    // undefined (as in nothing passed) renders default labels
    [null, ''].forEach((falsyValue) => {
      const { container } = render(
        <Carousel
          controls
          defaultActiveIndex={1}
          prevLabel={falsyValue}
          nextLabel={falsyValue}
        >
          {items}
        </Carousel>,
      );

      expect(container.querySelectorAll('.visually-hidden')).toHaveLength(0);
    });
  });

  it('should transition properly when slide animation is disabled', async () => {
    const spy = jest.fn();
    const { container } = render(
      <Carousel slide={false} onSelect={spy}>
        {items}
      </Carousel>,
    );

    fireEvent.click(
      container.querySelector<HTMLElement>('a.carousel-control-next')!,
    );

    expect(spy).toHaveBeenCalledTimes(1);

    fireEvent.click(
      container.querySelector<HTMLElement>('a.carousel-control-prev')!,
    );

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should render on update, active item > new child length', async () => {
    const { queryAllByLabelText, queryAllByText, rerender } = render(
      <Carousel defaultActiveIndex={items.length - 1}>{items}</Carousel>,
    );

    expect(
      queryAllByLabelText(/Slide/, {
        selector: '.carousel-indicators > button',
      }),
    ).toHaveLength(items.length);

    const fewerItems = items.slice(2);

    rerender(
      <Carousel defaultActiveIndex={items.length - 1}>{fewerItems}</Carousel>,
    );

    expect(
      queryAllByLabelText(/Slide/, {
        selector: '.carousel-indicators > button',
      }),
    ).toHaveLength(fewerItems.length);

    expect(
      queryAllByText(/Item \d content/, {
        selector: 'div.carousel-item',
      }),
    ).toHaveLength(fewerItems.length);
  });

  it('should render correctly when fade is set', async () => {
    await render(
      <Carousel defaultActiveIndex={1} fade data-testid="test">
        {items}
      </Carousel>,
    );

    expect(screen.getByTestId('test').classList).toContain('carousel-fade');
  });

  describe('automatic traversal', () => {
    let clock: ReturnType<typeof jest.useFakeTimers>;

    beforeEach(async () => {
      clock = jest.useFakeTimers();
    });

    afterEach(async () => {
      clock.useRealTimers();
    });

    it('should go through the items after given seconds', async () => {
      const onSelectSpy = jest.fn();
      const interval = 500;

      await render(
        <Carousel interval={interval} onSelect={onSelectSpy}>
          {items}
        </Carousel>,
      );

      await act(async () => {
        clock.advanceTimersByTime(interval * 1.5);
      });

      expect(onSelectSpy).toHaveBeenCalledTimes(1);
    });

    it('should go through the items given the specified intervals', async () => {
      const onSelectSpy = jest.fn();
      await render(
        <Carousel interval={5000} onSelect={onSelectSpy}>
          <Carousel.Item interval={1000}>Item 1 content</Carousel.Item>
          <Carousel.Item>Item 2 content</Carousel.Item>
        </Carousel>,
      );

      // should be long enough to handle false positive issues
      // but short enough to not trigger auto-play to occur twice
      // (since the interval for the second item should be `5000`)
      await act(async () => {
        clock.advanceTimersByTime(1100);
      });
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(1, undefined);
    });

    it('should stop going through items on hover and continue afterwards', async () => {
      const onSelectSpy = jest.fn();
      const interval = 500;

      await render(
        <Carousel interval={interval} onSelect={onSelectSpy} data-testid="test">
          {items}
        </Carousel>,
      );

      const carousel = screen.getByTestId('test');

      fireEvent.mouseOver(carousel);
      await act(async () => {
        clock.advanceTimersByTime(interval * 1.5);
      });
      expect(onSelectSpy).not.toHaveBeenCalled();

      fireEvent.mouseOut(carousel);
      await act(async () => {
        clock.advanceTimersByTime(interval * 1.5);
      });
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
    });

    it('should ignore hover if the prop is passed', async () => {
      const onSelectSpy = jest.fn();
      const interval = 500;

      await render(
        <Carousel
          interval={interval}
          onSelect={onSelectSpy}
          pause={false}
          data-testid="test"
        >
          {items}
        </Carousel>,
      );

      fireEvent.mouseOver(screen.getByTestId('test'));

      await act(async () => {
        clock.advanceTimersByTime(interval * 1.5);
      });
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
    });

    it('should stop going through the items after unmounting', async () => {
      const onSelectSpy = jest.fn();
      const interval = 500;

      const { unmount } = render(
        <Carousel interval={interval} onSelect={onSelectSpy}>
          {items}
        </Carousel>,
      );

      await unmount();
      await act(async () => {
        clock.advanceTimersByTime(interval * 1.5);
      });
      expect(onSelectSpy).not.toHaveBeenCalled();
    });
  });

  describe('wrapping', () => {
    let clock: ReturnType<typeof jest.useFakeTimers>;

    beforeEach(async () => {
      clock = jest.useFakeTimers();
    });

    afterEach(async () => {
      clock.useRealTimers();
    });

    it('should wrap to last from first', async () => {
      const onSelectSpy = jest.fn();

      await render(
        <Carousel activeIndex={0} onSelect={onSelectSpy} data-testid="test">
          {items}
        </Carousel>,
      );

      fireEvent.keyDown(screen.getByTestId('test'), {
        key: 'ArrowLeft',
      });
      clock.advanceTimersByTime(50);

      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(
        items.length - 1,
        expect.anything(),
      );
    });

    it('should wrap from first to last', async () => {
      const onSelectSpy = jest.fn();

      await render(
        <Carousel
          activeIndex={items.length - 1}
          onSelect={onSelectSpy}
          data-testid="test"
        >
          {items}
        </Carousel>,
      );

      fireEvent.keyDown(screen.getByTestId('test'), {
        key: 'ArrowRight',
      });
      clock.advanceTimersByTime(50);
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(0, expect.anything());
    });

    [
      {
        caseName: 'previous at first',
        activeIndex: 0,
        eventPayload: {
          key: 'ArrowLeft',
        },
      },
      {
        caseName: 'next at last',
        activeIndex: items.length - 1,
        eventPayload: {
          key: 'ArrowRight',
        },
      },
    ].forEach(({ caseName, activeIndex, eventPayload }) => {
      it(`should not wrap with wrap unset for ${caseName}`, async () => {
        const onSelectSpy = jest.fn();

        await render(
          <Carousel
            activeIndex={activeIndex}
            wrap={false}
            onSelect={onSelectSpy}
            data-testid="test"
          >
            {items}
          </Carousel>,
        );

        const carousel = screen.getByTestId('test');

        fireEvent.keyDown(carousel, eventPayload);
        clock.advanceTimersByTime(50);

        const carouselItems = screen.getAllByTestId(CarouselItemTestId);
        expect(carouselItems[activeIndex].classList).toContain('active');
        expect(onSelectSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('keyboard events', () => {
    let clock: ReturnType<typeof jest.useFakeTimers>;

    beforeEach(async () => {
      clock = jest.useFakeTimers();
    });

    afterEach(async () => {
      clock.useRealTimers();
    });

    it('should go back for the keyboard event ArrowLeft', async () => {
      const onSelectSpy = jest.fn();

      await render(
        <Carousel activeIndex={1} onSelect={onSelectSpy} data-testid="test">
          {items}
        </Carousel>,
      );

      fireEvent.keyDown(screen.getByTestId('test'), {
        key: 'ArrowLeft',
      });

      clock.advanceTimersByTime(50);
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(0, expect.anything());
    });

    it('should go forward for the keyboard event ArrowRight', async () => {
      const onSelectSpy = jest.fn();

      await render(
        <Carousel activeIndex={1} onSelect={onSelectSpy} data-testid="test">
          {items}
        </Carousel>,
      );

      fireEvent.keyDown(screen.getByTestId('test'), {
        key: 'ArrowRight',
      });
      clock.advanceTimersByTime(50);
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(2, expect.anything());
    });

    it('should ignore keyEvents when the keyboard is disabled', async () => {
      const onSelectSpy = jest.fn();

      await render(
        <Carousel
          activeIndex={1}
          onSelect={onSelectSpy}
          keyboard={false}
          data-testid="test"
        >
          {items}
        </Carousel>,
      );

      fireEvent.keyDown(screen.getByTestId('test'), {
        key: 'ArrowRight',
      });
      clock.advanceTimersByTime(50);
      expect(onSelectSpy).not.toHaveBeenCalled();
    });

    it('should handle a defined custom key event', async () => {
      const onKeyDownSpy = jest.fn();

      await render(
        <Carousel activeIndex={1} onKeyDown={onKeyDownSpy} data-testid="test">
          {items}
        </Carousel>,
      );

      fireEvent.keyDown(screen.getByTestId('test'), {
        key: 'ArrowUp',
      });
      clock.advanceTimersByTime(50);
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
    });

    ['ArrowUp', 'ArrowRightLeft', 'Onwards'].forEach((key) => {
      it('should do nothing for non left or right keys', async () => {
        const onSelectSpy = jest.fn();

        await render(
          <Carousel activeIndex={1} onSelect={onSelectSpy} data-testid="test">
            {items}
          </Carousel>,
        );

        fireEvent.keyDown(screen.getByTestId('test'), {
          key,
        });
        clock.advanceTimersByTime(50);
        expect(onSelectSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('mouse events', () => {
    let clock: ReturnType<typeof jest.useFakeTimers>;

    beforeEach(async () => {
      clock = jest.useFakeTimers();
    });

    afterEach(async () => {
      clock.useRealTimers();
    });

    it('should handle a defined mouse over event', async () => {
      const onMouseOverSpy = jest.fn();

      await render(
        <Carousel
          activeIndex={1}
          onMouseOver={onMouseOverSpy}
          data-testid="test"
        >
          {items}
        </Carousel>,
      );

      fireEvent.mouseOver(screen.getByTestId('test'));
      clock.advanceTimersByTime(1500);
      expect(onMouseOverSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle a defined mouse out event', async () => {
      const onMouseOutSpy = jest.fn();

      await render(
        <Carousel activeIndex={1} onMouseOut={onMouseOutSpy} data-testid="test">
          {items}
        </Carousel>,
      );

      fireEvent.mouseOut(screen.getByTestId('test'));
      clock.advanceTimersByTime(50);
      expect(onMouseOutSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('touch events', () => {
    let clock: ReturnType<typeof jest.useFakeTimers>,
      carousel: HTMLElement,
      onSelectSpy: ReturnType<typeof jest.fn>,
      onTouchStartSpy: ReturnType<typeof jest.fn>,
      onTouchMoveSpy: ReturnType<typeof jest.fn>,
      onTouchEndSpy: ReturnType<typeof jest.fn>;

    beforeEach(async () => {
      onSelectSpy = jest.fn();
      onTouchStartSpy = jest.fn();
      onTouchMoveSpy = jest.fn();
      onTouchEndSpy = jest.fn();

      await render(
        <Carousel
          activeIndex={1}
          interval={null}
          onSelect={onSelectSpy}
          onTouchStart={onTouchStartSpy}
          onTouchMove={onTouchMoveSpy}
          onTouchEnd={onTouchEndSpy}
          touch
          data-testid="carousel-test"
        >
          {items}
        </Carousel>,
      );

      carousel = screen.getByTestId('carousel-test');

      clock = jest.useFakeTimers();
    });

    afterEach(async () => {
      clock.useRealTimers();
    });

    function generateTouchEvents(params: {
      target: HTMLElement;
      startX: number;
      endX: number;
    }): void {
      const { target, startX, endX } = params;

      fireEvent.touchStart(target, {
        touches: [
          new Touch({
            identifier: 1,
            target,
            clientX: startX,
          }),
        ],
      });
      fireEvent.touchMove(target, {
        touches: [
          new Touch({
            identifier: 1,
            target,
            clientX: endX,
          }),
        ],
      });

      fireEvent.touchEnd(target);
    }

    it('should swipe right', async () => {
      generateTouchEvents({ target: carousel, startX: 50, endX: 0 });

      await act(async () => {
        clock.advanceTimersByTime(50);
      });
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(2, expect.anything());
    });

    it('should swipe left', async () => {
      generateTouchEvents({ target: carousel, startX: 0, endX: 50 });

      await act(async () => {
        clock.advanceTimersByTime(50);
      });
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(0, expect.anything());
    });

    it('should not swipe if swipe detected is under the swipe threshold', async () => {
      generateTouchEvents({ target: carousel, startX: 0, endX: 35 });

      await act(async () => {
        clock.advanceTimersByTime(50);
      });
      expect(onSelectSpy).not.toHaveBeenCalled();
    });

    it('should handle a custom touch start and end event', async () => {
      generateTouchEvents({ target: carousel, startX: 50, endX: 0 });

      await act(async () => {
        clock.advanceTimersByTime(50);
      });
      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
      expect(onTouchMoveSpy).toHaveBeenCalledTimes(1);
      expect(onTouchEndSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle a custom multi-touch move event', async () => {
      /** @see generateTouchEvents */

      // fireEvent.touchMove(carousel, {
      //   touches: [
      //     new Touch({ identifier: 1, target: carousel, clientX: 0 }),
      //     new Touch({ identifier: 1, target: carousel, clientX: 50 }),
      //   ],
      // });

      fireEvent.touchMove(carousel, {
        touches: [
          new Touch({ identifier: 1, target: carousel, clientX: 0 }),
          new Touch({ identifier: 1, target: carousel, clientX: 50 }),
        ],
      });

      clock.advanceTimersByTime(50);
      expect(onTouchMoveSpy).toHaveBeenCalledTimes(1);
    });

    it('should do nothing with disabled touch right', async () => {
      const { container } = render(
        <Carousel
          activeIndex={1}
          interval={null}
          onSelect={onSelectSpy}
          touch={false}
          data-testid="test"
        >
          {items}
        </Carousel>,
      );

      const noTouchCarousel = screen.getByTestId('test');
      generateTouchEvents({ target: noTouchCarousel, startX: 50, endX: 0 });

      await act(async () => {
        clock.advanceTimersByTime(50);
      });
      expect(onSelectSpy).not.toHaveBeenCalled();

      const carouselItems = container.querySelectorAll('.carousel-item');
      expect(carouselItems).toHaveLength(3);

      expect(carouselItems[1].classList).toContain('active');
    });
  });

  describe('callback tests', () => {
    let clock: ReturnType<typeof jest.useFakeTimers>;

    beforeEach(async () => {
      clock = jest.useFakeTimers();
    });

    afterEach(async () => {
      clock.useRealTimers();
    });

    it('should call onSlide when slide animation is disabled', async () => {
      const onSlideSpy = jest.fn();
      const onSelectSpy = jest.fn();

      const { container } = render(
        <Carousel slide={false} onSelect={onSelectSpy} onSlide={onSlideSpy}>
          {items}
        </Carousel>,
      );

      fireEvent.click(
        container.querySelector<HTMLElement>('a.carousel-control-next')!,
      );

      await act(async () => {
        clock.advanceTimersByTime(150);
      });
      expect(onSlideSpy).toHaveBeenCalledTimes(1);

      fireEvent.click(
        container.querySelector<HTMLElement>('a.carousel-control-prev')!,
      );

      await act(async () => {
        clock.advanceTimersByTime(150);
      });
      expect(onSlideSpy).toHaveBeenCalledTimes(2);
    });

    it('should call onSlid when slide animation is disabled', async () => {
      const onSlidSpy = jest.fn();
      const onSelectSpy = jest.fn();

      const { container } = render(
        <Carousel slide={false} onSelect={onSelectSpy} onSlid={onSlidSpy}>
          {items}
        </Carousel>,
      );

      fireEvent.click(
        container.querySelector<HTMLElement>('a.carousel-control-next')!,
      );
      await act(async () => {
        clock.advanceTimersByTime(150);
      });
      expect(onSlidSpy).toHaveBeenCalledTimes(1);

      fireEvent.click(
        container.querySelector<HTMLElement>('a.carousel-control-prev')!,
      );
      await act(async () => {
        clock.advanceTimersByTime(150);
      });
      expect(onSlidSpy).toHaveBeenCalledTimes(2);
    });

    it('should transition/call onSelect once if previous arrow double clicked', async () => {
      const onSelectSpy = jest.fn();

      const { container } = render(
        <Carousel onSelect={onSelectSpy}>{items}</Carousel>,
      );

      const prev = container.querySelector<HTMLElement>(
        'a.carousel-control-prev',
      )!;
      fireEvent.click(prev);
      fireEvent.click(prev);

      await act(async () => {
        clock.advanceTimersByTime(1000);
      });
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
    });

    it('should transition/call onSelect once if next arrow double clicked', async () => {
      const onSelectSpy = jest.fn();

      const { container } = render(
        <Carousel onSelect={onSelectSpy}>{items}</Carousel>,
      );

      const next = container.querySelector<HTMLElement>(
        'a.carousel-control-next',
      )!;
      fireEvent.click(next);
      fireEvent.click(next);

      await act(async () => {
        clock.advanceTimersByTime(1000);
      });
      expect(onSelectSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('RTL', () => {
    let clock: ReturnType<typeof jest.useFakeTimers>;

    beforeEach(async () => {
      clock = jest.useFakeTimers();
    });

    afterEach(async () => {
      clock.useRealTimers();
    });

    it('should slide in correct direction on ArrowLeft when dir=rtl', async () => {
      const onSelectSpy = jest.fn();

      await render(
        <ThemeProvider dir="rtl">
          <Carousel activeIndex={1} onSelect={onSelectSpy} data-testid="test">
            {items}
          </Carousel>
        </ThemeProvider>,
      );

      fireEvent.keyDown(screen.getByTestId('test'), {
        key: 'ArrowLeft',
      });
      await act(async () => {
        clock.advanceTimersByTime(50);
      });

      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(2, expect.anything());
    });

    it('should slide in correct direction on ArrowLeft when dir=rtl', async () => {
      const onSelectSpy = jest.fn();

      await render(
        <ThemeProvider dir="rtl">
          <Carousel activeIndex={1} onSelect={onSelectSpy} data-testid="test">
            {items}
          </Carousel>
        </ThemeProvider>,
      );

      fireEvent.keyDown(screen.getByTestId('test'), {
        key: 'ArrowRight',
      });
      await act(async () => {
        clock.advanceTimersByTime(50);
      });

      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(0, expect.anything());
    });

    it('should slide in correct direction automatically when dir=rtl', async () => {
      const onSelectSpy = jest.fn();
      const interval = 300;

      await render(
        <ThemeProvider dir="rtl">
          <Carousel activeIndex={1} onSelect={onSelectSpy} interval={interval}>
            {items}
          </Carousel>
        </ThemeProvider>,
      );

      await act(async () => {
        clock.advanceTimersByTime(interval * 1.5);
      });

      expect(onSelectSpy).toHaveBeenCalledTimes(1);
      expect(onSelectSpy).toHaveBeenCalledWith(0, undefined);
    });
  });
});
