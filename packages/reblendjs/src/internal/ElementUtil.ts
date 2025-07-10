/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ReblendTyping from 'reblend-typing'
import {
  capitalize,
  getConfig,
  isCallable,
  REBLEND_COMPONENT,
  REBLEND_WRAPPER_FOR_REACT_COMPONENT,
} from '../common/utils'
import {
  addSymbol,
  extendPrototype,
  isLazyNode,
  isPrimitive,
  isReactNode,
  isReactToReblendVirtualNode,
  isReblendLazyVirtualNode,
  isReblendVirtualNode,
  isReblendVirtualNodeStandard,
  isStandard,
  isStandardVirtualNode,
  ReblendNodeTypeDict,
} from './NodeUtil'
import { Reblend } from './Reblend'
import { ReblendReactClass } from './ReblendReactClass'
import { BaseComponent } from './BaseComponent'
import { deepFlat } from './DiffUtil'
import { connected } from './NodeOperationUtil'
import { setProps } from './PropertyUtil'

const componentConfig: { [key: string]: boolean } = {
  ReblendPlaceholder: true,
  defaultReblendPlaceholderStyle: true,
}

/**
 * Creates an HTML, SVG, MathML, or XML element based on the provided tag name.
 *
 * @param {string} tag - The tag name of the element to create.
 * @returns {HTMLElement | SVGElement | Element} The created element.
 */
export function createElementWithNamespace(tag: string): HTMLElement | SVGElement | Element {
  const svgTags = [
    'svg',
    'path',
    'circle',
    'rect',
    'line',
    'text',
    'use',
    'g',
    'defs',
    'clipPath',
    'polygon',
    'polyline',
    'image',
    'symbol',
  ]
  const mathMLTags = ['math', 'mi', 'mn', 'mo', 'ms', 'mtext']
  const xmlTags = ['xml', 'xmlns']

  if (svgTags.includes(tag)) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag)
  } else if (mathMLTags.includes(tag)) {
    return document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
  } else if (xmlTags.includes(tag)) {
    return document.createElementNS('http://www.w3.org/XML/1998/namespace', tag)
  } else {
    return document.createElement(tag) // Default to HTML namespace
  }
}

/**
 * Sets attributes on the given element, handling namespaces for XML, SVG, MathML, and XLink attributes.
 *
 * @param {HTMLElement | SVGElement} element - The element on which to set attributes.
 * @param {Record<string, string>} attributes - A record of attribute names and values to set.
 */
export function setAttributesWithNamespace(
  element: HTMLElement | SVGElement,
  attributes: Record<string, string>,
): void {
  const svgAttributes = [
    /* SVG attributes */
  ]
  const mathMLAttributes = ['displaystyle', 'scriptlevel', 'mathvariant', 'mathsize', 'lspace', 'rspace']

  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith('xmlns:')) {
      // Handle XML namespace attributes
      element.setAttributeNS('http://www.w3.org/2000/xmlns/', key, value)
    } else if (key === 'xmlns') {
      // Handle default XML namespace attribute
      element.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', value)
    } else if (element instanceof SVGElement && svgAttributes.includes(key as never)) {
      // Handle SVG attributes
      element.setAttributeNS('http://www.w3.org/2000/svg', key, value)
    } else if (element instanceof Element && mathMLAttributes.includes(key)) {
      // Handle MathML attributes
      element.setAttributeNS('http://www.w3.org/1998/Math/MathML', key, value)
    } else if (key.startsWith('xlink:')) {
      // Handle XLink attributes
      element.setAttributeNS('http://www.w3.org/1999/xlink', key, value)
    } else {
      // Handle standard HTML attributes
      element.setAttribute(key, value)
    }
  }
}

/**
 * Creates child nodes from the given ReblendTyping.VNode children and appends them to the container array.
 * Supports nested arrays, Sets, and various node types such as Reblend, DOM Nodes, React Nodes, and primitive values.
 *
 * @param {ReblendTyping.VNodeChildren} children - The children to process.
 * @param {(ReblendTyping.Component<P, S> | HTMLElement)[]} [containerArr=[]] - The array to store the created child nodes.
 * @returns {(ReblendTyping.Component<P, S> | HTMLElement)[]} The array containing the created child nodes.
 */
export async function createChildren<P, S>(
  children: ReblendTyping.VNodeChildren,
  containerArr: (ReblendTyping.Component<P, S> | HTMLElement)[] = [],
): Promise<(ReblendTyping.Component<P, S> | HTMLElement)[]> {
  if (!children) {
    return containerArr
  }
  if (!(children instanceof Set) && !Array.isArray(children)) {
    children = [children]
  }
  for (const child of children instanceof Set ? Array.from(children) : children) {
    if (Array.isArray(child)) {
      await createChildren(child as any, containerArr)
    } else if (
      !isPrimitive(child) &&
      'construct' in child &&
      'mountOn' in child &&
      'createInnerHtmlElements' in child.prototype
    ) {
      await createChildren(BaseComponent.construct(child, {}) as any, containerArr)
    } else if (
      isCallable(child) ||
      child instanceof Reblend ||
      child instanceof Node ||
      isPrimitive(child) ||
      isReactToReblendVirtualNode(child) ||
      isLazyNode(child) ||
      isReblendLazyVirtualNode(child) ||
      isReblendVirtualNode(child) ||
      isStandardVirtualNode(child)
    ) {
      const domChild = deepFlat(await createElement(child as any))
      if (domChild) {
        containerArr.push(...domChild)
      }
    } else {
      throw new TypeError('Invalid child node in children')
    }
  }
  return containerArr
}

