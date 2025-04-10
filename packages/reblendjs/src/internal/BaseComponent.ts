/* eslint-disable @typescript-eslint/no-explicit-any */
import { rand } from '../common/utils'
import { IAny } from '../interface/IAny'
import StyleUtil from './StyleUtil'
import { ChildrenPropsUpdateType, ReblendTyping } from 'reblend-typing'
import { Reblend } from './Reblend'
import { NodeUtil } from './NodeUtil'
import { ElementUtil } from './ElementUtil'
import { DiffUtil } from './DiffUtil'
import { NodeOperationUtil } from './NodeOperationUtil'
import { CSSProperties } from 'react'
import { ReblendReactClass } from './ReblendReactClass'

StyleUtil

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
  effectState: {
    [key: string]: {
      cache: ReblendTyping.Primitive | Array<ReblendTyping.Primitive>
      cacher: () => ReblendTyping.Primitive | Array<ReblendTyping.Primitive>
    }
  }
  effectsFn: Set<ReblendTyping.StateEffectiveFunction>
  disconnectEffects: Set<ReblendTyping.StateEffectiveFunction>
  checkPropsChange(): Promise<void>
  hasDisconnected: boolean
  htmlElements: ReblendTyping.Component<P, S>[]
  childrenPropsUpdate: Set<ChildrenPropsUpdateType>
  numAwaitingUpdates: number
  stateEffectRunning: boolean
  mountingEffects: boolean
  initStateRunning: boolean
  awaitingInitState: boolean
  state: S
  reactReblendMount: undefined | ((afterNode?: HTMLElement) => any)
}

const stateIdNotIncluded = new Error('State Identifier/Key not specified')

