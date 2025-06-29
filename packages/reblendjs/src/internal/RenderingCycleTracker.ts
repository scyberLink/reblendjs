import * as typing from 'reblend-typing'
import { rand } from '../common/utils'

export class RenderingCycleTracker implements typing.RenderingCycleTracker {
  circles: number[] = []

  generateId() {
    const id = rand(10000, 999999)
    if (this.circles.includes(id)) {
      return this.generateId()
    }
    return id
  }

  hasACirle(): boolean {
    return this.circles.length > 0
  }

  hasPreviousCirle(): boolean {
    return this.circles.length > 1
  }

  isCurrentCycle(circleId: number) {
    return this.circles[0] === circleId
  }

  completeCurrentCycle(circleId: number) {
    if (!this.isCurrentCycle(circleId)) {
      return false
    }
    this.circles.shift()
    return true
  }

  startCircle(): number {
    const circleId = this.generateId()
    this.circles.unshift(circleId)
    return circleId
  }

  resetCircle() {
    this.circles = []
  }
}
