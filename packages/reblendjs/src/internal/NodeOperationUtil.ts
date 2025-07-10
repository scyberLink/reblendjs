/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChildrenPropsUpdateType, PatchTypeAndOrder } from 'reblend-typing'
import * as ReblendTyping from 'reblend-typing'
import { donotDeffer, getConfig, isCallable, replaceOrAddItemToList } from '../common/utils'
import { deepFlat } from './DiffUtil'
import {
  isPrimitive,
  isReblendPrimitiveElement,
  isTextNode,
  isEmpty,
  isReblendRenderedNode,
  isStandard,
  isReactToReblendRenderedNode,
} from './NodeUtil'
import { setProps, removeProps } from './PropertyUtil'
import { createElement } from './ElementUtil'
import deepEqualIterative from 'reblend-deep-equal-iterative'

/**
 * Detaches the given node from the DOM.
 * If the node is a primitive, the function returns immediately.
 * If the node has a `disconnectedCallback`, it will be invoked.
 * Otherwise, it will be removed from the DOM.
 *
 * @param {ReblendTyping.Component<P, S> | HTMLElement} node - The node to detach.
 */
export async function detach<P, S>(node: ReblendTyping.Component<P, S> | HTMLElement) {
  if (isPrimitive(node)) return
  if ((node as ReblendTyping.Component<P, S>).disconnectedCallback) {
    if (donotDeffer()) {
      await (node as ReblendTyping.Component<P, S>).disconnectedCallback()
    } else {
      ;(node as ReblendTyping.Component<P, S>).disconnectedCallback()
    }
  } else {
    if (node.parentElement) {
      node.outerHTML = ''
    }
    node.innerHTML = ''
    node?.remove()
    //detachChildren(node as any)
  }
}

/**
 * Detaches all child nodes and HTML elements from the given `HTMLElement/Component`.
 * If the node is a primitive, the function returns immediately.
 *
 * @param {HTMLElement} node - The parent node from which children will be detached.
 */
export async function detachChildren<P, S>(node: HTMLElement) {
  if (isPrimitive(node)) return
  for (const child of new Set([
    ...node.childNodes,
    ...((node as ReblendTyping.Component<P, S>).elementChildren?.values() || []),
  ])) {
    if (donotDeffer()) {
      await detach(child as any)
    } else {
      detach(child as any)
    }
  }
}

/**
 * Calls `connectedCallback` on the node if it exists, signaling that the node has been connected to the DOM.
 *
 * @template T
 * @param {T | undefined} node - The node to connect.
 */
export async function connected<P, S, T extends ReblendTyping.Component<P, S> | HTMLElement>(node: T | undefined) {
  if (!node) return
  if ((node as ReblendTyping.Component<P, S>).connectedCallback) {
    await (node as ReblendTyping.Component<P, S>).connectedCallback()
  }
}

/**
 * Replaces the old node with a new node or nodes.
 * Handles scenarios where old and new nodes may be React-based or standard HTML.
 *
 * @param {ReblendTyping.Component<P, S> | ReblendTyping.Component<P, S>[]} newNode - The new node(s) to replace the old node.
 * @param {ReblendTyping.Component<P, S>} oldNode - The old node to be replaced.
 */
export async function replaceOldNode<P, S>(
  newNode: ReblendTyping.Component<P, S> | ReblendTyping.Component<P, S>[],
  oldNode: ReblendTyping.Component<P, S>,
) {
  let lastAttached = oldNode
  if (!Array.isArray(newNode)) {
    newNode = [newNode]
  }

  // Use DocumentFragment to batch insertions
  const fragment = document.createDocumentFragment()
  for (const node of newNode) {
    if (oldNode.directParent && !oldNode.directParent.elementChildren?.has(node)) {
      if (!oldNode.directParent.elementChildren) {
        oldNode.directParent.elementChildren = new Set()
      }
      oldNode.directParent.elementChildren = replaceOrAddItemToList(
        oldNode.directParent.elementChildren,
        lastAttached,
        node,
      )
    }
    fragment.appendChild(node)
    if (donotDeffer()) {
      await connected(node)
    } else {
      connected(node)
    }
    lastAttached = node
  }

  // Insert the fragment after the oldNode
  oldNode.after(fragment)
  oldNode.remove()
  oldNode.directParent?.elementChildren?.delete(oldNode)
  /* requestAnimationFrame(() => { */
  /* empty */
  /* }) */
}

