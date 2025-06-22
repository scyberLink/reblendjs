import { useEffect } from 'reblendjs'
import { render } from 'reblend-testing-library'
import useCallbackRef from '../lib/useCallbackRef'
import Reblend from 'reblendjs'

describe('useCallbackRef', () => {
  it('should update value and be fresh in an effect', async () => {
    const effectSpy = jest.fn()

    function Wrapper({ toggle }) {
      const { item, ref } = useCallbackRef<HTMLDivElement | HTMLSpanElement>()

      useEffect(async () => {
        effectSpy(item)
      }, [item])

      return toggle ? <div ref={ref} /> : <span ref={ref} />
    }

    const wrapper = await render(<Wrapper toggle={false} />)

    expect(wrapper.container.getElementsByTagName('span')).toHaveLength(1)
    expect(effectSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ tagName: 'SPAN' }),
    )

    await wrapper.rerender(<Wrapper toggle={true} />)

    //Reblend Components are div
    expect(wrapper.container.getElementsByTagName('div')).toHaveLength(2)
    expect(effectSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ tagName: 'DIV' }),
    )
  })
})
