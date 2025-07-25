/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConfig, isCallable, rand } from '../common/utils'
import { IAny } from '../interface/IAny'
import { StyleUtil } from './StyleUtil'
import { ChildrenPropsUpdateType, EffectType } from 'reblend-typing'
import * as ReblendTyping from 'reblend-typing'
import { Reblend } from './Reblend'
import {
  addSymbol,
  isLazyNode,
  isReactNode,
  isReactToReblendRenderedNode,
  isReactToReblendVirtualNode,
  isReblendLazyVirtualNode,
  isReblendPrimitiveElement,
  isReblendRenderedLazyNode,
  isReblendRenderedNode,
  isReblendRenderedNodeStandard,
  isReblendVirtualNode,
  isReblendVirtualNodeStandard,
  isStandard,
  ReblendNodeTypeDict,
} from './NodeUtil'
import { ReblendReactClass } from './ReblendReactClass'
import { createChildren, createElement } from './ElementUtil'
import { flattenVNodeChildren } from './DiffUtil'
import { connected, detach, connectedCallback, diff, applyPatches, disconnectedCallback } from './NodeOperationUtil'
import { ConfigUtil, IReblendAppConfig } from './ConfigUtil'
import deepEqualIterative from 'reblend-deep-equal-iterative'
import { RenderingSessionTracker } from './RenderingSessionTracker'
import React from 'react'

export interface BaseComponent<P, S> extends HTMLElement {
  nearestStandardParent?: HTMLElement
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
  isRootComponent: boolean
  placeholderAttached: boolean
  ReactClass: any
  ReblendPlaceholder?: ReblendTyping.ReblendNode
  defaultReblendPlaceholderStyle: ReblendTyping.CSSProperties | string
  ref: ReblendTyping.Ref<HTMLElement> | ((node: HTMLElement) => any)
  effectsState: Map<string, ReblendTyping.EffectState>
  hookDisconnectedEffects?: Set<() => void>
  checkPropsChange(): Promise<void>
  addHookDisconnectedEffect(destructor: () => void): void
  hasDisconnected: boolean
  htmlElements: ReblendTyping.Component<P, S>[]
  childrenPropsUpdate: Set<ChildrenPropsUpdateType>
  numAwaitingUpdates: number
  renderingSessionTracker: ReblendTyping.SessionTracker
  stateEffectRunning: boolean
  forceEffects: boolean
  mountingEffects: boolean
  mountingAfterEffects: boolean
  initStateRunning: boolean
  awaitingInitState: boolean
  awaitingReRender: boolean
  state: S
  reactReblendMount: undefined | ((afterNode?: HTMLElement) => any)
}

