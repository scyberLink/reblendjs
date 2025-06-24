import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import CardImg from '../src/CardImg';

describe('<CardImg>', () => {
  it('should output an img', async () => {
    await render(<CardImg src="#" />);

    expect(screen.getByRole('img')).toBeTruthy();
  });

  it('should pass down src to img', async () => {
    const url = 'http://fakeurl.com/pic.jpg';
    await render(<CardImg src={url} />);

    expect(screen.getByRole('img').getAttribute('src')).to.be.equal(url);
  });

  it('Should have img as default component', async () => {
    await render(<CardImg />);

    expect(screen.getByRole('img')).toBeTruthy();
  });

  it('accepts as prop', async () => {
    await render(<CardImg as="figure">img</CardImg>);

    const card = screen.getByRole('figure');
    expect(card.tagName).toEqual('FIGURE');
    expect(card.classList).toContain('card-img');
  });

  describe('variants', () => {
    it('null', async () => {
      await render(<CardImg />);

      expect(screen.getByRole('img').classList).toContain('card-img');
    });

    it('top', async () => {
      await render(<CardImg variant="top" />);

      expect(screen.getByRole('img').classList).toContain('card-img-top');
    });

    it('bottom', async () => {
      await render(<CardImg variant="bottom" />);

      expect(screen.getByRole('img').classList).toContain('card-img-bottom');
    });
  });
});
