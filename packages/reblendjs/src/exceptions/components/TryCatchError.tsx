/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isCallable } from '../../common/utils'
import type { BaseComponent } from '../../internal/BaseComponent'
import { Reblend } from '../../internal/Reblend'

//@ReblendComponent
function TryCatchError({
  children = ((_error) => <>{''}</>) as any,
}: {
  children?:
    | ((error?: ReblendRenderingException) => Reblend.JSX.Element | Reblend.JSX.Element[])
    | Reblend.JSX.Element
    | Reblend.JSX.Element[]
}) {
  //@ts-ignore
  this &&
    //@ts-ignore
    (this.renderingErrorHandler = (e: ReblendRenderingException) => {
      //@ts-ignore
      this.renderingError = e
      //if (!this.stateEffectRunning && this.attached) {
      //Promise.resolve().then(() => {
      //@ts-ignore
      this?.onStateChange()
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
