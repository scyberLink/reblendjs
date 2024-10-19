/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { attributeName, ReblendTyping, shouldUseSetAttribute } from 'reblend-typing'
import {
  capitalize,
  isCallable,
  REBLEND_CHILDREN_WRAPPER_FOR__ATTRIBUTE_NAME,
  REBLEND_COMPONENT_ATTRIBUTE_NAME,
  REBLEND_WRAPPER_FOR__ATTRIBUTE_NAME,
} from '../common/utils'
import { IAny } from '../interface/IAny'
import { IPair } from '../interface/IPair'
import { Reblend } from './Reblend'
import { cloneDeep, isEqual } from 'lodash'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { type Root } from 'react-dom/client'
import StyleUtil from './StyleUtil'

//@ts-ignore
import ReactDOM from 'react-dom/client'
//@ts-ignore
import React from 'react'
//@ts-ignore
import { createPortal, flushSync } from 'react-dom'

StyleUtil

export type ChildWithProps = {
  child: BaseComponent
  propsKey: string[]
}

export const ERROR_EVENTNAME = 'reblend-render-error'
export type ReblendRenderingException = Error & { component: BaseComponent }

interface PropPatch {
  type: 'REMOVE' | 'UPDATE'
  node: BaseComponent
  key: string
  propValue?: string
}

export type Primitive = boolean | null | number | string | undefined
export const REBLEND_PRIMITIVE_ELEMENT_NAME = 'ReblendPrimitive'

type VNodeChild = Primitive | VNode
type VNodeChildren = VNodeChild[]
type DomNodeChild = BaseComponent | ReblendPrimitive
type DomNodeChildren = DomNodeChild[]

interface ReactNode {
  $$typeof: symbol
  displayName: string
  render: (props: any) => any
}

interface VNode {
  [reblendVComponent: symbol]: boolean
  props: IAny & { children: VNodeChildren }
  displayName: string | typeof Reblend | ReactNode
}

enum PatchTypeAndOrder {
  NONE,
  REMOVE,
  TEXT,
  CREATE,
  REPLACE,
  UPDATE,
}

interface Patch {
  type: PatchTypeAndOrder
  newNode?: VNodeChild
  oldNode?: DomNodeChild
  parent?: BaseComponent
  patches?: PropPatch[]
}

enum ChildrenPropsUpdateType {
  NON_CHILDREN,
  CHILDREN,
}

const ReblendNode = Symbol('Reblend.Node')
const ReblendVNode = Symbol('Reblend.VNode')

const ReactToReblendNode = Symbol('React.Reblend.Node')
const ReactToReblendVNode = Symbol('React.Reblend.VNode')

const ReblendNodeStandard = Symbol('Reblend.Node.Standard')
const ReblendVNodeStandard = Symbol('Reblend.VNode.Standard')

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface BaseComponent extends HTMLElement {
  displayName: string
  [reblendComponent: symbol]: boolean
  //[stateKey: string]: any;
}

