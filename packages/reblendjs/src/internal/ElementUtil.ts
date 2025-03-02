/* eslint-disable @typescript-eslint/no-explicit-any */
import { REBLEND_PRIMITIVE_ELEMENT_NAME } from 'reblend-typing'
import { capitalize, isCallable, REBLEND_WRAPPER_FOR_REACT_COMPONENT } from '../common/utils'
import { DiffUtil } from './DiffUtil'
import { NodeUtil } from './NodeUtil'
import { PropertyUtil } from './PropertyUtil'
import { Reblend } from './Reblend'
import { ReblendReactClass } from './ReblendReactClass'

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
   * Retrieves the first standard element from a node, traversing its children if necessary.
   *
   * @param {ReblendTyping.Component} node - The starting node to search from.
   * @returns {HTMLElement | undefined} The first standard HTML element found, or `undefined` if none is found.
   */
  static getFirstStandardElementFrom(node: ReblendTyping.Component): HTMLElement | undefined {
    if (!node) {
      return
    }

    if (NodeUtil.isStandard(node) || NodeUtil.isReactToReblendRenderedNode(node)) {
      return node
    }

    if (node._firstStandardElement && node._firstStandardElement.parentNode) {
      return node._firstStandardElement
    }

    for (const child of node.htmlElements || []) {
      if (NodeUtil.isStandard(child)) {
        if (NodeUtil.isReactToReblendRenderedNode(child.directParent)) {
          return child.parentElement!
        }
        return child
      }

      const found = ElementUtil.getFirstStandardElementFrom(child)

      if (found) {
        return found
      }
    }
  }

  /**
   * Creates child nodes from the given VNode children and appends them to the container array.
   * Supports nested arrays, Sets, and various node types such as Reblend, DOM Nodes, React Nodes, and primitive values.
   *
   * @param {VNodeChildren} children - The children to process.
   * @param {(ReblendTyping.Component | HTMLElement)[]} [containerArr=[]] - The array to store the created child nodes.
   * @returns {(ReblendTyping.Component | HTMLElement)[]} The array containing the created child nodes.
   */
  static createChildren(
    children: VNodeChildren,
    containerArr: (ReblendTyping.Component | HTMLElement)[] = [],
  ): (ReblendTyping.Component | HTMLElement)[] {
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
        ElementUtil.createChildren(child as any, containerArr)
      } else if (
        child instanceof Reblend ||
        child instanceof Node ||
        NodeUtil.isPrimitive(child) ||
        NodeUtil.isReactToReblendVirtualNode(child) ||
        NodeUtil.isReblendVirtualNode(child) ||
        NodeUtil.isStandardVirtualNode(child)
      ) {
        const domChild = DiffUtil.deepFlat(ElementUtil.createElement(child as any))
        domChild && containerArr.push(...domChild)
      } else {
        throw new TypeError('Invalid child node in children')
      }
    }
    return containerArr
  }

  /**
   * Creates an element based on the provided virtual node (VNode) or primitive value.
   * The created element is returned as a `BaseComponent`.
   *
   * @param {VNode | VNode[] | ReactNode | Primitive} vNode - The virtual node or primitive to create an element from.
   * @returns {ReblendTyping.Component[]} The created `BaseComponent` instances.
   */
  static createElement(vNode: VNode | VNode[] | ReactNode | Primitive): ReblendTyping.Component[] {
    if (vNode instanceof Reblend || vNode instanceof Node) {
      if (!(vNode as any).displayName) {
        ;(vNode as any).displayName = capitalize((vNode as any as HTMLElement).tagName)
        NodeUtil.extendPrototype(vNode, Reblend.prototype)
        NodeUtil.addSymbol('ReblendNodeStandard', vNode)
        ;(vNode as any)._constructor()
      }
      return [vNode as any]
    }
    if (Array.isArray(vNode)) {
      return ElementUtil.createChildren(vNode) as any
    }
    if (NodeUtil.isPrimitive(vNode)) {
      return [ElementUtil.newReblendPrimitive().setData(vNode as Primitive)]
    }

    const { displayName } = vNode as VNode
    let clazz: typeof Reblend = displayName as any as typeof Reblend
    const isTagStandard = typeof displayName === 'string'
    const isReactNode = NodeUtil.isReactNode(displayName as any)

    const tagName = isTagStandard
      ? displayName
      : (NodeUtil.isReactNode(clazz) ? (clazz as any as ReactNode).displayName : clazz?.ELEMENT_NAME) || `Anonymous`

    isTagStandard || (clazz.ELEMENT_NAME = tagName)

    if (isReactNode) {
      clazz = ReblendReactClass as any
      clazz.ELEMENT_NAME = capitalize(`${(displayName as unknown as ReactNode).displayName}`)
    }

    const element: ReblendTyping.Component =
      isTagStandard || isReactNode
        ? (ElementUtil.createElementWithNamespace(isTagStandard ? displayName : 'div') as ReblendTyping.Component)
        : new clazz()

    NodeUtil.addSymbol(
      isReactNode ? 'ReactToReblendNode' : isTagStandard ? 'ReblendNodeStandard' : 'ReblendNode',
      element,
    )

    element.displayName = tagName
    if (isReactNode) {
      element.ReactClass = displayName
      NodeUtil.extendPrototype(element, Reblend.prototype)
      NodeUtil.extendPrototype(element, ReblendReactClass.prototype)
      element.setAttribute(REBLEND_WRAPPER_FOR_REACT_COMPONENT, '')
    }
    if (isTagStandard) {
      NodeUtil.extendPrototype(element, Reblend.prototype)
    }
    element._constructor()
    /* if (!isTagStandard) {
      if (isReactNode) {
        element.setAttribute(REBLEND_WRAPPER_FOR__ATTRIBUTE_NAME, process?.env?.REBLEND_DEVELEOPMENT ? tagName : '')
      } else {
        element.setAttribute(REBLEND_COMPONENT_ATTRIBUTE_NAME, process?.env?.REBLEND_DEVELEOPMENT ? tagName : '')
      }
    } */

    if (isTagStandard && 'ref' in (vNode as VNode).props) {
      if ((vNode as VNode).props.ref && !(vNode as VNode).props.ref.current) {
        const ref = (vNode as VNode).props.ref
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

    PropertyUtil.setProps((vNode as VNode).props, element, true)

    element.populateHtmlElements()
    return [element]
  }

  /**
   * Creates a new Reblend primitive element.
   *
   * @returns {ReblendPrimitive} The newly created Reblend primitive element.
   */
  static newReblendPrimitive(): ReblendPrimitive {
    const text: any = document.createTextNode('') as any as ReblendPrimitive
    NodeUtil.extendPrototype(text, Reblend.prototype)
    text.displayName = REBLEND_PRIMITIVE_ELEMENT_NAME

    /**
     * Sets the data of the Reblend primitive.
     *
     * @param {Primitive} data - The data to set.
     * @returns {ReblendPrimitive} The updated Reblend primitive.
     */
    text.setData = function (data: Primitive): ReblendPrimitive {
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
     * @returns {Primitive} The data of the Reblend primitive.
     */
    text.getData = function (): Primitive {
      return this.reblendPrimitiveData
    }

    return text
  }
}
