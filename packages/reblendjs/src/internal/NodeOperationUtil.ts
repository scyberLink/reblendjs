/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChildrenPropsUpdateType, PatchTypeAndOrder, ReblendTyping } from 'reblend-typing'
import { NodeUtil } from './NodeUtil'
import { isCallable } from '../common/utils'
import { isEqual } from 'lodash'
import { ElementUtil } from './ElementUtil'
import { DiffUtil } from './DiffUtil'
import { PropertyUtil } from './PropertyUtil'

export class NodeOperationUtil {
  /**
   * Detaches the given node from the DOM.
   * If the node is a primitive, the function returns immediately.
   * If the node has a `disconnectedCallback`, it will be invoked.
   * Otherwise, it will be removed from the DOM.
   *
   * @param {ReblendTyping.Component<P, S> | HTMLElement} node - The node to detach.
   */
  static detach<P, S>(node: ReblendTyping.Component<P, S> | HTMLElement) {
    if (NodeUtil.isPrimitive(node)) return
    if ((node as ReblendTyping.Component<P, S>).disconnectedCallback) {
      ;(node as ReblendTyping.Component<P, S>).disconnectedCallback()
    } else {
      node.outerHTML = ''
      node.innerHTML = ''
      node?.remove()
      //NodeOperationUtil.detachChildren(node as any)
    }
  }

  /**
   * Detaches all child nodes and HTML elements from the given `ReblendTyping.Component<P, S>`.
   * If the node is a primitive, the function returns immediately.
   *
   * @param {ReblendTyping.Component<P, S>} node - The parent node from which children will be detached.
   */
  static detachChildren<P, S>(node: ReblendTyping.Component<P, S>) {
    if (NodeUtil.isPrimitive(node)) return
    for (const child of new Set([
      ...node.childNodes,
      ...((node as ReblendTyping.Component<P, S>).elementChildren?.values() || []),
    ])) {
      NodeOperationUtil.detach(child as any)
    }
  }

  /**
   * Calls `connectedCallback` on the node if it exists, signaling that the node has been connected to the DOM.
   *
   * @template T
   * @param {T | undefined} node - The node to connect.
   */
  static connected<P, S, T extends ReblendTyping.Component<P, S> | HTMLElement>(node: T | undefined) {
    if (!node) return
    if ((node as ReblendTyping.Component<P, S>).connectedCallback) {
      ;(node as ReblendTyping.Component<P, S>).connectedCallback()
    }
    for (const child of [...((node as ReblendTyping.Component<P, S>).elementChildren?.values() || [])]) {
      NodeOperationUtil.connected(child as HTMLElement)
    }
  }