/**
 * Creates an element based on the provided virtual node (ReblendTyping.VNode) or primitive value.
 * The created element is returned as a `BaseComponent`.
 *
 * @param {ReblendTyping.VNode | ReblendTyping.VNode[] | ReblendTyping.ReactNode | ReblendTyping.Primitive} ui - The virtual node or primitive to create an element from.
 * @returns {ReblendTyping.Component<P, S>[]} The created `BaseComponent` instances.
 */
export async function createElement<P, S>(ui: ReblendTyping.ReblendNode): Promise<ReblendTyping.Component<P, S>[]> {
  if (ui instanceof Reblend || ui instanceof Node) {
    if (!(ui as any).displayName) {
      ;(ui as any).displayName = capitalize((ui as any as HTMLElement).tagName)
      extendPrototype(ui, Reblend.prototype)
      addSymbol(ReblendNodeTypeDict.ReblendNodeStandard, ui)
      ;(ui as any)._constructor()
    }
    return [ui as any]
  }

  if (Array.isArray(ui)) {
    return (await createChildren(ui)) as any
  }

  if (isPrimitive(ui)) {
    return [newReblendPrimitive()?.setData(ui as ReblendTyping.Primitive) as any]
  }

  if (isCallable(ui)) {
    ui = (ui as any)({})
  }

  if (isPrimitive(ui)) {
    return [newReblendPrimitive()?.setData(ui as ReblendTyping.Primitive) as any]
  }

  if (ui instanceof Promise) {
    return (await createChildren(BaseComponent.construct(ui as any, {}) as any)) as any
  }

  const tempComponent: typeof Reblend = ui as any

  // Handle Reblend class component
  if (
    'construct' in tempComponent &&
    'mountOn' in tempComponent &&
    'createInnerHtmlElements' in tempComponent.prototype
  ) {
    return (await createChildren(BaseComponent.construct(tempComponent as any, {}) as any)) as any
  }

  let { displayName } = ui as ReblendTyping.VNode
  const reactComponent = ui && ui['props'] && (ui as any).props.REACTCOMPONENT
  if (!reactComponent && isCallable(displayName)) {
    displayName = await (displayName as any)((ui as any).props)
  }

  if (typeof displayName !== 'string' && isPrimitive(displayName)) {
    return [newReblendPrimitive()?.setData(displayName as any) as any]
  }

  const node = displayName as any
  if (displayName instanceof Reblend || displayName instanceof Node) {
    if (!node.displayName) {
      node.displayName = capitalize(node.tagName)
      extendPrototype(node, Reblend.prototype)
      addSymbol(ReblendNodeTypeDict.ReblendNodeStandard, node)
      node._constructor()
    }

    if ((ui as any)?.props) {
      if (!node.props) {
        node.props = {}
      }
      node.props = {
        ...node.props,
        ...(ui as any).props,
      }
    }
    return [node]
  }

  if (
    isReblendVirtualNodeStandard(node) ||
    isReblendVirtualNode(node) ||
    isReactToReblendVirtualNode(node) ||
    isReactToReblendVirtualNode(node) ||
    isReblendLazyVirtualNode(node)
  ) {
    if ((ui as any)?.props) {
      if (!node.props) {
        node.props = {}
      }
      node.props = {
        ...node.props,
        ...(ui as any).props,
      }
    }

    return await createElement(node)
  }

  let clazz: typeof Reblend = displayName as any as typeof Reblend
  const isTagStandard = typeof displayName === 'string'
  const _isReactNode = reactComponent || isReactNode(displayName as any)
  const _isLazyNode = isLazyNode(ui as any) || isLazyNode(displayName as any)

  let tagName: string
  if (_isLazyNode) {
    tagName = ReblendNodeTypeDict.ReblendLazyNode
  } else if (isTagStandard) {
    tagName = displayName as string
  } else if (isReactNode(clazz)) {
    tagName = (clazz as any as ReblendTyping.ReactNode).displayName
  } else if (clazz?.ELEMENT_NAME === 'Fragment') {
    tagName = clazz.name
  } else {
    tagName = clazz?.ELEMENT_NAME || 'Anonymous'
  }

  if (!isTagStandard && !_isLazyNode) {
    if ((displayName as any)?.ELEMENT_NAME === 'Reblend' && (displayName as any)?.name === 'Reblend') {
      return [...((displayName as any)?.children || [])]
    }
    ;(clazz as any).ELEMENT_NAME = tagName
  }

  if (_isReactNode) {
    clazz = ReblendReactClass as any
    clazz.ELEMENT_NAME = capitalize(`${(displayName as unknown as ReblendTyping.ReactNode).displayName}`)
  }

  const element: ReblendTyping.Component<P, S> = createElementWithNamespace(
    isTagStandard ? (displayName as string) : 'div',
  ) as ReblendTyping.Component<P, S>

  let symbolType
  if (_isLazyNode) {
    symbolType = ReblendNodeTypeDict.ReblendLazyNode
  } else if (_isReactNode) {
    symbolType = ReblendNodeTypeDict.ReactToReblendNode
  } else if (isTagStandard) {
    symbolType = ReblendNodeTypeDict.ReblendNodeStandard
  } else {
    symbolType = ReblendNodeTypeDict.ReblendNode
  }
  addSymbol(symbolType, element)
  element.displayName = tagName
  if (isTagStandard || _isReactNode) {
    extendPrototype(element, Reblend.prototype)
  } else {
    const config = _isLazyNode ? (ui as any)?.config : clazz.config
    if (_isLazyNode) {
      extendPrototype(element, Reblend.prototype)
    } else {
      extendPrototype(element, clazz.prototype)
    }
    if (config) {
      Object.entries(config).forEach(([key, value]) => {
        if (!componentConfig[key]) {
          console.warn(`Unsupported key \`${key}\` found in component configuration.`)
        } else {
          element[key] = value
        }
      })
    }
  }

  if (_isLazyNode) {
    element.initState = (async () => {
      return await ((displayName as any) || (ui as any))
    }).bind(element)
  }

  if (_isReactNode) {
    element.ReactClass = displayName as any
    extendPrototype(element, ReblendReactClass.prototype)
  }
  element._constructor()
  if (!isTagStandard) {
    const isProduction = process.env.REBLEND_ENVIRONEMENT_PRODUCTION
    if (_isReactNode) {
      element.setAttribute(REBLEND_WRAPPER_FOR_REACT_COMPONENT, isProduction ? '' : tagName)
    } else {
      element.setAttribute(REBLEND_COMPONENT, isProduction ? '' : tagName)
    }
  }

  if (isTagStandard && 'ref' in (ui as ReblendTyping.VNode).props) {
    if ((ui as ReblendTyping.VNode).props.ref) {
      const ref = (ui as ReblendTyping.VNode).props.ref
      if (typeof ref === 'function') {
        ref(null)
        ref(element)
      } else {
        ref.current = null
        ref.current = element
      }
      element.ref = ref
    }
  }

  if (
    (ui as ReblendTyping.VNode)?.props?.isPlaceholder ||
    element.isPlaceholder ||
    isStandard(element) ||
    _isReactNode
  ) {
    await setProps((ui as ReblendTyping.VNode).props, element, true)
    await element.populateHtmlElements()
  } else {
    const setPropsAndInitState = async () => {
      const returnedNode = await setProps(_isLazyNode ? {} : (ui as ReblendTyping.VNode).props, element, true)
      if (returnedNode !== undefined) {
        element.html = async () =>
          BaseComponent.construct(returnedNode, _isLazyNode ? (ui as ReblendTyping.VNode).props : {}) as any
      }
      if (element.awaitingInitState) {
        element.awaitingInitState = false
        connected(element)
      }
    }
    const configs = getConfig()
    if (configs.noDefering) {
      await setPropsAndInitState()
    } else if (_isLazyNode) {
      // Let's force placeholder ui
      element.initStateRunning = true
      setTimeout(() => {
        setPropsAndInitState()
      }, configs.lazyComponentDeferTimeout)
    } else {
      setPropsAndInitState()
    }
  }

  return [element]
}

