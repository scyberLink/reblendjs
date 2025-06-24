import * as Reblend from 'reblendjs';
import { describe, expect, it } from '@jest/globals';
import { useImperativeHandle } from 'reblendjs';
import { render } from 'reblend-testing-library';
import { Offset } from '@restart/ui/usePopper';
import Popover from '../src/Popover';
import Tooltip from '../src/Tooltip';
import useOverlayOffset from '../src/useOverlayOffset';

describe('useOverlayOffset', () => {
  const Wrapper = Reblend.forwardRef<
    any,
    Reblend.PropsWithChildren<{ customOffset?: Offset }>
  >((props, outerRef) => {
    const [ref, modifiers] = useOverlayOffset(props.customOffset);

    useImperativeHandle(outerRef, () => ({
      modifiers,
    }));

    return Reblend.cloneElement(props.children as Reblend.ReactElement<any>, {
      ref,
    });
  });

  it('should have offset of [0, 8] for Popovers', async () => {
    const ref = Reblend.createRef<any>();

    await render(
      <Wrapper ref={ref}>
        <Popover id="test-popover" />
      </Wrapper>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).toEqual([0, 8]);
  });

  it('should apply custom offset', async () => {
    const ref = Reblend.createRef<any>();

    await render(
      <Wrapper ref={ref} customOffset={[200, 200]}>
        <Popover id="test-popover" />
      </Wrapper>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).toEqual([200, 200]);
  });

  it('should have offset of [0, 6] for Tooltips', async () => {
    const ref = Reblend.createRef<any>();

    await render(
      <Wrapper ref={ref}>
        <Tooltip id="test-tooltip" />
      </Wrapper>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).toEqual([0, 6]);
  });

  it('should have offset of [0, 0] for any overlay', async () => {
    const ref = Reblend.createRef<any>();

    await render(
      <Wrapper ref={ref}>
        <div>test</div>
      </Wrapper>,
    );

    const offset = ref.current.modifiers[0].options.offset();
    expect(offset).toEqual([0, 0]);
  });
});
