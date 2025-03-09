/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChildrenPropsUpdateType, PatchTypeAndOrder } from 'reblend-typing'
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
   * @param {ReblendTyping.Component | HTMLElement} node - The node to detach.
   */
  static detach(node: ReblendTyping.Component | HTMLElement) {
    if (NodeUtil.isPrimitive(node)) return
    if ((node as ReblendTyping.Component).disconnectedCallback) {
      ;(node as ReblendTyping.Component).disconnectedCallback()
    } else {
      node.outerHTML = ''
      node.innerHTML = ''
      node?.remove()
      //NodeOperationUtil.detachChildren(node as any)
    }
  }

  /**
   * Detaches all child nodes and HTML elements from the given `ReblendTyping.Component`.
   * If the node is a primitive, the function returns immediately.
   *
   * @param {ReblendTyping.Component} node - The parent node from which children will be detached.
   */
  static detachChildren(node: ReblendTyping.Component) {
    if (NodeUtil.isPrimitive(node)) return
    for (const child of [...node.childNodes]) {
      NodeOperationUtil.detach(child as any)
    }
  }

  /**
   * Calls `connectedCallback` on the node if it exists, signaling that the node has been connected to the DOM.
   *
   * @template T
   * @param {T | undefined} node - The node to connect.
   */
  static connected<T extends ReblendTyping.Component | HTMLElement>(node: T | undefined) {
    if (!node) return
    if ((node as ReblendTyping.Component).connectedCallback) {
      ;(node as ReblendTyping.Component).connectedCallback()
    }
    for (const child of [...node.childNodes]) {
      this.connected(child as HTMLElement)
    }
  }

  /**
   * Replaces the old node with a new node or nodes.
   * Handles scenarios where old and new nodes may be React-based or standard HTML.
   *
   * @param {ReblendTyping.Component | ReblendTyping.Component[]} newNode - The new node(s) to replace the old node.
   * @param {ReblendTyping.Component} oldNode - The old node to be replaced.
   */
  static replaceOldNode(
    newNode: ReblendTyping.Component | ReblendTyping.Component[],
    oldNode: ReblendTyping.Component,
  ) {
    let lastAttached = oldNode
    if (!Array.isArray(newNode)) {
      newNode = [newNode]
    }

    for (const node of newNode) {
      if (
        oldNode.directParent &&
        NodeUtil.isReactToReblendRenderedNode(node.directParent) &&
        !oldNode.directParent.reactElementChildren?.has(node)
      ) {
        if (!oldNode.directParent.reactElementChildren) {
          oldNode.directParent.reactElementChildren = new Set()
        }

        const reactElementChildrenArray = Array.from(oldNode.directParent.reactElementChildren)
        const lastAttachedIndex = reactElementChildrenArray.indexOf(lastAttached)

        if (lastAttachedIndex !== -1) {
          reactElementChildrenArray.splice(lastAttachedIndex + 1, 0, node)
        } else {
          reactElementChildrenArray.push(node)
        }

        oldNode.directParent.reactElementChildren = new Set(reactElementChildrenArray)
      }
      lastAttached.after(node)
      setTimeout(() => NodeOperationUtil.connected(node), 0)
      lastAttached = node
    }
  }

  /**
   * Creates patches to create or remove nodes by comparing oldNode and newNode.
   *
   * @param {ReblendTyping.Component} parent - The parent node.
   * @param {DomNodeChild} oldNode - The old node.
   * @param {VNodeChild} newNode - The new node.
   * @returns {Patch[]} - The array of patches.
   */
  static diffCreateOrRemove(parent: ReblendTyping.Component, oldNode: DomNodeChild, newNode: VNodeChild) {
    const patches: Patch[] = []
    if (
      !NodeUtil.isPrimitive(oldNode) &&
      Object.hasOwn(oldNode, 'reblendPrimitiveData') &&
      (oldNode as ReblendPrimitive).reblendPrimitiveData == newNode
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
   * @param {ReblendTyping.Component} parent - The parent node.
   * @param {DomNodeChild} oldNode - The old node.
   * @param {VNodeChild} newNode - The new node.
   * @returns {Patch[]} - The array of patches.
   */
  static diff(parent: ReblendTyping.Component, oldNode: DomNodeChild, newNode: VNodeChild): Patch[] {
    const patches: Patch[] = []
    if (isCallable(oldNode) || isCallable(newNode)) {
      return []
    }

    if (NodeUtil.isPrimitive(oldNode) && NodeUtil.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
    } else if (NodeUtil.isPrimitive(oldNode) && !NodeUtil.isPrimitive(newNode)) {
      patches.push({ type: PatchTypeAndOrder.CREATE, parent, newNode })
    } else if (NodeUtil.isReblendPrimitiveElement(oldNode) && NodeUtil.isPrimitive(newNode)) {
      if ((<ReblendPrimitive>oldNode).getData() !== newNode) {
        ;(<ReblendPrimitive>oldNode).setData(newNode as Primitive)
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
        (NodeUtil.isPrimitive((newNode as VNode).displayName)
          ? (newNode as VNode).displayName
          : ((newNode as VNode).displayName as typeof ReblendTyping.Component).ELEMENT_NAME ||
            ((newNode as VNode).displayName as any).displayName) as string
      ).toLowerCase()

      if (oldNodeTag !== newNodeTag) {
        patches.push({ type: PatchTypeAndOrder.REPLACE, parent, newNode, oldNode })
      } else {
        const propsDiff = NodeOperationUtil.diffProps(newNode as VNode, oldNode)
        if (propsDiff && propsDiff.length > 0) {
          patches.push({
            type: PatchTypeAndOrder.UPDATE,
            patches: propsDiff,
          })
        }
        patches.push(...NodeOperationUtil.diffChildren(oldNode, oldNode, newNode as VNode))
      }
    }

    return patches
  }

  /**
   * Diffs the props of the newNode and oldNode to generate a list of prop changes.
   *
   * @param {VNode} newNode - The new virtual node.
   * @param {ReblendTyping.Component} oldNode - The old base component node.
   * @returns {any[]} - The array of property differences.
   */
  static diffProps(newNode: VNode, oldNode: ReblendTyping.Component) {
    const ignoredProps = ['key', 'children', 'ref']

    const patches: PropPatch[] = []
    const oldProps: IAny = oldNode?.props || {}
    const newProps: IAny = { ...oldProps, ...(newNode?.props || {}) }
    const isReblendNode = NodeUtil.isReblendRenderedNode(oldNode)
    for (const key in newProps) {
      if (!ignoredProps.includes(key) || (key === 'children' && isReblendNode)) {
        let oldProp = oldProps[key]
        let newProp = newProps[key]

        // Normalize children before deep comparison
        if (key === 'children') {
          oldProp = JSON.stringify(oldProp)
          newProp = JSON.stringify(newProp)
        }

        if (!NodeOperationUtil.deepCompare(oldProp, newProp)) {
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
        if (/* key !== 'children' &&  */ !(key in newProps)) {
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
   * @param {ReblendTyping.Component} parent - The parent component containing the children.
   * @param {ReblendTyping.Component} oldNode - The old component node.
   * @param {VNode} newNode - The new virtual node.
   * @returns {Patch[]} - An array of patches representing the differences between the old and new children.
   */
  static diffChildren(parent: ReblendTyping.Component, oldNode: ReblendTyping.Component, newNode: VNode) {
    if (!NodeUtil.isStandard(oldNode) && !NodeUtil.isReactToReblendRenderedNode(oldNode)) {
      return []
    }
    const oldChildren: DomNodeChildren =
      (NodeUtil.isReactToReblendRenderedNode(oldNode)
        ? [...(oldNode.reactElementChildren?.values() || [])]
        : (oldNode.childNodes as any)) || []

    const newChildren: VNodeChildren = DiffUtil.deepFlat(newNode?.props?.children || [])
    const patches: Patch[] = []
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
   * Applies an array of patches to the component.
   *
   * @param {Patch[]} patches - The array of patches to apply.
   */
  static async applyPatches(patches: Patch[]) {
    const needsUpdate = new Set<ReblendTyping.Component>()

    for (const { type, newNode, oldNode, parent, patches: patchess } of (patches || []).sort(
      (a, b) => a.type - b.type,
    )) {
      switch (type) {
        case PatchTypeAndOrder.CREATE:
          {
            if (!parent) continue
            const elements = await ElementUtil.createElement(newNode as VNode)
            if (!elements.length) continue
            elements.forEach((element) => (element.directParent = parent))
            if (NodeUtil.isReactToReblendRenderedNode(parent)) {
              if (!parent.reactElementChildren) {
                parent.reactElementChildren = new Set(elements)
              } else {
                for (const element of elements) {
                  parent.reactElementChildren.add(element)
                }
                needsUpdate.add(parent)
              }
            } else {
              parent.append(...elements)
              elements.forEach((element) => setTimeout(() => NodeOperationUtil.connected(element), 0))
            }
          }
          break
        case PatchTypeAndOrder.REMOVE:
          if (oldNode) {
            NodeOperationUtil.replaceOperation(oldNode, async () => {
              oldNode.remove()
            })
          }
          break
        case PatchTypeAndOrder.REPLACE:
          if (oldNode) {
            NodeOperationUtil.replaceOperation(oldNode, async () => {
              const newNodeElements = await ElementUtil.createElement(newNode as VNode)
              newNodeElements.forEach((element) => (element.directParent = oldNode.directParent as any))
              NodeOperationUtil.replaceOldNode(newNodeElements, oldNode!)
            })
          }
          break
        case PatchTypeAndOrder.TEXT:
          oldNode && (oldNode.textContent = newNode as string)
          break
        case PatchTypeAndOrder.UPDATE:
          // Promise.resolve().then(() => {
          NodeOperationUtil.applyProps(patchess)
          // })
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
  static async applyProps(patches?: PropPatch[]) {
    //requestAnimationFrame(() => {
    let nodes = new Set<ReblendTyping.Component>()
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
        //if (node.attached) {
        ;(node as any)?.checkPropsChange()
        //}
      } else if (NodeUtil.isReblendRenderedNode(node) && node.attached) {
        Promise.resolve().then(() => node.onStateChange())
      }
    })
    nodes = null as any
    //})
  }

  /**
   * Performs a replacement operation on an old node.
   *
   * @param {ReblendTyping.Component} oldNode - The old node to replace.
   * @param {() => void} operation - The operation to execute for the replacement.
   */
  static replaceOperation(oldNode: ReblendTyping.Component, operation: () => Promise<void>) {
    operation().finally(
      () =>
        //requestIdleCallback(() => {
        NodeOperationUtil.detach(oldNode),
      //}),
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
        thiz.mountEffects!()
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
        // @ts-expect-error nothing to worry about
        thiz.ref.current = null as any
      }
    }
    thiz.disconnectEffects?.forEach((fn) => fn())
    thiz.disconnectEffects?.clear()

    NodeOperationUtil.detachChildren(thiz as any)
    thiz.reactElementChildren?.forEach((node) => NodeOperationUtil.detach(node))
    thiz.directParent?.reactElementChildren?.delete(thiz)

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
    //@ts-expect-error no worry
    thiz.props = null as any
    // Clear state and props
    thiz.reactElementChildrenWrapper = null as any
    thiz.reactElementChildren = null as any
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