/**
 * Creates patches to create or remove nodes by comparing oldNode and newNode.
 *
 * @param {ReblendTyping.Component<P, S>} parent - The parent node.
 * @param {ReblendTyping.DomNodeChild} oldNode - The old node.
 * @param {ReblendTyping.VNodeChild} newNode - The new node.
 * @returns {ReblendTyping.Patch[]} - The array of patches.
 */
export function diffCreateOrRemove<P, S>(
  parent: ReblendTyping.Component<P, S>,
  oldNode: ReblendTyping.DomNodeChild<P, S>,
  newNode: ReblendTyping.VNodeChild,
) {
  const patches: ReblendTyping.Patch<P, S>[] = []
  if (
    !isPrimitive(oldNode) &&
    Object.hasOwn(oldNode, 'reblendPrimitiveData') &&
    (oldNode as ReblendTyping.ReblendPrimitive<P, S>).reblendPrimitiveData == newNode
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
 * @param {ReblendTyping.Componennt<P, S>} origin - The rerendering origin node.
 * @param {number} sessionId - The rerendering circle id.
 * @param {ReblendTyping.DomNodeChild} oldNode - The old node.
 * @param {ReblendTyping.VNodeChild} newNode - The new node.
 * @returns {ReblendTyping.Patch[]} - The array of patches.
 */
export async function diff<P, S>(
  origin: ReblendTyping.Component<P, S>,
  sessionId: number,
  parent: ReblendTyping.Component<P, S>,
  oldNode: ReblendTyping.DomNodeChild<P, S>,
  newNode: ReblendTyping.VNodeChild,
): Promise<ReblendTyping.Patch<P, S>[]> {
  const patches: ReblendTyping.Patch<P, S>[] = []

  if (!origin.renderingSessionTracker.isCurrentSession(sessionId)) {
    return patches
  }

  if (isCallable(newNode)) {
    newNode = await (newNode as any)()
  }

  if (isCallable(newNode)) {
    patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    return patches
  }

  if (isPrimitive(oldNode) && isPrimitive(newNode)) {
    patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
  } else if (isPrimitive(oldNode) && !isPrimitive(newNode)) {
    patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
  } else if (isReblendPrimitiveElement(oldNode) && isPrimitive(newNode)) {
    if ((<ReblendTyping.ReblendPrimitive<P, S>>oldNode).getData() !== newNode) {
      ;(<ReblendTyping.ReblendPrimitive<P, S>>oldNode).setData(newNode as ReblendTyping.Primitive)
    }
  } else if (isReblendPrimitiveElement(oldNode) && !isPrimitive(newNode)) {
    patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
  } else if (isTextNode(oldNode) && isPrimitive(newNode)) {
    if (oldNode.textContent !== newNode) {
      patches.push({ type: PatchTypeAndOrder.TEXT, newNode, oldNode })
    }
  } else if (isTextNode(oldNode) && !isPrimitive(newNode)) {
    patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
  } else if (!isReblendPrimitiveElement(oldNode) && isPrimitive(newNode)) {
    patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
  } else if (isEmpty(oldNode) && !isEmpty(newNode)) {
    patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
  } else if (!isEmpty(oldNode) && isEmpty(newNode)) {
    patches.push({ type: PatchTypeAndOrder.REMOVE, parent, oldNode })
  } else if ((oldNode?.props as any)?.key !== (newNode as any)?.props?.key) {
    patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
  } else if ('displayName' in oldNode && 'displayName' in (newNode as any)) {
    const oldNodeTag = (oldNode.displayName as string).toLowerCase()
    let newNodeTag = ''

    const isReactComponent = (newNode as any)?.props?.REACTCOMPONENT
    if (!isReactComponent && isCallable((newNode as any).displayName)) {
      ;(newNode as any).displayName = await (newNode as any).displayName()
    }

    if (isPrimitive((newNode as any).displayName)) {
      newNodeTag = (newNode as ReblendTyping.VNode).displayName as string
    } else if ((newNode as any).displayName.ELEMENT_NAME) {
      newNodeTag = (newNode as any).displayName.ELEMENT_NAME
    } else if ((newNode as any).displayName.displayName) {
      newNodeTag = (newNode as any).displayName.displayName
    }
    newNodeTag = typeof newNodeTag === 'string' ? newNodeTag?.toLowerCase() : ''

    if (
      (!isReactComponent && isCallable((newNode as any).displayName)) ||
      (oldNodeTag && newNodeTag && oldNodeTag !== newNodeTag)
    ) {
      patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    } else {
      const propsDiff = diffProps(newNode as ReblendTyping.VNode, oldNode)
      if (propsDiff && propsDiff.length > 0) {
        patches.push({
          type: PatchTypeAndOrder.UPDATE,
          patches: propsDiff,
        })
      }

      if (!origin.renderingSessionTracker.isCurrentSession(sessionId)) {
        return patches
      }

      if (oldNode.childrenInitialize) {
        patches.push(...(await diffChildren(origin, sessionId, oldNode, oldNode, newNode as ReblendTyping.VNode)))
      }
    }
  }

  return patches
}

/**
 * Diffs the props of the newNode and oldNode to generate a list of prop changes.
 *
 * @param {VNode} newNode - The new virtual node.
 * @param {ReblendTyping.Component<P, S>} oldNode - The old base component node.
 * @returns {any[]} - The array of property differences.
 */
export function diffProps<P, S>(newNode: ReblendTyping.VNode, oldNode: ReblendTyping.Component<P, S>) {
  const ignoredProps = ['key', 'children', 'ref']

  const patches: ReblendTyping.PropPatch<P, S>[] = []
  const oldProps: ReblendTyping.IAny = oldNode?.props || {}

  // Hack to get formatted props incase of alias name
  // start hack
  const dummyComponent: { props?: any } = {}
  oldNode.initProps.call(dummyComponent, (newNode?.props || {}) as any)
  const newProps: ReblendTyping.IAny = dummyComponent.props || {}
  // end hack

  const isReblendNode = isReblendRenderedNode(oldNode)
  const diffConfig = getConfig().diffConfig || undefined
  for (const key in newProps) {
    if (!ignoredProps.includes(key) || (key === 'children' && isReblendNode)) {
      let oldProp = oldProps[key]
      let newProp = newProps[key]

      const notEqual =
        !deepEqualIterative(
          oldProp,
          newProp,
          key === 'children' ? { ...diffConfig, depthThreshold: undefined, keyThreshold: undefined } : diffConfig,
        ) ||
        (oldNode.displayName === 'select' && key === 'value' && oldNode['value'] !== newProp)

      if (notEqual) {
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
      if (!(key in newProps)) {
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
 * @param {ReblendTyping.Component<P, S>} origin - The rerendering origin.
 * @param {number} sessionId - The rerendering circle id.
 * @param {ReblendTyping.Component<P, S>} parent - The parent component containing the children.
 * @param {ReblendTyping.Component<P, S>} oldNode - The old component node.
 * @param {VNode} newNode - The new virtual node.
 * @returns {Patch[]} - An array of patches representing the differences between the old and new children.
 */
export async function diffChildren<P, S>(
  origin: ReblendTyping.Component<P, S>,
  sessionId: number,
  parent: ReblendTyping.Component<P, S>,
  oldNode: ReblendTyping.Component<P, S>,
  newNode: ReblendTyping.VNode,
) {
  if (!isStandard(oldNode) && !isReactToReblendRenderedNode(oldNode)) {
    return []
  }
  const oldChildren: ReblendTyping.DomNodeChildren<P, S> = [...(oldNode.elementChildren?.values() || [])] as any

  const newChildren: ReblendTyping.VNodeChildren = deepFlat(newNode?.props?.children || [])
  const patches: ReblendTyping.Patch<P, S>[] = []
  const maxLength = Math.max(oldChildren.length, newChildren.length)

  for (let i = 0; i < maxLength; i++) {
    const oldChild = oldChildren[i]
    const newChild = newChildren[i]
    /* if (isCallable(oldChild) || isCallable(newChild)) {
      continue
    } */
    if (oldChild === undefined || newChild === undefined) {
      patches.push(...diffCreateOrRemove(parent, oldChild, newChild))
    } else {
      patches.push(...(await diff(origin, sessionId, parent, oldChild, newChild)))
    }
  }

  if (oldNode?.props) {
    ;(oldNode.props as any).children = newChildren
  }

  return patches
}

/**
 * Applies an array of patches to the component.
 *
 * @param {Patch[]} patches - The array of patches to apply.
 */
export async function applyPatches<P, S>(patches: ReblendTyping.Patch<P, S>[]) {
  const needsUpdate = new Set<ReblendTyping.Component<P, S>>()
  patches = Array.from(patches || [] /* .sort((a, b) => a.type - b.type) */)
  const configs = getConfig()

  // Batching structures
  const fragmentMap = new Map<any, DocumentFragment>()
  const nodesToRemove: Array<HTMLElement | ReblendTyping.Component<P, S>> = []
  const replaceOps: Array<{
    oldNode: ReblendTyping.Component<P, S>
    newNodeElements: Array<any>
  }> = []
  const afterPatchConnected: Array<() => Promise<void> | void> = []
  const allPropPatches: ReblendTyping.PropPatch<P, S>[][] = []

  for (const patch of patches) {
    switch (patch.type) {
      case PatchTypeAndOrder.CREATE: {
        if (!patch.parent) break
        const elements = await createElement(patch.newNode as ReblendTyping.VNode)
        if (!elements.length) break
        elements.forEach((element) => (element.directParent = patch.parent!))
        if (!patch.parent.elementChildren) {
          patch.parent.elementChildren = new Set(elements)
        } else {
          for (const element of elements) {
            patch.parent.elementChildren.add(element)
          }
        }
        if (isReactToReblendRenderedNode(patch.parent)) {
          needsUpdate.add(patch.parent)
        } else {
          let fragment = fragmentMap.get(patch.parent)
          if (!fragment) {
            fragment = document.createDocumentFragment()
            fragmentMap.set(patch.parent, fragment)
          }
          for (const node of elements) {
            fragment.appendChild(node)
            // Defer connected callbacks until after DOM insertion
            afterPatchConnected.push(async () => {
              if (configs.noDefering) {
                await connected(node)
              } else {
                connected(node)
              }
            })
          }
        }
        break
      }
      case PatchTypeAndOrder.REMOVE: {
        if (patch.oldNode) {
          removeRef(patch.oldNode)
          nodesToRemove.push(patch.oldNode)
        }
        break
      }
      case PatchTypeAndOrder.REPLACE: {
        if (patch.oldNode) {
          removeRef(patch.oldNode)
          const newNodeElements = await createElement(patch.newNode as ReblendTyping.VNode)
          newNodeElements.forEach((element) => (element.directParent = patch.oldNode?.directParent as any))
          replaceOps.push({ oldNode: patch.oldNode, newNodeElements })
        }
        break
      }
      case PatchTypeAndOrder.TEXT: {
        patch.oldNode && (patch.oldNode.textContent = patch.newNode as string)
        break
      }
      case PatchTypeAndOrder.UPDATE: {
        if (patch.patches) {
          allPropPatches.push(patch.patches)
        }
        break
      }
    }
  }

  // Batch all prop updates in a single call
  if (allPropPatches.length > 0) {
    if (configs.noDefering) {
      await applyProps(allPropPatches)
    } else {
      applyProps(allPropPatches)
    }
  }

  // Batch insertions
  for (const [parent, fragment] of fragmentMap.entries()) {
    parent.appendChild(fragment)
  }

  // Batch removals
  for (const node of nodesToRemove) {
    await replaceOperation(
      node as any,
      async () => {
        /* empty */
      },
      true,
    )
  }

  // Batch replacements
  for (const { oldNode, newNodeElements } of replaceOps) {
    await replaceOperation(oldNode, async () => {
      for (const element of newNodeElements) {
        element.directParent = oldNode.directParent as any
      }
      if (donotDeffer()) {
        await replaceOldNode(newNodeElements as any, oldNode!)
      } else {
        replaceOldNode(newNodeElements as any, oldNode!)
      }
    })
  }

  // Run connected callbacks after DOM insertions
  for (const fn of afterPatchConnected) {
    await fn()
  }

  for (const parentUpdate of needsUpdate) {
    if (isReactToReblendRenderedNode(parentUpdate)) {
      if (configs.noDefering) {
        parentUpdate.reactReblendMount && (await parentUpdate.reactReblendMount())
      } else {
        setTimeout(() => {
          parentUpdate.reactReblendMount && parentUpdate.reactReblendMount()
        }, configs.deferTimeout)
      }
    }
  }
}

/**
 * Asynchronously applies property patches to nodes.
 *
 * @param {PropPatch[]} [patches] - The property patches to apply.
 */
export async function applyProps<P, S>(patches?: ReblendTyping.PropPatch<P, S>[][]) {
  const flatPatches: ReblendTyping.PropPatch<P, S>[] = Array.isArray(patches) ? patches.flat() : (patches as any) || []
  const propUpdates = new Map<ReblendTyping.Component<P, S>, Record<string, any>>()
  const propRemovals = new Map<ReblendTyping.Component<P, S>, Set<string>>()
  const reactToReblendNodes: Set<ReblendTyping.Component<P, S>> = new Set()
  const reblendNodesToUpdate: Set<ReblendTyping.Component<P, S>> = new Set()
  const configs = getConfig()

  flatPatches.forEach(({ type, node, key, propValue }) => {
    if (type === 'UPDATE') {
      if (!propUpdates.has(node)) propUpdates.set(node, {})
      propUpdates.get(node)![key] = propValue
    } else if (type === 'REMOVE') {
      if (!propRemovals.has(node)) propRemovals.set(node, new Set())
      propRemovals.get(node)!.add(key)
    }
    if (isReactToReblendRenderedNode(node)) {
      if (key === 'children') {
        node.childrenPropsUpdate?.add(ChildrenPropsUpdateType.CHILDREN)
      } else {
        node.childrenPropsUpdate?.add(ChildrenPropsUpdateType.NON_CHILDREN)
      }
      reactToReblendNodes.add(node)
    } else if (isReblendRenderedNode(node) && node.attached) {
      reblendNodesToUpdate.add(node)
    }
  })

  // Batch setProps and removeProps for each node
  for (const [node, props] of propUpdates.entries()) {
    setProps(props, node, false)
  }
  for (const [node, keys] of propRemovals.entries()) {
    const removeObj: Record<string, undefined> = {}
    for (const key of keys) removeObj[key] = undefined
    removeProps(removeObj, node)
  }

  // Batch checkPropsChange for React-to-Reblend nodes
  for (const node of reactToReblendNodes) {
    ;(node as any)?.checkPropsChange()
  }

  // Batch onStateChange for Reblend nodes
  if (reblendNodesToUpdate.size > 0) {
    if (configs.noDefering) {
      for (const node of reblendNodesToUpdate) {
        await node.onStateChange()
      }
    } else {
      setTimeout(() => {
        for (const node of reblendNodesToUpdate) {
          node.onStateChange()
        }
      }, configs.deferTimeout)
    }
  }
}

/**
 * Performs a replacement operation on an old node.
 *
 * @param {ReblendTyping.Component<P, S>} oldNode - The old node to replace.
 * @param {() => void} operation - The operation to execute for the replacement.
 */
export async function replaceOperation<P, S>(
  oldNode: ReblendTyping.Component<P, S>,
  operation: () => Promise<void>,
  isRemoveOperation?: boolean,
) {
  if (isRemoveOperation) {
    oldNode.directParent?.elementChildren?.delete(oldNode)
    oldNode.remove()
  }

  if (donotDeffer()) {
    await operation()
    await detach(oldNode)
  } else {
    operation().then(() =>
      requestIdleCallback(() => {
        detach(oldNode)
      }),
    )
  }
}

export function removeRef(node: ReblendTyping.Component<any, any>) {
  if (node.ref) {
    if (typeof node.ref === 'function') {
      node.ref(null as any)
    } else if (node.ref.current) {
      node.ref.current = null as any
    }
  }
}

/**
 * Callback invoked when the component is connected to the DOM.
 */
export async function connectedCallback<P, S>(thiz: ReblendTyping.Component<P, S>) {
  if (thiz.hasDisconnected) {
    return
  }
  if (!thiz.attached) {
    thiz.attached = true
    await thiz.componentDidMount()
    await thiz.mountEffects()
  }
}

/**
 * Lifecycle method called when the component is disconnected from the DOM.
 * Cleans up resources and removes the component from its parent.
 * Uses bruteforce approach insuring that there is not memory leakage
 */
export async function disconnectedCallback<P, S>(thiz: ReblendTyping.Component<P, S>, fromCleanUp = false) {
  if (thiz.hasDisconnected) {
    return
  }
  const configs = getConfig()
  !fromCleanUp && (await thiz.cleanUp())
  thiz.componentWillUnmount && (await thiz.componentWillUnmount())
  /* if (thiz.ref) {
    if (typeof thiz.ref === 'function') {
      thiz.ref(null as any)
    } else {
      try {
        thiz.ref.current = null as any
      } catch {
        // empty
      }
    }
  } */

  if (!isReblendPrimitiveElement(thiz)) {
    for (const state of thiz.effectsState?.values() || []) {
      state.disconnectEffect && (await state.disconnectEffect())
      state.cache = null as any
      state.cacher = null as any
      state.effect = null as any
      state.disconnectEffect = null as any
    }
  }

  thiz.hookDisconnectedEffects?.forEach((destructor) => {
    destructor()
  })

  if (configs.noDefering) {
    await detachChildren(thiz as any)
  } else {
    detachChildren(thiz as any)
  }
  for (const node of thiz.elementChildren?.values() || []) {
    if (configs.noDefering) {
      await detach(node)
    } else {
      detach(node)
    }
  }

  thiz.directParent?.elementChildren?.delete(thiz as any)

  // Remove event listeners
  // eslint-disable-next-line no-self-assign

  thiz.innerHTML = ''
  if (thiz.parentElement) {
    // Remove event listeners
    // eslint-disable-next-line no-self-assign
    thiz.outerHTML = ''
    try {
      HTMLElement.prototype.remove.call(thiz)
    } catch {
      thiz.parentElement.removeChild(thiz)
    }
  }
  if (configs.noDefering) {
    await thiz.reactElementChildrenWrapper?.disconnectedCallback()
  } else {
    thiz.reactElementChildrenWrapper?.disconnectedCallback()
  }
  thiz.props = null as any
  thiz.reactElementChildrenWrapper = null as any
  thiz.elementChildren = null as any
  thiz.effectsState = null as any
  thiz.hookDisconnectedEffects = null as any
  thiz.directParent = null as any
  thiz.state = null as any
  thiz.renderingError = null as any
  thiz.renderingErrorHandler = null as any
  thiz.nearestStandardParent = null as any
  thiz.ReactClass = null as any
  thiz.ref = null as any
  thiz.childrenPropsUpdate = null as any

  /* for (const property in thiz) {
    if (thiz[property]) {
      try {
        thiz[property] = null
      } catch {}
    }
  } */

  thiz.hasDisconnected = true
}
