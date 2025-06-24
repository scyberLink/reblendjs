import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Figure from '../src/Figure';

describe('Figure', () => {
  describe('General', () => {
    it('should be a Figure', async () => {
      await render(<Figure data-testid="test" />);

      expect(screen.getByTestId('test').tagName).toEqual('FIGURE');
    });
  });

  describe('Figure.Image', () => {
    it('should be an image', async () => {
      await render(<Figure.Image data-testid="test" />);

      expect(screen.getByTestId('test').tagName).toEqual('IMG');
    });

    it('should provide src and alt prop', async () => {
      await render(
        <Figure.Image src="image.jpg" alt="this is alt" data-testid="test" />,
      );

      const image = screen.getByTestId('test');
      expect(image.getAttribute('src')).toEqual('image.jpg');
      expect(image.getAttribute('alt')).toEqual('this is alt');
    });

    it('should have correct class when fluid prop is set', async () => {
      await render(<Figure.Image fluid data-testid="test" />);

      expect(screen.getByTestId('test').classList).toContain('img-fluid');
    });

    it('should not override class when rounded prop is set', async () => {
      await render(<Figure.Image rounded fluid data-testid="test" />);

      const image = screen.getByTestId('test');
      expect(image.classList).toContain('figure-img');
      expect(image.classList).toContain('img-fluid');
      expect(image.classList).toContain('rounded');
    });

    it('should have correct class when rounded prop is set', async () => {
      await render(<Figure.Image rounded data-testid="test" />);

      expect(screen.getByTestId('test').classList).toContain('rounded');
    });

    it('should have correct class when roundedCircle prop is set', async () => {
      await render(<Figure.Image roundedCircle data-testid="test" />);

      expect(screen.getByTestId('test').classList).toContain('rounded-circle');
    });

    it('should have correct class when thumbnail prop is set', async () => {
      await render(<Figure.Image thumbnail data-testid="test" />);

      expect(screen.getByTestId('test').classList).toContain('img-thumbnail');
    });
  });
});
