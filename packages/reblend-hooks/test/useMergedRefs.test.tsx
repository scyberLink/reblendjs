import Reblend, { useEffect } from 'reblendjs'

import useCallbackRef from '../lib/useCallbackRef'
import useMergedRefs from '../lib/useMergedRefs'
import { render } from 'reblend-testing-library'

describe('useMergedRefs', () => {
  it('should return a function that returns mount state', async () => {
    let innerRef: HTMLButtonElement
    const outerRef = Reblend.createRef<HTMLButtonElement>()

    const Button = (props) => {
      const { item, ref } = useCallbackRef<HTMLButtonElement>()

      useEffect(({ current: curr }) => {
        innerRef = curr!
      }, item)

      const mergedRef = useMergedRefs(props.ref, ref)

      return <button {...{ ...props, ref: mergedRef }} />
    }

    const result = await render(<Button ref={outerRef} />)

    expect(innerRef!.tagName).toEqual('BUTTON')
    expect((outerRef.current as any)!.tagName).toEqual('BUTTON')
  })
})
