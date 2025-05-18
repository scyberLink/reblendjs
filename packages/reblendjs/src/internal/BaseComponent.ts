/* eslint-disable @typescript-eslint/no-explicit-any */
import { isCallable, rand } from '../common/utils'
import { IAny } from '../interface/IAny'
import StyleUtil from './StyleUtil'
import { ChildrenPropsUpdateType, ReblendTyping } from 'reblend-typing'
import { Reblend } from './Reblend'
import { NodeUtil, ReblendNodeTypeDict } from './NodeUtil'
import { ElementUtil } from './ElementUtil'
import { DiffUtil } from './DiffUtil'
import { NodeOperationUtil } from './NodeOperationUtil'
import { CSSProperties } from 'react'
import { ReblendReactClass } from './ReblendReactClass'

StyleUtil

interface EffectState {
  cache: ReblendTyping.Primitive | Array<ReblendTyping.Primitive>
  cacher: () => ReblendTyping.Primitive | Array<ReblendTyping.Primitive>
  effect?: ReblendTyping.StateEffectiveFunction
  disconnectEffect?: ReblendTyping.StateEffectiveFunction
}

export interface BaseComponent<P, S> extends HTMLElement {
  nearestStandardParent?: HTMLElement
  onStateChangeRunning: boolean | undefined
  elementChildren: Set<ReblendTyping.Component<P, S>> | null
  reactElementChildrenWrapper: ReblendTyping.Component<any, any> | null
  directParent: ReblendTyping.Component<any, any>
  childrenInitialize: boolean
  dataIdQuerySelector: string
  props: Readonly<P>
  reactDomCreateRoot_root: import('react-dom/client').Root | null
  renderingError: ReblendTyping.ReblendRenderingException<P, S>
  displayName: string
  renderingErrorHandler: (e: ReblendTyping.ReblendRenderingException<P, S>) => void
  removePlaceholder: () => Promise<void>
  attached: boolean
  isPlaceholder: boolean
  placeholderAttached: boolean
  ReactClass: any
  ReblendPlaceholder?: ReblendTyping.VNode | typeof Reblend
  defaultReblendPlaceholderStyle: CSSProperties | string
  ref: ReblendTyping.Ref<HTMLElement> | ((node: HTMLElement) => any)
  effectsState: Map<string, EffectState>
  hookDisconnectedEffects?: Set<() => void>
  checkPropsChange(): Promise<void>
  addHookDisconnectedEffect(destructor: () => void): void
  hasDisconnected: boolean
  htmlElements: ReblendTyping.Component<P, S>[]
  childrenPropsUpdate: Set<ChildrenPropsUpdateType>
  numAwaitingUpdates: number
  stateEffectRunning: boolean
  forceEffects: boolean
  mountingEffects: boolean
  initStateRunning: boolean
  awaitingInitState: boolean
  awaitingChildrenConnectedness: boolean
  state: S
  reactReblendMount: undefined | ((afterNode?: HTMLElement) => any)
}

const stateIdNotIncluded = new Error('State Identifier/Key not specified')
const unxpectedNumberOfArgument = new Error('Unexpected number of argument')

export class BaseComponent<
  P = Record<string, never>,
  S extends { renderingErrorHandler?: (error: Error) => void } = Record<string, never>,
