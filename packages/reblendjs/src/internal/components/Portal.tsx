import { useEffectAfter } from '../hooks'
import { Reblend } from '../Reblend'
import { detach } from '../NodeOperationUtil'
import { getConfig } from '../../common/utils'
import { ConfigUtil } from '../ConfigUtil'

export function Portal({ children, portal }: { portal: HTMLElement; children: Reblend.ReblendNode }) {
  useEffectAfter(async () => {
    if (!portal) {
      throw new Error('Portal element is not defined. Please provide a valid portal element.')
    }
    const initialNoPreloader = getConfig().noPreloader
    ConfigUtil.getInstance().update({ noPreloader: true })
    const childElements = await Reblend.mountOn(portal, children)
    ConfigUtil.getInstance().update({ noPreloader: initialNoPreloader })
    return () => {
      childElements.forEach((node) => detach(node))
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
