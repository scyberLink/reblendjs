/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalize, cloneDeep, isEqual } from 'lodash'
import { ReblendTyping } from 'reblend-typing'
import {
  isCallable,
  rand,
  REBLEND_COMPONENT_ATTRIBUTE_NAME,
  REBLEND_WRAPPER_FOR__ATTRIBUTE_NAME,
} from '../common/utils'
import { IAny } from '../interface/IAny'
import { IPair } from '../interface/IPair'
import {
  applyProps,
  connected,
  createElementWithNamespace,
  deepFlat,
  detachChildren,
  extendPrototype,
  findNodeIn,
  flattenVNodeChildren,
  getInternalIdentifier,
  isPrimitive,
  isReactToReblendVirtualNode,
  isReblendPrimitive,
  isReblendRenderedNode,
  isReblendRenderedNodeStandard,
  isReblendVirtualNode,
  isStandardVirtualNode,
  replaceOperation,
  setProps,
} from './BaseComponentHelper'
import {
  DomNodeChild,
  Patch,
  Primitive,
  ReactNode,
  ReactToReblendNode,
  ReactToReblendVNode,
  REBLEND_PRIMITIVE_ELEMENT_NAME,
  ReblendNode,
  ReblendNodeStandard,
  ReblendPrimitive,
  ReblendPrimitiveNode,
  ReblendRenderingException,
  ReblendVNode,
  ReblendVNodeStandard,
  VNode,
  VNodeChild,
  VNodeChildren,
} from './BaseComponentType'
import { PrimitiveElementPool } from './PrimitiveElementPool'
import { Reblend } from './Reblend'
import StyleUtil, { StyleUtilType } from './StyleUtil'
import { WorkerPool } from './WorkerPool'

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface BaseComponent extends HTMLElement {
  displayName: string
  internalIdentifier: string
  'Reblend.Node.Primitive'?: boolean
  'Reblend.Node'?: boolean
  'Reblend.VNode'?: boolean
  'React.Reblend.Node'?: boolean
  'React.Reblend.VNode'?: boolean
  'Reblend.Node.Standard'?: boolean
  'Reblend.VNode.Standard'?: boolean
  //[stateKey: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class BaseComponent {
  static ELEMENT_NAME = 'BaseComponent'
  static props: IAny

  static mountOn = (elementId: string, app: typeof Reblend | ReblendTyping.FunctionComponent, props?: IAny) => {
    const root = document.getElementById(elementId)
    if (!root) {
      throw new Error('Invalid root id')
    }
    const vNodes = BaseComponent.construct(app as any, props || {}, ...[])
    const nodes = BaseComponent.createChildren.bind(this)(Array.isArray(vNodes) ? (vNodes as any) : [vNodes])
    for (const node of nodes) {
      root.append(node)
      ;(node as BaseComponent).connectedCallback && (node as BaseComponent).connectedCallback()
    }
  }

  static createChildren = (children: VNodeChildren, containerArr: (BaseComponent | HTMLElement | Text)[] = []) => {
    for (const child of children) {
      if (isCallable(child) || child instanceof Reblend || child instanceof Node) {
        containerArr.push(child as any)
      } else if (Array.isArray(child)) {
        BaseComponent.createChildren.bind(this)(child as any, containerArr)
      } else if (
        isPrimitive(child) ||
        isReactToReblendVirtualNode(child) ||
        isReblendVirtualNode(child) ||
        isStandardVirtualNode(child)
      ) {
        const domChild = deepFlat(createElement.bind(this)(child as any))
        domChild && containerArr.push(...domChild)
      } else {
        throw new TypeError('Invalid child node  in children')
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

    const internalIdentifier = getInternalIdentifier(clazz)

    const mergedProp = {
      ...(isTagStandard && clazz.props ? clazz.props : {}),
      ...props,
      children,
    }

    const velement = {
      internalIdentifier,
      displayName: clazz,
      props: mergedProp,
      toJSON: () => ({
        ...velement,
        props: (() => {
          const mergedPropTemp: any = {}
          Object.entries(mergedProp).forEach(([key, value]) => {
            mergedPropTemp[key] = isCallable(value)
              ? (value as any)?.name
              : key === 'children' && Array.isArray(value)
              ? value.map((childrenValue) => (isCallable(childrenValue) ? (childrenValue as any)?.name : childrenValue))
              : value
          })
          return mergedPropTemp
        })(),
        displayName:
          typeof displayName === 'string'
            ? displayName
            : (isReactNode(clazz) ? (clazz as any as ReactNode)?.displayName : clazz?.ELEMENT_NAME) || `Anonymous`,
      }),
    }

    injectNodeType(clazz, velement)

    return velement
  }

  dataIdQuerySelector!: string

  props!: IAny

  styleUtil!: StyleUtilType

  renderingError?: ReblendRenderingException

  renderingErrorHandler?: (e: ReblendRenderingException) => void

  container?: BaseComponent

  attached!: boolean

  ReactClass: any
  ref!: ReblendTyping.Ref<HTMLElement> | ((node: HTMLElement) => any)
  private onMountEffects?: ReblendTyping.StateEffectiveFunction[]
  private effectsFn?: ReblendTyping.StateEffectiveFunction[]
  private disconnectEffects?: ReblendTyping.StateEffectiveFunction[]
  stateIdNotIncluded = new Error('State Identifier/Key not specified')
  private _dataId!: string

  private _state!: IAny

  connectedCallback() {
    if (!this.attached) {
      this.componentDidMount()
      this.mountEffects!()
      this.attached = true
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
  setProps(props: IAny, init: boolean) {
    setProps(props, this, init)
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

  async attach() {
    this.catchErrorFrom(async () => {
      let vNodes = this.html()
      /* if (isReactToReblendRenderedNode(this)) {
        return;
      } */
      if (!vNodes) return
      const isVNodesArray = Array.isArray(vNodes)
      if (isVNodesArray && (vNodes as []).length < 1) {
        return
      }
      if (isVNodesArray) {
        vNodes = flattenVNodeChildren(vNodes as VNodeChildren)
      }
      if (isVNodesArray) {
        if (vNodes[0] && vNodes[0].parentNode) {
          vNodes = null as any
          return
        }
        vNodes = BaseComponent.createChildren.bind(this)(vNodes as VNodeChildren) as any
        vNodes = (vNodes as any).filter(Boolean)

        if ((vNodes as VNodeChildren)?.length > 0) {
          this.innerHTML = ''
          this.appendChildren(...(vNodes as any))
        }
      } else {
        if ((vNodes as any)?.parentNode) {
          vNodes = null as any
          return
        }
        vNodes = deepFlat(createElement.bind(this)(vNodes as VNode) as any)
        if ((vNodes as VNodeChildren)?.length > 0) {
          this.innerHTML = ''
          this.appendChildren(...(vNodes as any))
        }
      }
    })
  }

  applyEffects() {
    this.stateEffectRunning = true
    this.effectsFn?.forEach((effectFn) => effectFn())
    this.stateEffectRunning = false
  }

  handleError(error: Error) {
    if (this.renderingErrorHandler) {
      this.renderingErrorHandler((((error as any).component = this), error) as ReblendRenderingException)
    } else if (this.container && isReblendRenderedNode(this.container)) {
      this.container.handleError(error)
    } else {
      throw error
    }
  }

  catchErrorFrom(fn: () => Promise<void>) {
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

  stateEffectRunning = false

  async onStateChange() {
    this.catchErrorFrom.bind(this)(async () => {
      this.applyEffects()
      let vNodes = this.html()
      const isVNodesArray = Array.isArray(vNodes)
      if (isVNodesArray) {
        vNodes = flattenVNodeChildren(vNodes as VNodeChildren)
      }
      if (isVNodesArray) {
        if (vNodes[0] && vNodes[0].parentNode) {
          vNodes = null as any
          return
        }
      } else {
        if ((vNodes as any)?.parentNode) {
          vNodes = null as any
          return
        }
      }

      const parseResult = ((result) => {
        if (result && result.length > 0) {
          applyPatches(result, vNodes)
          vNodes = null as any
        }
      }).bind(this)

      WorkerPool.executeTask({
        oldVnodes: this.childNodes as unknown as DomNodeChild[],
        newVNodes: isVNodesArray ? (vNodes as VNodeChild[]) : [vNodes as VNodeChild],
        parentId: this.internalIdentifier,
      })
        .then(parseResult)
        .catch((error) => {
          throw error
        }) /* 
        .finally(() => {
          this.stateEffectRunning = false
        }) */
    })
  }

  protected html(): VNode | VNodeChildren {
    return null as any
  }

  mountEffects() {
    this.stateEffectRunning = true
    this.onMountEffects?.forEach((fn) => {
      const disconnectEffect = fn()
      disconnectEffect && this.disconnectEffects?.push(disconnectEffect)
    })
    this.stateEffectRunning = false
    //this.onStateChange()
  }

  disconnectedCallback() {
    if (isReblendPrimitive(this)) {
      this.parentElement?.removeChild(this)
      ;(<any>this).setData(null)
      PrimitiveElementPool.add(this as any)
      return
    }
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
    //requestIdleCallback(() => {
    detachChildren(this)
    //})
    this.parentElement?.removeChild(this)
    deleteElement(this)
    this.props = null as any
    this._state = null as any
    this.effectsFn = null as any
    this.disconnectEffects = null as any
    this.onMountEffects = null as any
    this.renderingError = null as any
    this.renderingErrorHandler = null as any
    this.container = null as any
    this.ref = null as any
  }

  cleanUp() {}
  componentWillUnmount() {}

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
        if (!this.stateEffectRunning) {
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
        const v = fn()
        setState(v)
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

  toJSON(): any {
    return {
      [(this[ReblendNode] && ReblendNode) ||
      (this[ReblendNodeStandard] && ReblendNodeStandard) ||
      (this[ReactToReblendNode] && ReactToReblendNode) ||
      'undefined_node_type']: true,
      displayName: isPrimitive(this.displayName)
        ? this.displayName
        : (this.displayName as any).ELEMENT_NAME || (this.displayName as any).displayName || 'Anonymous',
      props: (() => {
        const mergedPropTemp = {}
        Object.entries(this.props || {}).forEach(([key, value]) => {
          mergedPropTemp[key] = isCallable(value)
            ? (value as any)?.name
            : key === 'children' && Array.isArray(value)
            ? value.map((childrenValue) => (isCallable(childrenValue) ? (childrenValue as any)?.name : childrenValue))
            : value
        })
        return mergedPropTemp
      })(),
      internalIdentifier: this.internalIdentifier,
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
    isReblendRenderedNodeStandard(this) && this.setDataID()
  }

  _appendChild<T extends Node>(node: T): T {
    const appended = this.appendChild(node)
    ;(node as any)?.connectedCallback && (node as any)?.connectedCallback()
    return appended
  }
}

//@ts-expect-error
import { Root } from 'react-dom/client'
import { getChildrenWrapperForReact } from './BaseComponentHelper'
import { deleteElement, getElement, setElement } from './ElementDictionary'

class ReblendReactClass extends BaseComponent {
  reactDomCreateRoot_root?: Root

  constructor() {
    super()
  }

  protected html(): VNode | VNodeChildren {
    return this.props.children
  }
  async initRoot() {
    if (!this.reactDomCreateRoot_root || !Object.values(this.reactDomCreateRoot_root)[0]) {
      //@ts-expect-error
      const reactDom = await import('react-dom/client')

      this.reactDomCreateRoot_root = reactDom.createRoot(this)
    }
  }
  render() {
    this.attach()
  }

  async attach() {
    this.catchErrorFrom(async () => {
      await this.initRoot()
      //Lazy load react i.e it been bundled separately and only fetch when needed
      const react = await import('react')
      const childrenWrapper = await getChildrenWrapperForReact(this.props?.children)

      this.reactDomCreateRoot_root?.render(
        react.createElement(this.ReactClass, {
          ...this.props,
          children: !this.props?.children?.length ? undefined : childrenWrapper,
        }),
      )
    })
  }

  cleanUp(): void {
    this.reactDomCreateRoot_root = null as unknown
  }
}

export const newReblendPrimitive = () => {
  const span: ReblendPrimitive & BaseComponent = document.createElement('span') as any
  span.displayName = REBLEND_PRIMITIVE_ELEMENT_NAME
  span.internalIdentifier = getInternalIdentifier(REBLEND_PRIMITIVE_ELEMENT_NAME)

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

  span.disconnectedCallback = BaseComponent.prototype.disconnectedCallback
  span.cleanUp = BaseComponent.prototype.cleanUp
  span.componentWillUnmount = BaseComponent.prototype.componentWillUnmount

  span.toJSON = function () {
    return {
      displayName: REBLEND_PRIMITIVE_ELEMENT_NAME,
      internalIdentifier: this.internalIdentifier,
      [ReblendPrimitiveNode]: true,
      reblendPrimitiveData: this.reblendPrimitiveData,
    }
  }
  return span
}

export const createElement = (vNode: VNode | ReactNode | Primitive): BaseComponent[] => {
  if (Array.isArray(vNode)) {
    return BaseComponent.createChildren(vNode) as any
  }
  if (isPrimitive(vNode)) {
    const ele = PrimitiveElementPool.get().setData(vNode as Primitive)
    setElement(ele)
    return [ele]
  }

  const { displayName } = vNode as VNode
  let clazz: typeof Reblend = displayName as any as typeof Reblend
  const isTagStandard = typeof displayName === 'string'
  const _isReactNode = isReactNode(displayName as any)

  const children: unknown[] = []
  children.push(...((isTagStandard && clazz.props ? clazz.props : {}).children || []))
  children.push(...((vNode as VNode)?.props?.children || []))

  const props = {
    ...(isTagStandard && clazz.props ? clazz.props : {}),
    ...(vNode as VNode).props,
    children: BaseComponent.createChildren.bind(this)(children as any),
  }

  const tagName = isTagStandard
    ? displayName
    : (isReactNode(clazz) ? (clazz as any as ReactNode)?.displayName || `React_Anonymous` : clazz?.ELEMENT_NAME) ||
      `Anonymous`

  isTagStandard || (clazz.ELEMENT_NAME = tagName)

  if (_isReactNode) {
    clazz = ReblendReactClass as any
    clazz.ELEMENT_NAME = capitalize(`${(displayName as unknown as ReactNode).displayName || `React_Anonymous`}`)
  }

  const element: Reblend = createElementWithNamespace(isTagStandard ? (displayName as string) : 'div') as Reblend

  element[_isReactNode ? ReactToReblendNode : isTagStandard ? ReblendNodeStandard : ReblendNode] = true
  element.displayName = tagName
  if (_isReactNode) {
    element.ReactClass = displayName
  }
  if (isTagStandard) {
    extendPrototype(element, Reblend.prototype)
  } else {
    extendPrototype(element, clazz.prototype)
  }
  element._constructor()
  if (!isTagStandard) {
    if (_isReactNode) {
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

  setProps(props, element, true).then(() => {
    element.attach && element.attach()
  })

  element.container = this as any as BaseComponent
  element.internalIdentifier = (vNode as VNode)?.internalIdentifier
  setElement(element)
  return [element]
}

export const applyPatches = (patches: Patch[], vNodes: VNode | VNodeChildren) => {
  patches?.forEach(({ type, newNodeId: newNodeId, primitive, oldNodeId: oldNodeId, parentId, patches }) => {
    let parent = getElement(parentId as string)
    let oldNode = getElement(oldNodeId as string)
    let newNode = primitive ? primitive.newData : newNodeId && findNodeIn(vNodes, newNodeId)

    switch (type) {
      case 'CREATE':
        {
          const element = deepFlat(createElement.bind(this)(newNode as VNode))
          element && parent?.appendChildren(...element)
          parent?.props?.children?.push(...element)
        }
        break
      case 'REMOVE':
        {
          replaceOperation(oldNode, () => {
            const oldNodeIndex = parent?.props?.children?.indexOf(oldNodeId)
            if (oldNodeIndex > -1) {
              const replacer = PrimitiveElementPool.get()
              parent!.props.children[oldNodeIndex] = replacer
              oldNode?.parentNode?.replaceChild(replacer, oldNode)
            }
          })
        }
        break
      case 'REPLACE':
        {
          if (oldNode) {
            replaceOperation(oldNode, () => {
              const newNodeElement = deepFlat(createElement.bind(this)(newNode as VNode))
              let firstNewNode = newNodeElement.shift()
              oldNode!.parentNode?.replaceChild(<BaseComponent>firstNewNode, oldNode!)
              connected(firstNewNode)
              const oldNodeIndex = parent?.props?.children?.indexOf(oldNodeId)
              if (oldNodeIndex > -1) {
                // Spread the remaining elements after the oldNodeIndex
                parent!.props?.children?.splice(oldNodeIndex + 1, 0, ...newNodeElement)
                parent!.props.children[oldNodeIndex] = firstNewNode
              }
              //Append the remaining node after the firstNewNode
              for (const node of newNodeElement) {
                firstNewNode?.after(node)
                connected(node)
                firstNewNode = node
              }
            })
          }
        }
        break
      case 'TEXT':
        {
          const element = getElement(oldNodeId as string)
          element && (element.textContent = primitive?.newData as string)
        }
        break
      case 'UPDATE':
        {
          applyProps(patches || [], vNodes)
        }
        break
    }
    {
      type = null as any
      newNodeId = null as any
      oldNodeId = null as any
      parent = null as any
      patches = null as any
      parent = null as any
      oldNode = null as any
      newNode = null as any
    }
  })
}

export const isReactNode = (displayName: IAny): boolean => {
  return (
    displayName &&
    typeof displayName !== 'string' &&
    ('$$typeof' in displayName ||
      (displayName.prototype && displayName.prototype.isReactComponent) ||
      (isCallable(displayName) && !(displayName instanceof Reblend)))
  )
}

export const injectNodeType = (clazz: object, node: object): void => {
  if (!clazz || !node) {
    throw new Error('No clazz or Node')
  }
  node[typeof clazz === 'string' ? ReblendVNodeStandard : isReactNode(clazz) ? ReactToReblendVNode : ReblendVNode] =
    true
}

export { ReblendReactClass }

export { BaseComponent }
