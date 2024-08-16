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
    children?: ((error?: ReblendRenderingException) => JSX.Element) | JSX.Element | JSX.Element[]
    props?: any[]
  },
) {
  this.renderingErrorHandler = (e: ReblendRenderingException) => ((this.renderingError = e), this.onStateChange())

  const view = () => {
    const arr: any[] = []
    for (const child of children as any as []) {
      if (isCallable(child)) {
        arr.push((child as any)(this.renderingError))
      } else {
        arr.push(child)
      }
    }

    this.renderingError && delete this.renderingError
    return arr
  }
  return view()
}

export { TryCatchError }
