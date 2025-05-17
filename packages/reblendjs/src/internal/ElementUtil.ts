/* eslint-disable @typescript-eslint/no-explicit-any */
import { REBLEND_PRIMITIVE_ELEMENT_NAME, ReblendTyping } from 'reblend-typing'
import { capitalize, isCallable, REBLEND_COMPONENT, REBLEND_WRAPPER_FOR_REACT_COMPONENT } from '../common/utils'
import { DiffUtil } from './DiffUtil'
import { NodeUtil, ReblendNodeTypeDict } from './NodeUtil'
import { PropertyUtil } from './PropertyUtil'
import { Reblend } from './Reblend'
import { ReblendReactClass } from './ReblendReactClass'
import { NodeOperationUtil } from './NodeOperationUtil'
import { BaseComponent } from './BaseComponent'

const componentConfig: { [key: string]: boolean } = {
  ReblendPlaceholder: true,
  defaultReblendPlaceholderStyle: true,
}

export const ElementUtil = class {
  /**
   * Creates an HTML, SVG, MathML, or XML element based on the provided tag name.
   *
   * @param {string} tag - The tag name of the element to create.
   * @returns {HTMLElement | SVGElement | Element} The created element.
   */
  static createElementWithNamespace(tag: string): HTMLElement | SVGElement | Element {
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
  static setAttributesWithNamespace(element: HTMLElement | SVGElement, attributes: Record<string, string>): void {
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
  static async createChildren<P, S>(
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
      if (isCallable(child)) {
        containerArr.push(child as any)
      } else if (Array.isArray(child)) {
        await ElementUtil.createChildren(child as any, containerArr)
      } else if (
        !NodeUtil.isPrimitive(child) &&
        'construct' in child &&
        'mountOn' in child &&
        'createInnerHtmlElements' in child.prototype
      ) {
        await ElementUtil.createChildren(BaseComponent.construct(child, {}) as any, containerArr)
      } else if (
        child instanceof Reblend ||
        child instanceof Node ||
        NodeUtil.isPrimitive(child) ||
        NodeUtil.isReactToReblendVirtualNode(child) ||
        NodeUtil.isLazyNode(child) ||
        NodeUtil.isReblendLazyVirtualNode(child) ||
        NodeUtil.isReblendVirtualNode(child) ||
        NodeUtil.isStandardVirtualNode(child)
      ) {
        const domChild = DiffUtil.deepFlat(await ElementUtil.createElement(child as any))
        domChild && containerArr.push(...domChild)
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
   * @param {ReblendTyping.VNode | ReblendTyping.VNode[] | ReblendTyping.ReactNode | ReblendTyping.Primitive} vNode - The virtual node or primitive to create an element from.
   * @returns {ReblendTyping.Component<P, S>[]} The created `BaseComponent` instances.
   */
  static async createElement<P, S>(
    vNode: ReblendTyping.VNode | ReblendTyping.VNode[] | ReblendTyping.ReactNode | ReblendTyping.Primitive,
  ): Promise<ReblendTyping.Component<P, S>[]> {
    if (vNode instanceof Reblend || vNode instanceof Node) {
      if (!(vNode as any).displayName) {
        ;(vNode as any).displayName = capitalize((vNode as any as HTMLElement).tagName)
        NodeUtil.extendPrototype(vNode, Reblend.prototype)
        NodeUtil.addSymbol(ReblendNodeTypeDict.ReblendNodeStandard, vNode)
        ;(vNode as any)._constructor()
      }
      return [vNode as any]
    }
    if (Array.isArray(vNode)) {
      return (await ElementUtil.createChildren(vNode)) as any
    }
    if (NodeUtil.isPrimitive(vNode)) {
      return [ElementUtil.newReblendPrimitive()?.setData(vNode as ReblendTyping.Primitive) as any]
    }

    const tempComponent: typeof Reblend = vNode as any

    // Handle Reblend class component
    if (
      'construct' in tempComponent &&
      'mountOn' in tempComponent &&
      'createInnerHtmlElements' in tempComponent.prototype
    ) {
      return (await ElementUtil.createChildren(BaseComponent.construct(tempComponent, {}) as any)) as any
    }

    let { displayName } = vNode as ReblendTyping.VNode
    if (isCallable(displayName)) {
      displayName = await displayName()
    }
    let clazz: typeof Reblend = displayName as any as typeof Reblend
    const isTagStandard = typeof displayName === 'string'
    const isReactNode = NodeUtil.isReactNode(displayName as any)
    const isLazyNode = NodeUtil.isLazyNode(vNode as any) || NodeUtil.isLazyNode(displayName as any)

    const tagName = isLazyNode
      ? ReblendNodeTypeDict.ReblendLazyNode
      : isTagStandard
      ? displayName
      : (NodeUtil.isReactNode(clazz) ? (clazz as any as ReblendTyping.ReactNode).displayName : clazz?.ELEMENT_NAME) ||
        `Anonymous`

    if (!isTagStandard && !isLazyNode) {
      clazz.ELEMENT_NAME = tagName
    }

    if (isReactNode) {
      clazz = ReblendReactClass as any
      clazz.ELEMENT_NAME = capitalize(`${(displayName as unknown as ReblendTyping.ReactNode).displayName}`)
    }

    const element: ReblendTyping.Component<P, S> = ElementUtil.createElementWithNamespace(
      isTagStandard ? displayName : 'div',
    ) as ReblendTyping.Component<P, S>

    NodeUtil.addSymbol(
      isLazyNode
        ? ReblendNodeTypeDict.ReblendLazyNode
        : isReactNode
        ? ReblendNodeTypeDict.ReactToReblendNode
        : isTagStandard
        ? ReblendNodeTypeDict.ReblendNodeStandard
        : ReblendNodeTypeDict.ReblendNode,
      element,
    )
    element.displayName = tagName
    if (isTagStandard || isReactNode) {
      NodeUtil.extendPrototype(element, Reblend.prototype)
    } else {
      const config = isLazyNode ? (vNode as any)?.config : clazz.config
      if (isLazyNode) {
        NodeUtil.extendPrototype(element, Reblend.prototype)
      } else {
        NodeUtil.extendPrototype(element, clazz.prototype)
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

    if (isLazyNode) {
      element.initState = (async () => {
        return (await (displayName || vNode)) as any
      }).bind(element)
    }

    if (isReactNode) {
      element.ReactClass = displayName as any
      NodeUtil.extendPrototype(element, ReblendReactClass.prototype)
    }
    element._constructor()
    if (!isTagStandard) {
      const isProduction = process.env.REBLEND_ENVIRONEMENT_PRODUCTION
      if (isReactNode) {
        element.setAttribute(REBLEND_WRAPPER_FOR_REACT_COMPONENT, isProduction ? '' : tagName)
      } else {
        element.setAttribute(REBLEND_COMPONENT, isProduction ? '' : tagName)
      }
    }

    if (isTagStandard && 'ref' in (vNode as ReblendTyping.VNode).props) {
      if ((vNode as ReblendTyping.VNode).props.ref && !(vNode as ReblendTyping.VNode).props.ref.current) {
        const ref = (vNode as ReblendTyping.VNode).props.ref
        const descriptor = Object.getOwnPropertyDescriptor(ref, 'current')

        if (typeof ref === 'function') {
          ref(element)
        } else if (!descriptor || descriptor.configurable) {
          Object.defineProperty(ref, 'current', {
            value: element,
            configurable: false,
            writable: false,
          })
        }
        element.ref = ref
      }
    }

    if (NodeUtil.isStandard(element) || isReactNode) {
      await PropertyUtil.setProps((vNode as ReblendTyping.VNode).props, element, true)
      await element.populateHtmlElements()
    } else {
      PropertyUtil.setProps(isLazyNode ? {} : (vNode as ReblendTyping.VNode).props, element, true)
        .then(async (returnedNode) => {
          if (returnedNode !== undefined) {
            if (!(returnedNode instanceof Node)) {
              returnedNode = BaseComponent.construct(
                returnedNode,
                isLazyNode ? (vNode as ReblendTyping.VNode).props : {},
              )
            }
            const doReplace = () => {
              NodeOperationUtil.replaceOperation(element, async (newOldNode) => {
                const returnedNodeElement = await ElementUtil.createElement(returnedNode)
                returnedNodeElement.forEach((element) => (element.directParent = newOldNode.directParent as any))
                NodeOperationUtil.replaceOldNode(returnedNodeElement as any, newOldNode)
              })
            }
            if (element.directParent) {
              doReplace()
            } else {
              element.awaitingLazyReplaceFn = doReplace
            }
          } else {
            await element.populateHtmlElements()
          }
        })
        .catch(console.error)
    }

    return [element]
  }

  /**
   * Creates a new Reblend primitive element.
   *
   * @returns {ReblendTyping.Primitive} The newly created Reblend primitive element.
   */
  static newReblendPrimitive(): Text & {
    setData: (data: ReblendTyping.Primitive) => Text
    getData: () => ReblendTyping.Primitive
  } {
    const text: any = document.createTextNode('') as any as ReblendTyping.Primitive
    NodeUtil.extendPrototype(text, Reblend.prototype)
    text.displayName = REBLEND_PRIMITIVE_ELEMENT_NAME

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
}
