/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReblendTyping, attributeName, shouldUseSetAttribute } from 'reblend-typing'
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
import StyleUtil, { StyleUtilType } from './StyleUtil'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { type Root } from 'react-dom/client'
import { cloneDeep, isEqual } from 'lodash'

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

interface Patch {
  type: 'CREATE' | 'REMOVE' | 'REPLACE' | 'UPDATE' | 'TEXT'
  newNode?: VNodeChild
  oldNode?: DomNodeChild
  parent?: BaseComponent
  patches?: PropPatch[]
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

    completedAppend = false
    constructor() {
      super()
    }

    protected html(): VNode | VNodeChildren {
      return this.props.children
    }

    async initRoot() {
      if (!this.reactDomCreateRoot_root || !Object.values(this.reactDomCreateRoot_root)[0]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const reactDom = await import('react-dom/client')

        this.reactDomCreateRoot_root = reactDom.createRoot(this)
        this.htmlElements = []
      }
    }
    private render() {
      this.attach()
    }

    async getChildrenWrapperForReact() {
      const children: BaseComponent[] | null = this.props?.children
      const displayName = this.displayName || ''
      const react = await import('react')
      return react.createElement(
        class extends react.Component {
          containerRef: React.RefObject<HTMLDivElement>
          constructor(props) {
            super(props)
            this.containerRef = react.createRef<HTMLDivElement>()
          }

          componentDidMount(): void {
            if (this.containerRef.current) {
              const standardParent: HTMLElement | null = this.containerRef.current?.parentElement
              children?.forEach((child) => {
                if (BaseComponent.isStandard(child)) {
                  standardParent?.appendChild(child)
                  BaseComponent.attachElementsAt(child, child)
                } else {
                  BaseComponent.attachElementsAt(standardParent!, child)
                }
              })
              standardParent?.removeChild(this.containerRef.current)
            }
          }

          render() {
            return react.createElement(
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

    async attach() {
      await this.catchErrorFrom(async () => {
        await this.initRoot()
        const childrenWrapper = await this.getChildrenWrapperForReact()
        //Lazy load react i.e it should be bundled separately and only fetch when needed
        const react = await import('react')
        this.reactDomCreateRoot_root?.render(
          react.createElement(this.ReactClass, {
            ...this.props,
            children: !this.props?.children?.length ? undefined : childrenWrapper,
          }),
        )

        //Delay to enable append child to run
        await new Promise((resolve: (value?) => void) => {
          setTimeout(() => {
            resolve()
          }, 0)
        })
      })
    }

    appendChild<T extends Node>(node: T): T {
      BaseComponent.extendPrototype(node, Reblend.prototype)
      node[ReblendNodeStandard] = true
      !this.htmlElements && (this.htmlElements = [])
      this.htmlElements?.push(node as any)
      this.completedAppend = true
      return node
    }

    protected cleanUp(): void {
      this.reactDomCreateRoot_root = null as any
    }
  }

  static findStandardParentOf(node: BaseComponent) {
    if (!node) return null
    if (BaseComponent.isStandard(node)) {
      return node
    } else {
      return BaseComponent.findStandardParentOf(node.directParent!)
    }
  }

  /*   static findStandardParentOf(parentComponent: BaseComponent, node: BaseComponent) {
    if (parentComponent.htmlElements?.includes(node)) {
      return parentComponent
    } else {
      for (const htmlElement of parentComponent.htmlElements || []) {
        const found = BaseComponent.findStandardParentOf(htmlElement, node)
        if (found) {
          return found
        }
      }
    }
    return null
  } */

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
    const span: ReblendPrimitive = document.createElement('span') as ReblendPrimitive
    BaseComponent.extendPrototype(span, Reblend.prototype)
    span.displayName = REBLEND_PRIMITIVE_ELEMENT_NAME

    span.setData = function (data: Primitive) {
      this.reblendPrimitiveData = data
      if (this.reblendPrimitiveData !== undefined && this.reblendPrimitiveData !== null) {
        const textContent = `${this.reblendPrimitiveData}`
        this.innerText = textContent
      } else {
        this.innerText = ''
      }
      return this
    }

    span.getData = function () {
      return this.reblendPrimitiveData
    }

    return span
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
  static deepFlat<T>(data: T[]): T[] {
    return data.flat(Number.MAX_VALUE) as any
  }
  static isArray(obj: unknown) {
    const arrayProperties = ['pop', 'push', 'length', 'shift', 'unshift', 'splice', 'slice', 'find', 'includes']
    return typeof obj === 'object' && arrayProperties.every((property) => property in obj!)
  }
  static flattenVNodeChildren<T>(arr: (T | T[])[], containerArr: T[] = []): T[] {
    if (!arr || arr.length < 1) {
      return []
    }

    for (const item of arr) {
      if (Array.isArray(item)) {
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

    children || (children = [])

    children.push(...((isTagStandard && clazz.props ? clazz.props : {}).children || []))
    children.push(...(props?.children || []))

    const mergedProp = {
      ...(isTagStandard && clazz.props ? clazz.props : {}),
      ...props,
      children,
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
  protected static async createChildren(
    children: VNodeChildren,
    containerArr: (BaseComponent | HTMLElement | Text)[] = [],
  ) {
    for (const child of children) {
      if (isCallable(child) || child instanceof Reblend || child instanceof Node) {
        containerArr.push(child as any)
      } else if (Array.isArray(child)) {
        await BaseComponent.createChildren(child as any, containerArr)
      } else if (
        BaseComponent.isPrimitive(child) ||
        BaseComponent.isReactToReblendVirtualNode(child) ||
        BaseComponent.isReblendVirtualNode(child) ||
        BaseComponent.isStandardVirtualNode(child)
      ) {
        const domChild = BaseComponent.deepFlat(await BaseComponent.createElement(child as any))
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
    const nodes: BaseComponent[] = (await BaseComponent.createChildren(
      Array.isArray(vNodes) ? (vNodes as any) : [vNodes],
    )) as any
    for (const node of nodes) {
      if (BaseComponent.isStandard(node)) {
        root.appendChild(node)
        node.nearestStandardParent = root
        BaseComponent.connected(node)
      } else {
        BaseComponent.attachElementsAt(root, node)
      }
    }
  }

  private static detach(node: BaseComponent | HTMLElement) {
    if (BaseComponent.isPrimitive(node)) return
    if ('disconnectedCallback' in node) {
      ;(node as any as BaseComponent).disconnectedCallback()
    } else {
      node.parentNode?.removeChild(node)
    }
  }
  private static detachChildren(node: BaseComponent) {
    if (BaseComponent.isPrimitive(node)) return
    if (node.props) {
      for (const child of node.props?.children || []) {
        this.detach(child)
      }
      node.props.children = []
    }
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

  static async createElement(vNode: VNode | VNode[] | ReactNode | Primitive): Promise<BaseComponent[]> {
    if (Array.isArray(vNode)) {
      return (await BaseComponent.createChildren(vNode)) as any
    }
    if (BaseComponent.isPrimitive(vNode)) {
      return [BaseComponent.newReblendPrimitive().setData(vNode as Primitive)]
    }

    const { displayName } = vNode as VNode
    let clazz: typeof Reblend = displayName as any as typeof Reblend
    const isTagStandard = typeof displayName === 'string'
    const isReactNode = BaseComponent.isReactNode(displayName as any)

    const children: unknown[] = []
    children.push(...((isTagStandard && clazz.props ? clazz.props : {}).children || []))
    children.push(...((vNode as VNode)?.props?.children || []))

    const props = {
      ...(isTagStandard && clazz.props ? clazz.props : {}),
      ...(vNode as VNode).props,
      children: await BaseComponent.createChildren(children as any),
    }

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
      element.appendChild = BaseComponent.ReblendReactClass.prototype.appendChild
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

    if (isTagStandard && 'ref' in props) {
      if (!props.ref) {
        throw new Error('Invalid ref object')
      }
      const ref = props.ref
      delete props.ref
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

    BaseComponent.setProps(props, element, true)
    await element.attach()
    /* if (isReactNode) {
    } else {
      element.attach()
    } */
    return [element]
  }

  static async attachElementsAt(standardElement: HTMLElement, reblendElement: BaseComponent) {
    if (!reblendElement?.htmlElements || !standardElement) {
      return
    }

    for (const htmlElement of reblendElement.htmlElements || []) {
      if (
        BaseComponent.isReblendRenderedNodeStandard(htmlElement) ||
        BaseComponent.isReblendPrimitiveElement(htmlElement)
      ) {
        standardElement.appendChild(htmlElement)
        await BaseComponent.attachElementsAt(htmlElement, htmlElement)
      } else {
        const standardElementsFromCustomElement = htmlElement.getAttachableElements()
        htmlElement.firstStandardElement = standardElementsFromCustomElement[0]
        for (const standardElementFromCustomElement of standardElementsFromCustomElement) {
          standardElement.appendChild(standardElementFromCustomElement)
          await BaseComponent.attachElementsAt(standardElementFromCustomElement, standardElementFromCustomElement)
        }
        htmlElement.nearestStandardParent = standardElement
        BaseComponent.connected(htmlElement)
      }
    }
    reblendElement.nearestStandardParent = standardElement
    BaseComponent.connected(reblendElement)
  }

  private static async replaceOldNode(
    newNode: BaseComponent | BaseComponent[],
    oldNode: BaseComponent,
  ): Promise<BaseComponent | null> {
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
        lastInsertedNode = await this.replaceOldNode(n.htmlElements!, lastInsertedNode || oldNode)
        if (!firstStandardElement) {
          firstStandardElement = lastInsertedNode as any
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

  static isStandard(node: BaseComponent) {
    if (!node) {
      return false
    }
    return BaseComponent.isReblendRenderedNodeStandard(node) || BaseComponent.isReblendPrimitiveElement(node)
  }
  private nearestStandardParent?: HTMLElement
  private firstStandardElement?: HTMLElement
  dataIdQuerySelector!: string
  props!: IAny
  styleUtil!: StyleUtilType
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
  private _dataId!: string
  private _state!: IAny

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

  setDataID() {
    this.dataId = `${rand(1111111, 9999999)}`
    this.dataIdQuerySelector = `[data-id="${this.dataId}"]`
  }

  appendChildren(...children: (HTMLElement | BaseComponent)[]) {
    for (const child of children) {
      this._appendChild(child)
    }
  }

  get dataId(): string {
    return this.getAttribute(`data-id`) || this._dataId
  }

  set dataId(value: string) {
    this._dataId = value
    this.setAttribute(`data-id`, this._dataId)
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
    if (typeof style === 'string') {
      this.styleUtil.update(this.dataIdQuerySelector, style)
    } else if (!Array.isArray(style)) {
      this.styleUtil.update(this.dataIdQuerySelector, style as any)
    } else if (Array.isArray(style)) {
      let styleString = ''
      for (const styleI of style as []) {
        styleString = styleString?.concat('\n\n', styleI)
      }
      this.styleUtil.update(this.dataIdQuerySelector, styleString)
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

  async init() {}

  componentDidMount() {}

  private setProps(props: IAny, init: boolean) {
    BaseComponent.setProps(props, this, init)
  }

  get state(): IAny {
    return this._state || {}
  }

  set state(value: ReblendTyping.StateFunctionValue<IAny>) {
    this._state = {
      ...this._state,
      ...(typeof value == 'function' ? value(this._state) : value),
    }
    this.onStateChange()
  }

  setState(value: ReblendTyping.StateFunctionValue<IAny>) {
    this.state = value
  }

  isTextNode(node: Node): node is Text {
    return node?.nodeType === Node.TEXT_NODE
  }

  isEmpty(data: any) {
    return data === undefined || data === null
  }

  diffCreateOrRemove(parent: BaseComponent, oldNode: DomNodeChild, newNode: VNodeChild) {
    const patches: Patch[] = []
    if (
      !BaseComponent.isPrimitive(oldNode) &&
      Object.hasOwn(oldNode, 'reblendPrimitiveData') &&
      (oldNode as ReblendPrimitive).reblendPrimitiveData == newNode
    ) {
      return []
    }
    if (!oldNode) {
      patches.push({ type: 'CREATE', parent, newNode })
    } else if (!newNode) {
      patches.push({ type: 'REMOVE', parent, oldNode })
    }

    return patches
  }

  diff(parent: BaseComponent, oldNode: DomNodeChild, newNode: VNodeChild): Patch[] {
    const patches: Patch[] = []
    if (isCallable(oldNode) || isCallable(newNode)) {
      return []
    }

    if (BaseComponent.isPrimitive(oldNode) && BaseComponent.isPrimitive(newNode)) {
      patches.push({ type: 'CREATE', parent, newNode })
    } else if (BaseComponent.isPrimitive(oldNode) && !BaseComponent.isPrimitive(newNode)) {
      patches.push({ type: 'CREATE', parent, newNode })
    } else if (BaseComponent.isReblendPrimitiveElement(oldNode) && BaseComponent.isPrimitive(newNode)) {
      if ((<ReblendPrimitive>oldNode).getData() !== newNode) {
        ;(<ReblendPrimitive>oldNode).setData(newNode as Primitive)
      }
    } else if (BaseComponent.isReblendPrimitiveElement(oldNode) && !BaseComponent.isPrimitive(newNode)) {
      patches.push({ type: 'REPLACE', parent, newNode, oldNode })
    } else if (this.isTextNode(oldNode) && BaseComponent.isPrimitive(newNode)) {
      if (oldNode.textContent !== newNode) {
        patches.push({ type: 'TEXT', newNode, oldNode })
      }
    } else if (this.isTextNode(oldNode) && !BaseComponent.isPrimitive(newNode)) {
      patches.push({ type: 'REPLACE', parent, newNode, oldNode })
    } else if (!BaseComponent.isReblendPrimitiveElement(oldNode) && BaseComponent.isPrimitive(newNode)) {
      patches.push({ type: 'REPLACE', parent, newNode, oldNode })
    } else if (this.isEmpty(oldNode) && !this.isEmpty(newNode)) {
      patches.push({ type: 'CREATE', parent, newNode })
    } else if (!this.isEmpty(oldNode) && this.isEmpty(newNode)) {
      patches.push({ type: 'REMOVE', parent, oldNode })
    } else if ('displayName' in oldNode && 'displayName' in (newNode as any)) {
      const oldNodeTag = ((oldNode as BaseComponent).displayName as string).toLowerCase()

      const newNodeTag = (
        (BaseComponent.isPrimitive((newNode as VNode).displayName)
          ? (newNode as VNode).displayName
          : ((newNode as VNode).displayName as typeof Reblend).ELEMENT_NAME) as string
      ).toLowerCase()

      if (oldNodeTag !== newNodeTag) {
        patches.push({ type: 'REPLACE', parent, newNode, oldNode })
      } else {
        const propsDiff = this.diffProps(newNode as VNode, oldNode as BaseComponent)
        if (propsDiff && propsDiff.length > 0) {
          patches.push({
            type: 'UPDATE',
            patches: propsDiff,
          })
        }
        patches.push(...this.diffChildren(oldNode as BaseComponent, oldNode as BaseComponent, newNode as VNode))
      }
    }

    return patches
  }

  deepCompare(firstObject, secondObject) {
    if (typeof firstObject !== 'function' && secondObject !== 'function') {
      return isEqual(firstObject, secondObject)
    }

    // 1. Check if they are the same reference
    if (firstObject === secondObject) return true

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

  diffProps(newNode: VNode, oldNode: BaseComponent) {
    const patches: PropPatch[] = []
    const oldProps: IAny = oldNode?.props || []
    const newProps: IAny = newNode?.props || []
    for (const key in newProps) {
      if (key !== 'children') {
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
      if (key !== 'children' && !(key in newProps)) {
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

  diffChildren(parent: BaseComponent, oldNode: BaseComponent, newNode: VNode) {
    const oldChildren: DomNodeChildren = oldNode?.props?.children || []
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
        patches.push(...this.diffCreateOrRemove(parent, oldChild, newChild))
      } else {
        patches.push(...this.diff(parent, oldChild, newChild))
      }
    }

    return patches
  }

  async replaceOperation(oldNode: BaseComponent, operation: () => Promise<void>) {
    await operation()
    BaseComponent.detachChildren(oldNode)
    BaseComponent.detach(oldNode)
  }

  async applyProps(patches?: PropPatch[]) {
    requestAnimationFrame(() => {
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
      })
      nodes.forEach((node) => {
        if (!BaseComponent.isReblendRenderedNodeStandard(node)) {
          if (BaseComponent.isReactToReblendRenderedNode(node)) {
            ;(node as any)?.render()
          } else {
            node.onStateChange()
          }
        }
      })
      nodes = null as any
    })
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
  private async catchErrorFrom(fn: () => Promise<void> | void) {
    try {
      const result = fn.bind(this)()
      // Check if the result is a promise
      if (result && typeof result.then === 'function') {
        return result.catch(this.handleError.bind(this))
      }
    } catch (error) {
      this.handleError.bind(this)(error as Error)
    }
  }
  async onStateChange() {
    await this.catchErrorFrom.bind(this)(async () => {
      this.applyEffects()
      let vNodes = this.html()
      const patches: Patch[] = []
      if (!Array.isArray(vNodes)) {
        vNodes = [vNodes as any]
      }
      vNodes = BaseComponent.flattenVNodeChildren(vNodes as VNodeChildren)
      if (vNodes[0] && (vNodes[0] as any).parentNode) {
        vNodes = null as any
        return
      }
      const maxLength = Math.max(this.childNodes.length, (vNodes as VNodeChildren).length)
      for (let i = 0; i < maxLength; i++) {
        const newVNode: VNodeChild = vNodes[i]
        const currentVNode = this.htmlElements && this.htmlElements[i]
        patches.push(...this.diff(this, currentVNode as any, newVNode))
      }
      vNodes = null as any
      this.applyPatches(patches)
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
    requestIdleCallback(() => {
      BaseComponent.detachChildren(this)
      this.props = null as any
      this.htmlElements = null as any
    })
    this.parentElement?.removeChild(this)
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
          this.onStateChange()
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

  async attach() {
    await this.catchErrorFrom(async () => {
      let vNodes: VNode[] = this.html() as VNode[]
      /* if (BaseComponent.isReactToReblendRenderedNode(this)) {
        return;
      } */
      if (!vNodes) return
      const isVNodesArray = Array.isArray(vNodes)
      if (!isVNodesArray) {
        vNodes = [vNodes as any]
      }
      vNodes = BaseComponent.flattenVNodeChildren(vNodes as VNodeChildren) as any
      if (vNodes[0] && (vNodes[0] as any).parentNode) {
        vNodes = null as any
        return
      }
      vNodes = (await BaseComponent.createChildren(vNodes as VNodeChildren)) as any
      /* for (const vNode of vNodes as any as BaseComponent[]) {
        vNode.attach && vNode.attach()
      } */
      this.htmlElements = vNodes as any
      this.htmlElements?.forEach((htmlElement) => (htmlElement.directParent = this))
    })
  }

  async applyPatches(patches: Patch[]) {
    for (const { type, newNode, oldNode, parent, patches: patchess } of patches || []) {
      switch (type) {
        case 'CREATE':
          {
            const elements = await BaseComponent.createElement(newNode as VNode)

            parent?.htmlElements?.push(...elements)
            parent?.props?.children?.push(...elements)

            elements.forEach((element) =>
              BaseComponent.attachElementsAt(
                BaseComponent.isStandard(parent!) ? parent! : parent!.nearestStandardParent!,
                element,
              ),
            )
          }
          break
        case 'REMOVE':
          if (oldNode) {
            this.replaceOperation(oldNode, async () => {
              //For htmlElements
              const indexOfOldNodeInHtmlElements = parent?.htmlElements?.indexOf(oldNode as any) as number
              if (indexOfOldNodeInHtmlElements > -1) {
                parent!.htmlElements![indexOfOldNodeInHtmlElements] = null as any
                parent!.htmlElements = parent!.htmlElements?.filter(Boolean)
              }

              //For props children
              const indexOfOldNodeInPropsChildren = parent?.props.children?.indexOf(oldNode as any) as number
              if (indexOfOldNodeInPropsChildren > -1) {
                parent!.props.children![indexOfOldNodeInPropsChildren] = null as any
                parent!.props.children = parent!.props.children?.filter(Boolean)
              }
            })
          }
          break
        case 'REPLACE':
          if (oldNode) {
            this.replaceOperation(oldNode, async () => {
              const newNodeElements = await BaseComponent.createElement(newNode as VNode)
              const firstNewNode = newNodeElements.shift()

              //For htmlElements
              const indexOfOldNodeInHtmlElements = parent?.htmlElements?.indexOf(oldNode!) as number
              if (indexOfOldNodeInHtmlElements > -1) {
                // Spread the remaining elements after the oldNodeIndex
                parent!.htmlElements &&
                  parent!.htmlElements?.splice(indexOfOldNodeInHtmlElements + 1, 0, ...newNodeElements)
                parent!.htmlElements && (parent!.htmlElements[indexOfOldNodeInHtmlElements] = firstNewNode as any)
              }

              //For props children
              const indexOfOldNodeInPropsChildren = parent?.props.children?.indexOf(oldNode!) as number
              if (indexOfOldNodeInPropsChildren > -1) {
                // Spread the remaining elements after the oldNodeIndex
                parent!.props.children &&
                  parent!.props.children?.splice(indexOfOldNodeInPropsChildren + 1, 0, ...newNodeElements)
                parent!.props.children && (parent!.props.children[indexOfOldNodeInPropsChildren] = firstNewNode as any)
              }

              newNodeElements.unshift(firstNewNode as any)
              BaseComponent.replaceOldNode(newNodeElements, oldNode!)
            })
          }
          break
        case 'TEXT':
          oldNode && (oldNode.textContent = newNode as string)
          break
        case 'UPDATE':
          this.applyProps(patchess)
          break
      }
    }
  }
  /**
   * For compatibility incase standard element inherits this prototype; we can manually exec this constructor
   */
  _constructor() {
    this.effectsFn = []
    this.onMountEffects = []
    this.disconnectEffects = []
    this.styleUtil = StyleUtil
    BaseComponent.isReblendRenderedNodeStandard(this) && this.setDataID()
  }

  _appendChild<T extends Node>(node: T): T {
    const appended = this.appendChild(node)
    BaseComponent.connected(node as any)
    return appended
  }
}

export { BaseComponent }