const stateIdNotIncluded = new Error('State Identifier/Key not specified')

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
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
    const elementChildren = await createElement(components as any)
    return await ReblendReactClass.getChildrenWrapperForReact(elementChildren)
  }

  static reactCompact<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>>(
    component: T,
    props?: React.ComponentProps<T>,
  ) {
    return BaseComponent.construct(component as any, { ...(props || {}), reactcomponent: true })
  }

  static construct(
    displayName: ReblendTyping.ReblendNode,
    props: IAny,
    ...children: ReblendTyping.VNodeChildren
  ): ReblendTyping.VNode | ReblendTyping.VNodeChildren {
    if (Array.isArray(displayName)) {
      return displayName as []
    }

    if (
      isReblendVirtualNodeStandard(displayName) ||
      isReblendVirtualNode(displayName) ||
      isReactToReblendVirtualNode(displayName) ||
      isReactToReblendVirtualNode(displayName) ||
      isReblendLazyVirtualNode(displayName)
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
      isReblendRenderedNode(displayName) ||
      isReblendRenderedNodeStandard(displayName) ||
      isReactToReblendRenderedNode(displayName) ||
      isReblendRenderedLazyNode(displayName)
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

    if (isLazyNode(displayName as any)) {
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

      addSymbol(ReblendNodeTypeDict.ReblendLazyVNode, temp)
      return temp as any
    }

    const clazz: undefined | typeof Reblend = displayName as any
    const isTagStandard = typeof displayName === 'string'
    if (
      !isTagStandard &&
      ((clazz?.ELEMENT_NAME === 'Fragment' && clazz?.name === 'Fragment') ||
        (clazz?.ELEMENT_NAME === 'Reblend' && clazz?.name === 'Reblend'))
    ) {
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

    let symbolType
    if (isTagStandard) {
      symbolType = ReblendNodeTypeDict.ReblendVNodeStandard
    } else if (isReactNode(clazz!)) {
      symbolType = ReblendNodeTypeDict.ReactToReblendVNode
    } else if (isLazyNode(clazz!)) {
      symbolType = ReblendNodeTypeDict.ReblendLazyVNode
    } else {
      symbolType = ReblendNodeTypeDict.ReblendVNode
    }
    addSymbol(symbolType, velement)

    return velement as any
  }

  static async renderToString(ui: ReblendTyping.ReblendNode, props?: IAny) {
    const parent: ReblendTyping.Component<any, any> = (
      await createElement(
        BaseComponent.construct('div', {}, BaseComponent.construct(ui as any, props || {}) as any) as any,
      )
    ).pop()!
    await connected(parent)
    const renderedString = parent.innerHTML
    return renderedString
  }

  static async mountOn(
    elementOrElementId: string | HTMLElement,
    app: ReblendTyping.ReblendNode,
    options?: IReblendAppConfig,
  ): Promise<Set<ReblendTyping.Component<any, any>>> {
    let appRoot: BaseComponent =
      typeof elementOrElementId === 'string' ? document.getElementById(elementOrElementId) : (elementOrElementId as any)
    if (!appRoot) {
      throw new Error('Invalid root or root id')
    }

    appRoot = (await createElement(appRoot)).pop() as any

    if (!appRoot) {
      throw new Error('Invalid root or root id')
    }

    let initialDisplay = appRoot.style.display || 'initial'
    new StyleUtil()
    const configs = ConfigUtil.getInstance().update(options)

    let closePreloader: undefined | (() => void)
    if (!configs.noDefering && !configs.noPreloader) {
      let preloaderParent = document.createElement('div')
      preloaderParent.setAttribute('preloaderParent', '')

      const openPreloader = () => {
        const body = document.body
        body.appendChild(preloaderParent)
        appRoot.style.display = 'none'
        preloaderParent.style.display = 'initial'
      }

      // A new mount function that processes nodes one by one,
      // yielding after each node so the browser can update the UI.
      const mountChunked = async (parent: HTMLElement, nodes: BaseComponent[]) => {
        for (const node of nodes) {
          parent.appendChild(node)
          connected(node)
          // Yield to the browser to allow UI updates (e.g., the preloader animation).
          await new Promise<void>((resolve) => requestAnimationFrame(<any>resolve))
        }
      }

      // Load and mount the preloader.
      const customPreloader = options?.preloader
      let preloaderVNodes = customPreloader
        ? BaseComponent.construct(customPreloader as any, {}, ...[])
        : BaseComponent.construct((await import('./components/Preloader')).Preloader, {}, ...[])
      let preloaderNodes: BaseComponent[] = (await createChildren(
        Array.isArray(preloaderVNodes) ? preloaderVNodes : [preloaderVNodes],
      )) as any
      await mountChunked(preloaderParent, preloaderNodes)
      openPreloader()

      closePreloader = async () => {
        appRoot.style.display = initialDisplay
        preloaderParent.style.display = 'none'
        preloaderParent.remove()
        preloaderNodes.forEach((n) => {
          detach(n)
        })
        preloaderParent = undefined as any
        initialDisplay = undefined as any
        preloaderVNodes = undefined as any
        preloaderNodes = undefined as any
      }

      await new Promise((resolve) => {
        setTimeout(() => requestAnimationFrame(resolve), configs.preloaderDeferTimeout)
      })
    }

    // Construct the main app nodes.
    appRoot.html = (() => app) as any
    if (appRoot.attached) {
      await appRoot.onStateChange()
    } else {
      appRoot.isRootComponent = true
      await appRoot.populateHtmlElements()
      await connected(appRoot)
    }

    if (closePreloader) {
      closePreloader()
    }

    return appRoot.elementChildren || new Set()
  }

  /**
   * Hook to create a mutable reference object within a Reblend component.
   *
   * @template T - The type of the ref value.
   * @param {T} [_initial] - The initial ref value.
   * @returns {ReblendTyping.Ref<T>} - Returns a reference object with the current value.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static createRef<T>(_initial?: T): ReblendTyping.Ref<T> {
    // eslint-disable-next-line prefer-rest-params
    return BaseComponent.prototype.useRef.call(null, ...arguments) as any
  }
  async createInnerHtmlElements() {
    let htmlVNodes = await this.html()
    if (isCallable(htmlVNodes)) {
      htmlVNodes = (htmlVNodes as any)(this.props)
    }
    if (!Array.isArray(htmlVNodes)) {
      htmlVNodes = [htmlVNodes]
    }
    htmlVNodes = flattenVNodeChildren(htmlVNodes as any)
    const htmlElements: ReblendTyping.Component<P, S>[] = (await createChildren(htmlVNodes as any)) as any

    return htmlElements
  }

  async populateHtmlElements(): Promise<ReblendTyping.Component<P, S>[]> {
    if (this.hasDisconnected) {
      return []
    }
    const configs = getConfig()
    let htmlElements: ReblendTyping.Component<P, S>[] = []
    try {
      const isReactReblend = isReactToReblendRenderedNode(this)
      //This is a guard against race condition where parent state changes before populating this component elements
      if (isReactReblend && (this.elementChildren?.size || this.reactElementChildrenWrapper)) {
        return []
      }
      htmlElements = (await this.createInnerHtmlElements()) as any
      htmlElements.forEach((node) => (node.directParent = this as any))
      this.elementChildren = new Set(htmlElements)
      if (this.removePlaceholder) {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, configs.placeholderDeferTimeout)
        })
        if (this.removePlaceholder) {
          await this.removePlaceholder()
        }
      }
      if (isReactReblend) {
        if (configs.noDefering) {
          if (this.reactReblendMount) {
            await this.reactReblendMount()
          }
        } else {
          if (this.reactReblendMount) {
            this.reactReblendMount()
          }
        }
      } else {
        for (const node of htmlElements) {
          this.appendChild(node)
          if (configs.noDefering) {
            await connected(node)
          } else {
            connected(node)
          }
        }

        if (this.isPlaceholder && this.directParent?.awaitingInitState && !this.directParent?.initStateRunning) {
          if (configs.noDefering) {
            await connected(this.directParent)
            this.directParent.awaitingInitState = false
          } else {
            setTimeout(() => {
              connected(this.directParent)
              this.directParent.awaitingInitState = false
            }, configs.deferTimeout)
          }
        }
      }
      this.childrenInitialize = true
      if (this.awaitingReRender) {
        if (configs.noDefering) {
          await this.onStateChange()
        } else {
          this.onStateChange()
        }
      }
    } catch (error) {
      this.handleError(error as Error)
    }
    return htmlElements
  }

  async connectedCallback() {
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
        const placeholderElements = await createElement(placeholderVNodes)
        if (!this.childrenInitialize) {
          if (this.placeholderAttached) {
            return
          }
          this.placeholderAttached = true
          placeholderElements.forEach((placeholderElement) => {
            if (!this.initStateRunning) {
              return requestIdleCallback(() => detach(placeholderElement))
            }
            placeholderElement.directParent = this as any
            placeholderElement.isPlaceholder = true
            this.appendChild(placeholderElement)
            connected(placeholderElement)
          })
          if (this.initStateRunning) {
            this.removePlaceholder = async () => {
              placeholderElements.forEach((placeholderElement) => detach(placeholderElement))
              this.removePlaceholder = undefined as any
            }
          }
          /* requestAnimationFrame(() => { */
          /* empty */
          /* }) */
        }
      } else {
        const config = getConfig()
        const placeholderVNodes = BaseComponent.construct(
          (config.placeholder as any) || (await import('./components/Placeholder')).Placeholder,
          {
            style: this.defaultReblendPlaceholderStyle,
          },
        )
        const placeholderElements = await createElement(placeholderVNodes as ReblendTyping.VNodeChild)
        if (!this.childrenInitialize) {
          if (this.placeholderAttached) {
            return
          }
          this.placeholderAttached = true
          placeholderElements.forEach((placeholderElement) => {
            if (!this.initStateRunning) {
              return requestIdleCallback(() => detach(placeholderElement))
            }
            placeholderElement.directParent = this as any
            placeholderElement.isPlaceholder = true
            this.appendChild(placeholderElement)
            connected(placeholderElement)
          })
          if (this.initStateRunning) {
            this.removePlaceholder = async () => {
              placeholderElements.forEach((placeholderElement) => detach(placeholderElement))
              this.removePlaceholder = undefined as any
            }
          }
          /* requestAnimationFrame(() => { */
          /* empty */
          /* }) */
        }
      }
      return
    }
    await connectedCallback(this as any)
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

  async applyEffects(sessionId: number, type: EffectType) {
    if (this.hasDisconnected) {
      return
    }
    for (const state of this.effectsState.values() || []) {
      if (state.type !== type) {
        continue
      }

      const disconnectEffect = state.effect && (await state.effect())
      if (typeof disconnectEffect === 'function') {
        state.disconnectEffect = disconnectEffect
      }

      if (
        !this.mountingEffects &&
        !this.mountingAfterEffects &&
        !this.renderingSessionTracker.isCurrentSession(sessionId)
      ) {
        break
      }
    }
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

  async onStateChange() {
    if (!this.attached || this.hasDisconnected) {
      return
    }

    if (isStandard(this) && !this.isRootComponent) {
      return
    }

    if (this.mountingEffects || this.initStateRunning) {
      this.awaitingReRender = true
      return
    }

    const sessionId = this.renderingSessionTracker.startSession()
    if (this.renderingSessionTracker.hasPreviousSession()) {
      return
    }

    const configs = getConfig()
    const rerender = async () => {
      this.renderingSessionTracker.resetSession()
      if (configs.noDefering) {
        await this.onStateChange()
      } else {
        this.onStateChange()
      }
    }

    const patches: ReblendTyping.Patch<P, S>[] = []
    let newVNodes: ReblendTyping.ReblendNode
    try {
      this.stateEffectRunning = true
      await this.applyEffects(sessionId, EffectType.BEFORE)
      this.stateEffectRunning = false
      if (!this.renderingSessionTracker.isCurrentSession(sessionId)) {
        return await rerender()
      }
      this.forceEffects = false
      if (this.childrenInitialize) {
        newVNodes = await (this.html as any)()
        if (isCallable(newVNodes)) {
          newVNodes = (newVNodes as any)(this.props)
        }
        if (!Array.isArray(newVNodes)) {
          newVNodes = [newVNodes as any]
        }
        newVNodes = flattenVNodeChildren(newVNodes as ReblendTyping.VNodeChildren) as any
        const oldNodes = [...(this.elementChildren?.values() || [])]

        const maxLength = Math.max(oldNodes.length || 0, (newVNodes as ReblendTyping.VNodeChildren).length)
        for (let i = 0; i < maxLength; i++) {
          const newVNode: ReblendTyping.VNodeChild = newVNodes![i]
          const currentVNode = oldNodes[i]
          if (!this.renderingSessionTracker.isCurrentSession(sessionId)) {
            return await rerender()
          }
          patches.push(...((await diff(this, sessionId, this as any, currentVNode as any, newVNode)) as any))
          if (!this.renderingSessionTracker.isCurrentSession(sessionId)) {
            return await rerender()
          }
        }
      } else {
        this.awaitingReRender = true
      }
    } catch (error) {
      this.handleError(error as Error)
    }

    if (!this.renderingSessionTracker.isCurrentSession(sessionId)) {
      return await rerender()
    }
    await applyPatches(patches)
    if (!this.renderingSessionTracker.isCurrentSession(sessionId)) {
      return await rerender()
    }
    await this.applyEffects(sessionId, EffectType.AFTER)
    if (!this.renderingSessionTracker.isCurrentSession(sessionId)) {
      return await rerender()
    }
    newVNodes = null as any
    this.renderingSessionTracker.resetSession()
  }

  async html(): Promise<ReblendTyping.ReblendNode> {
    return null as any
  }

  async mountEffects() {
    this.stateEffectRunning = true
    if (!isReblendPrimitiveElement(this)) {
      this.mountingEffects = true
      await this.applyEffects(0, EffectType.BEFORE)
      this.mountingEffects = false
    }
    this.stateEffectRunning = false
    if (this.displayName === 'Placeholder' || (this.props as any)?.isPlaceholder || this.isPlaceholder) {
      return
    }
    if (!isStandard(this) && !isReactToReblendRenderedNode(this)) {
      await this.populateHtmlElements()
      this.mountingAfterEffects = true
      await this.applyEffects(0, EffectType.AFTER)
      this.mountingAfterEffects = false
    }
  }

  async disconnectedCallback(fromCleanUp = false) {
    await disconnectedCallback<P, S>(this as any, fromCleanUp)
  }

  cleanUp() {
    /* Cleans up resources before the component unmounts. */
  }

  componentWillUnmount() {
    /* Lifecycle method for component unmount actions. */
  }

  dependenciesChanged(currentDependencies: Array<any> | undefined, previousDependencies: Array<any> | undefined) {
    return !deepEqualIterative(currentDependencies, previousDependencies, getConfig().diffConfig || {})
  }

  generateId() {
    const id = rand(10000, 999999) + '_effectId'
    if (this.effectsState.get(id)) {
      return this.generateId()
    }
    return id
  }

  getCacher(dependencies: undefined | (() => any)): () => any {
    return () => {
      let dps = dependencies
      while (typeof dps === 'function') {
        dps = dps()
      }
      return dps
    }
  }

  useState<T>(initial: ReblendTyping.StateFunctionValue<T>, stateKey: string): [T, ReblendTyping.StateFunction<T>] {
    if (!stateKey) {
      throw stateIdNotIncluded
    }

    if (typeof initial === 'function') {
      initial = (initial as () => T).bind(this)()
    }
    if (initial instanceof Promise) {
      initial.then((val) => (this.state[stateKey] = val))
    } else {
      this.state[stateKey] = initial
    }
    const variableSetter: ReblendTyping.StateFunction<T> = (async (
      value: ReblendTyping.StateFunctionValue<T>,
      force = false,
    ) => {
      if (typeof value === 'function') {
        value = await (value as (v: T) => T)(this.state[stateKey])
      } else if (value instanceof Promise) {
        value = await value
      }
      if (force || this.state[stateKey] !== value) {
        this.state[stateKey] = value as T
        if (this.attached) {
          if (force) {
            this.forceEffects = true
          }
          const configs = getConfig()
          if (configs.noDefering) {
            await this.onStateChange()
          } else {
            setTimeout(() => this.onStateChange(), configs.deferTimeout)
          }
        }
      }
    }).bind(this)

    return [initial as T, variableSetter]
  }

  useEffect<T>(fn: ReblendTyping.StateEffectiveFunction<T>, dependencies?: () => any) {
    fn = fn.bind(this)
    const effectKey = this.generateId()

    const cacher = this.getCacher(dependencies)
    const effectState: ReblendTyping.EffectState = { cache: cacher(), cacher: cacher, type: EffectType.BEFORE }
    this.effectsState.set(effectKey, effectState)

    const internalFn = (async () => {
      const current = cacher()
      if (
        this.forceEffects ||
        !dependencies ||
        this.mountingEffects ||
        this.dependenciesChanged(current as ReblendTyping.Primitive[], effectState.cache as ReblendTyping.Primitive[])
      ) {
        const destructor = await fn({ previous: effectState.cache, current: current, initial: this.mountingEffects })
        effectState.cache = current
        return destructor
      }
    }).bind(this)
    effectState.effect = internalFn
  }

  useEffectAfter<T>(fn: ReblendTyping.StateEffectiveFunction<T>, dependencies?: () => any) {
    fn = fn.bind(this)
    const effectKey = this.generateId()

    const cacher = this.getCacher(dependencies)
    const effectState: ReblendTyping.EffectState = { cache: cacher(), cacher: cacher, type: EffectType.AFTER }
    this.effectsState.set(effectKey, effectState)

    const internalFn = (async () => {
      const current = cacher()
      if (
        this.forceEffects ||
        !dependencies ||
        this.mountingAfterEffects ||
        this.dependenciesChanged(current as ReblendTyping.Primitive[], effectState.cache as ReblendTyping.Primitive[])
      ) {
        const destructor = await fn({
          previous: effectState.cache,
          current: current,
          initial: this.mountingEffects,
        })
        effectState.cache = current
        return destructor
      }
    }).bind(this)
    effectState.effect = internalFn
  }

  useProps<T>(fn: ReblendTyping.StateEffectiveFunction<T>) {
    fn = fn.bind(this)
    const effectKey = this.generateId()

    const cacher = this.getCacher(() => this.props)
    const effectState: ReblendTyping.EffectState = { cache: cacher(), cacher: cacher, type: EffectType.BEFORE }
    this.effectsState.set(effectKey, effectState)

    const internalFn = (async () => {
      const current = cacher()
      if (
        this.forceEffects ||
        this.mountingEffects ||
        this.dependenciesChanged(current as ReblendTyping.Primitive[], effectState.cache as ReblendTyping.Primitive[])
      ) {
        const destructor = await fn({ previous: effectState.cache, current: current, initial: this.mountingEffects })
        effectState.cache = current
        return destructor
      }
    }).bind(this)
    effectState.effect = internalFn
  }

  useReducer<T, I>(
    reducer: ReblendTyping.StateReducerFunction<T, I>,
    initial: ReblendTyping.StateFunctionValue<T>,
    stateKey: string,
  ): [T, ReblendTyping.StateFunction<I>] {
    reducer = reducer.bind(this)

    if (!stateKey) {
      throw stateIdNotIncluded
    }
    const [state, setState] = this.useState<T>(initial, stateKey)
    this.state[stateKey] = state
    const fn: ReblendTyping.StateFunction<I> = (async (
      newValue: ReblendTyping.StateFunctionValue<I>,
      force?: boolean,
    ) => {
      let reducedVal: ReblendTyping.StateFunctionValue<T>
      if (typeof newValue === 'function') {
        reducedVal = await reducer(this.state[stateKey], await (newValue as (v: T) => I)(this.state[stateKey]))
      } else {
        reducedVal = await reducer(this.state[stateKey], newValue as any)
      }
      await setState(reducedVal, force)
    }).bind(this)

    return [this.state[stateKey], fn]
  }

  useMemo<T, E>(fn: ReblendTyping.StateEffectiveMemoFunction<T, E>, stateKey: string, dependencies?: () => any): T {
    fn = fn.bind(this)

    if (!stateKey) {
      throw stateIdNotIncluded
    }
    const cacher = this.getCacher(dependencies)
    const cache = cacher()
    const initial = fn({ previous: cache, current: cache, initial: false, memoInitializationCall: true })

    if (initial instanceof Promise) {
      initial.then((val) => (this.state[stateKey] = val))
    } else {
      this.state[stateKey] = initial
    }

    const effectKey = this.generateId()
    const effectState: ReblendTyping.EffectState = { cache, cacher: cacher, type: EffectType.BEFORE }
    this.effectsState.set(effectKey, effectState)

    const internalFn = async () => {
      const current = cacher()
      if (
        this.forceEffects ||
        !dependencies ||
        this.mountingEffects ||
        this.dependenciesChanged(current as ReblendTyping.Primitive[], effectState.cache as ReblendTyping.Primitive[])
      ) {
        this.state[stateKey] = await fn({
          previous: effectState.cache,
          current: current,
          initial: this.mountingEffects,
          memoInitializationCall: false,
        })
        effectState.cache = current
      }
    }
    effectState.effect = internalFn
    return initial as T
  }

  useRef<T>(initial?: T) {
    const ref: ReblendTyping.Ref<T> = { current: initial! }
    return ref
  }

  useCallback<T extends (...args: any[]) => any>(fn: T): T {
    return fn.bind(this) as T
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
    this.renderingSessionTracker = new RenderingSessionTracker()
  }
}
