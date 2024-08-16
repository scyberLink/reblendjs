import { BaseComponent, ReblendPrimitive } from './BaseComponent'

class ReblendPrimitiveFIFOPool {
  pool: ReblendPrimitive[] = []
  get(): ReblendPrimitive {
    return this.pool.shift() || BaseComponent.newReblendPrimitive()
  }
  add(element: ReblendPrimitive) {
    if (!BaseComponent.isReblendPrimitiveElement(element)) {
      throw new Error('Element not a Reblend Primitive')
    }
    this.pool.push(element)
  }
}

const PrimitiveElementPool = new ReblendPrimitiveFIFOPool()

export { PrimitiveElementPool, ReblendPrimitiveFIFOPool }
