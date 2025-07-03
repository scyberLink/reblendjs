import { SessionTracker } from 'reblend-typing'
import { rand } from '../common/utils'

export class RenderingSessionTracker implements SessionTracker {
  private cycles: number[] = []

  private generateId() {
    const id = rand(10000, 999999)
    if (this.cycles.includes(id)) {
      return this.generateId()
    }
    return id
  }

  hasASession(): boolean {
    return this.cycles.length > 0
  }

  hasPreviousSession(): boolean {
    return this.cycles.length > 1
  }

  isCurrentSession(sessionId: number) {
    return this.cycles[0] === sessionId
  }

  completeCurrentCycle(sessionId: number) {
    if (!this.isCurrentSession(sessionId)) {
      return false
    }
    this.cycles.shift()
    return true
  }

  startSession(): number {
    const sessionId = this.generateId()
    this.cycles.unshift(sessionId)
    return sessionId
  }

  resetSession() {
    this.cycles = []
  }
}
