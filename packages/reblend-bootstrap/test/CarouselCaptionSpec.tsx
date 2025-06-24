import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Carousel from '../src/Carousel';

describe('<Carousel.Caption>', () => {
  it('uses "div" by default', async () => {
    await render(
      <Carousel.Caption className="custom-class" data-testid="test">
        <strong>Children</strong>
      </Carousel.Caption>,
    );

    const captionWrapper = screen.getByTestId('test');
    expect(captionWrapper.tagName).toEqual('DIV');
    expect(captionWrapper.classList).toContain('carousel-caption');
    expect(captionWrapper.classList).toContain('custom-class');

    const content = screen.getByText('Children');
    expect(content.tagName).toEqual('STRONG');
  });

  it('should allow custom elements instead of "div"', async () => {
    await render(<Carousel.Caption as="section" data-testid="test" />);

    const caption = screen.getByTestId('test');
    expect(caption.tagName).toEqual('SECTION');
    expect(caption.classList).toContain('carousel-caption');
  });
});
