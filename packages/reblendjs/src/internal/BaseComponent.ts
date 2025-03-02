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
class BaseComponent<P = {}, S = {}> implements ReblendTyping.Component<P, S> {
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
    let initialDisplay = root.style.display || 'initial'

    let body = document.body
    let preloaderParent = document.createElement('div')
    body.appendChild(preloaderParent)

    const openPreloader = () => {
      root.style.display = 'none'
      preloaderParent.style.display = 'initial'
    }

    // A new mount function that processes nodes one by one,
    // yielding after each node so the browser can update the UI.
    const mountChunked = async (parent: HTMLElement, nodes: BaseComponent[]) => {
      for (const node of nodes) {
        if (NodeUtil.isStandard(node)) {
          parent.appendChild(node)
          // Synchronously attach the elements.
          NodeOperationUtil.attachElementsAt(node, node, null)
        } else {
          NodeOperationUtil.attachElementsAt(parent, node, null)
        }
        // Yield to the browser to allow UI updates (e.g., the preloader animation).
        await new Promise<void>((resolve) => requestAnimationFrame(<any>resolve))
      }
    }

    // Load and mount the preloader.
    let { Preloader } = await import('./components/Preloader')
    let preloaderVNodes = BaseComponent.construct(Preloader as any, {}, ...[])
    let preloaderNodes: BaseComponent[] = ElementUtil.createChildren(
      Array.isArray(preloaderVNodes) ? preloaderVNodes : [preloaderVNodes],
    ) as any
    openPreloader()
    await mountChunked(preloaderParent, preloaderNodes)

    // Construct the main app nodes.
    let vNodes = BaseComponent.construct(app as any, props || {}, ...[])
    let nodes: BaseComponent[] = ElementUtil.createChildren(Array.isArray(vNodes) ? (vNodes as any) : [vNodes]) as any

    // Mount the main app using the chunked method.
    requestIdleCallback(() => mountChunked(root, nodes))

    // Optionally, wait a short time (500ms) before mounting the main app.
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Final yield to ensure all rendering tasks are complete.
    await new Promise<void>((resolve) => requestAnimationFrame(<any>resolve))