> implements ReblendTyping.Component<P, S>
{
  [reblendComponent: symbol]: boolean
  static ELEMENT_NAME = 'BaseComponent'
  static props: IAny
  static config?: ReblendTyping.ReblendComponentConfig

  static async wrapChildrenToReact(
    components: JSX.Element | ReblendTyping.JSXElementConstructor<Record<string, never>>,
  ) {
    const elementChildren = await ElementUtil.createElement(components as any)
    return await ReblendReactClass.getChildrenWrapperForReact(elementChildren)
  }

  static construct(
    displayName: typeof Reblend | string | ReblendTyping.VNode[],
    props: IAny,
    ...children: ReblendTyping.VNodeChildren
  ): ReblendTyping.VNode | ReblendTyping.VNodeChildren {
    if (Array.isArray(displayName)) {
      return displayName as []
    }

    if (
      NodeUtil.isReblendVirtualNodeStandard(displayName) ||
      NodeUtil.isReblendVirtualNode(displayName) ||
      NodeUtil.isReactToReblendVirtualNode(displayName) ||
      NodeUtil.isReactToReblendVirtualNode(displayName) ||
      NodeUtil.isReblendLazyVirtualNode(displayName)
    ) {
      const temp = {
        ...(displayName as any),
        props: {
          ...((displayName as any)?.props || {}),
          ...props,
        },
      }

      if ((displayName as any)?.props?.children || props?.children || children.length) {
        temp.props.children = [
          ...((displayName as any)?.props?.children || []),
          ...(props?.children || []),
          ...(children || []),
        ]
      }

      return temp as any
    }

    if (
      NodeUtil.isReblendRenderedNode(displayName) ||
      NodeUtil.isReblendRenderedNodeStandard(displayName) ||
      NodeUtil.isReactToReblendRenderedNode(displayName) ||
      NodeUtil.isReblendRenderedLazyNode(displayName)
    ) {
      const temp = {
        ...((displayName as any)?.props || {}),
        ...props,
      }

      if ((displayName as any)?.props?.children || props?.children || children.length) {
        temp.children = [
          ...((displayName as any)?.props?.children || []),
          ...(props?.children || []),
          ...(children || []),
        ]
      }

      ;(displayName as any).props = temp
      return displayName as any
    }

    if (NodeUtil.isLazyNode(displayName as any)) {
      const temp = {
        displayName: displayName as any,
        props: {
          ...props,
        },
      }

      if (props?.children || children.length) {
        temp.props.children = [
          ...((displayName as any)?.props?.children || []),
          ...(props?.children || []),
          ...(children || []),
        ]
      }

      NodeUtil.addSymbol(ReblendNodeTypeDict.ReblendLazyVNode, temp)
      return temp as any
    }

    const clazz: undefined | typeof Reblend = displayName as typeof Reblend
    const isTagStandard = typeof displayName === 'string'
    if (!isTagStandard && clazz?.ELEMENT_NAME === 'Fragment') {
      return children || []
    }

    if (
      (clazz?.props?.children && !Array.isArray(clazz?.props?.children)) ||
      (props?.children && !Array.isArray(props?.children))
    ) {
      throw new Error('Children props must be an array of ReblendNode or HTMLElement')
    }

    const mergedProp = {
      ...(!isTagStandard && clazz?.props ? clazz.props : {}),
      ...props,
    }
    if (clazz?.props?.children || props?.children || children.length) {
      mergedProp.children = [...(clazz?.props?.children || []), ...(props?.children || []), ...(children || [])]
    }

    const velement = {
      displayName: clazz || displayName,
      props: mergedProp,
    }

    NodeUtil.addSymbol(
      isTagStandard
        ? ReblendNodeTypeDict.ReblendVNodeStandard
        : NodeUtil.isReactNode(clazz!)
        ? ReblendNodeTypeDict.ReactToReblendVNode
        : NodeUtil.isLazyNode(clazz!)
        ? ReblendNodeTypeDict.ReblendLazyVNode
        : ReblendNodeTypeDict.ReblendVNode,
      velement,
    )

    return velement as any
  }

  static async mountOn(
    elementId: string,
    app: typeof Reblend | ReblendTyping.FunctionComponent,
    props?: IAny,
    options?: { preloader?: typeof Reblend | ReblendTyping.FunctionComponent },
  ): Promise<void> {
    let appRoot = document.getElementById(elementId)
    if (!appRoot) {
      throw new Error('Invalid root id')
    }
    let root: Reblend = (await ElementUtil.createElement(document.createElement('div') as any)).pop() as any
    root.setAttribute('ReblendRoot', '')
    let initialDisplay = root.style.display || 'initial'

    let preloaderParent = document.createElement('div')
    preloaderParent.setAttribute('preloaderParent', '')

    const openPreloader = () => {
      let body = document.body
      body.appendChild(preloaderParent)
      root.style.display = 'none'
      preloaderParent.style.display = 'initial'
    }

    // A new mount function that processes nodes one by one,
    // yielding after each node so the browser can update the UI.
    const mountChunked = async (parent: HTMLElement, nodes: BaseComponent[]) => {
      for (const node of nodes) {
        parent.appendChild(node)
        NodeOperationUtil.connected(node)
        // Yield to the browser to allow UI updates (e.g., the preloader animation).
        await new Promise<void>((resolve) => requestAnimationFrame(<any>resolve))
      }
    }

    // Load and mount the preloader.
    let customPreloader = options?.preloader
    let { Preloader } = await import('./components/Preloader')
    let preloaderVNodes = customPreloader
      ? typeof customPreloader === 'function'
        ? BaseComponent.construct(customPreloader as any, {}, ...[])
        : customPreloader
      : BaseComponent.construct(Preloader as any, {}, ...[])
    let preloaderNodes: BaseComponent[] = (await ElementUtil.createChildren(
      Array.isArray(preloaderVNodes) ? preloaderVNodes : [preloaderVNodes],
    )) as any
    await mountChunked(preloaderParent, preloaderNodes)
    openPreloader()

    // Construct the main app nodes.
    root.html = async () => BaseComponent.construct(app as any, props || {}, ...[])

    NodeOperationUtil.connected(root)

    // Let's show the preloader for a second to make it look like a real app
    await new Promise<void>((resolve) => setTimeout(() => requestAnimationFrame(<any>resolve), 1000))
    root.populateHtmlElements()

    const closePreloader = () => {
      root.style.display = initialDisplay
      preloaderParent.style.display = 'none'
      appRoot?.appendChild(root)
      preloaderParent.remove()
      preloaderNodes.forEach((n) => {
        NodeOperationUtil.detach(n)
      })
      appRoot = undefined as any
      preloaderParent = undefined as any
      root = undefined as any
      initialDisplay = undefined as any
      Preloader = undefined as any
      preloaderVNodes = undefined as any
      preloaderNodes = undefined as any
    }

    closePreloader()
    Promise.resolve().then(() => requestAnimationFrame(() => {}))
  }

  async createInnerHtmlElements() {
    let htmlVNodes = await this.html()
    if (isCallable(htmlVNodes)) {
      htmlVNodes = (htmlVNodes as any)()
    }
    if (!Array.isArray(htmlVNodes)) {
      htmlVNodes = [htmlVNodes]
    }
    htmlVNodes = DiffUtil.flattenVNodeChildren(htmlVNodes as any)
    const htmlElements: ReblendTyping.Component<P, S>[] = (await ElementUtil.createChildren(htmlVNodes as any)) as any

    return htmlElements
  }

  async populateHtmlElements(): Promise<void> {
    if (this.hasDisconnected) {
      return
    }
    try {
      const isReactReblend = NodeUtil.isReactToReblendRenderedNode(this)
      //This is a guard against race condition where parent state changes before populating this component elements
      if (isReactReblend && (this.elementChildren?.size || this.reactElementChildrenWrapper)) {
        return
      }
      const htmlElements: ReblendTyping.Component<P, S>[] = (await this.createInnerHtmlElements()) as any
      htmlElements.forEach((node) => (node.directParent = this as any))
      this.elementChildren = new Set(htmlElements)
      if (this.removePlaceholder) {
        this.removePlaceholder()
      }
      if (isReactReblend) {
        this.reactReblendMount && this.reactReblendMount()
      } else {
        htmlElements.forEach((node) => {
          this.appendChild(node)
          NodeOperationUtil.connected(node)
        })
        if (this.isPlaceholder && this.directParent?.awaitingInitState && !this.directParent?.initStateRunning) {
          setTimeout(() => {
            NodeOperationUtil.connected(this.directParent)
            this.directParent.awaitingInitState = false
          }, 1)
        }
      }
      this.childrenInitialize = true
    } catch (error) {
      this.handleError(error as Error)
    }
  }

  async connectedCallback() {
    if (this.initStateRunning) {
      if (this.isPlaceholder) {
        this.awaitingInitState = true
        return
      } else if (this.ReblendPlaceholder) {
        let placeholderVNodes
        if (typeof this.ReblendPlaceholder === 'function') {
          placeholderVNodes = BaseComponent.construct(this.ReblendPlaceholder, {})
        } else {
          placeholderVNodes = this.ReblendPlaceholder
        }
        const placeholderElements = await ElementUtil.createElement(placeholderVNodes)
        if (!this.childrenInitialize) {
          if (this.placeholderAttached) {
            return
          }
          this.placeholderAttached = true
          placeholderElements.forEach((placeholderElement) => {
            placeholderElement.directParent = this as any
            placeholderElement.isPlaceholder = true
            this.appendChild(placeholderElement)
            NodeOperationUtil.connected(placeholderElement)
          })
          this.awaitingInitState = true
          this.removePlaceholder = async () => {
            placeholderElements.forEach((placeholderElement) => NodeOperationUtil.detach(placeholderElement))
            this.removePlaceholder = undefined as any
          }
          requestAnimationFrame(() => {
            /* empty */
          })
        }
      } else {
        const { default: Placeholder } = await import('./components/Placeholder')
        const placeholderVNodes = BaseComponent.construct(Placeholder as any, {
          style: this.defaultReblendPlaceholderStyle,
        })
        const placeholderElements = await ElementUtil.createElement(placeholderVNodes as ReblendTyping.VNodeChild)
        if (!this.childrenInitialize) {
          if (this.placeholderAttached) {
            return
          }
          this.placeholderAttached = true
          placeholderElements.forEach((placeholderElement) => {
            placeholderElement.directParent = this as any
            placeholderElement.isPlaceholder = true
            this.appendChild(placeholderElement)
            NodeOperationUtil.connected(placeholderElement)
          })
          this.awaitingInitState = true
          this.removePlaceholder = async () => {
            placeholderElements.forEach((placeholderElement) => NodeOperationUtil.detach(placeholderElement))
            this.removePlaceholder = undefined as any
          }
          requestAnimationFrame(() => {
            /* empty */
          })
        }
      }
      return
    }
    await NodeOperationUtil.connectedCallback(this as any)
  }

  addHookDisconnectedEffect(destructor: () => void) {
    this.hookDisconnectedEffects?.add(destructor)
  }

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

  async initState<ExpectedReturn = any>(): Promise<ExpectedReturn> {
    return undefined as any
  }

  async initProps(props: P) {
    this.props = props || ({} as any)
  }

  componentDidMount() {
    /* Optionally implement this in class component */
  }

  setState(value: S) {
    this.state = value
    this.onStateChange()
  }

  applyEffects() {
    this.effectsState?.forEach((state) => {
      const disconnectEffect = state.effect && state.effect()
      if (disconnectEffect) {
        if (disconnectEffect instanceof Promise) {
          disconnectEffect.then((resolvedDisconnectEffect) => {
            if (typeof resolvedDisconnectEffect === 'function') {
              state.disconnectEffect = resolvedDisconnectEffect
            }
          })
        } else if (typeof disconnectEffect === 'function') {
          state.disconnectEffect = disconnectEffect
        }
      }
    })
  }

  handleError(error: Error) {
    if (this.renderingErrorHandler) {
      this.renderingErrorHandler(
        (((error as any).component = this), error) as ReblendTyping.ReblendRenderingException<P, S>,
      )
    } else if (this.state?.renderingErrorHandler && typeof this.state.renderingErrorHandler === 'function') {
      this.state.renderingErrorHandler(error)
    } else if (this.directParent) {
      this.directParent.handleError(error)
    } else {
      throw error
    }
  }

  catchErrorFrom(fn: () => void) {
    try {
      fn.bind(this)()
    } catch (error) {
      this.handleError.bind(this)(error as Error)
    }
  }

  cacheEffectDependencies() {
    this.effectsState?.forEach((value) => {
      value.cache = value.cacher()
    })
  }

  async onStateChange() {
    if (!this.attached || this.hasDisconnected) {
      return
    }
    if (NodeUtil.isStandard(this)) {
      return
    }
    if (this.stateEffectRunning) {
      this.cacheEffectDependencies()
      return
    }
    if (this.onStateChangeRunning || this.initStateRunning || this.numAwaitingUpdates) {
      this.numAwaitingUpdates++
      return
    }
    const patches: ReblendTyping.Patch<P, S>[] = []
    let newVNodes: ReblendTyping.ReblendNode
    try {
      this.stateEffectRunning = true
      this.applyEffects()
      this.stateEffectRunning = false
      this.forceEffects = false
      this.onStateChangeRunning = true
      if (this.childrenInitialize) {
        newVNodes = await this.html()
        if (isCallable(newVNodes)) {
          newVNodes = (newVNodes as any)()
        }
        if (!Array.isArray(newVNodes)) {
          newVNodes = [newVNodes as any]
        }
        newVNodes = DiffUtil.flattenVNodeChildren(newVNodes as ReblendTyping.VNodeChildren) as any
        const oldNodes = [...(this.elementChildren?.values() || [])]

        const maxLength = Math.max(oldNodes.length || 0, (newVNodes as ReblendTyping.VNodeChildren).length)
        for (let i = 0; i < maxLength; i++) {
          const newVNode: ReblendTyping.VNodeChild = newVNodes![i]
          const currentVNode = oldNodes[i]
          patches.push(...(NodeOperationUtil.diff(this as any, currentVNode as any, newVNode) as any))
        }
      }
    } catch (error) {
      this.handleError(error as Error)
    } finally {
      await NodeOperationUtil.applyPatches(patches)
      this.onStateChangeRunning = false
      if (this.numAwaitingUpdates) {
        this.numAwaitingUpdates = 0
        this.onStateChange()
      }
      newVNodes = null as any
    }
  }

  async html(): Promise<ReblendTyping.ReblendNode> {
    return null as any
  }

  async mountEffects() {
    this.mountingEffects = true
    this.stateEffectRunning = true
    if (!NodeUtil.isReblendPrimitiveElement(this)) {
      this.applyEffects()
    }
    this.mountingEffects = false
    this.stateEffectRunning = false
    if (!NodeUtil.isStandard(this) && !NodeUtil.isReactToReblendRenderedNode(this)) {
      await this.populateHtmlElements()
    }
  }

  disconnectedCallback(fromCleanUp = false) {
    NodeOperationUtil.disconnectedCallback<P, S>(this as any, fromCleanUp)
  }

  cleanUp() {
    /* Cleans up resources before the component unmounts. */
  }

  componentWillUnmount() {
    /* Lifecycle method for component unmount actions. */
  }

  dependenciesChanged(currentDependencies: Array<any> | undefined, previousDependencies: Array<any> | undefined) {
    if (!previousDependencies || previousDependencies.length !== currentDependencies?.length) {
      return false
    }

    return currentDependencies.some((dep, index) => {
      return !Object.is(dep, previousDependencies[index])
    })
  }

  generateId() {
    const id = rand(10000, 999999) + '_effectId'
    if (this.effectsState.get(id)) {
      return this.generateId()
    }
    return id
  }

  useState<T>(...initial_stateKey: any[]): [T, ReblendTyping.StateFunction<T>] {
    const argumentsLength = initial_stateKey.length

    if (argumentsLength < 1 || argumentsLength > 2) {
      throw unxpectedNumberOfArgument
    }

    let initial = argumentsLength > 1 ? initial_stateKey[0] : undefined

    const stateID: string | undefined = initial_stateKey.pop()
    if (!stateID) {
      throw stateIdNotIncluded
    }

    if (typeof initial === 'function') {
      initial = (initial as () => T)()
      this.state[stateID] = initial
    } else if (initial instanceof Promise) {
      initial.then((val) => (this.state[stateID] = val))
    }
    const variableSetter: ReblendTyping.StateFunction<T> = (async (
      value: ReblendTyping.StateFunctionValue<T>,
      force = false,
    ) => {
      if (typeof value === 'function') {
        value = await (value as (v: T) => T)(this.state[stateID])
      } else if (value instanceof Promise) {
        value = await value
      }
      if (force || this.state[stateID] !== value) {
        this.state[stateID] = value as T
        if (this.attached) {
          if (force) {
            this.forceEffects = true
          }
          this.onStateChange()
        }
      }
    }).bind(this)

    return [initial as T, variableSetter]
  }

  useEffect(...fn_dependencies: any[]) {
    const argumentsLength = fn_dependencies.length
    if (argumentsLength < 1 || argumentsLength > 2) {
      throw unxpectedNumberOfArgument
    }

    let fn: ReblendTyping.StateEffectiveFunction = fn_dependencies[0]
    const dependencies: any[] = argumentsLength === 2 ? fn_dependencies[1] : undefined

    fn = fn.bind(this)
    const dep = new Function(`return (${dependencies})`).bind(this)
    const effectKey = this.generateId()

    const cacher: () => ReblendTyping.Primitive | Array<ReblendTyping.Primitive> = () => dep()
    const effectState: EffectState = { cache: cacher(), cacher: cacher }
    this.effectsState.set(effectKey, effectState)

    const internalFn = (() => {
      const current = cacher()
      if (
        this.forceEffects ||
        !dependencies ||
        this.mountingEffects ||
        this.dependenciesChanged(current as ReblendTyping.Primitive[], effectState.cache as ReblendTyping.Primitive[])
      ) {
        effectState.cache = current
        return fn()
      }
    }).bind(this)
    effectState.effect = internalFn
  }

  useReducer<T, I>(...reducer_initial_stateKey: any[]): [T, ReblendTyping.StateFunction<I>] {
    const argumentsLength = reducer_initial_stateKey.length

    if (argumentsLength < 2 || argumentsLength > 3) {
      throw unxpectedNumberOfArgument
    }

    let reducer: ReblendTyping.StateReducerFunction<T, I> = reducer_initial_stateKey[0]
    let initial: ReblendTyping.StateFunctionValue<T> = argumentsLength === 3 ? reducer_initial_stateKey[1] : undefined

    reducer = reducer.bind(this)
    const stateID: string | undefined = reducer_initial_stateKey[2]

    if (!stateID) {
      throw stateIdNotIncluded
    }
    const [state, setState] = this.useState<T>(initial, stateID)
    this.state[stateID] = state
    const fn: ReblendTyping.StateFunction<I> = (async (
      newValue: ReblendTyping.StateFunctionValue<I>,
      force?: boolean,
    ) => {
      let reducedVal: ReblendTyping.StateFunctionValue<T>
      if (typeof newValue === 'function') {
        reducedVal = await reducer(this.state[stateID], (newValue as (v: T) => I)(this.state[stateID]))
      } else {
        reducedVal = await reducer(this.state[stateID], newValue as any)
      }
      setState(reducedVal, force)
    }).bind(this)

    return [this.state[stateID], fn]
  }

  useMemo<T>(...fn_dependencies_stateKey: any[]): T {
    const argumentsLength = fn_dependencies_stateKey.length

    if (argumentsLength < 2 || argumentsLength > 3) {
      throw unxpectedNumberOfArgument
    }

    let fn: ReblendTyping.StateEffectiveMemoFunction<T> = fn_dependencies_stateKey[0]
    const dependencies: any[] = argumentsLength === 3 ? fn_dependencies_stateKey[1] : undefined

    fn = fn.bind(this)
    const stateID: string | undefined = fn_dependencies_stateKey[2]

    if (!stateID) {
      throw stateIdNotIncluded
    }

    const [state, setState] = this.useState<T>(fn(), stateID)
    this.state[stateID] = state

    const dep = new Function(`return (${dependencies})`).bind(this)
    const effectKey = this.generateId()

    const cacher: () => ReblendTyping.Primitive | Array<ReblendTyping.Primitive> = () => dep()
    const effectState: EffectState = { cache: cacher(), cacher: cacher }
    this.effectsState.set(effectKey, effectState)

    const internalFn = async () => {
      const current = cacher()
      if (
        this.forceEffects ||
        !dependencies ||
        this.mountingEffects ||
        this.dependenciesChanged(current as ReblendTyping.Primitive[], effectState.cache as ReblendTyping.Primitive[])
      ) {
        effectState.cache = current
        setState(fn())
      }
    }
    effectState.effect = internalFn
    return this.state[stateID]
  }

  useRef<T>(initial: T, stateKey: string) {
    const ref: ReblendTyping.Ref<T> = { stateKey, current: initial }
    return ref
  }

  useCallback<T extends Function>(fn: T): T {
    return fn.bind(this)
  }
  /**
   * Initializes the component, preparing effect management.
   * For compatibility in case a standard element inherits this prototype; can manually execute this constructor.
   */
  _constructor() {
    this.state = {} as S
    this.childrenPropsUpdate = new Set()
    this.hookDisconnectedEffects = new Set()
    this.numAwaitingUpdates = 0
    this.effectsState = new Map()
    this.hasDisconnected = false
  }
}
