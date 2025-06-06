import { attributeName, ReblendTyping, shouldUseSetAttribute } from 'reblend-typing'
import { setAttributesWithNamespace } from './ElementUtil'
import { fn } from './EventUtil'
import { isReblendRenderedNodeStandard } from './NodeUtil'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Sets properties on the target component, updating attributes and handling special cases like events and style.
 *
 * @param {ReblendTyping.IAny} props - The properties to set.
 * @param {ReblendTyping.Component} to - The target component to apply the properties to.
 * @param {boolean} init - Whether this is an initial setting of properties.
 */
export async function setProps<P, S, ExpectedReturn = any>(
  props: ReblendTyping.IAny,
  to: ReblendTyping.Component<P, S>,
  init: boolean,
): Promise<ExpectedReturn> {
  if (!to) {
    return undefined as any
  }

  if (init && to.initProps) {
    await to.initProps(props as any)
  } else {
    to.props = { ...(to.props || {}), ...(props || {}) }
  }

  if (isReblendRenderedNodeStandard(to)) {
    for (const propName in props) {
      const _attributeName = attributeName(propName)
      const propValue = props[propName]
      if (propName == 'dangerouslySetInnerHTML') {
        to.innerHTML = propValue?.__html
      } else if (propName.startsWith('on')) {
        to[_attributeName] = fn(propValue) as any
      } else {
        if (_attributeName === 'style') {
          to.addStyle(propValue)
        } else {
          const _shouldUseSetAttribute = shouldUseSetAttribute(_attributeName)
          try {
            if (_shouldUseSetAttribute) {
              setAttributesWithNamespace(to, {
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

  let initStateResult: ExpectedReturn = undefined as any

  if (init && to.initState) {
    to.initStateRunning = true
    initStateResult = await to.initState<ExpectedReturn>()
    to.initStateRunning = false
  }

  return initStateResult
}

/**
 * Removes specified properties from the `to` component and removes the corresponding attributes.
 * If a property is to be removed using `setAttribute`, it will also be removed from `props`.
 *
 * @param {ReblendTyping.IAny} props - The properties to remove from the component.
 * @param {ReblendTyping.Component} to - The target component from which to remove the properties.
 */
export function removeProps<P, S>(props: ReblendTyping.IAny, to: ReblendTyping.Component<P, S>): void {
  if (props && to) {
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

