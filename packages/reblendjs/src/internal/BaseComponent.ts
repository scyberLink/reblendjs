/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { rand } from '../common/utils'
import { IAny } from '../interface/IAny'
import { IPair } from '../interface/IPair'

import StyleUtil from './StyleUtil'

import { ChildrenPropsUpdateType } from 'reblend-typing'
import { Reblend } from './Reblend'
import { NodeUtil } from './NodeUtil'
import { ElementUtil } from './ElementUtil'
import { DiffUtil } from './DiffUtil'
import { NodeOperationUtil } from './NodeOperationUtil'

StyleUtil

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface BaseComponent extends HTMLElement {
  //[stateKey: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging, @typescript-eslint/ban-types
class BaseComponent<P = {}, S extends { renderingErrorHandler?: (error: Error) => void } = {}>
  implements ReblendTyping.Component<P, S>
{
  [reblendComponent: symbol]: boolean
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

  // Properties

  nearestStandardParent?: HTMLElement

  /**
   * Use to limit rendering
   */
  onStateChangeRunning: boolean | undefined
  /**
   * This holds HTMLElements that suppose to be react children
   */
  reactElementChildren!: Set<HTMLElement> | null
  /**
   * This is a wrapper for the react element children
   */
  reactElementChildrenWrapper!: ReblendTyping.Component<any, any> | null
  /**
   * The parent of this component
   */
  directParent!: ReblendTyping.Component<any, any>

  /**
   * This denote when current component children has been initialized
   */
  childrenInitialize!: boolean

  /**
   * The selector string for querying elements by data ID.
   */
  dataIdQuerySelector!: string

  /**
   * The component properties.
   */
  props!: Readonly<P>

  /**
   * The rendering error, if any occurred during rendering.
   */
  renderingError?: ReblendRenderingException
  displayName!: string

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
  //@ts-ignore
  ref!: ReblendTyping.Ref<HTMLElement> | ((node: HTMLElement) => any)

  /**
   * The context of this component.
   */
  context: ReblendTyping.Component | undefined
  /**
   * This hold effects functions
   */
  effectState: { [key: string]: (state?: any) => any } = {}
  /**
   * The effects functions defined for the component.
   */
  effectsFn?: Set<ReblendTyping.StateEffectiveFunction>

  /**
   * The disconnect effects to apply when the component is disconnected.
   */
  disconnectEffects?: Set<ReblendTyping.StateEffectiveFunction>

  /**
   * Error thrown when a state identifier/key is not specified.
   */
  stateIdNotIncluded = new Error('State Identifier/Key not specified')

  /**
   * Indicates whether this component disconnected callback was called.
   */
  hasDisconnected = false

  /**
   * The HTML elements managed by this component.
   */
  htmlElements?: ReblendTyping.Component[]

  /**
   * Set of update types for children properties.
   */
  childrenPropsUpdate?: Set<ChildrenPropsUpdateType>

  /**
   * Indicates number of awaiting updates.
   */
  numAwaitingUpdates!: number

  /**
   * Indicates whether state effects are currently running.
   */
  stateEffectRunning!: boolean

  /**
   * Indicates when first time effects are being called.
   */
  mountingEffects!: boolean

  /**
   * Indicate state initialization
   */
  initStateRunning!: boolean

  /**
   * The component's state.
   */
  state!: S

  /**
   * Lifecycle method for mounting the component in React.
   */
  reactReblendMount?: undefined | ((afterNode?: HTMLElement) => any)

  /**
   * Creates and return innerHTML elements for this component.
   */
  async createInnerHtmlElements() {
    let htmlVNodes = await this.html()
    if (!Array.isArray(htmlVNodes)) {
      htmlVNodes = [htmlVNodes]
    }
    htmlVNodes = DiffUtil.flattenVNodeChildren(htmlVNodes as any)
    const htmlElements: ReblendTyping.Component[] = (await ElementUtil.createChildren(htmlVNodes as any)) as any

    return htmlElements
  }

  /**
   * Populates the HTML elements for this component.
   */
  async populateHtmlElements(): Promise<void> {
    try {
      const isReactReblend = NodeUtil.isReactToReblendRenderedNode(this)
      //This is a guard against race condition where parent state changes before populating this component elements
      if (isReactReblend && (this.reactElementChildren?.size || this.reactElementChildrenWrapper)) {
        return
      }
      const htmlElements: ReblendTyping.Component[] = (await this.createInnerHtmlElements()) as any
      htmlElements.forEach((node) => (node.directParent = this))
      if (isReactReblend) {
        this.reactElementChildren = new Set(htmlElements)
        this.reactReblendMount && this.reactReblendMount()
      } else {
        this.append(...htmlElements)
      }
      this.childrenInitialize = true
    } catch (error) {
      this.handleError(error as Error)
    }
  }

  /**
   * Callback invoked when the component is connected to the DOM.
   */
  connectedCallback() {
    NodeOperationUtil.connectedCallback(this as any)
  }

  /**
   * Adds a disconnect effect function to be executed when the component is disconnected.
   *
   * @param {() => void} effect - The effect function to add.
   */
  addDisconnectedEffect(effect: () => void) {
    this.disconnectEffects?.add(effect)
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
  async initState() {}

  /**
   * Initializes the component's properties.
   *
   * @param {P} props - The properties to set on the component.
   */
  async initProps(props: P) {
    this.props = props || ({} as any)
  }

  /**
   * Lifecycle method called after the component is mounted.
   */
  componentDidMount() {}

  /**
   * Sets the state of the component using the setter.
   *
   * @param {ReblendTyping.StateFunctionValue<S>} value - The new state value.
   */
  setState(value: S) {
    this.state = value
  }

  /**
   * Applies effects defined in the component, executing them in order.
   */
  applyEffects() {
    this.effectsFn?.forEach((effectFn) => {
      effectFn()
    })
  }

  /**
   * Handles an error that occurs during rendering or lifecycle methods.
   *
   * @param {Error} error - The error to handle.
   */
  handleError(error: Error) {
    if (this.renderingErrorHandler) {
      this.renderingErrorHandler((((error as any).component = this), error) as ReblendRenderingException)
    } else if (this.state?.renderingErrorHandler && typeof this.state.renderingErrorHandler === 'function') {
      this.state.renderingErrorHandler(error)
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
  catchErrorFrom(fn: () => void) {
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
    if (!this.attached) {
      return
    }
    if (NodeUtil.isStandard(this)) {
      return
    }
    if (this.stateEffectRunning) {
      return
    }
    if (this.onStateChangeRunning || this.initStateRunning) {
      this.numAwaitingUpdates++
      return
    }
    const patches: Patch[] = []
    let newVNodes: ReblendTyping.ReblendNode
    try {
      this.stateEffectRunning = true
      this.applyEffects()
      this.stateEffectRunning = false
      this.onStateChangeRunning = true
      newVNodes = await this.html()
      if (!Array.isArray(newVNodes)) {
        newVNodes = [newVNodes as any]
      }
      newVNodes = DiffUtil.flattenVNodeChildren(newVNodes as VNodeChildren) as any
      const oldNodes =
        (NodeUtil.isReactToReblendRenderedNode(this)
          ? [...(this.reactElementChildren?.values() || [])]
          : this.childNodes) || []

      const maxLength = Math.max(oldNodes.length || 0, (newVNodes as VNodeChildren).length)
      for (let i = 0; i < maxLength; i++) {
        const newVNode: VNodeChild = newVNodes![i]
        const currentVNode = oldNodes[i]
        patches.push(...NodeOperationUtil.diff(this as any, currentVNode as any, newVNode))
      }
    } catch (error) {
      this.handleError(error as Error)
    } finally {
      this.onStateChangeRunning = false
      NodeOperationUtil.applyPatches(patches)
      if (this.numAwaitingUpdates) {
        this.numAwaitingUpdates = 0
        setTimeout(() => this.onStateChange(), 0)
      }
      newVNodes = null as any
    }
  }

  /**
   * Returns the virtual DOM structure. Must be implemented by subclasses.
   * @protected
   * @returns {VNode | VNodeChildren} The virtual DOM nodes.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async html(): Promise<ReblendTyping.ReblendNode> {
    return null as any
  }

  /**
   * Mounts effects defined in the component, executing them and storing disconnect functions.
   * @private
   */
  mountEffects() {
    this.mountingEffects = true
    this.stateEffectRunning = true
    this.effectsFn?.forEach((fn) => {
      const disconnectEffect = fn()
      disconnectEffect && this.disconnectEffects?.add(disconnectEffect)
    })
    this.mountingEffects = false
    this.stateEffectRunning = false
    if (NodeUtil.isReblendRenderedNode(this)) {
      Promise.resolve().then(() => {
        this.onStateChange()
      })
    }
  }

  /**
   * Lifecycle method called when the component is disconnected from the DOM.
   * Cleans up resources and removes the component from its parent.
   */
  disconnectedCallback(fromCleanUp = false) {
    NodeOperationUtil.disconnectedCallback<P, S>(this as any, fromCleanUp)
  }

  /**
   * Cleans up resources before the component unmounts.
   */
  cleanUp() {}

  /**
   * Lifecycle method for component unmount actions.
   */
  componentWillUnmount() {}

  dependenciesChanged(currentDependencies: any, previousDependencies: any) {
    if (!previousDependencies || previousDependencies.length !== currentDependencies.length) {
      return false
    }

    return currentDependencies.some((dep, index) => {
      return !Object.is(dep, previousDependencies[index])
    })
  }

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
    const generateId = () => {
      const id = rand(10000, 999999) + '_effectId'
      if (this.effectState[id]) {
        return generateId()
      }
      return id
    }
    const effectKey = generateId()

    const cacher = () => dep()

    this.effectState[effectKey] = cacher()

    const internalFn = (() => {
      const current = cacher()
      if (!dependencies || this.mountingEffects || this.dependenciesChanged(current, this.effectState[effectKey])) {
        this.effectState[effectKey] = current
        fn()
      }
    }).bind(this)
    this.effectsFn?.add(internalFn)
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

    const cacher = () => dep()

    this.effectState[effectKey] = cacher()

    const internalFn = () => {
      const current = cacher()
      if (!dependencies || this.mountingEffects || this.dependenciesChanged(current, this.effectState[effectKey])) {
        this.effectState[effectKey] = current
        setState(fn())
      }
    }
    this.effectsFn?.add(internalFn)
    return this.state[stateID]
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
    this.state = {} as S
    this.effectsFn = new Set()
    this.disconnectEffects = new Set()
    this.childrenPropsUpdate = new Set()
    this.numAwaitingUpdates = 0
    this.effectState = {}
  }
}

export { BaseComponent }
