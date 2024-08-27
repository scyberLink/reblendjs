import { BaseComponent, newReblendPrimitive } from './BaseComponent'
import { isReblendPrimitive } from './BaseComponentHelper'
import { ReblendPrimitive } from './BaseComponentType'

class ReblendPrimitiveFIFOPool {
  pool: (ReblendPrimitive & BaseComponent)[] = []
  get(): ReblendPrimitive & BaseComponent {
    BaseComponent
    return this.pool.shift() || newReblendPrimitive()
  }
  add(element: ReblendPrimitive & BaseComponent) {
    if (!isReblendPrimitive(element)) {
      throw new Error('Element not a Reblend Primitive')
    }
    this.pool.push(element)
  }
}

const PrimitiveElementPool = new ReblendPrimitiveFIFOPool()

export { PrimitiveElementPool, ReblendPrimitiveFIFOPool }