/**
 * Creates a new Reblend primitive element.
 *
 * @returns {ReblendTyping.Primitive} The newly created Reblend primitive element.
 */
export function newReblendPrimitive(): Text & {
  setData: (data: ReblendTyping.Primitive) => Text
  getData: () => ReblendTyping.Primitive
} {
  const text: any = document.createTextNode('') as any as ReblendTyping.Primitive
  extendPrototype(text, Reblend.prototype)
  text.displayName = ReblendTyping.REBLEND_PRIMITIVE_ELEMENT_NAME

  /**
   * Sets the data of the Reblend primitive.
   *
   * @param {ReblendTyping.Primitive} data - The data to set.
   * @returns {ReblendTyping.Primitive} The updated Reblend primitive.
   */
  text.setData = function (data: ReblendTyping.Primitive): ReblendTyping.Primitive {
    this.reblendPrimitiveData = data
    if (this.reblendPrimitiveData !== undefined && this.reblendPrimitiveData !== null) {
      const textContent = `${this.reblendPrimitiveData}`
      this.nodeValue = textContent
    } else {
      this.nodeValue = ''
    }
    return this
  }

  /**
   * Gets the data of the Reblend primitive.
   *
   * @returns {ReblendTyping.Primitive} The data of the Reblend primitive.
   */
  text.getData = function (): ReblendTyping.Primitive {
    return this.reblendPrimitiveData
  }

  return text
}
