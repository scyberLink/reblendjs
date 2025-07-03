/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffectAfter } from '../hooks'
import { Reblend } from '../Reblend'
import { detach } from '../NodeOperationUtil'
import { getConfig } from '../../common/utils'
import { ConfigUtil } from '../ConfigUtil'
import { RenderingSessionTracker } from '../RenderingSessionTracker'

const portalSessionTrackingMap = new Map<HTMLElement, RenderingSessionTracker>()

export function Portal({ children, portal }: { portal: HTMLElement; children: Reblend.ReblendNode }) {
  let sessionId = 0

  useEffectAfter(async () => {
    if (!portal) {
      throw new Error('Portal element is not defined. Please provide a valid portal element.')
    }

    if (!portalSessionTrackingMap.has(portal)) {
      portalSessionTrackingMap.set(portal, new RenderingSessionTracker())
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cycle = portalSessionTrackingMap.get(portal)!
    if (!cycle.isCurrentSession(sessionId)) {
      sessionId = cycle.startSession()
    }

    const initialNoPreloader = getConfig().noPreloader
    ConfigUtil.getInstance().update({ noPreloader: true })
    const childElements = await Reblend.mountOn(portal, children)
    ConfigUtil.getInstance().update({ noPreloader: initialNoPreloader })
    return () => {
      if (cycle.isCurrentSession(sessionId)) {
        childElements.forEach((node) => detach(node))
        cycle.resetSession()
        portalSessionTrackingMap.delete(portal)
      }
    }
  }, children)

  return undefined
}

export function createPortal({
  children,
  portal,
}: {
  portal: HTMLElement
  children: Reblend.ReblendNode
}): Reblend.ReblendNode {
  return Reblend.construct(Portal, { portal, children })
}
