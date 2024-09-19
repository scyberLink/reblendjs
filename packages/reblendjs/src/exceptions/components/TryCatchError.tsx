/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isCallable } from '../../common/utils'
import { BaseComponent, ReblendRenderingException } from '../../internal/BaseComponent'
import { Reblend } from '../../internal/Reblend'

//@ReblendComponent
function TryCatchError(
  this: BaseComponent,
  {
    children = ((_error) => <>{''}</>) as any,
  }: {
    children?:
      | ((error?: ReblendRenderingException) => Reblend.JSX.Element | Reblend.JSX.Element[])
      | Reblend.JSX.Element
      | Reblend.JSX.Element[]
  },
) {
  this.renderingErrorHandler = (e: ReblendRenderingException) => {
    this.renderingError = e
    //if (!this.stateEffectRunning && this.attached) {
    //Promise.resolve().then(() => {
    this.onStateChange()
    //})
    //}
  }

  const view = () => {
    const arr: any[] = []
    for (const child of children as any as []) {
      if (isCallable(child)) {
        arr.push((child as any)(this.renderingError))
      } else {
        arr.push(child)
      }
    }

    this.renderingError = null as any
    return arr
  }
  return <div>{view()}</div>
}

export { TryCatchError }
