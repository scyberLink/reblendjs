/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChildrenPropsUpdateType, PatchTypeAndOrder, ReblendTyping } from 'reblend-typing'
import { isCallable, replaceOrAddItemToList } from '../common/utils'
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
import { createElement, newReblendPrimitive } from './ElementUtil'
import { ConfigUtil } from './ConfigUtil'

/**
 * Detaches the given node from the DOM.
 * If the node is a primitive, the function returns immediately.
 * If the node has a `disconnectedCallback`, it will be invoked.
 * Otherwise, it will be removed from the DOM.
 *
 * @param {ReblendTyping.Component<P, S> | HTMLElement} node - The node to detach.
 */
export function detach<P, S>(node: ReblendTyping.Component<P, S> | HTMLElement) {
  if (isPrimitive(node)) return
  if ((node as ReblendTyping.Component<P, S>).disconnectedCallback) {
    ;(node as ReblendTyping.Component<P, S>).disconnectedCallback()
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
 * Detaches all child nodes and HTML elements from the given `ReblendTyping.Component<P, S>`.
 * If the node is a primitive, the function returns immediately.
 *
 * @param {ReblendTyping.Component<P, S>} node - The parent node from which children will be detached.
 */
export function detachChildren<P, S>(node: ReblendTyping.Component<P, S>) {
  if (isPrimitive(node)) return
  for (const child of new Set([
    ...node.childNodes,
    ...((node as ReblendTyping.Component<P, S>).elementChildren?.values() || []),
  ])) {
    detach(child as any)
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
export function replaceOldNode<P, S>(
  newNode: ReblendTyping.Component<P, S> | ReblendTyping.Component<P, S>[],
  oldNode: ReblendTyping.Component<P, S>,
) {
  let lastAttached = oldNode
  if (!Array.isArray(newNode)) {
    newNode = [newNode]
  }

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
    lastAttached.after(node)
    connected(node)
    lastAttached = node
  }

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
 * @param {ReblendTyping.Component<P, S>} parent - The parent node.
 * @param {ReblendTyping.DomNodeChild} oldNode - The old node.
 * @param {ReblendTyping.VNodeChild} newNode - The new node.
 * @returns {ReblendTyping.Patch[]} - The array of patches.
 */
export function diff<P, S>(
  parent: ReblendTyping.Component<P, S>,
  oldNode: ReblendTyping.DomNodeChild<P, S>,
  newNode: ReblendTyping.VNodeChild,
): ReblendTyping.Patch<P, S>[] {
  const patches: ReblendTyping.Patch<P, S>[] = []
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
    if (isPrimitive((newNode as any).displayName)) {
      newNodeTag = (newNode as ReblendTyping.VNode).displayName as string
    } else if ((newNode as any).displayName.ELEMENT_NAME) {
      newNodeTag = (newNode as any).displayName.ELEMENT_NAME
    } else if ((newNode as any).displayName.displayName) {
      newNodeTag = (newNode as any).displayName.displayName
    }
    newNodeTag = typeof newNodeTag === 'string' ? newNodeTag?.toLowerCase() : ''

    if (isCallable((newNode as any).displayName) || (oldNodeTag && newNodeTag && oldNodeTag !== newNodeTag)) {
      patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    } else {
      const propsDiff = diffProps(newNode as ReblendTyping.VNode, oldNode)
      if (propsDiff && propsDiff.length > 0) {
        patches.push({
          type: PatchTypeAndOrder.UPDATE,
          patches: propsDiff,
        })
      }
      if (oldNode.childrenInitialize) {
        patches.push(...diffChildren(oldNode, oldNode, newNode as ReblendTyping.VNode))
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
  const newProps: ReblendTyping.IAny = { ...oldProps, ...(newNode?.props || {}) }
  const isReblendNode = isReblendRenderedNode(oldNode)
  for (const key in newProps) {
    if (!ignoredProps.includes(key) || (key === 'children' && isReblendNode)) {
      let oldProp = oldProps[key]
      let newProp = newProps[key]

      const shouldUseIterativeComparism = key === 'children' || (key === 'style' && typeof oldProp === 'object')
      let notEqual = false
      if (shouldUseIterativeComparism) {
        notEqual = !deepEqualIterative(oldProp, newProp)
      } else {
        notEqual =
          !deepCompare(oldProp, newProp) ||
          (oldNode.displayName === 'select' && key === 'value' && oldNode['value'] !== newProp)
      }

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
 * Compares two values for deep equality using an iterative approach to avoid stack overflow issues with large objects.
 * This function handles circular references and ignores properties named 'ref'.
 * It also ignores instances of `HTMLElement` if they exist in both objects.
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns `true` if the values are deeply equal, `false` otherwise.
 */
export function deepEqualIterative(a: any, b: any): boolean {
  const stack = [{ a, b }]
  const seen = new WeakMap()

  while (stack.length) {
    const { a, b } = stack.pop()!
    if (a === b) continue

    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
      return false
    }

    if (a.constructor !== b.constructor) {
      return false
    }

    // Ignore instances of HTMLElement if they exist in both
    if (a instanceof Node && b instanceof Node) {
      continue
    }

    if (seen.has(a)) {
      if (seen.get(a) !== b) {
        return false // Circular reference detected but points to different objects
      }
      continue // Circular reference detected and points to the same objects
    }

    seen.set(a, b)

    const keysA = Object.keys(a).filter((key) => key !== 'ref')
    const keysB = Object.keys(b).filter((key) => key !== 'ref')

    if (keysA.length !== keysB.length) {
      return false
    }

    for (const key of keysA) {
      if (!b.hasOwnProperty(key)) {
        return false
      }
      stack.push({ a: a[key], b: b[key] })
    }
  }

  return true
}

/**
 * Performs a deep comparison between two objects, including functions.
 *
 * @param {*} firstObject - The first object or function to compare.
 * @param {*} secondObject - The second object or function to compare.
 * @returns {boolean} - True if the objects are deeply equal, otherwise false.
 */
export function deepCompare(firstObject, secondObject) {
  if (typeof firstObject !== 'function' && secondObject !== 'function') {
    return firstObject === secondObject
  }

  // 1. Check if they are the same reference
  if (firstObject === secondObject) return true

  if (!firstObject || !secondObject) return false

  // 2. Compare function names (useful for named functions)
  if (firstObject.name !== secondObject.name) return false

  // 3. Compare the source code using toString()
  if (firstObject.toString() !== secondObject.toString()) return false

  // 4. Compare prototypes
  if (!deepEqualIterative(Object.getPrototypeOf(firstObject), Object.getPrototypeOf(secondObject))) {
    return false
  }

  // 5. Compare the properties of the functions (if they have custom properties)
  const func1Props = Object.getOwnPropertyNames(firstObject)
  const func2Props = Object.getOwnPropertyNames(secondObject)

  if (!deepEqualIterative(func1Props, func2Props)) {
    return false
  }

  for (const prop of func1Props) {
    if (!deepEqualIterative(firstObject[prop], secondObject[prop])) {
      return false
    }
  }

  return true
}

/**
 * Diffs the children of the old and new virtual nodes and returns the patches required to update them.
 *
 * @param {ReblendTyping.Component<P, S>} parent - The parent component containing the children.
 * @param {ReblendTyping.Component<P, S>} oldNode - The old component node.
 * @param {VNode} newNode - The new virtual node.
 * @returns {Patch[]} - An array of patches representing the differences between the old and new children.
 */
export function diffChildren<P, S>(
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
      patches.push(...diff(parent, oldChild, newChild))
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
  patches = Array.from((patches || []).sort((a, b) => a.type - b.type))

  for (const patch of patches) {
    switch (patch.type) {
      case PatchTypeAndOrder.CREATE:
        {
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
            elements?.forEach((node) => {
              patch.parent?.appendChild(node)
              connected(node)
            })
          }
        }
        break
      case PatchTypeAndOrder.REMOVE:
        if (patch.oldNode) {
          replaceOperation(
            patch.oldNode,
            async () => {
              /* empty */
            },
            true,
          )
        }
        break
      case PatchTypeAndOrder.REPLACE:
        if (patch.oldNode) {
          replaceOperation(patch.oldNode, async (newOldNode) => {
            const newNodeElements = await createElement(patch.newNode as ReblendTyping.VNode)
            newNodeElements.forEach((element) => (element.directParent = newOldNode.directParent as any))
            replaceOldNode(newNodeElements as any, newOldNode)
          })
        }
        break
      case PatchTypeAndOrder.TEXT:
        patch.oldNode && (patch.oldNode.textContent = patch.newNode as string)
        break
      case PatchTypeAndOrder.UPDATE:
        applyProps(patch.patches)
        break
    }
  }

  for (const parentUpdate of needsUpdate) {
    if (isReactToReblendRenderedNode(parentUpdate)) {
      const configs = ConfigUtil.getInstance().configs
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
export async function applyProps<P, S>(patches?: ReblendTyping.PropPatch<P, S>[]) {
  let nodes = new Set<ReblendTyping.Component<P, S>>()
  patches?.forEach(({ type, node, key, propValue }) => {
    if (type === 'UPDATE') {
      setProps({ [key]: propValue }, node, false)
      nodes.add(node)
    } else if (type === 'REMOVE') {
      removeProps({ [key]: undefined }, node)
      nodes.add(node)
    }
    if (isReactToReblendRenderedNode(node)) {
      if (key === 'children') {
        node.childrenPropsUpdate?.add(ChildrenPropsUpdateType.CHILDREN)
      } else {
        node.childrenPropsUpdate?.add(ChildrenPropsUpdateType.NON_CHILDREN)
      }
    }
  })
  await Promise.allSettled(
    nodes.values().map(async (node) => {
      if (isReactToReblendRenderedNode(node)) {
        ;(node as any)?.checkPropsChange()
      } else if (isReblendRenderedNode(node) && node.attached) {
        const configs = ConfigUtil.getInstance().configs
        if (configs.noDefering) {
          await node.onStateChange()
        } else {
          setTimeout(() => {
            node.onStateChange()
          }, configs.deferTimeout)
        }
      }
    }),
  )
  nodes = null as any
}

/**
 * Performs a replacement operation on an old node.
 *
 * @param {ReblendTyping.Component<P, S>} oldNode - The old node to replace.
 * @param {() => void} operation - The operation to execute for the replacement.
 */
export function replaceOperation<P, S>(
  oldNode: ReblendTyping.Component<P, S>,
  operation: (newNode: ReblendTyping.Component<P, S>) => Promise<void>,
  isRemoveOperation?: boolean,
) {
  let dummyNode: any = null
  if (isRemoveOperation) {
    oldNode.directParent?.elementChildren?.delete(oldNode)
    oldNode.remove()
  } else {
    dummyNode = newReblendPrimitive()
    ;(dummyNode as any).directParent = oldNode.directParent
    oldNode.after(dummyNode)
    if (oldNode.directParent?.elementChildren) {
      oldNode.directParent.elementChildren = replaceOrAddItemToList(
        oldNode.directParent.elementChildren || new Set(),
        oldNode,
        dummyNode,
      )
    }
    oldNode.remove()
  }
  //requestAnimationFrame(() => {})
  operation(dummyNode).finally(() =>
    requestIdleCallback(() => {
      detach(oldNode)
    }),
  )
}

/**
 * Callback invoked when the component is connected to the DOM.
 */
export function connectedCallback<P, S>(thiz: ReblendTyping.Component<P, S>) {
  if (thiz.hasDisconnected) {
    return
  }
  thiz.catchErrorFrom(() => {
    if (!thiz.attached) {
      thiz.attached = true
      thiz.componentDidMount()
      thiz.mountEffects()
    }
  })
}

/**
 * Lifecycle method called when the component is disconnected from the DOM.
 * Cleans up resources and removes the component from its parent.
 * Uses bruteforce approach insuring that there is not memory leakage
 */
export function disconnectedCallback<P, S>(thiz: ReblendTyping.Component<P, S>, fromCleanUp = false) {
  if (thiz.hasDisconnected) {
    return
  }
  !fromCleanUp && thiz.cleanUp()
  thiz.componentWillUnmount && thiz.componentWillUnmount()
  if (thiz.ref) {
    if (typeof thiz.ref === 'function') {
      thiz.ref(null as any)
    } else {
      try {
        thiz.ref.current = null as any
      } catch {
        /* empty */
      }
    }
  }

  if (!isReblendPrimitiveElement(thiz)) {
    thiz.effectsState?.forEach((state) => {
      state.disconnectEffect && state.disconnectEffect()
      state.cache = null as any
      state.cacher = null as any
      state.effect = null as any
      state.disconnectEffect = null as any
    })
  }

  thiz.hookDisconnectedEffects?.forEach((destructor) => {
    destructor()
  })

  detachChildren(thiz as any)
  thiz.elementChildren?.forEach((node) => detach(node))
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
    } catch (error) {
      thiz.parentElement.removeChild(thiz)
    }
  }
  thiz.reactElementChildrenWrapper?.disconnectedCallback()
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

  for (const property in thiz) {
    if (thiz[property]) {
      try {
        thiz[property] = null
      } catch (error) {
        /* empty */
      }
    }
  }

  thiz.hasDisconnected = true
}
