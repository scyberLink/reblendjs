import { attributeName, shouldUseSetAttribute } from 'reblend-typing'
import { NodeUtil } from './NodeUtil'
import { EventUtil } from './EventUtil'
import { ElementUtil } from './ElementUtil'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class PropertyUtil {
  /**
   * Sets properties on the target component, updating attributes and handling special cases like events and style.
   *
   * @param {IAny} props - The properties to set.
   * @param {ReblendTyping.Component} to - The target component to apply the properties to.
   * @param {boolean} init - Whether this is an initial setting of properties.
   */
  static setProps(props: IAny, to: ReblendTyping.Component, init: boolean): void {
    if (props && to) {
      if (init && to.initProps) {
        to.initProps(props)
      } else {
        //@ts-expect-error I know its readonly
        to.props = { ...(to.props || {}), ...(props || {}) }
      }

      if (NodeUtil.isReblendRenderedNodeStandard(to)) {
        for (const propName in props) {
          const _attributeName = attributeName(propName)
          const propValue = props[propName]
          if (propName == 'dangerouslySetInnerHTML') {
            to.innerHTML = propValue?.__html
          } else if (propName.startsWith('on')) {
            to[_attributeName] = EventUtil.fn(propValue) as any
          } else {
            if (_attributeName === 'style') {
              to.addStyle(propValue)
            } else {
              const _shouldUseSetAttribute = shouldUseSetAttribute(_attributeName)
              try {
                if (_shouldUseSetAttribute) {
                  ElementUtil.setAttributesWithNamespace(to, {
                    [_attributeName]: propValue,
                  })
                } else {
                  to[_attributeName] = propValue
                }
              } catch (error: any) {
                /* empty */
              }
            }
          }
        }
      }

      if (init && to.initState) {
        to.initStateRunning = true
        to.initState()
        to.initStateRunning = false
      }
    }
  }

  /**
   * Removes specified properties from the `to` component and removes the corresponding attributes.
   * If a property is to be removed using `setAttribute`, it will also be removed from `props`.
   *
   * @param {IAny} props - The properties to remove from the component.
   * @param {ReblendTyping.Component} to - The target component from which to remove the properties.
   */
  static removeProps(props: IAny, to: ReblendTyping.Component): void {
    if (props && to) {
      //@ts-expect-error I know its read-only
      to.props = { ...to.props, ...props }

      for (const propName in props) {
        const _attributeName = attributeName(propName)
        const _shouldUseSetAttribute = shouldUseSetAttribute(propName)

        try {
          if (_shouldUseSetAttribute) {
            to.removeAttribute(_attributeName)
            delete to?.props[_attributeName]
          } else {
            to[_attributeName] = props[propName]
            delete to[_attributeName]
          }
        } catch (error: any) {
          /* empty */
        }
      }
    }
  }
}
