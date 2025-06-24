import { render } from 'reblend-testing-library';
import { expect, describe, it, jest } from '@jest/globals';

import React, { useRef } from 'reblendjs';

import useWaitForDOMRef from '../src/useWaitForDOMRef';

describe('useWaitForDOMRef', () => {
  it('should resolve on first render if possible (element)', () => {
    let renderCount = 0;
    const container = document.createElement('div');

    function Test({ container, onResolved }: any) {
      useWaitForDOMRef(container, onResolved);
      renderCount++;
      return null;
    }

    const onResolved = jest.fn((resolved) => {
      expect(resolved).toEqual(container);
    });

    render(<Test container={container} onResolved={onResolved} />);

    expect(renderCount).toEqual(1);
    expect(onResolved).toHaveBeenCalledTimes(1);
  });

  it('should resolve on first render if possible (ref)', () => {
    let renderCount = 0;
    const container = Reblend.createRef();

    (container as any).current = document.createElement('div');

    function Test({ container, onResolved }: any) {
      useWaitForDOMRef(container, onResolved);
      renderCount++;
      return null;
    }

    const onResolved = jest.fn((resolved) => {
      expect(resolved).toEqual(container.current);
    });

    render(<Test container={container} onResolved={onResolved} />);

    expect(renderCount).toEqual(1);
    expect(onResolved).toHaveBeenCalledTimes(1);
  });

  it('should resolve on first render if possible (function)', () => {
    const div = document.createElement('div');
    const container = () => div;
    let renderCount = 0;

    function Test({ container, onResolved }: any) {
      useWaitForDOMRef(container, onResolved);
      renderCount++;
      return null;
    }

    const onResolved = jest.fn((resolved) => {
      expect(resolved).toEqual(div);
    });

    render(<Test container={container} onResolved={onResolved} />);

    expect(renderCount).toEqual(1);
    expect(onResolved).toHaveBeenCalledTimes(1);
  });

  it('should resolve after if required', () => {
    let renderCount = 0;

    function Test({ container, onResolved }: any) {
      useWaitForDOMRef(container, onResolved);
      renderCount++;
      return null;
    }

    const onResolved = jest.fn((resolved) => {
      expect(resolved.tagName).toEqual('DIV');
    });

    function Wrapper() {
      const container = useRef(null);

      return (
        <>
          <Test container={container} onResolved={onResolved} />
          <div ref={container} />
        </>
      );
    }

    render(<Wrapper />);

    expect(renderCount).toEqual(2);
    expect(onResolved).toHaveBeenCalledTimes(1);
  });
});