//@ts-expect-error We don't have to redefine HTMLElement methods we just added it for type safety
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
    }
    if (clazz?.props?.children || props?.children || children.length) {
      mergedProp.children = [...(clazz?.props?.children || []), ...(props?.children || []), ...(children || [])]
    }

    const velement = {
      displayName: clazz,
      props: mergedProp,
    }

    NodeUtil.addSymbol(
      isTagStandard ? 'ReblendVNodeStandard' : NodeUtil.isReactNode(clazz) ? 'ReactToReblendVNode' : 'ReblendVNode',
      velement,
    )

    return velement as any
  }

  static async mountOn(
    elementId: string,
    app: typeof Reblend | ReblendTyping.FunctionComponent,
    props?: IAny,
  ): Promise<void> {
    let appRoot = document.getElementById(elementId)
    if (!appRoot) {
      throw new Error('Invalid root id')
    }
    let root = document.createElement('div')
    root.setAttribute('Root', '')
    let initialDisplay = root.style.display || 'initial'

    let body = document.body
    let preloaderParent = document.createElement('div')
    preloaderParent.setAttribute('preloaderParent', '')
    body.appendChild(preloaderParent)

    const openPreloader = () => {
      root.style.display = 'none'
      preloaderParent.style.display = 'initial'
    }

    // A new mount function that processes nodes one by one,
    // yielding after each node so the browser can update the UI.
    const mountChunked = async (parent: HTMLElement, nodes: BaseComponent[]) => {
      for (const node of nodes) {
        parent.appendChild(node)
        setTimeout(() => NodeOperationUtil.connected(node), 0)
        // Yield to the browser to allow UI updates (e.g., the preloader animation).
        await new Promise<void>((resolve) => requestAnimationFrame(<any>resolve))
      }
    }

    // Load and mount the preloader.
    let { Preloader } = await import('./components/Preloader')
    let preloaderVNodes = BaseComponent.construct(Preloader as any, {}, ...[])
    let preloaderNodes: BaseComponent[] = (await ElementUtil.createChildren(
      Array.isArray(preloaderVNodes) ? preloaderVNodes : [preloaderVNodes],
    )) as any
    openPreloader()
    await mountChunked(preloaderParent, preloaderNodes)

    // Construct the main app nodes.
    let vNodes = BaseComponent.construct(app as any, props || {}, ...[])
    let nodes: BaseComponent[] = (await ElementUtil.createChildren(
      Array.isArray(vNodes) ? (vNodes as any) : [vNodes],
    )) as any

    // Optionally, wait a short time (500ms) before mounting the main app.
    await new Promise((resolve) => setTimeout(resolve, 500))

    mountChunked(root, nodes)

    // Final yield to ensure all rendering tasks are complete.
    await new Promise<void>((resolve) => requestAnimationFrame(<any>resolve))

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
      body = undefined as any
      vNodes = undefined as any
      nodes = undefined as any
      Preloader = undefined as any
      preloaderVNodes = undefined as any
      preloaderNodes = undefined as any
    }

    setTimeout(() => {
      requestAnimationFrame(closePreloader)
    }, 100)
  }

  async createInnerHtmlElements() {
    let htmlVNodes = await this.html()
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
        this.append(...htmlElements)
        if (NodeUtil.isReblendRenderedNode(this) && this.awaitingInitState) {
          NodeOperationUtil.connected(this)
        }
      }
      this.childrenInitialize = true
    } catch (error) {
      this.handleError(error as Error)
    }
  }

  connectedCallback() {
    if (this.initStateRunning) {
      this.awaitingInitState = true
      if (this.isPlaceholder) {
        return
      } else if (this.ReblendPlaceholder) {
        let placeholderVNodes
        if (typeof this.ReblendPlaceholder === 'function') {
          placeholderVNodes = BaseComponent.construct(this.ReblendPlaceholder, {})
        } else {
          placeholderVNodes = this.ReblendPlaceholder
        }
        ElementUtil.createElement(placeholderVNodes).then((placeholderElements) => {
          if (!this.childrenInitialize) {
            if (this.placeholderAttached) {
              return
            }
            this.append(...placeholderElements)
            this.placeholderAttached = true
            this.removePlaceholder = async () => {
              placeholderElements.forEach((placeholderElement) => NodeOperationUtil.detach(placeholderElement))
              this.removePlaceholder = undefined as any
            }
            placeholderElements.forEach((placeholderElement) => {
              placeholderElement.directParent = this as any
              placeholderElement.isPlaceholder = true
              NodeOperationUtil.connected(placeholderElement)
            })
            requestAnimationFrame(() => {
              /* empty */
            })
          }
        })
      } else {
        import('./components/Placeholder').then(async ({ default: Placeholder }) => {
          const placeholderVNodes = BaseComponent.construct(Placeholder as any, {
            style: this.defaultReblendPlaceholderStyle,
          })
          const placeholderElements = await ElementUtil.createElement(placeholderVNodes as ReblendTyping.VNodeChild)
          if (!this.childrenInitialize) {
            if (this.placeholderAttached) {
              return
            }
            this.append(...placeholderElements)
            this.placeholderAttached = true
            this.removePlaceholder = async () => {
              placeholderElements.forEach((placeholderElement) => NodeOperationUtil.detach(placeholderElement))
              this.removePlaceholder = undefined as any
            }
            placeholderElements.forEach((placeholderElement) => {
              placeholderElement.directParent = this as any
              placeholderElement.isPlaceholder = true
              NodeOperationUtil.connected(placeholderElement)
            })
            requestAnimationFrame(() => {
              /* empty */
            })
          }
        })
      }
      return
    }
    NodeOperationUtil.connectedCallback(this as any)
  }

  addDisconnectedEffect(effect: () => void) {
    this.disconnectEffects?.add(effect)
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

  async initState() {
    /* The state property has been initialize in `@_constructor` */
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
    this.effectsFn?.forEach((effectFn) => {
      effectFn()
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
    Object.entries(this.effectState).forEach(([_key, value]) => {
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
    if (this.onStateChangeRunning || this.initStateRunning) {
      this.numAwaitingUpdates++
      return
    }
    const patches: ReblendTyping.Patch<P, S>[] = []
    let newVNodes: ReblendTyping.ReblendNode
    try {
      this.stateEffectRunning = true
      this.applyEffects()
      this.stateEffectRunning = false
      this.onStateChangeRunning = true
      if (this.childrenInitialize) {
        newVNodes = await this.html()
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
      this.onStateChangeRunning = false
      await NodeOperationUtil.applyPatches(patches)
      if (this.numAwaitingUpdates) {
        this.numAwaitingUpdates = 0
        setTimeout(() => this.onStateChange(), 0)
      }
      newVNodes = null as any
    }
  }

  async html(): Promise<ReblendTyping.ReblendNode> {
    return null as any
  }

  mountEffects() {
    this.mountingEffects = true
    this.stateEffectRunning = true
    this.effectsFn?.forEach((fn) => {
      const disconnectEffect = fn()
      if (disconnectEffect instanceof Promise) {
        disconnectEffect.then((val) => {
          if (val) {
            this.disconnectEffects?.add(val)
          }
        })
      } else if (typeof disconnectEffect === 'function') {
        this.disconnectEffects?.add(disconnectEffect)
      }
    })
    this.mountingEffects = false
    this.stateEffectRunning = false
    if (NodeUtil.isReblendRenderedNode(this)) {
      Promise.resolve().then(() => {
        this.onStateChange()
      })
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

  useState<T>(
    initial: ReblendTyping.StateFunctionValue<T>,
    ...dependencyStringAndOrStateKey: string[]
  ): [T, ReblendTyping.StateFunction<T>] {
    const stateID: string | undefined = dependencyStringAndOrStateKey.pop()

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
          Promise.resolve().then(() => this.onStateChange())
        }
      }
    }).bind(this)

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
    const generateId = () => {
      const id = rand(10000, 999999) + '_effectId'
      if (this.effectState[id]) {
        return generateId()
      }
      return id
    }
    const effectKey = generateId()

    const cacher: () => ReblendTyping.Primitive | Array<ReblendTyping.Primitive> = () => dep()

    this.effectState[effectKey] = { cache: cacher(), cacher: cacher }

    const internalFn = (() => {
      const current = cacher()
      if (
        !dependencies ||
        this.mountingEffects ||
        this.dependenciesChanged(
          current as ReblendTyping.Primitive[],
          this.effectState[effectKey].cache as ReblendTyping.Primitive[],
        )
      ) {
        this.effectState[effectKey].cache = current
        return fn()
      }
    }).bind(this)
    this.effectsFn?.add(internalFn)
  }

  useReducer<T, I>(
    reducer: ReblendTyping.StateReducerFunction<T, I>,
    initial: ReblendTyping.StateFunctionValue<T>,
    ...dependencyStringAndOrStateKey: string[]
  ): [T, ReblendTyping.StateFunction<I>] {
    reducer = reducer.bind(this)
    const stateID: string | undefined = dependencyStringAndOrStateKey.pop()

    if (!stateID) {
      throw stateIdNotIncluded
    }
    const [state, setState] = this.useState<T>(initial, stateID)
    this.state[stateID] = state
    const fn: ReblendTyping.StateFunction<I> = (async (newValue: ReblendTyping.StateFunctionValue<I>) => {
      let reducedVal: ReblendTyping.StateFunctionValue<T>
      if (typeof newValue === 'function') {
        reducedVal = await reducer(this.state[stateID], (newValue as (v: T) => I)(this.state[stateID]))
      } else {
        reducedVal = await reducer(this.state[stateID], newValue as any)
      }
      setState(reducedVal)
    }).bind(this)

    return [this.state[stateID], fn]
  }

  useMemo<T>(
    fn: ReblendTyping.StateEffectiveMemoFunction<T>,
    dependencies?: any[],
    ...dependencyStringAndOrStateKey: string[]
  ): T {
    fn = fn.bind(this)
    const stateID: string | undefined = dependencyStringAndOrStateKey.pop()

    if (!stateID) {
      throw stateIdNotIncluded
    }

    const [state, setState] = this.useState<T>(fn(), stateID)
    this.state[stateID] = state

    const dep = new Function(`return (${dependencies})`).bind(this)
    const generateId = () => {
      const id = rand(10000, 999999) + '_effectId'
      if (this.effectState[id]) {
        return generateId()
      }
      return id
    }
    const effectKey = generateId()

    const cacher: () => ReblendTyping.Primitive | Array<ReblendTyping.Primitive> = () => dep()

    this.effectState[effectKey] = { cache: cacher(), cacher: cacher }

    const internalFn = async () => {
      const current = cacher()
      if (
        !dependencies ||
        this.mountingEffects ||
        this.dependenciesChanged(
          current as ReblendTyping.Primitive[],
          this.effectState[effectKey].cache as ReblendTyping.Primitive[],
        )
      ) {
        this.effectState[effectKey].cache = current
        setState(fn())
      }
    }
    this.effectsFn?.add(internalFn)
    return this.state[stateID]
  }

  useRef<T>(initial: T, stateKey: string) {
    const ref: ReblendTyping.Ref<T> = { stateKey, current: initial }
    return ref
  }

  useCallback(fn: () => any) {
    return fn.bind(this)
  }
  /**
   * Initializes the component, preparing effect management.
   * For compatibility in case a standard element inherits this prototype; can manually execute this constructor.
   */
  _constructor() {
    this.state = {} as S
    this.effectsFn = new Set()
    this.disconnectEffects = new Set()
    this.childrenPropsUpdate = new Set()
    this.numAwaitingUpdates = 0
    this.effectState = {}
    this.hasDisconnected = false
  }
}