  /**
   * Replaces the old node with a new node or nodes.
   * Handles scenarios where old and new nodes may be React-based or standard HTML.
   *
   * @param {ReblendTyping.Component<P, S> | ReblendTyping.Component<P, S>[]} newNode - The new node(s) to replace the old node.
   * @param {ReblendTyping.Component<P, S>} oldNode - The old node to be replaced.
   */
  static replaceOldNode<P, S>(
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

        const reactElementChildrenArray = Array.from(oldNode.directParent.elementChildren)
        const lastAttachedIndex = reactElementChildrenArray.indexOf(lastAttached)

        if (lastAttachedIndex !== -1) {
          reactElementChildrenArray.splice(lastAttachedIndex, 0, node)
        } else {
          reactElementChildrenArray.push(node)
        }

        oldNode.directParent.elementChildren = new Set(reactElementChildrenArray)
      }
      lastAttached.after(node)
      setTimeout(() => NodeOperationUtil.connected(node), 0)
      lastAttached = node
    }

    oldNode.remove()
    oldNode.directParent.elementChildren?.delete(oldNode)
    requestAnimationFrame(() => {
      /* empty */
    })
  }

  /**
   * Creates patches to create or remove nodes by comparing oldNode and newNode.
   *
   * @param {ReblendTyping.Component<P, S>} parent - The parent node.
   * @param {ReblendTyping.DomNodeChild} oldNode - The old node.
   * @param {ReblendTyping.VNodeChild} newNode - The new node.
   * @returns {ReblendTyping.Patch[]} - The array of patches.
   */
  static diffCreateOrRemove<P, S>(
    parent: ReblendTyping.Component<P, S>,
    oldNode: ReblendTyping.DomNodeChild<P, S>,
    newNode: ReblendTyping.VNodeChild,
  ) {
    const patches: ReblendTyping.Patch<P, S>[] = []
    if (
      !NodeUtil.isPrimitive(oldNode) &&
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
  static diff<P, S>(
    parent: ReblendTyping.Component<P, S>,
    oldNode: ReblendTyping.DomNodeChild<P, S>,
    newNode: ReblendTyping.VNodeChild,
  ): ReblendTyping.Patch<P, S>[] {
    const patches: ReblendTyping.Patch<P, S>[] = []
    if (isCallable(oldNode) || isCallable(newNode)) {
      return []
    }

    if (NodeUtil.isPrimitive(oldNode) && NodeUtil.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
    } else if (NodeUtil.isPrimitive(oldNode) && !NodeUtil.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
    } else if (NodeUtil.isReblendPrimitiveElement(oldNode) && NodeUtil.isPrimitive(newNode)) {
      if ((<ReblendTyping.ReblendPrimitive<P, S>>oldNode).getData() !== newNode) {
        ;(<ReblendTyping.ReblendPrimitive<P, S>>oldNode).setData(newNode as ReblendTyping.Primitive)
      }
    } else if (NodeUtil.isReblendPrimitiveElement(oldNode) && !NodeUtil.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    } else if (NodeUtil.isTextNode(oldNode) && NodeUtil.isPrimitive(newNode)) {
      if (oldNode.textContent !== newNode) {
        patches.push({ type: PatchTypeAndOrder.TEXT, newNode, oldNode })
      }
    } else if (NodeUtil.isTextNode(oldNode) && !NodeUtil.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    } else if (!NodeUtil.isReblendPrimitiveElement(oldNode) && NodeUtil.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    } else if (NodeUtil.isEmpty(oldNode) && !NodeUtil.isEmpty(newNode)) {
      patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
    } else if (!NodeUtil.isEmpty(oldNode) && NodeUtil.isEmpty(newNode)) {
      patches.push({ type: PatchTypeAndOrder.REMOVE, parent, oldNode })
    } else if ((oldNode?.props as any)?.key !== (newNode as any)?.props?.key) {
      patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
    } else if ('displayName' in oldNode && 'displayName' in (newNode as any)) {
      const oldNodeTag = (oldNode.displayName as string).toLowerCase()
      const newNodeTag = (
        (NodeUtil.isPrimitive((newNode as ReblendTyping.VNode).displayName)
          ? (newNode as ReblendTyping.VNode).displayName
          : ((newNode as ReblendTyping.VNode).displayName as any).ELEMENT_NAME ||
            ((newNode as ReblendTyping.VNode).displayName as any).displayName) as string
      ).toLowerCase()

      if (oldNodeTag !== newNodeTag) {
        patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
      } else {
        const propsDiff = NodeOperationUtil.diffProps(newNode as ReblendTyping.VNode, oldNode)
        if (propsDiff && propsDiff.length > 0) {
          patches.push({
            type: PatchTypeAndOrder.UPDATE,
            patches: propsDiff,
          })
        }
        if (oldNode.childrenInitialize) {
          patches.push(...NodeOperationUtil.diffChildren(oldNode, oldNode, newNode as ReblendTyping.VNode))
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
  static diffProps<P, S>(newNode: ReblendTyping.VNode, oldNode: ReblendTyping.Component<P, S>) {
    const ignoredProps = ['key', 'children', 'ref']

    const patches: ReblendTyping.PropPatch<P, S>[] = []
    const oldProps: ReblendTyping.IAny = oldNode?.props || {}
    const newProps: ReblendTyping.IAny = { ...oldProps, ...(newNode?.props || {}) }
    const isReblendNode = NodeUtil.isReblendRenderedNode(oldNode)
    for (const key in newProps) {
      if (!ignoredProps.includes(key) || (key === 'children' && isReblendNode)) {
        let oldProp = oldProps[key]
        let newProp = newProps[key]

        const shouldUseIterativeComparism = key === 'children' || (key === 'style' && typeof oldProp === 'object')
        let notEqual = false
        if (shouldUseIterativeComparism) {
          notEqual = !NodeOperationUtil.deepEqualIterative(oldProp, newProp)
        } else {
          notEqual =
            !NodeOperationUtil.deepCompare(oldProp, newProp) ||
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
  static deepEqualIterative(a: any, b: any): boolean {
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
  static deepCompare(firstObject, secondObject) {
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

  /**
   * Diffs the children of the old and new virtual nodes and returns the patches required to update them.
   *
   * @param {ReblendTyping.Component<P, S>} parent - The parent component containing the children.
   * @param {ReblendTyping.Component<P, S>} oldNode - The old component node.
   * @param {VNode} newNode - The new virtual node.
   * @returns {Patch[]} - An array of patches representing the differences between the old and new children.
   */
  static diffChildren<P, S>(
    parent: ReblendTyping.Component<P, S>,
    oldNode: ReblendTyping.Component<P, S>,
    newNode: ReblendTyping.VNode,
  ) {
    if (!NodeUtil.isStandard(oldNode) && !NodeUtil.isReactToReblendRenderedNode(oldNode)) {
      return []
    }
    const oldChildren: ReblendTyping.DomNodeChildren<P, S> = [...(oldNode.elementChildren?.values() || [])] as any

    const newChildren: ReblendTyping.VNodeChildren = DiffUtil.deepFlat(newNode?.props?.children || [])
    const patches: ReblendTyping.Patch<P, S>[] = []
    const maxLength = Math.max(oldChildren.length, newChildren.length)

    for (let i = 0; i < maxLength; i++) {
      const oldChild = oldChildren[i]
      const newChild = newChildren[i]
      if (isCallable(oldChild) || isCallable(newChild)) {
        continue
      }
      if (oldChild === undefined || newChild === undefined) {
        patches.push(...NodeOperationUtil.diffCreateOrRemove(parent, oldChild, newChild))
      } else {
        patches.push(...NodeOperationUtil.diff(parent, oldChild, newChild))
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
  static async applyPatches<P, S>(patches: ReblendTyping.Patch<P, S>[]) {
    const needsUpdate = new Set<ReblendTyping.Component<P, S>>()

    for (const { type, newNode, oldNode, parent, patches: patchess } of (patches || []).sort(
      (a, b) => a.type - b.type,
    )) {
      switch (type) {
        case PatchTypeAndOrder.CREATE:
          {
            if (!parent) continue
            const elements = await ElementUtil.createElement(newNode as ReblendTyping.VNode)
            if (!elements.length) continue
            elements.forEach((element) => (element.directParent = parent))
            if (!parent.elementChildren) {
              parent.elementChildren = new Set(elements)
            } else {
              for (const element of elements) {
                parent.elementChildren.add(element)
              }
            }
            if (NodeUtil.isReactToReblendRenderedNode(parent)) {
              needsUpdate.add(parent)
            } else {
              parent.append(...elements)
              elements.forEach((element) => setTimeout(() => NodeOperationUtil.connected(element), 0))
            }
          }
          break
        case PatchTypeAndOrder.REMOVE:
          if (oldNode) {
            NodeOperationUtil.replaceOperation(oldNode, async () => {
              /* empty */
            })
          }
          break
        case PatchTypeAndOrder.REPLACE:
          if (oldNode) {
            NodeOperationUtil.replaceOperation(oldNode, async () => {
              const newNodeElements = await ElementUtil.createElement(newNode as ReblendTyping.VNode)
              newNodeElements.forEach((element) => (element.directParent = oldNode.directParent as any))
              NodeOperationUtil.replaceOldNode(newNodeElements as any, oldNode)
            })
          }
          break
        case PatchTypeAndOrder.TEXT:
          oldNode && (oldNode.textContent = newNode as string)
          break
        case PatchTypeAndOrder.UPDATE:
          NodeOperationUtil.applyProps(patchess)
          break
      }
    }

    for (const parentUpdate of needsUpdate) {
      if (NodeUtil.isReactToReblendRenderedNode(parentUpdate)) {
        setTimeout(() => parentUpdate.reactReblendMount && parentUpdate.reactReblendMount(), 0)
      }
    }
  }

  /**
   * Asynchronously applies property patches to nodes.
   *
   * @param {PropPatch[]} [patches] - The property patches to apply.
   */
  static async applyProps<P, S>(patches?: ReblendTyping.PropPatch<P, S>[]) {
    let nodes = new Set<ReblendTyping.Component<P, S>>()
    patches?.forEach(({ type, node, key, propValue }) => {
      if (type === 'UPDATE') {
        PropertyUtil.setProps({ [key]: propValue }, node, false)
        nodes.add(node)
      } else if (type === 'REMOVE') {
        PropertyUtil.removeProps({ [key]: undefined }, node)
        nodes.add(node)
      }
      if (NodeUtil.isReactToReblendRenderedNode(node)) {
        if (key === 'children') {
          node.childrenPropsUpdate?.add(ChildrenPropsUpdateType.CHILDREN)
        } else {
          node.childrenPropsUpdate?.add(ChildrenPropsUpdateType.NON_CHILDREN)
        }
      }
    })
    nodes.forEach((node) => {
      if (NodeUtil.isReactToReblendRenderedNode(node)) {
        ;(node as any)?.checkPropsChange()
      } else if (NodeUtil.isReblendRenderedNode(node) && node.attached) {
        //This allows us to finish applying updates before we trigger rerender
        Promise.resolve().then(() => setTimeout(() => node.onStateChange(), 0))
      }
    })
    nodes = null as any
  }

  /**
   * Performs a replacement operation on an old node.
   *
   * @param {ReblendTyping.Component<P, S>} oldNode - The old node to replace.
   * @param {() => void} operation - The operation to execute for the replacement.
   */
  static replaceOperation<P, S>(oldNode: ReblendTyping.Component<P, S>, operation: () => Promise<void>) {
    operation().finally(() =>
      requestIdleCallback(() => {
        NodeOperationUtil.detach(oldNode)
      }),
    )
  }

  /**
   * Callback invoked when the component is connected to the DOM.
   */
  static connectedCallback<P, S>(thiz: ReblendTyping.Component<P, S>) {
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
  static disconnectedCallback<P, S>(thiz: ReblendTyping.Component<P, S>, fromCleanUp = false) {
    !fromCleanUp && thiz.cleanUp()
    thiz.componentWillUnmount()
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
    thiz.disconnectEffects?.forEach((fn) => fn())
    thiz.disconnectEffects?.clear()

    NodeOperationUtil.detachChildren(thiz as any)
    thiz.elementChildren?.forEach((node) => NodeOperationUtil.detach(node))
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

    for (const property in thiz) {
      if (thiz[property] && property.startsWith('on')) {
        thiz[property] = null
      }
    }

    thiz.reactElementChildrenWrapper?.disconnectedCallback()
    thiz.props = null as any
    thiz.reactElementChildrenWrapper = null as any
    thiz.elementChildren = null as any
    thiz.effectState = null as any
    thiz.directParent = null as any
    thiz.state = null as any
    thiz.effectsFn = null as any
    thiz.disconnectEffects = null as any
    thiz.renderingError = null as any
    thiz.renderingErrorHandler = null as any
    thiz.nearestStandardParent = null as any
    thiz.ReactClass = null as any
    thiz.ref = null as any
    thiz.childrenPropsUpdate = null as any
    thiz.hasDisconnected = true
  }
}
