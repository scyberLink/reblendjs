import { describe, expect, it } from '@jest/globals';
import { render, screen } from 'reblend-testing-library';
import Ratio from '../src/Ratio';

describe('Ratio', () => {
  it('should contain `ratio-1x1` and custom class', async () => {
    await render(
      <Ratio data-testid="test" aspectRatio="1x1" className="custom-class">
        <div />
      </Ratio>,
    );
    const ratioElem = screen.getByTestId('test');

    expect(ratioElem.classList).toContain('custom-class');
    expect(ratioElem.classList).toContain('ratio');
    expect(ratioElem.classList).toContain('ratio-1x1');
  });

  it('should support custom ratios using percent for aspectRatio', async () => {
    await render(
      <Ratio data-testid="test" aspectRatio={50}>
        <div />
      </Ratio>,
    );
    const ratioElem = screen.getByTestId('test');
    const styleAttr = ratioElem.getAttribute('style')!;
    expect(styleAttr).toMatch(/--bs-aspect-ratio:[ ]*50%;/);
  });

  it('should support custom ratios using fraction for aspectRatio', async () => {
    await render(
      <Ratio data-testid="test" aspectRatio={1 / 2}>
        <div />
      </Ratio>,
    );
    const ratioElem = screen.getByTestId('test');
    const styleAttr = ratioElem.getAttribute('style')!;
    expect(styleAttr).toMatch(/--bs-aspect-ratio:[ ]*50%;/);
  });

  it('should support use 100% as custom ratio if aspectRatio is less than 0', async () => {
    await render(
      <Ratio data-testid="test" aspectRatio={-1}>
        <div />
      </Ratio>,
    );
    const ratioElem = screen.getByTestId('test');
    const styleAttr = ratioElem.getAttribute('style')!;
    expect(styleAttr).toMatch(/--bs-aspect-ratio:[ ]*100%;/);
  });

  it('should support aspectRatio greater than 100', async () => {
    await render(
      <Ratio data-testid="test" aspectRatio={200}>
        <div />
      </Ratio>,
    );
    const ratioElem = screen.getByTestId('test');
    const styleAttr = ratioElem.getAttribute('style')!;
    expect(styleAttr).toMatch(/--bs-aspect-ratio:[ ]*200%;/);
  });
});
