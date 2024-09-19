/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { attributeName, ReblendTyping, shouldUseSetAttribute } from 'reblend-typing'
import {
  capitalize,
  isCallable,
  rand,
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
  static ELEMENT_NAME = 'BaseComponent'
  static props: IAny

  private static ReblendReactClass = class extends BaseComponent {
    reactDomCreateRoot_root?: Root

    constructor() {
      super()
    }

    protected html(): VNode | VNodeChildren {
      return this.props.children
    }

    protected setReblendReactStandardContainer(node: HTMLElement) {
      this.reblendReactStandardContainer = node
      this.initRoot()
    }

    initRoot() {
      if (!this.reactDomCreateRoot_root || !Object.values(this.reactDomCreateRoot_root)[0]) {
        this.reactDomCreateRoot_root = ReactDOM.createRoot(this)
      }
    }

    //Should only be use on React Reblend node
    async checkPropsChange() {
      for (const type of Array.from(this.childrenPropsUpdate || []).sort()) {
        this.childrenPropsUpdate?.delete(type)

        switch (type) {
          case ChildrenPropsUpdateType.CHILDREN:
            await this.onStateChange()
            break

          case ChildrenPropsUpdateType.NON_CHILDREN:
            await this.reactReblendMount()
            break

          default:
            throw new Error('Invalid props update type provided')
        }
      }
    }

    getChildrenWrapperForReact() {
      const children = this.htmlElements || []
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
              children?.forEach((child) => {
                if (BaseComponent.isStandard(child)) {
                  standardParent?.appendChild(child)
                  BaseComponent.attachElementsAt(child, child as BaseComponent)
                } else {
                  BaseComponent.attachElementsAt(standardParent!, child as BaseComponent)
                }
              })
              ;(<any>standardParent)._removeChild = standardParent.removeChild
              new Promise<void>((resolve) => {
                standardParent?.removeChild(this.containerRef.current!)
                resolve()
              }).then(() => {
                standardParent.removeChild = (node) => {
                  /* if (!(<any>node == this.containerRef.current)) {
                    ;(<any>standardParent).rm(node)
                  } */
                  return node
                }
              })
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

    protected reactReblendMount() {
      this.catchErrorFrom(() => {
        this.initRoot()
        const childrenWrapper = this.getChildrenWrapperForReact()

        const warn = window.console.warn
        const error = window.console.error
        const log = window.console.log

        window.console.warn = () => {}
        window.console.error = () => {}
        window.console.log = () => {}

        flushSync(() => {
          this.reactDomCreateRoot_root?.render(
            React.createElement(
              'div',
              null,
              createPortal(
                React.createElement(this.ReactClass, {
                  ...this.props,
                  children: !this.props?.children?.length ? undefined : childrenWrapper,
                }),
                this.reblendReactStandardContainer,
              ),
            ),
          )
        })

        window.console.warn = warn
        window.console.error = error
        window.console.log = log
      })
    }

    protected cleanUp(): void {
      this.reactDomCreateRoot_root = null as any
      super.cleanUp()
    }
  }

  static getFirstStandardElementFrom(node: BaseComponent): HTMLElement | undefined {
    if (!node) {
      return
    }

    if (BaseComponent.isStandard(node)) {
      return node
    }

    for (const child of node.htmlElements || []) {
      if (BaseComponent.isStandard(child)) {
        return child
      }

      const found = BaseComponent.getFirstStandardElementFrom(child)

      if (found) {
        return found
      }
    }
  }

  static extendPrototype(target, prototype) {
    const descriptors = Object.getOwnPropertyDescriptors(prototype)

    for (const key in descriptors) {
      if (Object.prototype.hasOwnProperty.call(descriptors, key)) {
        // Skip the constructor
        if (key === 'constructor') continue

        const descriptor = descriptors[key]

        // Avoid replacing existing functions on the target
        if (!(key in target) || (typeof descriptor.value !== 'function' && !(key in target))) {
          Object.defineProperty(target, key, descriptor)
        }
      }
    }

    // If there's a prototype chain, continue copying from the prototype chain
    const proto = Object.getPrototypeOf(prototype)
    if (proto && proto !== Object.prototype) {
      BaseComponent.extendPrototype(target, proto)
    }
  }
  static hasName(element: typeof BaseComponent) {
    return element.ELEMENT_NAME && element.ELEMENT_NAME !== 'BaseComponent'
  }
  static fn(eventCallback: (e: Event) => any = () => {}) {
    return (e) => eventCallback(e)
  }
  static setAttributesWithNamespace(element: HTMLElement | SVGElement, attributes: Record<string, string>) {
    const svgAttributes = [
      /* 'x',
      'y', */
      /* 'width',
      'height', */
      /* 'fill',
      'stroke',
      'viewBox',
      'preserveAspectRatio',
      'cx',
      'cy',
      'r',
      'd',
      'pathLength',
      'transform',
      'href', */
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
  static createElementWithNamespace(tag: string) {
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
  static setProps(props: IAny, to: BaseComponent, init: boolean) {
    if (props && to) {
      to.props = { ...to.props, ...props }

      if (BaseComponent.isReblendRenderedNodeStandard(to)) {
        for (const propName in props) {
          const _attributeName = attributeName(propName)
          const propValue = props[propName]
          if (propName == 'dangerouslySetInnerHTML') {
            to.innerHTML = propValue?.__html
          } else if (propName.startsWith('on')) {
            to[_attributeName] = this.fn(propValue) as any
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
      init && to.init && to.init()
    }
  }
  static removeProps(props: IAny, to: BaseComponent) {
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
  static isReblendRenderedNode(node: any): boolean {
    return typeof node !== 'string' && node![ReblendNode]
  }
  static isReblendVirtualNode(node: any): boolean {
    return typeof node !== 'string' && node![ReblendVNode]
  }
  static isReblendRenderedNodeStandard(node: any): boolean {
    return typeof node !== 'string' && node![ReblendNodeStandard]
  }
  static isReblendVirtualNodeStandard(node: any): boolean {
    return typeof node !== 'string' && node![ReblendVNodeStandard]
  }
  static isReactToReblendRenderedNode(node: any): boolean {
    return typeof node !== 'string' && node![ReactToReblendNode]
  }
  static isReactToReblendVirtualNode(node: any): boolean {
    return typeof node !== 'string' && node![ReactToReblendVNode]
  }
  static isStandardVirtualNode(node: any): boolean {
    return typeof node !== 'string' && node![ReblendVNodeStandard]
  }
  static isReblendPrimitiveElement(element: any) {
    return !BaseComponent.isPrimitive(element) && element.displayName === REBLEND_PRIMITIVE_ELEMENT_NAME
  }
  static newReblendPrimitive() {
    const text: ReblendPrimitive = document.createTextNode('') as any as ReblendPrimitive
    BaseComponent.extendPrototype(text, Reblend.prototype)
    text.displayName = REBLEND_PRIMITIVE_ELEMENT_NAME

    text.setData = function (data: Primitive) {
      this.reblendPrimitiveData = data
      if (this.reblendPrimitiveData !== undefined && this.reblendPrimitiveData !== null) {
        const textContent = `${this.reblendPrimitiveData}`
        this.nodeValue = textContent
      } else {
        this.nodeValue = ''
      }
      return this
    }

    text.getData = function () {
      return this.reblendPrimitiveData
    }

    return text
  }

  static isReactNode(displayName: IAny): boolean {
    return (
      displayName &&
      typeof displayName !== 'string' &&
      ('$$typeof' in displayName ||
        (displayName.prototype && displayName.prototype.isReactComponent) ||
        (isCallable(displayName) && !(displayName instanceof Reblend)))
    )
  }
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
  static isArray(obj: unknown) {
    const arrayProperties = ['pop', 'push', 'length', 'shift', 'unshift', 'splice', 'slice', 'find', 'includes']
    return typeof obj === 'object' && arrayProperties.every((property) => property in obj!)
  }
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
      ...(isTagStandard && clazz.props ? clazz.props : {}),
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

  static isPrimitive(data: any) {
    const primitves = ['string', 'number', 'boolean', 'bigint', 'null', 'undefined', 'symbol']
    const dataType = typeof data
    return primitves.some((primitve) => primitve === (data === null ? 'null' : dataType))
  }

  protected static createChildren(children: VNodeChildren, containerArr: (BaseComponent | HTMLElement)[] = []) {
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
        throw new TypeError('Invalid child node  in children')
      }
    }
    return containerArr
  }

  static async mountOn(elementId: string, app: typeof Reblend | ReblendTyping.FunctionComponent, props?: IAny) {
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
        //Promise.resolve().then(() => {
        BaseComponent.attachElementsAt(node, node)
        //})
      } else {
        //Promise.resolve().then(() => {
        BaseComponent.attachElementsAt(root, node)
        //})
      }
    }
  }

  private static detach(node: BaseComponent | HTMLElement) {
    if (BaseComponent.isPrimitive(node)) return
    if ('disconnectedCallback' in node) {
      ;(node as any as BaseComponent).disconnectedCallback()
    } else {
      if (node.parentNode) {
        node.parentNode?.removeChild(node)
      }
      if (node?.remove) {
        node?.remove()
      }
    }
  }
  private static detachChildren(node: BaseComponent) {
    if (BaseComponent.isPrimitive(node)) return
    /* if (node.props) {
      for (const child of node.props?.children || []) {
        this.detach(child)
        child.standardContainer?.remove()
      }
      node.props.children = []
    } */
    for (const child of node.childNodes || []) {
      this.detach(child as any)
    }
    for (const htmlElement of node.htmlElements || []) {
      this.detach(htmlElement as any)
    }
  }

  static connected<T extends BaseComponent | HTMLElement>(node: T | undefined) {
    if (!node) return
    if ((node as BaseComponent).connectedCallback) {
      ;(node as BaseComponent).connectedCallback()
    }
    /* if ((node as BaseComponent).attach) {
      ;(node as BaseComponent).attach()
    } */
  }

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
    //element.parentComponent = parentComponent
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
        element.setAttribute(
          REBLEND_COMPONENT_ATTRIBUTE_NAME,
          //Don't forget to uncomment this
          process?.env?.REBLEND_DEVELEOPMENT ? tagName : '',
        )
      }
    }

    if (isTagStandard && 'ref' in (vNode as VNode).props) {
      if (!(vNode as VNode).props.ref) {
        throw new Error('Invalid ref object')
      }
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

    BaseComponent.setProps((vNode as VNode).props, element, true)

    element.populateHtmlElements()
    /* if (isReactNode) {
    } else {
      element.attach()
    } */
    return [element]
  }

  static attachElementsAt(standardElement: HTMLElement, reblendElement: BaseComponent) {
    if (!reblendElement?.htmlElements || !standardElement) {
      return
    }

    if (BaseComponent.isReactToReblendRenderedNode(reblendElement)) {
      reblendElement.setReblendReactStandardContainer(standardElement)
      reblendElement.reactReblendMount()
      return
    }

    for (const htmlElement of reblendElement.htmlElements || []) {
      if (BaseComponent.isStandard(htmlElement)) {
        standardElement.appendChild(htmlElement)
        BaseComponent.attachElementsAt(htmlElement, htmlElement)
      } else if (BaseComponent.isReactToReblendRenderedNode(htmlElement)) {
        BaseComponent.attachElementsAt(standardElement, htmlElement)
      } else {
        const standardElementsFromCustomElement = htmlElement.getAttachableElements()
        htmlElement.firstStandardElement = standardElementsFromCustomElement[0]
        BaseComponent.attachElementsAt(standardElement, htmlElement)
        htmlElement.nearestStandardParent = standardElement
        BaseComponent.connected(htmlElement)
      }
    }
    reblendElement.nearestStandardParent = standardElement
    BaseComponent.connected(reblendElement)
  }
  private static replaceOldNode(
    newNode: BaseComponent | BaseComponent[],
    oldNode: BaseComponent,
  ): BaseComponent | null {
    if (!BaseComponent.isReblendRenderedNodeStandard(oldNode) && !BaseComponent.isReblendPrimitiveElement(oldNode)) {
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
          const div: HTMLDivElement & { delegatedChildren?: HTMLElement[] } = document.createElement('div')
          div.delegatedChildren = []
          //This delegate the node and insert it after oldNode or lastInsertedNode
          div.appendChild = (node: any) => {
            ;(lastInsertedNode || oldNode).after(node)
            if (!firstStandardElement) {
              firstStandardElement = node as any
            }

            div.delegatedChildren?.push(node)

            return node
          }
          div.remove = () => {
            for (const delegatedChild of div.delegatedChildren || []) {
              delegatedChild.remove()
            }
          }
          n.setReblendReactStandardContainer(div)
          n.reactReblendMount()
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
        BaseComponent.attachElementsAt(n, n)
        //BaseComponent.connected(n)
      }
    }
    newNode.forEach((nn) => (nn.firstStandardElement = firstStandardElement))
    return lastInsertedNode
  }
  static isStandard(node: BaseComponent | HTMLElement) {
    if (!node) {
      return false
    }
    return BaseComponent.isReblendRenderedNodeStandard(node) || BaseComponent.isReblendPrimitiveElement(node)
  }
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
    } else if ('displayName' in oldNode && 'displayName' in (newNode as any)) {
      const oldNodeTag = ((oldNode as BaseComponent).displayName as string).toLowerCase()

      const newNodeTag = (
        (BaseComponent.isPrimitive((newNode as VNode).displayName)
          ? (newNode as VNode).displayName
          : ((newNode as VNode).displayName as typeof Reblend).ELEMENT_NAME) as string
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
  static diffProps(newNode: VNode, oldNode: BaseComponent) {
    const patches: PropPatch[] = []
    const oldProps: IAny = oldNode?.props || []
    const newProps: IAny = newNode?.props || []
    for (const key in newProps) {
      if (key !== 'children' || BaseComponent.isReblendRenderedNode(oldNode)) {
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
      if (/* key !== 'children' &&  */ !(key in newProps)) {
        patches.push({
          type: 'REMOVE',
          node: oldNode,
          key,
          propValue: undefined,
        })
      }
    }

    return patches
  }
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
  static isTextNode(node: Node): node is Text {
    return node?.nodeType === Node.TEXT_NODE
  }
  static isEmpty(data: any) {
    return data === undefined || data === null
  }
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
            const standardParent = BaseComponent.isStandard(parent!) ? parent! : parent!.nearestStandardParent!
            if (standardParent) {
              for (const element of elements || []) {
                if (BaseComponent.isStandard(element)) {
                  standardParent.appendChild(element)
                  BaseComponent.attachElementsAt(element, element)
                  element.nearestStandardParent = standardParent
                  BaseComponent.connected(element)
                } else {
                  BaseComponent.attachElementsAt(standardParent, element)
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
  static async applyProps(patches?: PropPatch[]) {
    //requestAnimationFrame(() => {
    //This helps reduce onStateChange call for updates of the same node
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
      //if (!BaseComponent.isReblendRenderedNodeStandard(node)) {
      if (BaseComponent.isReactToReblendRenderedNode(node)) {
        //Promise.resolve().then(() => {
        ;(node as any)?.checkPropsChange()
        //})
      } else {
        //Promise.resolve().then(() => {
        node.onStateChange()
        //})
      }
      //}
    })
    nodes = null as any
    //})
  }
  static replaceOperation(oldNode: BaseComponent, operation: () => void) {
    operation()
    BaseComponent.detachChildren(oldNode)
    BaseComponent.detach(oldNode)
  }
  private nearestStandardParent?: HTMLElement
  private reblendReactStandardContainer!: HTMLElement
  dataIdQuerySelector!: string
  props!: IAny
  renderingError?: ReblendRenderingException
  renderingErrorHandler?: (e: ReblendRenderingException) => void
  attached!: boolean
  ReactClass: any
  ref!: ReblendTyping.Ref<HTMLElement> | ((node: HTMLElement) => any)
  directParent: this | undefined
  private onMountEffects?: ReblendTyping.StateEffectiveFunction[]
  private effectsFn?: ReblendTyping.StateEffectiveFunction[]
  private disconnectEffects?: ReblendTyping.StateEffectiveFunction[]
  stateIdNotIncluded = new Error('State Identifier/Key not specified')
  stateEffectRunning = false
  private htmlElements?: BaseComponent[]
  childrenPropsUpdate?: Set<ChildrenPropsUpdateType>
  private _firstStandardElement?: HTMLElement | undefined
  private _state!: IAny

  protected setReblendReactStandardContainer(node: HTMLElement) {
    this.reblendReactStandardContainer = node
  }

  protected reactReblendMount() {}

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

  public get firstStandardElement(): HTMLElement | undefined /* eslint-disable @typescript-eslint/no-explicit-any */ {
    return this._firstStandardElement && this._firstStandardElement.parentNode
      ? this._firstStandardElement
      : BaseComponent.getFirstStandardElementFrom(this)
  }
  public set firstStandardElement(
    value: HTMLElement | undefined /* eslint-disable @typescript-eslint/no-explicit-any */,
  ) {
    this._firstStandardElement = value
  }

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

  connectedCallback() {
    if (!this.attached) {
      this.attached = true
      this.componentDidMount()
      this.mountEffects!()
    }
  }

  appendChildren(...children: (HTMLElement | BaseComponent)[]) {
    for (const child of children) {
      this._appendChild(child)
    }
  }

  append(...nodes: Array<Node | string>): void {
    for (const node of nodes) {
      this._appendChild(node as any)
    }
  }

  addDisconnectedEffect(effect: () => void) {
    this.disconnectEffects?.push(effect)
  }

  addStyle(styles: string[]): void

  addStyle(style: IAny): void

  addStyle(style: string): void

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

  addInlineStyle({ name, value }: IPair) {
    this.style[name as any] = value
  }

  addClassNames(...classNames: string[]) {
    this.classList.add(...classNames)
  }

  removeClassNames(...classNames: string[]) {
    this.classList.remove(...classNames)
  }

  replaceClassName(oldClassName: string, newClassName: string) {
    return this.classList.replace(oldClassName, newClassName)
  }

  init() {}

  componentDidMount() {}

  get state(): IAny {
    return this._state || {}
  }

  set state(value: ReblendTyping.StateFunctionValue<IAny>) {
    this._state = {
      ...this._state,
      ...(typeof value == 'function' ? value(this._state) : value),
    }
    //Promise.resolve().then(() => {
    this.onStateChange()
    //})
  }

  setState(value: ReblendTyping.StateFunctionValue<IAny>) {
    this.state = value
  }

  private applyEffects() {
    this.stateEffectRunning = true
    this.effectsFn?.forEach((effectFn) => effectFn())
    this.stateEffectRunning = false
  }

  private handleError(error: Error) {
    if (this.renderingErrorHandler) {
      this.renderingErrorHandler((((error as any).component = this), error) as ReblendRenderingException)
    } else if (this.directParent) {
      this.directParent.handleError(error)
    } else {
      throw error
    }
  }
  private catchErrorFrom(fn: () => void) {
    try {
      fn.bind(this)()
    } catch (error) {
      this.handleError.bind(this)(error as Error)
    }
  }
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
      //Promise.resolve().then(() => {
      BaseComponent.applyPatches(patches)
      //})
    })
  }
  protected html(): VNode | VNodeChildren {
    return null as any
  }
  private mountEffects() {
    this.onMountEffects?.forEach((fn) => {
      const disconnectEffect = fn()
      disconnectEffect && this.disconnectEffects?.push(disconnectEffect)
    })
  }
  disconnectedCallback() {
    this.cleanUp()
    this.componentWillUnmount()
    if (this.ref) {
      if (typeof this.ref === 'function') {
        this.ref(null as any)
      } else {
        this.ref.current = null as any
      }
    }
    this.disconnectEffects?.forEach((fn) => fn())
    this.parentElement?.removeChild(this)
    ;(this.parentElement as any)?._removeChild && (this.parentElement as any)?._removeChild(this)
    BaseComponent.detachChildren(this)
    BaseComponent.detach(this.reblendReactStandardContainer)
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
  }
  protected cleanUp() {}
  protected componentWillUnmount() {}

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
    const variableSetter: ReblendTyping.StateFunction<T> = (value: ReblendTyping.StateFunctionValue<T>) => {
      if (typeof value === 'function') {
        this.stateEffectRunning = true
        value = (value as (v: T) => T)(this[stateID])
        this.stateEffectRunning = false
      }
      if (!isEqual(this[stateID], value)) {
        this[stateID] = value as T
        if (!this.stateEffectRunning && this.attached) {
          //Promise.resolve().then(() => {
          this.onStateChange()
          //})
        }
      }
    }

    return [initial as T, variableSetter]
  }
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
   * Keeps variable out of state management
   *
   * Changes to current does not cause effect
   * @param initial Initial value of current
   * @returns Ref<T>
   */
  useRef<T>(initial?: T) {
    const ref: ReblendTyping.Ref<T> = { current: initial }
    return ref
  }
  useCallback(fn: () => any) {
    return fn.bind(this)
  }

  /**
   * For compatibility incase standard element inherits this prototype; we can manually exec this constructor
   */
  _constructor() {
    this.effectsFn = []
    this.onMountEffects = []
    this.disconnectEffects = []
    this.childrenPropsUpdate = new Set()
  }

  _appendChild<T extends Node>(node: T): T {
    const appended = this.appendChild(node)
    BaseComponent.connected(node as any)
    return appended
  }
}

export { BaseComponent }