    const closePreloader = () => {
      root.style.display = initialDisplay
      preloaderParent.style.display = 'none'
      appRoot?.appendChild(root)
      preloaderParent.remove()
      preloaderNodes.forEach((n) => {
        if (n.disconnectedCallback) {
          n.disconnectedCallback()
        } else {
          n.remove()
        }
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
   * The element for React and Reblend integration.
   */
  reactElement!: HTMLElement[] | null

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
   * The direct parent of this component.
   */
  directParent: this | undefined

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
   * The first standard element, if available.
   */
  _firstStandardElement?: HTMLElement | undefined

  /**
   * The component's state.
   */
  _state!: Readonly<S>

  /**
   * Populates the HTML elements for this component.
   */
  populateHtmlElements() {
    this.catchErrorFrom(() => {
      let htmlVNodes = this.html()
      if (!Array.isArray(htmlVNodes)) {
        htmlVNodes = [htmlVNodes]
      }
      htmlVNodes = DiffUtil.flattenVNodeChildren(htmlVNodes as any)
      const htmlElements: ReblendTyping.Component[] = ElementUtil.createChildren(htmlVNodes as any) as any
      htmlElements.forEach((htmlElement) => (htmlElement.directParent = this as any))
      this.htmlElements = htmlElements
    })
  }

  /**
   * Gets the first standard element if available, otherwise retrieves it from the component tree.
   *
   * @returns {HTMLElement | undefined} The first standard element or undefined.
   */
  public get firstStandardElement(): HTMLElement | undefined {
    return ElementUtil.getFirstStandardElementFrom(this as any)
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
  getAttachableElements() {
    const elements: ReblendTyping.Component[] = []
    if (NodeUtil.isReblendRenderedNodeStandard(this) || NodeUtil.isReblendPrimitiveElement(this)) {
      elements.push(this as any)
    } else {
      for (const nodeElement of this.htmlElements || []) {
        if (NodeUtil.isReblendRenderedNodeStandard(nodeElement) || NodeUtil.isReblendPrimitiveElement(nodeElement)) {
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
    NodeOperationUtil.connectedCallback(this)
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
  initState() {}

  /**
   * Initializes the component's properties.
   *
   * @param {P} props - The properties to set on the component.
   */
  initProps(props: P) {
    this.props = props || ({} as any)
  }

  /**
   * Lifecycle method called after the component is mounted.
   */
  componentDidMount() {}

  /**
   * Gets the current state of the component.
   *
   * @returns {Readonly<S>} The current state object.
   */
  get state(): Readonly<S> {
    return this._state || {}
  }

  /**
   * Sets the state of the component.
   *
   * @param {ReblendTyping.StateFunctionValue<S>} value - The new state value.
   */
  set state(value: ReblendTyping.StateFunctionValue<S>) {
    this._state = {
      ...this._state,
      ...(typeof value == 'function' ? (value as any)(this._state) : value),
    }
    if (this.attached) {
      Promise.resolve().then(() => this.onStateChange())
    }
  }

  /**
   * Sets the state of the component using the setter.
   *
   * @param {ReblendTyping.StateFunctionValue<S>} value - The new state value.
   */
  setState(value: ReblendTyping.StateFunctionValue<S>) {
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
      newVNodes = this.html()
      if (!Array.isArray(newVNodes)) {
        newVNodes = [newVNodes as any]
      }
      newVNodes = DiffUtil.flattenVNodeChildren(newVNodes as VNodeChildren) as any
      const oldNodes = this.htmlElements || []

      const maxLength = Math.max(this.htmlElements?.length || 0, (newVNodes as VNodeChildren).length)
      for (let i = 0; i < maxLength; i++) {
        const newVNode: VNodeChild = newVNodes![i]
        const currentVNode = oldNodes[i]
        patches.push(...NodeOperationUtil.diff(this as any, currentVNode as any, newVNode))
      }
    } catch (error) {
      this.handleError(error as Error)
    } finally {
      this.onStateChangeRunning = false
      if (this.numAwaitingUpdates) {
        this.numAwaitingUpdates = 0

        Promise.resolve().then(() => {
          this.onStateChange()
        })
      }
      newVNodes = null as any
      NodeOperationUtil.applyPatches(patches)
    }
  }

  /**
   * Returns the virtual DOM structure. Must be implemented by subclasses.
   * @protected
   * @returns {VNode | VNodeChildren} The virtual DOM nodes.
   */
  html(): ReblendTyping.ReblendNode {
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
      setTimeout(() => {
        this.onStateChange()
      }, 0)
    }
  }

  /**
   * Lifecycle method called when the component is disconnected from the DOM.
   * Cleans up resources and removes the component from its parent.
   */
  disconnectedCallback(fromCleanUp = false) {
    NodeOperationUtil.disconnectedCallback<P, S>(this, fromCleanUp)
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

    if (typeof initial === 'function') initial = (initial as () => T)()
    this[stateID] = initial
    const variableSetter: ReblendTyping.StateFunction<T> = ((
      value: ReblendTyping.StateFunctionValue<T>,
      force = false,
    ) => {
      if (typeof value === 'function') {
        value = (value as (v: T) => T)(this[stateID])
      }
      if (force || this[stateID] !== value) {
        this[stateID] = value as T
        if (!this.hasDisconnected) {
          if (this.attached) {
            Promise.resolve().then(() => this.onStateChange())
          }
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
      if (this[id]) {
        return generateId()
      }
      return id
    }
    const effectKey = generateId()

    const cacher = () => dep()

    this[effectKey] = cacher()

    const internalFn = (() => {
      const current = cacher()
      if (!dependencies || this.mountingEffects || this.dependenciesChanged(current, this[effectKey])) {
        this[effectKey] = current
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
    this[stateID] = state
    const fn: ReblendTyping.StateFunction<I> = ((newValue: ReblendTyping.StateFunctionValue<I>) => {
      let reducedVal: ReblendTyping.StateFunctionValue<T>
      if (typeof newValue === 'function') {
        reducedVal = reducer(this[stateID], (newValue as (v: T) => I)(this[stateID]))
      } else {
        reducedVal = reducer(this[stateID], newValue as any)
      }
      setState(reducedVal)
    }).bind(this)

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
    const generateId = () => {
      const id = rand(10000, 999999) + '_effectId'
      if (this[id]) {
        return generateId()
      }
      return id
    }
    const effectKey = generateId()

    const cacher = () => dep()

    this[effectKey] = cacher()

    const internalFn = () => {
      const current = cacher()
      if (!dependencies || this.mountingEffects || this.dependenciesChanged(current, this[effectKey])) {
        this[effectKey] = current
        setState(fn())
      }
    }
    this.effectsFn?.add(internalFn)
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
   * Removes the current component from its direct parent's HTML elements array.
   * If the component has a direct parent and the parent's HTML elements array contains the component,
   * it will be removed from the array.
   */
  removeFromParent() {
    if (this.remove) {
      this.remove()
    }
    if (this.directParent) {
      const htmlElements = this.directParent.htmlElements
      if (htmlElements) {
        const indexOfOldNodeInHtmlElements = htmlElements.indexOf(this as any)
        if (indexOfOldNodeInHtmlElements > -1) {
          htmlElements.splice(indexOfOldNodeInHtmlElements, 1)
        }
      }
    }
  }

  /**
   * Initializes the component, preparing effect management.
   * For compatibility in case a standard element inherits this prototype; can manually execute this constructor.
   */
  _constructor() {
    this.effectsFn = new Set()
    this.disconnectEffects = new Set()
    this.childrenPropsUpdate = new Set()
    this.numAwaitingUpdates = 0
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
    NodeOperationUtil.connected(node as any)
    return appended
  }
}

export { BaseComponent }
