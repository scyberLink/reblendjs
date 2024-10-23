/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReblendRenderingException } from 'reblend-typing'
import { isCallable } from '../../common/utils'
import type { BaseComponent } from '../../internal/BaseComponent'
import { Reblend } from '../../internal/Reblend'

//@ReblendComponent
function TryCatchError(
  {
    children = ((_error) => <>{''}</>) as any,
  }: {
    children?:
      | ((error?: ReblendRenderingException) => Reblend.JSX.Element | Reblend.JSX.Element[])
      | Reblend.JSX.Element
      | Reblend.JSX.Element[]
  },
  thisComponent?: BaseComponent,
) {
  thisComponent &&
    (thisComponent.renderingErrorHandler = (e: ReblendRenderingException) => {
      thisComponent.renderingError = e
      //if (!this.stateEffectRunning && this.attached) {
      //Promise.resolve().then(() => {
      thisComponent?.onStateChange()
      //})
      //}
    })

  function view() {
    const arr: any[] = []
    for (const child of children as any as []) {
      if (isCallable(child)) {
        //@ts-ignore
        arr.push((child as any)(this.renderingError))
      } else {
        arr.push(child)
      }
    }

    //@ts-ignore
    this.renderingError = null as any
    return arr
  }
  return <div>{view()}</div>
}

export { TryCatchError }