export interface ReblendPrimitive extends BaseComponent {
  reblendPrimitiveData: any
  setData(data: Primitive): this
  getData(): Primitive
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class BaseComponent {
  /**
   * Used to identify the component, similar to `displayName`.
   * This can also be used to track components that have changed.
   *
   * @static
   * @type {string}
   */
  static ELEMENT_NAME = 'BaseComponent'

  /**
   * Holds the props (properties) of the component.
   * Can be any type of object containing the default component's configuration.
   *
   * @static
   * @type {IAny}
   */
  static props: IAny

  /**
   * A static class that extends the functionality of `BaseComponent`
   * to provide integration with React and Reblend.
   */
  private static ReblendReactClass = class extends BaseComponent {
    reactDomCreateRoot_root?: Root

    /**
     * Constructor for `ReblendReactClass`.
     */
    constructor() {
      super()
    }

    /**
     * Returns the virtual node (VNode) or children VNodes of the component, used in React's render function.
     *
     * @protected
     * @returns {VNode | VNodeChildren} The virtual node representing the component's HTML structure.
     */
    protected html(): VNode | VNodeChildren {
      return this.props.children
    }

    /**
     * Sets the container for rendering standard Reblend nodes and initializes the root React DOM.
     *
     * @param {HTMLElement} node - The HTML element to be set as the Reblend React standard container.
     * @protected
     */
    protected setReblendReactStandardContainer(node: HTMLElement): void {
      this.reblendReactStandardContainer = node
      this.initRoot()
    }

    /**
     * Initializes the root for React DOM rendering if it has not been created already.
     */
    initRoot(): void {
      if (!this.reactDomCreateRoot_root || !Object.values(this.reactDomCreateRoot_root)[0]) {
        this.reactDomCreateRoot_root = ReactDOM.createRoot(this)
      }
    }

    /**
     * Checks for any changes in the props and updates the component accordingly.
     * React Reblend nodes can trigger different updates based on the type of children or non-children changes.
     *
     * @async
     * @returns {Promise<void>}
     * @throws {Error} Throws an error if an invalid props update type is provided.
     */
    async checkPropsChange(): Promise<void> {
      for (const type of Array.from(this.childrenPropsUpdate || []).sort()) {
        this.childrenPropsUpdate?.delete(type)

        switch (type) {
          case ChildrenPropsUpdateType.CHILDREN:
            await this.onStateChange()
            break

          case ChildrenPropsUpdateType.NON_CHILDREN:
            /* await */ this.reactReblendMount()
            break

          default:
            throw new Error('Invalid props update type provided')
        }
      }
    }

    /**
     * Returns a React element that wraps the children of the current component for rendering in React.
     * It ensures that child elements are properly attached to the standard parent container.
     *
     * @returns {React.ReactElement} The React element representing the children wrapper for React.
     */
    getChildrenWrapperForReact(): React.ReactElement {
      const children = this.htmlElements || []
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const thiz = this
      const displayName = this.displayName || ''
      return React.createElement(
        class extends React.Component {
          containerRef: React.RefObject<HTMLDivElement>

          constructor(props) {
            super(props)
            this.containerRef = React.createRef()
          }

          componentDidMount(): void {
            if (this.containerRef.current) {
              const standardParent: HTMLElement = this.containerRef.current.parentElement!
              thiz.reactElementChildrenParent = standardParent
              let _afterNode: HTMLElement = this.containerRef.current
              for (const child of children || []) {
                if (BaseComponent.isStandard(child)) {
                  _afterNode.after(child)
                  _afterNode = child
                  new Promise<void>((resolve) => {
                    BaseComponent.attachElementsAt(child, child as BaseComponent, null)
                    resolve()
                  })
                } else {
                  _afterNode =
                    BaseComponent.attachElementsAt(standardParent!, child as BaseComponent, _afterNode) || _afterNode
                }
              }
              standardParent?.removeChild(this.containerRef.current!)
              delete (standardParent as any).removeChild
              ;(standardParent as any).removeChild = () => {}
              ;(<any>standardParent)._removeChild = (node) =>
                HTMLElement.prototype.removeChild.call(standardParent, node)
            }
          }

          render() {
            return React.createElement(
              'div',
              {
                [REBLEND_CHILDREN_WRAPPER_FOR__ATTRIBUTE_NAME]: displayName,
                ref: this.containerRef,
              },
              null,
            )
          }
        },
      )
    }

    /**
     * Mounts the React Reblend component by rendering it using the React DOM root and creating a portal
     * to the standard Reblend React container.
     *
     * @protected
     */
    protected reactReblendMount(replacementAfterNode?: HTMLElement): void {
      this.catchErrorFrom(() => {
        if (!this.reblendReactStandardContainer || !this.ReactClass) {
          return
        }
        this.initRoot()

        const warn = window.console.warn
        const error = window.console.error
        const log = window.console.log

        window.console.warn = () => {}
        window.console.error = () => {}
        window.console.log = () => {}

        flushSync(() => {
          this.reactDomCreateRoot_root?.render(
            createPortal(
              React.createElement('div', {
                ref: (node) => {
                  if ((node as any)?.refRunned) {
                    return
                  }
                  let childNodes = Array.from(node?.childNodes || [])
                  if (node) {
                    if (replacementAfterNode) {
                      replacementAfterNode.after(node)
                    }
                    this.reactElement = []
                    let afterNode = node
                    const parent = node.parentElement
                    for (const child of childNodes) {
                      afterNode?.after(child)
                      afterNode = child as any
                      this.reactElement.push(child as any)
                    }
                    node.appendChild = (n: any) => {
                      const _afterNode = [...(this.reactElement || [])]
                        .reverse()
                        .find((reverseNode) => !!reverseNode.parentElement)
                      if (_afterNode) {
                        _afterNode?.after(n)
                      } else {
                        parent?.appendChild(n)
                      }
                      this.reactElement?.push(n)
                      return n
                    }
                    node.removeChild = (n: any) => {
                      n.remove()
                      const indexOfNInReactElement = this.reactElement?.indexOf(n!)

                      if (indexOfNInReactElement! > -1) {
                        // Remove the old node
                        this.reactElement?.splice(indexOfNInReactElement!, 1)
                      }
                      return n
                    }
                    node?.remove()
                    if (replacementAfterNode) {
                      replacementAfterNode.remove()
                    }
                    ;(node as any).refRunned = true
                  } else {
                    childNodes.forEach((child) => {
                      const indexOfNInReactElement = this.reactElement?.indexOf(child as any)

                      if (indexOfNInReactElement! > -1) {
                        // Remove the old node
                        this.reactElement?.splice(indexOfNInReactElement!, 1)
                      }
                    })
                    childNodes = null as any
                  }
                },
                style: { display: 'none' },
                children: React.createElement(this.ReactClass, {
                  ...this.props,
                  children: !this.props?.children?.length ? undefined : this.getChildrenWrapperForReact(),
                }),
              }),
              this.reblendReactStandardContainer,
            ),
          )
        })

        window.console.warn = warn
        window.console.error = error
        window.console.log = log
      })
    }

    /**
     * Cleans up the component by resetting the React DOM root and calling the parent class's cleanup method.
     *
     * @protected
     */
    protected cleanUp(): void {
      this.reactDomCreateRoot_root?.unmount()
      this.reactDomCreateRoot_root = null as any
      super.cleanUp()
    }
  }

  /**
   * Retrieves the first standard element from a node, traversing its children if necessary.
   *
   * @param {BaseComponent} node - The starting node to search from.
   * @returns {HTMLElement | undefined} The first standard HTML element found, or `undefined` if none is found.
   */
  static getFirstStandardElementFrom(node: BaseComponent): HTMLElement | undefined {
    if (!node) {
      return
    }

    if (BaseComponent.isStandard(node)) {
      return node
    }

    if (BaseComponent.isReactToReblendRenderedNode(node)) {
      return (node.reactElement && node?.reactElement[0])!
    }

    if (node._firstStandardElement && node._firstStandardElement.parentNode) {
      return node._firstStandardElement
    }

    for (const child of node.htmlElements || []) {
      if (BaseComponent.isStandard(child)) {
        if (BaseComponent.isReactToReblendRenderedNode(child.directParent)) {
          return child.parentElement!
        }
        return child
      }

      const found = BaseComponent.getFirstStandardElementFrom(child)

      if (found) {
        return found
      }
    }
  }

  /**
   * Extends the prototype of the target object with the provided prototype, skipping constructors and existing functions.
   *
   * @param {any} target - The target object to extend.
   * @param {any} prototype - The prototype object to copy properties and methods from.
   */
  static extendPrototype(target: any, prototype: any): void {
    // If there's a prototype chain, continue copying from the prototype chain
    const proto = Object.getPrototypeOf(prototype)
    if (proto && proto !== Object.prototype) {
      BaseComponent.extendPrototype(target, proto)
    }

    const descriptors = Object.getOwnPropertyDescriptors(prototype)

    for (const key in descriptors) {
      if (Object.prototype.hasOwnProperty.call(descriptors, key)) {
        // Skip the constructor
        if (key === 'constructor') continue

        const descriptor = descriptors[key]

        // Avoid replacing existing functions on the target
        //if (!(key in target) || (typeof descriptor.value !== 'function' && !(key in target))) {
        Object.defineProperty(target, key, descriptor)
        //}
      }
    }
  }

  /**
   * Checks if the given element has a name other than 'BaseComponent'.
   *
   * @param {typeof BaseComponent} element - The element to check.
   * @returns {boolean} `true` if the element has a name and it is not 'BaseComponent', otherwise `false`.
   */
  static hasName(element: typeof BaseComponent): boolean {
    return !!(element?.ELEMENT_NAME && element.ELEMENT_NAME !== 'BaseComponent')
  }

  /**
   * Wraps an event callback function, ensuring that the event callback is always called.
   *
   * @param {(e: Event) => any} [eventCallback=() => {}] - The event callback to be wrapped.
   * @returns {(e: Event) => void} A function that invokes the event callback.
   */
  static fn(eventCallback: (e: Event) => any = () => {}): (e: Event) => void {
    return (e) => eventCallback && eventCallback(e)
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
   * Sets properties on the target component, updating attributes and handling special cases like events and style.
   *
   * @param {IAny} props - The properties to set.
   * @param {BaseComponent} to - The target component to apply the properties to.
   * @param {boolean} init - Whether this is an initial setting of properties.
   */
  static setProps(props: IAny, to: BaseComponent, init: boolean): void {
    if (props && to) {
      if (init && to.initProps) {
        to.initProps(props, to)
      } else {
        to.props = { ...(to.props || {}), ...(props || {}) }
      }

      if (BaseComponent.isReblendRenderedNodeStandard(to)) {
        for (const propName in props) {
          const _attributeName = attributeName(propName)
          const propValue = props[propName]
          if (propName == 'dangerouslySetInnerHTML') {
            to.innerHTML = propValue?.__html
          } else if (propName.startsWith('on')) {
            to[_attributeName] = BaseComponent.fn(propValue) as any
          } else {
            if (_attributeName === 'style') {
              to.addStyle(propValue)
            } else {
              const _shouldUseSetAttribute = shouldUseSetAttribute(_attributeName)
              try {
                if (_shouldUseSetAttribute) {
                  BaseComponent.setAttributesWithNamespace(to, {
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
        to.initState()
      }
    }
  }

  /**
   * Removes specified properties from the `to` component and removes the corresponding attributes.
   * If a property is to be removed using `setAttribute`, it will also be removed from `props`.
   *
   * @param {IAny} props - The properties to remove from the component.
   * @param {BaseComponent} to - The target component from which to remove the properties.
   */
  static removeProps(props: IAny, to: BaseComponent): void {
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

  /**
   * Checks if the provided node is a rendered Reblend node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a rendered Reblend node, otherwise `false`.
   */
  static isReblendRenderedNode(node: any): boolean {
    return typeof node !== 'string' && node![ReblendNode]
  }

  /**
   * Checks if the provided node is a virtual Reblend node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a virtual Reblend node, otherwise `false`.
   */
  static isReblendVirtualNode(node: any): boolean {
    return typeof node !== 'string' && node![ReblendVNode]
  }

  /**
   * Checks if the provided node is a standard rendered Reblend node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a standard rendered Reblend node, otherwise `false`.
   */
  static isReblendRenderedNodeStandard(node: any): boolean {
    return typeof node !== 'string' && node![ReblendNodeStandard]
  }

  /**
   * Checks if the provided node is a standard virtual Reblend node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a standard virtual Reblend node, otherwise `false`.
   */
  static isReblendVirtualNodeStandard(node: any): boolean {
    return typeof node !== 'string' && node![ReblendVNodeStandard]
  }

  /**
   * Checks if the provided node is a React to Reblend rendered node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a React to Reblend rendered node, otherwise `false`.
   */
  static isReactToReblendRenderedNode(node: any): boolean {
    return typeof node !== 'string' && node![ReactToReblendNode]
  }

  /**
   * Checks if the provided node is a React to Reblend virtual node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a React to Reblend virtual node, otherwise `false`.
   */
  static isReactToReblendVirtualNode(node: any): boolean {
    return typeof node !== 'string' && node![ReactToReblendVNode]
  }

  /**
   * Checks if the provided node is a standard virtual node.
   *
   * @param {any} node - The node to check.
   * @returns {boolean} `true` if the node is a standard virtual node, otherwise `false`.
   */
  static isStandardVirtualNode(node: any): boolean {
    return typeof node !== 'string' && node![ReblendVNodeStandard]
  }

  /**
   * Checks if the provided element is a Reblend primitive element.
   *
   * @param {any} element - The element to check.
   * @returns {boolean} `true` if the element is a Reblend primitive element, otherwise `false`.
   */
  static isReblendPrimitiveElement(element: any): boolean {
    return !BaseComponent.isPrimitive(element) && element.displayName === REBLEND_PRIMITIVE_ELEMENT_NAME
  }

  /**
   * Creates a new Reblend primitive element.
   *
   * @returns {ReblendPrimitive} The newly created Reblend primitive element.
   */
  static newReblendPrimitive(): ReblendPrimitive {
    const text: ReblendPrimitive = document.createTextNode('') as any as ReblendPrimitive
    BaseComponent.extendPrototype(text, Reblend.prototype)
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

  /**
   * Checks if the provided display name represents a React node.
   *
   * @param {IAny} displayName - The display name to check.
   * @returns {boolean} `true` if the display name represents a React node, otherwise `false`.
   */
  static isReactNode(displayName: IAny): boolean {
    return (
      displayName &&
      typeof displayName !== 'string' &&
      ('$$typeof' in displayName ||
        (displayName.prototype && displayName.prototype.isReactComponent) ||
        (isCallable(displayName) && !(displayName instanceof Reblend)))
    )
  }

  /**
   * Deeply flattens an array or set of elements.
   *
   * @template T
   * @param {T[] | Set<T>} data - The data to flatten.
   * @returns {T[]} A flattened array of elements.
   */
  static deepFlat<T>(data: T[] | Set<T>): T[] {
    if (!data) {
      return []
    }
    if (!(data instanceof Set) && !Array.isArray(data)) {
      data = [data]
    }
    const ts: T[] = []
    for (const t of data) {
      if (t instanceof Set || Array.isArray(t)) {
        ts.push(...BaseComponent.deepFlat(t))
      } else {
        ts.push(t)
      }
    }
    return ts
  }

  /**
   * Checks if the given object is an array-like structure by verifying that it contains array-specific methods and properties.
   *
   * @param {unknown} obj - The object to check.
   * @returns {boolean} `true` if the object is an array-like structure, otherwise `false`.
   */
  static isArray(obj: unknown): boolean {
    const arrayProperties = ['pop', 'push', 'length', 'shift', 'unshift', 'splice', 'slice', 'find', 'includes']
    return typeof obj === 'object' && arrayProperties.every((property) => property in obj!)
  }

  /**
   * Flattens a nested array or set of virtual nodes (VNode) and adds the result to the `containerArr`.
   *
   * @template T
   * @param {(T | T[])[] | Set<T | T[]>} arr - The array or set of VNode children to flatten.
   * @param {T[]} [containerArr=[]] - The container array to store flattened nodes.
   * @returns {T[]} The flattened array of VNode children.
   */
  static flattenVNodeChildren<T>(arr: (T | T[])[] | Set<T | T[]>, containerArr: T[] = []): T[] {
    if (!arr) {
      return []
    }

    if (!Array.isArray(arr)) {
      arr = [arr as any]
    }

    if ((arr.length || (arr as any).size) < 1) {
      return []
    }

    for (const item of arr) {
      if (item instanceof Set || Array.isArray(item)) {
        BaseComponent.flattenVNodeChildren(item as T[], containerArr)
      } else {
        containerArr.push(item as T)
      }
    }

    return containerArr
  }

  /**
   * Constructs a VNode from the provided display name, props, and children.
   * If the display name is an array, it will return that array.
   * Otherwise, it constructs a new VNode using the provided properties.
   *
   * @param {typeof Reblend | string | VNode[]} displayName - The display name or class for the VNode.
   * @param {IAny} props - The props to pass to the VNode.
   * @param {...VNodeChildren} children - The children to include in the VNode.
   * @returns {VNode | VNodeChildren} The constructed VNode or VNode children.
   */
  static construct(
    displayName: typeof Reblend | string | VNode[],
    props: IAny,
    ...children: VNodeChildren
  ): VNode | VNodeChildren {
    if (Array.isArray(displayName)) {
      return displayName as []
    }
    const clazz: typeof Reblend = displayName as typeof Reblend
    const isTagStandard = typeof displayName === 'string'
    if (!isTagStandard && clazz.ELEMENT_NAME === 'Fragment') {
      return children || []
    }

    if (
      (clazz?.props?.children && !Array.isArray(clazz?.props?.children)) ||
      (props?.children && !Array.isArray(props?.children))
    ) {
      throw new Error('Children props must be an array of ReblendNode or HTMLElement')
    }

    const mergedProp = {
      ...(!isTagStandard && clazz.props ? clazz.props : {}),
      ...props,
      children: [...(clazz?.props?.children || []), ...(props?.children || []), ...(children || [])],
    }

    const velement = {
      [isTagStandard ? ReblendVNodeStandard : BaseComponent.isReactNode(clazz) ? ReactToReblendVNode : ReblendVNode]:
        true,
      displayName: clazz,
      props: mergedProp,
    }

    return velement
  }

  /**
   * Checks if the provided data is a primitive type.
   * Primitive types include string, number, boolean, bigint, null, undefined, and symbol.
   *
   * @param {any} data - The data to check.
   * @returns {boolean} `true` if the data is a primitive, otherwise `false`.
   */
  static isPrimitive(data: any): boolean {
    const primitves = ['string', 'number', 'boolean', 'bigint', 'null', 'undefined', 'symbol']
    const dataType = typeof data
    return primitves.some((primitve) => primitve === (data === null ? 'null' : dataType))
  }

  /**
   * Creates child nodes from the given VNode children and appends them to the container array.
   * Supports nested arrays, Sets, and various node types such as Reblend, DOM Nodes, React Nodes, and primitive values.
   *
   * @param {VNodeChildren} children - The children to process.
   * @param {(BaseComponent | HTMLElement)[]} [containerArr=[]] - The array to store the created child nodes.
   * @returns {(BaseComponent | HTMLElement)[]} The array containing the created child nodes.
   */
  protected static createChildren(
    children: VNodeChildren,
    containerArr: (BaseComponent | HTMLElement)[] = [],
  ): (BaseComponent | HTMLElement)[] {
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
        BaseComponent.createChildren(child as any, containerArr)
      } else if (
        child instanceof Reblend ||
        child instanceof Node ||
        BaseComponent.isPrimitive(child) ||
        BaseComponent.isReactToReblendVirtualNode(child) ||
        BaseComponent.isReblendVirtualNode(child) ||
        BaseComponent.isStandardVirtualNode(child)
      ) {
        const domChild = BaseComponent.deepFlat(BaseComponent.createElement(child as any))
        domChild && containerArr.push(...domChild)
      } else {
        throw new TypeError('Invalid child node in children')
      }
    }
    return containerArr
  }

  /**
   * Mounts the given component or function component to the DOM at the specified element ID.
   * The component is constructed and its elements are attached to the DOM root.
   *
   * @param {string} elementId - The ID of the DOM element where the component should be mounted.
   * @param {typeof Reblend | ReblendTyping.FunctionComponent} app - The component or function component to mount.
   * @param {IAny} [props] - Optional props to pass to the component.
   * @returns {Promise<void>} A promise that resolves when the component is mounted.
   * @throws {Error} If the specified element ID is invalid.
   */
  static async mountOn(
    elementId: string,
    app: typeof Reblend | ReblendTyping.FunctionComponent,
    props?: IAny,
  ): Promise<void> {
    const root = document.getElementById(elementId)
    if (!root) {
      throw new Error('Invalid root id')
    }
    const vNodes = BaseComponent.construct(app as any, props || {}, ...[])
    const nodes: BaseComponent[] = BaseComponent.createChildren(
      Array.isArray(vNodes) ? (vNodes as any) : [vNodes],
    ) as any
    for (const node of nodes) {
      if (BaseComponent.isStandard(node)) {
        root.appendChild(node)
        new Promise<void>((resolve) => {
          BaseComponent.attachElementsAt(node, node, null)
          resolve()
        })
      } else {
        BaseComponent.attachElementsAt(root, node, null)
      }
    }
  }

  /**
   * Detaches the given node from the DOM.
   * If the node is a primitive, the function returns immediately.
   * If the node has a `disconnectedCallback`, it will be invoked.
   * Otherwise, it will be removed from the DOM.
   *
   * @param {BaseComponent | HTMLElement} node - The node to detach.
   */
  private static detach(node: BaseComponent | HTMLElement) {
    if (BaseComponent.isPrimitive(node)) return
    if (BaseComponent.isNonStandard(node)) {
      ;(node as any as BaseComponent).disconnectedCallback()
    } else {
      if (node.parentNode) {
        node.parentNode?.removeChild(node)
        ;(node.parentNode as any)?._removeChild && (node.parentNode as any)?._removeChild(node)
      }
      if (node?.remove) {
        node?.remove()
      }
      //BaseComponent.detachChildren(node as any)
    }
  }

  /**
   * Detaches all child nodes and HTML elements from the given `BaseComponent`.
   * If the node is a primitive, the function returns immediately.
   *
   * @param {BaseComponent} node - The parent node from which children will be detached.
   */
  private static detachChildren(node: BaseComponent) {
    if (BaseComponent.isPrimitive(node)) return
    for (const child of node.childNodes || []) {
      this.detach(child as any)
    }
    for (const htmlElement of node.htmlElements || []) {
      this.detach(htmlElement as any)
    }
  }

  /**
   * Calls `connectedCallback` on the node if it exists, signaling that the node has been connected to the DOM.
   *
   * @template T
   * @param {T | undefined} node - The node to connect.
   */
  static connected<T extends BaseComponent | HTMLElement>(node: T | undefined) {
    if (!node) return
    if ((node as BaseComponent).connectedCallback) {
      ;(node as BaseComponent).connectedCallback()
    }
  }

  /**
   * Creates an element based on the provided virtual node (VNode) or primitive value.
   * The created element is returned as a `BaseComponent`.
   *
   * @param {VNode | VNode[] | ReactNode | Primitive} vNode - The virtual node or primitive to create an element from.
   * @returns {BaseComponent[]} The created `BaseComponent` instances.
   */
  static createElement(vNode: VNode | VNode[] | ReactNode | Primitive): BaseComponent[] {
    if (vNode instanceof Reblend || vNode instanceof Node) {
      if (!(vNode as any).displayName) {
        ;(vNode as any).displayName = capitalize((vNode as any as HTMLElement).tagName)
        BaseComponent.extendPrototype(vNode, Reblend.prototype)
        ;(vNode as any)[ReblendNodeStandard] = true
        ;(vNode as any)._constructor()
      }
      return [vNode as any]
    }
    if (Array.isArray(vNode)) {
      return BaseComponent.createChildren(vNode) as any
    }
    if (BaseComponent.isPrimitive(vNode)) {
      return [BaseComponent.newReblendPrimitive().setData(vNode as Primitive)]
    }

    const { displayName } = vNode as VNode
    let clazz: typeof Reblend = displayName as any as typeof Reblend
    const isTagStandard = typeof displayName === 'string'
    const isReactNode = BaseComponent.isReactNode(displayName as any)

    const tagName = isTagStandard
      ? displayName
      : (BaseComponent.isReactNode(clazz) ? (clazz as any as ReactNode).displayName : clazz?.ELEMENT_NAME) ||
        `Anonymous`

    isTagStandard || (clazz.ELEMENT_NAME = tagName)

    if (isReactNode) {
      clazz = BaseComponent.ReblendReactClass as any
      clazz.ELEMENT_NAME = capitalize(`${(displayName as unknown as ReactNode).displayName}`)
    }

    const element: Reblend = BaseComponent.createElementWithNamespace(
      isTagStandard ? (displayName as string) : 'div',
    ) as Reblend

    element[isReactNode ? ReactToReblendNode : isTagStandard ? ReblendNodeStandard : ReblendNode] = true
    element.displayName = tagName
    if (isReactNode) {
      element.ReactClass = displayName
    }
    if (isTagStandard) {
      BaseComponent.extendPrototype(element, Reblend.prototype)
    } else {
      BaseComponent.extendPrototype(element, clazz.prototype)
    }
    element._constructor()
    if (!isTagStandard) {
      if (isReactNode) {
        element.setAttribute(REBLEND_WRAPPER_FOR__ATTRIBUTE_NAME, process?.env?.REBLEND_DEVELEOPMENT ? tagName : '')
      } else {
        element.setAttribute(REBLEND_COMPONENT_ATTRIBUTE_NAME, process?.env?.REBLEND_DEVELEOPMENT ? tagName : '')
      }
    }

    if (isTagStandard && 'ref' in (vNode as VNode).props) {
      if ((vNode as VNode).props.ref) {
        const ref = (vNode as VNode).props.ref
        delete (vNode as VNode).props.ref
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

    BaseComponent.setProps((vNode as VNode).props, element, true)

    element.populateHtmlElements()
    return [element]
  }

  /**
   * Attaches the reblendElement to the standardElement.
   * If the reblendElement is React-based, it sets the container and mounts it.
   * Otherwise, it iterates over the HTML elements of the reblendElement and recursively attaches them.
   *
   * @param {HTMLElement} standardElement - The standard HTML element to which the reblendElement is attached.
   * @param {BaseComponent} reblendElement - The reblend element (ReblendNode or ReactNode) to be attached.
   */
  static attachElementsAt(
    standardElement: HTMLElement,
    reblendElement: BaseComponent,
    insertAfter: HTMLElement | null,
  ) {
    if (!reblendElement?.htmlElements || !standardElement) {
      return
    }

    if (BaseComponent.isReactToReblendRenderedNode(reblendElement)) {
      standardElement.removeChild = (node: any) => {
        node.remove()
        return node
      }
      reblendElement.setReblendReactStandardContainer(standardElement)
      reblendElement.reactReblendMount()
      return
    }

    for (const htmlElement of reblendElement.htmlElements || []) {
      if (BaseComponent.isStandard(htmlElement)) {
        if (insertAfter) {
          insertAfter?.after(htmlElement)
          insertAfter = htmlElement
        } else {
          standardElement?.appendChild(htmlElement)
        }
        new Promise<void>((resolve) => {
          BaseComponent.attachElementsAt(htmlElement, htmlElement, null)
          resolve()
        })
      } else if (BaseComponent.isReactToReblendRenderedNode(htmlElement)) {
        insertAfter = BaseComponent.attachElementsAt(standardElement, htmlElement, insertAfter) || insertAfter
      } else {
        const standardElementsFromCustomElement = htmlElement.getAttachableElements()
        htmlElement.firstStandardElement = standardElementsFromCustomElement[0]
        insertAfter = BaseComponent.attachElementsAt(standardElement, htmlElement, insertAfter) || insertAfter
        htmlElement.nearestStandardParent = standardElement
        BaseComponent.connected(htmlElement)
      }
    }
    reblendElement.nearestStandardParent = standardElement
    BaseComponent.connected(reblendElement)
    return insertAfter
  }

  /**
   * Replaces the old node with a new node or nodes.
   * Handles scenarios where old and new nodes may be React-based or standard HTML.
   *
   * @param {BaseComponent | BaseComponent[]} newNode - The new node(s) to replace the old node.
   * @param {BaseComponent} oldNode - The old node to be replaced.
   * @returns {BaseComponent | null} - The last inserted node after replacement, or null if none.
   */
  private static replaceOldNode(
    newNode: BaseComponent | BaseComponent[],
    oldNode: BaseComponent,
  ): BaseComponent | null {
    if (BaseComponent.isNonStandard(oldNode)) {
      oldNode = oldNode.firstStandardElement as BaseComponent
    }
    if (!newNode || !oldNode) {
      return null
    }
    !Array.isArray(newNode) && (newNode = [newNode])
    let lastInsertedNode: BaseComponent | null = null
    let firstStandardElement: HTMLElement | undefined

    for (const n of newNode) {
      if (!BaseComponent.isReblendRenderedNodeStandard(n) && !BaseComponent.isReblendPrimitiveElement(n)) {
        n.nearestStandardParent = (lastInsertedNode || oldNode).parentElement as any
        if (BaseComponent.isReactToReblendRenderedNode(n)) {
          const textNode = document.createTextNode('')
          ;(lastInsertedNode || oldNode).after(textNode)
          ;(lastInsertedNode || oldNode).parentElement &&
            ((lastInsertedNode || oldNode).parentElement!.removeChild = (node: any) => {
              node.remove()
              return node
            })
          n.setReblendReactStandardContainer((lastInsertedNode || oldNode).parentElement!)
          n.reactReblendMount(textNode as any)
        } else {
          lastInsertedNode = this.replaceOldNode(n.htmlElements!, lastInsertedNode || oldNode)
          if (!firstStandardElement) {
            firstStandardElement = lastInsertedNode as any
          }
        }
        BaseComponent.connected(n)
      } else {
        ;(lastInsertedNode || oldNode).after(n)
        lastInsertedNode = n
        if (!firstStandardElement) {
          firstStandardElement = n
        }
        new Promise<void>((resolve) => {
          BaseComponent.attachElementsAt(n, n, null)
          resolve()
        })
      }
    }
    newNode.forEach((nn) => (nn.firstStandardElement = firstStandardElement))
    return lastInsertedNode
  }

  /**
   * Checks if a node is a standard HTML element or a Reblend primitive element.
   *
   * @param {BaseComponent | HTMLElement} node - The node to check.
   * @returns {boolean} - True if the node is standard or a Reblend primitive element, false otherwise.
   */
  static isStandard(node: BaseComponent | HTMLElement) {
    if (!node) {
      return false
    }
    return BaseComponent.isReblendRenderedNodeStandard(node) || BaseComponent.isReblendPrimitiveElement(node)
  }

  /**
   * Checks if a node is a Reblend HTML element or a Reblend React HTML element.
   *
   * @param {BaseComponent | HTMLElement} node - The node to check.
   * @returns {boolean} - True if the node is Reblend or a Reblend React element, false otherwise.
   */
  static isNonStandard(node: BaseComponent | HTMLElement) {
    if (!node) {
      return false
    }
    return BaseComponent.isReblendRenderedNode(node) || BaseComponent.isReactToReblendRenderedNode(node)
  }

  /**
   * Creates patches to create or remove nodes by comparing oldNode and newNode.
   *
   * @param {BaseComponent} parent - The parent node.
   * @param {DomNodeChild} oldNode - The old node.
   * @param {VNodeChild} newNode - The new node.
   * @returns {Patch[]} - The array of patches.
   */
  static diffCreateOrRemove(parent: BaseComponent, oldNode: DomNodeChild, newNode: VNodeChild) {
    const patches: Patch[] = []
    if (
      !BaseComponent.isPrimitive(oldNode) &&
      Object.hasOwn(oldNode, 'reblendPrimitiveData') &&
      (oldNode as ReblendPrimitive).reblendPrimitiveData == newNode
    ) {
      return []
    }
    if (!oldNode) {
      patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
    } else if (!newNode) {
      patches.push({ type: PatchTypeAndOrder.REMOVE, parent, oldNode })
    }
    return patches
  }

  /**
   * Diffs oldNode and newNode to generate patches that represent the changes between them.
   *
   * @param {BaseComponent} parent - The parent node.
   * @param {DomNodeChild} oldNode - The old node.
   * @param {VNodeChild} newNode - The new node.
   * @returns {Patch[]} - The array of patches.
   */
  static diff(parent: BaseComponent, oldNode: DomNodeChild, newNode: VNodeChild): Patch[] {
    const patches: Patch[] = []
    if (isCallable(oldNode) || isCallable(newNode)) {
      return []
    }

    if (BaseComponent.isPrimitive(oldNode) && BaseComponent.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
    } else if (BaseComponent.isPrimitive(oldNode) && !BaseComponent.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
    } else if (BaseComponent.isReblendPrimitiveElement(oldNode) && BaseComponent.isPrimitive(newNode)) {
      if ((<ReblendPrimitive>oldNode).getData() !== newNode) {
        ;(<ReblendPrimitive>oldNode).setData(newNode as Primitive)
      }
    } else if (BaseComponent.isReblendPrimitiveElement(oldNode) && !BaseComponent.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    } else if (BaseComponent.isTextNode(oldNode) && BaseComponent.isPrimitive(newNode)) {
      if (oldNode.textContent !== newNode) {
        patches.push({ type: PatchTypeAndOrder.TEXT, newNode, oldNode })
      }
    } else if (BaseComponent.isTextNode(oldNode) && !BaseComponent.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    } else if (!BaseComponent.isReblendPrimitiveElement(oldNode) && BaseComponent.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    } else if (BaseComponent.isEmpty(oldNode) && !BaseComponent.isEmpty(newNode)) {
      patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
    } else if (!BaseComponent.isEmpty(oldNode) && BaseComponent.isEmpty(newNode)) {
      patches.push({ type: PatchTypeAndOrder.REMOVE, parent, oldNode })
    } else if (oldNode?.props?.key !== (newNode as any)?.props?.key) {
      patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    } else if ('displayName' in oldNode && 'displayName' in (newNode as any)) {
      const oldNodeTag = ((oldNode as BaseComponent).displayName as string).toLowerCase()
      const newNodeTag = (
        (BaseComponent.isPrimitive((newNode as VNode).displayName)
          ? (newNode as VNode).displayName
          : ((newNode as VNode).displayName as typeof Reblend).ELEMENT_NAME ||
            ((newNode as VNode).displayName as any).displayName) as string
      ).toLowerCase()

      if (oldNodeTag !== newNodeTag) {
        patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
      } else {
        const propsDiff = BaseComponent.diffProps(newNode as VNode, oldNode as BaseComponent)
        if (propsDiff && propsDiff.length > 0) {
          patches.push({
            type: PatchTypeAndOrder.UPDATE,
            patches: propsDiff,
          })
        }
        patches.push(
          ...BaseComponent.diffChildren(oldNode as BaseComponent, oldNode as BaseComponent, newNode as VNode),
        )
      }
    }

    return patches
  }

  /**
   * Diffs the props of the newNode and oldNode to generate a list of prop changes.
   *
   * @param {VNode} newNode - The new virtual node.
   * @param {BaseComponent} oldNode - The old base component node.
   * @returns {any[]} - The array of property differences.
   */
  static diffProps(newNode: VNode, oldNode: BaseComponent) {
    const ignoredProps = ['key', 'children', 'ref']

    const patches: PropPatch[] = []
    const oldProps: IAny = oldNode?.props || []
    const newProps: IAny = newNode?.props || []
    const isReblendNode = BaseComponent.isReblendRenderedNode(oldNode)
    for (const key in newProps) {
      if (!ignoredProps.includes(key) || (key === 'children' && isReblendNode)) {
        let oldProp = oldProps[key]
        let newProp = newProps[key]
        if (!this.deepCompare(oldProp, newProp)) {
          oldProp = null
          newProp = null
          patches.push({
            type: 'UPDATE',
            node: oldNode,
            key,
            propValue: newProps[key],
          })
        }
      }
    }

    for (const key in oldProps) {
      if (!ignoredProps.includes(key) || (key === 'children' && isReblendNode)) {
        if (/* key !== 'children' &&  */ !(key in newProps)) {
          patches.push({
            type: 'REMOVE',
            node: oldNode,
            key,
            propValue: undefined,
          })
        }
      }
    }

    return patches
  }

  /**
   * Diffs the children of the old and new virtual nodes and returns the patches required to update them.
   *
   * @param {BaseComponent} parent - The parent component containing the children.
   * @param {BaseComponent} oldNode - The old component node.
   * @param {VNode} newNode - The new virtual node.
   * @returns {Patch[]} - An array of patches representing the differences between the old and new children.
   */
  static diffChildren(parent: BaseComponent, oldNode: BaseComponent, newNode: VNode) {
    if (!BaseComponent.isStandard(oldNode) && !BaseComponent.isReactToReblendRenderedNode(oldNode)) {
      return []
    }
    const oldChildren: DomNodeChildren = oldNode?.htmlElements || []
    const newChildren: VNodeChildren = BaseComponent.deepFlat(newNode?.props?.children || [])
    const patches: Patch[] = []
    const maxLength = Math.max(oldChildren.length, newChildren.length)

    for (let i = 0; i < maxLength; i++) {
      const oldChild = oldChildren[i]
      const newChild = newChildren[i]
      if (isCallable(oldChild) || isCallable(newChild)) {
        continue
      }
      if (oldChild === undefined || newChild === undefined) {
        patches.push(...BaseComponent.diffCreateOrRemove(parent, oldChild, newChild))
      } else {
        patches.push(...BaseComponent.diff(parent, oldChild, newChild))
      }
    }

    oldNode?.props && (oldNode.props.children = newChildren)

    return patches
  }

  /**
   * Determines if a given node is a text node.
   *
   * @param {Node} node - The node to check.
   * @returns {boolean} - True if the node is a text node, otherwise false.
   */
  static isTextNode(node: Node): node is Text {
    return node?.nodeType === Node.TEXT_NODE
  }

  /**
   * Checks whether the given data is empty (undefined or null).
   *
   * @param {*} data - The data to check.
   * @returns {boolean} - True if the data is empty, otherwise false.
   */
  static isEmpty(data: any) {
    return data === undefined || data === null
  }

  /**
   * Performs a deep comparison between two objects, including functions.
   *
   * @param {*} firstObject - The first object or function to compare.
   * @param {*} secondObject - The second object or function to compare.
   * @returns {boolean} - True if the objects are deeply equal, otherwise false.
   */
  static deepCompare(firstObject, secondObject) {
    if (typeof firstObject !== 'function' && secondObject !== 'function') {
      return isEqual(firstObject, secondObject)
    }

    // 1. Check if they are the same reference
    if (firstObject === secondObject) return true

    if (!firstObject || !secondObject) return false

    // 2. Compare function names (useful for named functions)
    if (firstObject.name !== secondObject.name) return false

    // 3. Compare the source code using toString()
    if (firstObject.toString() !== secondObject.toString()) return false

    // 4. Compare prototypes
    if (!isEqual(Object.getPrototypeOf(firstObject), Object.getPrototypeOf(secondObject))) {
      return false
    }

    // 5. Compare the properties of the functions (if they have custom properties)
    const func1Props = Object.getOwnPropertyNames(firstObject)
    const func2Props = Object.getOwnPropertyNames(secondObject)

    if (!isEqual(func1Props, func2Props)) {
      return false
    }

    for (const prop of func1Props) {
      if (!isEqual(firstObject[prop], secondObject[prop])) {
        return false
      }
    }

    return true
  }

  /**
   * Applies an array of patches to the component.
   *
   * @param {Patch[]} patches - The array of patches to apply.
   */
  private static applyPatches(patches: Patch[]) {
    for (const { type, newNode, oldNode, parent, patches: patchess } of (patches || []).sort(
      (a, b) => a.type - b.type,
    )) {
      switch (type) {
        case PatchTypeAndOrder.CREATE:
          {
            const elements = BaseComponent.createElement(newNode as VNode)
            parent?.htmlElements || (parent!.htmlElements = [])
            parent?.htmlElements.push(...elements)
            const standardParent = BaseComponent.isStandard(parent!)
              ? parent!
              : BaseComponent.isReactToReblendRenderedNode(parent)
              ? parent!.reactElementChildrenParent! || parent!.nearestStandardParent!
              : parent!.nearestStandardParent!
            if (standardParent) {
              for (const element of elements || []) {
                if (BaseComponent.isStandard(element)) {
                  standardParent.appendChild(element)
                  new Promise<void>((resolve) => {
                    BaseComponent.attachElementsAt(element, element, null)
                    resolve()
                  })
                  element.nearestStandardParent = standardParent
                  BaseComponent.connected(element)
                } else {
                  BaseComponent.attachElementsAt(standardParent, element, null)
                }
              }
            }
          }
          break
        case PatchTypeAndOrder.REMOVE:
          if (oldNode) {
            this.replaceOperation(oldNode, () => {
              if (parent?.htmlElements) {
                const indexOfOldNodeInHtmlElements = parent.htmlElements.indexOf(oldNode!)

                if (indexOfOldNodeInHtmlElements > -1) {
                  // Remove the old node
                  parent.htmlElements.splice(indexOfOldNodeInHtmlElements, 1)
                }
              }
            })
          }
          break
        case PatchTypeAndOrder.REPLACE:
          if (oldNode) {
            this.replaceOperation(oldNode, () => {
              const newNodeElements = BaseComponent.createElement(newNode as VNode)
              const firstNewNode = newNodeElements.shift()

              if (parent?.htmlElements) {
                const indexOfOldNodeInHtmlElements = parent.htmlElements.indexOf(oldNode!)

                if (indexOfOldNodeInHtmlElements > -1) {
                  // Remove the old node and insert the new elements
                  parent.htmlElements.splice(indexOfOldNodeInHtmlElements + 1, 0, ...newNodeElements)
                  parent.htmlElements[indexOfOldNodeInHtmlElements] = firstNewNode as any
                }
              }

              newNodeElements.unshift(firstNewNode as any)
              BaseComponent.replaceOldNode(newNodeElements, oldNode!)
            })
          }
          break
        case PatchTypeAndOrder.TEXT:
          oldNode && (oldNode.textContent = newNode as string)
          break
        case PatchTypeAndOrder.UPDATE:
          // Promise.resolve().then(() => {
          this.applyProps(patchess)
          // })
          break
      }
    }
  }

  /**
   * Asynchronously applies property patches to nodes.
   *
   * @param {PropPatch[]} [patches] - The property patches to apply.
   */
  static async applyProps(patches?: PropPatch[]) {
    requestAnimationFrame(() => {
      let nodes = new Set<BaseComponent>()
      patches?.forEach(({ type, node, key, propValue }) => {
        if (type === 'UPDATE') {
          BaseComponent.setProps({ [key]: propValue }, node, false)
          nodes.add(node)
        } else if (type === 'REMOVE') {
          BaseComponent.removeProps({ [key]: undefined }, node)
          nodes.add(node)
        }
        if (BaseComponent.isReactToReblendRenderedNode(node)) {
          if (key === 'children') {
            node.childrenPropsUpdate?.add(ChildrenPropsUpdateType.CHILDREN)
          } else {
            node.childrenPropsUpdate?.add(ChildrenPropsUpdateType.NON_CHILDREN)
          }
        }
      })
      nodes.forEach((node) => {
        if (BaseComponent.isReactToReblendRenderedNode(node)) {
          ;(node as any)?.checkPropsChange()
        } else {
          node.onStateChange()
        }
      })
      nodes = null as any
    })
  }

  /**
   * Performs a replacement operation on an old node.
   *
   * @param {BaseComponent} oldNode - The old node to replace.
   * @param {() => void} operation - The operation to execute for the replacement.
   */
  static replaceOperation(oldNode: BaseComponent, operation: () => void) {
    operation()
    BaseComponent.detachChildren(oldNode)
    BaseComponent.detach(oldNode)
  }

  // Properties

  private nearestStandardParent?: HTMLElement

  /**
   * The standard container for React and Reblend integration.
   */
  private reblendReactStandardContainer!: HTMLElement

  /**
   * The element for React and Reblend integration.
   */
  private reactElement!: HTMLElement[] | null

  /**
   * The element for React and Reblend integration.
   */
  private reactElementChildrenParent!: HTMLElement | null

  /**
   * The selector string for querying elements by data ID.
   */
  dataIdQuerySelector!: string

  /**
   * The component properties.
   */
  props!: IAny

  /**
   * The rendering error, if any occurred during rendering.
   */
  renderingError?: ReblendRenderingException

  /**
   * The error handler for rendering exceptions.
   */
  renderingErrorHandler?: (e: ReblendRenderingException) => void

  /**
   * Indicates whether the component is attached.
   */
  attached!: boolean

  /**
   * The React class associated with this component.
   */
  ReactClass: any

  /**
   * A reference for the component's DOM node.
   */
  ref!: ReblendTyping.Ref<HTMLElement> | ((node: HTMLElement) => any)

  /**
   * The direct parent of this component.
   */
  directParent: this | undefined

  /**
   * The effects to apply when the component is mounted.
   */
  private onMountEffects?: ReblendTyping.StateEffectiveFunction[]

  /**
   * The effects functions defined for the component.
   */
  private effectsFn?: ReblendTyping.StateEffectiveFunction[]

  /**
   * The disconnect effects to apply when the component is disconnected.
   */
  private disconnectEffects?: ReblendTyping.StateEffectiveFunction[]

  /**
   * Error thrown when a state identifier/key is not specified.
   */
  stateIdNotIncluded = new Error('State Identifier/Key not specified')

  /**
   * Indicates whether state effects are currently running.
   */
  stateEffectRunning = false

  /**
   * Indicates whether this component disconnected callback was called.
   */
  hasDisconnected = false

  /**
   * The HTML elements managed by this component.
   */
  private htmlElements?: BaseComponent[]

  /**
   * Set of update types for children properties.
   */
  childrenPropsUpdate?: Set<ChildrenPropsUpdateType>

  /**
   * The first standard element, if available.
   */
  private _firstStandardElement?: HTMLElement | undefined

  /**
   * The component's state.
   */
  private _state!: IAny

  /**
   * Sets the React standard container for Reblend integration.
   *
   * @param {HTMLElement} node - The DOM node to set as the React standard container.
   * @param {HTMLElement} afterNode - The DOM node to set as the Reblend React After Node.
   */
  protected setReblendReactStandardContainer(node: HTMLElement) {
    this.reblendReactStandardContainer = node
  }

  /**
   * Lifecycle method for mounting the component in React.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected reactReblendMount(afterNode?: HTMLElement) {}

  /**
   * Populates the HTML elements for this component.
   */
  populateHtmlElements() {
    this.catchErrorFrom(() => {
      let htmlVNodes = this.html()
      if (!Array.isArray(htmlVNodes)) {
        htmlVNodes = [htmlVNodes]
      }
      htmlVNodes = BaseComponent.flattenVNodeChildren(htmlVNodes)
      const htmlElements: BaseComponent[] = BaseComponent.createChildren(htmlVNodes) as any
      htmlElements.forEach((htmlElement) => (htmlElement.directParent = this))
      this.htmlElements = htmlElements
    })
  }

  /**
   * Gets the first standard element if available, otherwise retrieves it from the component tree.
   *
   * @returns {HTMLElement | undefined} The first standard element or undefined.
   */
  public get firstStandardElement(): HTMLElement | undefined {
    return BaseComponent.getFirstStandardElementFrom(this)
  }

  /**
   * Sets the first standard element.
   *
   * @param {HTMLElement | undefined} value - The new first standard element.
   */
  public set firstStandardElement(value: HTMLElement | undefined) {
    this._firstStandardElement = value
  }

  /**
   * Retrieves attachable elements from the component.
   *
   * @returns {BaseComponent[]} The attachable elements.
   */
  private getAttachableElements() {
    const elements: BaseComponent[] = []
    if (BaseComponent.isReblendRenderedNodeStandard(this) || BaseComponent.isReblendPrimitiveElement(this)) {
      elements.push(this)
    } else {
      for (const nodeElement of this.htmlElements || []) {
        if (
          BaseComponent.isReblendRenderedNodeStandard(nodeElement) ||
          BaseComponent.isReblendPrimitiveElement(nodeElement)
        ) {
          elements.push(nodeElement)
        } else {
          elements.push(...nodeElement.getAttachableElements())
        }
      }
    }
    return elements
  }

  /**
   * Callback invoked when the component is connected to the DOM.
   */
  connectedCallback() {
    if (!this.attached) {
      this.attached = true
      this.componentDidMount()
      this.mountEffects!()
    }
  }

  /**
   * Appends multiple child elements to the component.
   *
   * @param {...(HTMLElement | BaseComponent)[]} children - The child elements to append.
   */
  appendChildren(...children: (HTMLElement | BaseComponent)[]) {
    for (const child of children) {
      this._appendChild(child)
    }
  }

  /**
   * Appends one or more nodes to the component.
   *
   * @param {...(Node | string)[]} nodes - The nodes or string content to append.
   */
  append(...nodes: Array<Node | string>): void {
    for (const node of nodes) {
      this._appendChild(node as any)
    }
  }

  /**
   * Adds a disconnect effect function to be executed when the component is disconnected.
   *
   * @param {() => void} effect - The effect function to add.
   */
  addDisconnectedEffect(effect: () => void) {
    this.disconnectEffects?.push(effect)
  }

  /**
   * Adds styles to the component.
   *
   * @param {string[]} styles - An array of style strings to apply.
   * @param {IAny} style - An object representing styles as key-value pairs.
   * @param {string} style - A single style string to apply.
   * @param {string[] | IAny | string} style - The styles to apply.
   */
  addStyle(style: string[] | IAny | string): void {
    if (!style) {
      return
    }
    if (typeof style === 'string') {
      this.setAttribute('style', style)
    } else if (Array.isArray(style)) {
      const styleString = style.join(';')
      this.setAttribute('style', styleString)
    } else {
      for (const [styleKey, value] of Object.entries(style)) {
        this.style[styleKey] = value
      }
    }
  }

  /**
   * Adds an inline style to the component.
   *
   * @param {IPair} param - The style name and value pair.
   * @param {string} param.name - The name of the style property.
   * @param {any} param.value - The value of the style property.
   */
  addInlineStyle({ name, value }: IPair) {
    this.style[name as any] = value
  }

  /**
   * Adds one or more class names to the component.
   *
   * @param {...string[]} classNames - The class names to add.
   */
  addClassNames(...classNames: string[]) {
    this.classList.add(...classNames)
  }

  /**
   * Removes one or more class names from the component.
   *
   * @param {...string[]} classNames - The class names to remove.
   */
  removeClassNames(...classNames: string[]) {
    this.classList.remove(...classNames)
  }

  /**
   * Replaces an existing class name with a new one.
   *
   * @param {string} oldClassName - The class name to be replaced.
   * @param {string} newClassName - The new class name to set.
   * @returns {boolean} True if the class name was replaced, false otherwise.
   */
  replaceClassName(oldClassName: string, newClassName: string) {
    return this.classList.replace(oldClassName, newClassName)
  }

  /**
   * Initializes the component's state.
   */
  initState() {}

  /**
   * Initializes the component's properties.
   *
   * @param {IAny} props - The properties to set on the component.
   */
  initProps(props: IAny, thisComponent: BaseComponent) {
    this.props = props || {}
    ;(this as any).thisComponent = thisComponent
  }

  /**
   * Lifecycle method called after the component is mounted.
   */
  componentDidMount() {}

  /**
   * Gets the current state of the component.
   *
   * @returns {IAny} The current state object.
   */
  get state(): IAny {
    return this._state || {}
  }

  /**
   * Sets the state of the component.
   *
   * @param {ReblendTyping.StateFunctionValue<IAny>} value - The new state value.
   */
  set state(value: ReblendTyping.StateFunctionValue<IAny>) {
    this._state = {
      ...this._state,
      ...(typeof value == 'function' ? value(this._state) : value),
    }
    this.attached && !this.stateEffectRunning && this.onStateChange()
  }

  /**
   * Sets the state of the component using the setter.
   *
   * @param {ReblendTyping.StateFunctionValue<IAny>} value - The new state value.
   */
  setState(value: ReblendTyping.StateFunctionValue<IAny>) {
    this.state = value
  }

  /**
   * Applies effects defined in the component, executing them in order.
   */
  applyEffects() {
    this.stateEffectRunning = true
    this.effectsFn?.forEach((effectFn) => effectFn())
    this.stateEffectRunning = false
  }

  /**
   * Handles an error that occurs during rendering or lifecycle methods.
   *
   * @param {Error} error - The error to handle.
   */
  private handleError(error: Error) {
    if (this.renderingErrorHandler) {
      this.renderingErrorHandler((((error as any).component = this), error) as ReblendRenderingException)
    } else if (this.directParent) {
      this.directParent.handleError(error)
    } else {
      throw error
    }
  }

  /**
   * Catches errors thrown by a given function and handles them.
   *
   * @param {() => void} fn - The function to execute and catch errors from.
   */
  private catchErrorFrom(fn: () => void) {
    try {
      fn.bind(this)()
    } catch (error) {
      this.handleError.bind(this)(error as Error)
    }
  }

  /**
   * Handles state changes, applying effects and updating virtual DOM nodes.
   * @async
   */
  async onStateChange() {
    this.catchErrorFrom.bind(this)(() => {
      this.applyEffects()
      let newVNodes = this.html()
      const patches: Patch[] = []
      if (!Array.isArray(newVNodes)) {
        newVNodes = [newVNodes as any]
      }
      newVNodes = BaseComponent.flattenVNodeChildren(newVNodes as VNodeChildren)
      const oldNodes = this.htmlElements || []

      const maxLength = Math.max(this.htmlElements?.length || 0, (newVNodes as VNodeChildren).length)
      for (let i = 0; i < maxLength; i++) {
        const newVNode: VNodeChild = newVNodes[i]
        const currentVNode = oldNodes[i]
        patches.push(...BaseComponent.diff(this, currentVNode as any, newVNode))
      }
      newVNodes = null as any
      BaseComponent.applyPatches(patches)
    })
  }

  /**
   * Returns the virtual DOM structure. Must be implemented by subclasses.
   * @protected
   * @returns {VNode | VNodeChildren} The virtual DOM nodes.
   */
  protected html(): VNode | VNodeChildren {
    return null as any
  }

  /**
   * Mounts effects defined in the component, executing them and storing disconnect functions.
   * @private
   */
  private mountEffects() {
    this.onMountEffects?.forEach((fn) => {
      const disconnectEffect = fn()
      disconnectEffect && this.disconnectEffects?.push(disconnectEffect)
    })
  }

  /**
   * Lifecycle method called when the component is disconnected from the DOM.
   * Cleans up resources and removes the component from its parent.
   */
  disconnectedCallback() {
    this.cleanUp()
    this.componentWillUnmount()
    if (this.ref) {
      if (typeof this.ref === 'function') {
        this.ref(null as any)
      } else {
        // @ts-ignore
        this.ref.current = null as any
      }
    }
    this.disconnectEffects?.forEach((fn) => fn())
    this.parentElement?.removeChild(this)
    ;(this.parentElement as any)?._removeChild && (this.parentElement as any)?._removeChild(this)
    BaseComponent.detachChildren(this)
    this.reactElement?.forEach((node) => BaseComponent.detach(node))
    BaseComponent.detach(this.reactElementChildrenParent!)
    this.props = null as any
    this.htmlElements = null as any
    this._state = null as any
    this.effectsFn = null as any
    this.disconnectEffects = null as any
    this.onMountEffects = null as any
    this.renderingError = null as any
    this.renderingErrorHandler = null as any
    this.nearestStandardParent = null as any
    this.firstStandardElement = null as any
    this.ReactClass = null as any
    this.ref = null as any
    this.directParent = null as any
    this.hasDisconnected = true
  }

  /**
   * Cleans up resources before the component unmounts.
   * @protected
   */
  protected cleanUp() {}

  /**
   * Lifecycle method for component unmount actions.
   * @protected
   */
  protected componentWillUnmount() {}

  /**
   * State management hook for functional components.
   *
   * @template T - The type of the state.
   * @param {ReblendTyping.StateFunctionValue<T>} initial - The initial state value.
   * @param {...string[]} dependencyStringAndOrStateKey - Optional dependencies or state key.
   * @returns {[T, ReblendTyping.StateFunction<T>]} The current state and a function to update it.
   */
  useState<T>(
    initial: ReblendTyping.StateFunctionValue<T>,
    ...dependencyStringAndOrStateKey: string[]
  ): [T, ReblendTyping.StateFunction<T>] {
    const stateID: string | undefined = dependencyStringAndOrStateKey.pop()

    if (!stateID) {
      throw this.stateIdNotIncluded
    }

    if (typeof initial === 'function') initial = (initial as () => T)()
    this[stateID] = initial
    const variableSetter: ReblendTyping.StateFunction<T> = (
      value: ReblendTyping.StateFunctionValue<T>,
      force = false,
    ) => {
      if (typeof value === 'function') {
        this.stateEffectRunning = true
        value = (value as (v: T) => T)(this[stateID])
        this.stateEffectRunning = false
      }
      if (force || !isEqual(this[stateID], value)) {
        this[stateID] = value as T
        if (!this.hasDisconnected)
          if (!this.stateEffectRunning && this.attached) {
            this.onStateChange()
          } else {
            this.applyEffects()
          }
      }
    }

    return [initial as T, variableSetter]
  }

  /**
   * Effect hook for performing side effects in functional components.
   *
   * @param {ReblendTyping.StateEffectiveFunction} fn - The effect function to execute.
   * @param {any[]} dependencies - Array of dependencies for the effect.
   * @param {...string[]} _dependencyStringAndOrStateKey - Optional dependencies or state key.
   */
  useEffect(
    fn: ReblendTyping.StateEffectiveFunction,
    dependencies: any[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ..._dependencyStringAndOrStateKey: string[]
  ) {
    fn = fn.bind(this)
    const dep = new Function(`return (${dependencies})`).bind(this)
    const cacher = () => cloneDeep(dep())
    let caches = cacher()
    const internalFn = () => {
      if (!dependencies || !isEqual(dep(), caches)) {
        caches = cacher()
        fn()
      }
    }
    this.effectsFn?.push(internalFn)
    this.onMountEffects?.push(fn)
  }

  /**
   * Reducer hook for managing state with a reducer function.
   *
   * @template T - The type of the state.
   * @template I - The type of the action.
   * @param {ReblendTyping.StateReducerFunction<T, I>} reducer - The reducer function.
   * @param {ReblendTyping.StateFunctionValue<T>} initial - The initial state value.
   * @param {...string[]} dependencyStringAndOrStateKey - Optional dependencies or state key.
   * @returns {[T, ReblendTyping.StateFunction<I>]} The current state and a dispatch function.
   */
  useReducer<T, I>(
    reducer: ReblendTyping.StateReducerFunction<T, I>,
    initial: ReblendTyping.StateFunctionValue<T>,
    ...dependencyStringAndOrStateKey: string[]
  ): [T, ReblendTyping.StateFunction<I>] {
    reducer = reducer.bind(this)
    const stateID: string | undefined = dependencyStringAndOrStateKey.pop()

    if (!stateID) {
      throw this.stateIdNotIncluded
    }

    const [state, setState] = this.useState<T>(initial, stateID)
    this[stateID] = state
    const fn: ReblendTyping.StateFunction<I> = (newValue: ReblendTyping.StateFunctionValue<I>) => {
      let reducedVal: ReblendTyping.StateFunctionValue<T>
      this.stateEffectRunning = true
      if (typeof newValue === 'function') {
        reducedVal = reducer(this[stateID], (newValue as (v: T) => I)(this[stateID]))
      } else {
        reducedVal = reducer(this[stateID], newValue as any)
      }
      this.stateEffectRunning = false
      setState(reducedVal)
    }

    return [this[stateID], fn]
  }

  /**
   * Memoization hook for caching values in functional components.
   *
   * @template T - The type of the memoized value.
   * @param {ReblendTyping.StateEffectiveMemoFunction<T>} fn - The function to compute the value.
   * @param {any[]} [dependencies] - Array of dependencies for the memoization.
   * @param {...string[]} dependencyStringAndOrStateKey - Optional dependencies or state key.
   * @returns {T} The memoized value.
   */
  useMemo<T>(
    fn: ReblendTyping.StateEffectiveMemoFunction<T>,
    dependencies?: any[],
    ...dependencyStringAndOrStateKey: string[]
  ) {
    fn = fn.bind(this)
    const stateID: string | undefined = dependencyStringAndOrStateKey.pop()

    if (!stateID) {
      throw this.stateIdNotIncluded
    }

    const [state, setState] = this.useState<T>(fn(), stateID)
    this[stateID] = state
    const dep = new Function(`return (${dependencies})`).bind(this)
    const cacher = () => cloneDeep(dep())
    let caches = cacher()
    const internalFn = () => {
      const depData = dep()
      if (!dependencies || !isEqual(depData, caches)) {
        caches = cacher()
        setState(fn())
      }
    }
    this.effectsFn?.push(internalFn)
    return this[stateID]
  }

  /**
   * Creates a ref object to hold mutable values that do not trigger re-renders.
   *
   * @template T - The type of the referenced value.
   * @param {T} [initial] - The initial value of the ref.
   * @returns {ReblendTyping.Ref<T>} The ref object.
   */
  useRef<T>(initial?: T) {
    const ref: ReblendTyping.Ref<T> = { current: initial }
    return ref
  }

  /**
   * Binds a function to the current context.
   *
   * @param {() => any} fn - The function to bind.
   * @returns {Function} The bound function.
   */
  useCallback(fn: () => any) {
    return fn.bind(this)
  }

  /**
   * Initializes the component, preparing effect management.
   * For compatibility in case a standard element inherits this prototype; can manually execute this constructor.
   */
  _constructor() {
    this.effectsFn = []
    this.onMountEffects = []
    this.disconnectEffects = []
    this.childrenPropsUpdate = new Set()
  }

  /**
   * Appends a child node to the component, ensuring it is connected properly.
   *
   * @template T - The type of the node being appended.
   * @param {T} node - The node to append.
   * @returns {T} The appended node.
   */
  _appendChild<T extends Node>(node: T): T {
    const appended = this.appendChild(node)
    BaseComponent.connected(node as any)
    return appended
  }
}

export { BaseComponent }
