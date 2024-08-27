/* eslint-disable @typescript-eslint/no-explicit-any */
import { attributeName, shouldUseSetAttribute } from 'reblend-typing'
import { isCallable, rand, REBLEND_CHILDREN_WRAPPER_FOR__ATTRIBUTE_NAME } from '../common/utils'
import { IAny } from '../interface/IAny'
import type { BaseComponent } from './BaseComponent'
import {
  Patch,
  Primitive,
  PropPatch,
  ReactToReblendNode,
  ReactToReblendVNode,
  ReblendNode,
  ReblendNodeStandard,
  ReblendPrimitive,
  ReblendPrimitiveNode,
  ReblendVNode,
  ReblendVNodeStandard,
  VNode,
  VNodeChild,
  VNodeChildren,
  WorkerData,
} from './BaseComponentType'
import type { Reblend } from './Reblend'
import { isEqual } from 'lodash'
import { getElement } from './ElementDictionary'

export const extendPrototype = (target, prototype) => {
  if (!prototype) {
    return
  }
  const descriptors = Object.getOwnPropertyDescriptors(prototype)

  for (const key in descriptors) {
    if (Object.prototype.hasOwnProperty.call(descriptors, key)) {
      // Skip the constructor
      if (key === 'constructor') continue

      const descriptor = descriptors[key]

      // Avoid replacing existing functions on the target
      if (!(key in target) || (typeof descriptor.value !== 'function' && !(key in target))) {
        Object.defineProperty(target, key, descriptor)
      }
    }
  }

  // If there's a prototype chain, continue copying from the prototype chain
  const proto = Object.getPrototypeOf(prototype)
  if (proto && proto !== Object.prototype) {
    extendPrototype(target, proto)
  }
}

export const hasName = (element: typeof BaseComponent) => {
  return element.ELEMENT_NAME && element.ELEMENT_NAME !== 'BaseComponent'
}

export const fn = (eventCallback: (e: Event) => any = () => {}) => {
  return (e) => eventCallback(e)
}

export const setAttributesWithNamespace = (element: HTMLElement | SVGElement, attributes: Record<string, string>) => {
  const svgAttributes = [
    /* 'x',
      'y', */
    /* 'width',
      'height', */
    /* 'fill',
      'stroke',
      'viewBox',
      'preserveAspectRatio',
      'cx',
      'cy',
      'r',
      'd',
      'pathLength',
      'transform',
      'href', */
  ]
  const mathMLAttributes = ['displaystyle', 'scriptlevel', 'mathvariant', 'mathsize', 'lspace', 'rspace']

  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith('xmlns:')) {
      // Handle XML namespace attributes
      element.setAttributeNS('http://www.w3.org/2000/xmlns/', key, value)
    } else if (key === 'xmlns') {
      // Handle default XML namespace attribute
      element.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', value)
    } else if (element instanceof SVGElement && svgAttributes.includes(key as never)) {
      // Handle SVG attributes
      element.setAttributeNS('http://www.w3.org/2000/svg', key, value)
    } else if (element instanceof Element && mathMLAttributes.includes(key)) {
      // Handle MathML attributes
      element.setAttributeNS('http://www.w3.org/1998/Math/MathML', key, value)
    } else if (key.startsWith('xlink:')) {
      // Handle XLink attributes
      element.setAttributeNS('http://www.w3.org/1999/xlink', key, value)
    } else {
      // Handle standard HTML attributes
      element.setAttribute(key, value)
    }
  }
}

export const createElementWithNamespace = (tag: string) => {
  const svgTags = [
    'svg',
    'path',
    'circle',
    'rect',
    'line',
    'text',
    'use',
    'g',
    'defs',
    'clipPath',
    'polygon',
    'polyline',
    'image',
    'symbol',
  ]
  const mathMLTags = ['math', 'mi', 'mn', 'mo', 'ms', 'mtext']
  const xmlTags = ['xml', 'xmlns']

  if (svgTags.includes(tag)) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag)
  } else if (mathMLTags.includes(tag)) {
    return document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
  } else if (xmlTags.includes(tag)) {
    return document.createElementNS('http://www.w3.org/XML/1998/namespace', tag)
  } else {
    return document.createElement(tag) // Default to HTML namespace
  }
}

export const setProps = async (props: IAny, to: BaseComponent, init: boolean) => {
  if (props && to) {
    to.props = { ...to.props, ...props }

    if (isReblendRenderedNodeStandard(to)) {
      for (const propName in props) {
        const _attributeName = attributeName(propName)
        const propValue = props[propName]
        if (propName == 'dangerouslySetInnerHTML') {
          to.innerHTML = propValue?.__html
        } else if (propName.startsWith('on')) {
          to[_attributeName] = fn(propValue) as any
        } else {
          if (_attributeName === 'style') {
            to.addStyle(propValue)
          } else {
            const _shouldUseSetAttribute = shouldUseSetAttribute(_attributeName)
            try {
              if (_shouldUseSetAttribute) {
                setAttributesWithNamespace(to, {
                  [_attributeName]: propValue,
                })
              } else {
                to[_attributeName] = propValue
              }
            } catch (error: any) {
              /* empty */
            }
          }
        }
      }
    }
    init && to.init && to.init()
  }
}
export const removeProps = async (props: IAny, to: BaseComponent) => {
  if (props && to) {
    to.props = { ...to.props, ...props }

    for (const propName in props) {
      const _attributeName = attributeName(propName)
      const _shouldUseSetAttribute = shouldUseSetAttribute(propName)

      try {
        if (_shouldUseSetAttribute) {
          to.removeAttribute(_attributeName)
          delete to?.props[_attributeName]
        } else {
          to[_attributeName] = props[propName]
          delete to[_attributeName]
        }
      } catch (error: any) {
        /* empty */
      }
    }
  }
}

export const isReblendRenderedNode = (node: any): boolean => {
  return !isPrimitive(node) && node![ReblendNode]
}

export const isReblendPrimitive = (node: any): boolean => {
  return !isPrimitive(node) && node![ReblendPrimitiveNode]
}

export const isReblendVirtualNode = (node: any): boolean => {
  return !isPrimitive(node) && node![ReblendVNode]
}

export const isReblendRenderedNodeStandard = (node: any): boolean => {
  return !isPrimitive(node) && node![ReblendNodeStandard]
}

export const isReblendVirtualNodeStandard = (node: any): boolean => {
  return !isPrimitive(node) && node![ReblendVNodeStandard]
}

export const isReactToReblendRenderedNode = (node: any): boolean => {
  return !isPrimitive(node) && node![ReactToReblendNode]
}

export const isReactToReblendVirtualNode = (node: any): boolean => {
  return !isPrimitive(node) && node![ReactToReblendVNode]
}

export const isStandardVirtualNode = (node: any): boolean => {
  return !isPrimitive(node) && node![ReblendVNodeStandard]
}

export const deepFlat = <T>(data: T[]): T[] => {
  return data.flat(Number.MAX_VALUE) as any
}

export const isArray = (obj: unknown) => {
  const arrayProperties = ['pop', 'push', 'length', 'shift', 'unshift', 'splice', 'slice', 'find', 'includes']
  return typeof obj === 'object' && arrayProperties.every((property) => property in obj!)
}

export const flattenVNodeChildren = <T>(arr: (T | T[])[], containerArr: T[] = []): T[] => {
  if (!arr || arr.length < 1) {
    return []
  }

  for (const item of arr) {
    if (Array.isArray(item)) {
      flattenVNodeChildren(item as T[], containerArr)
    } else {
      containerArr.push(item as T)
    }
  }

  return containerArr
}

export const isPrimitive = (data: any) => {
  const primitves = ['string', 'number', 'boolean', 'bigint', 'null', 'undefined', 'symbol']
  const dataType = typeof data
  return primitves.some((primitve) => primitve === (data === null ? 'null' : dataType))
}

export const detach = (node: BaseComponent | HTMLElement) => {
  if (isPrimitive(node)) return
  if ('disconnectedCallback' in node) {
    ;(node as any as BaseComponent).disconnectedCallback()
  } else {
    node.parentNode?.removeChild(node)
  }
}

export const detachChildren = (node: BaseComponent) => {
  if (isPrimitive(node)) return
  if (node.props) {
    for (const child of node.props?.children || []) {
      detach(child)
    }
    node.props.children = []
  }
  for (const child of node.childNodes || []) {
    detach(child as any)
  }
}

export const connected = <T extends BaseComponent | HTMLElement>(node: T | undefined) => {
  if (!node) return
  if ((node as BaseComponent).connectedCallback) {
    ;(node as BaseComponent).connectedCallback()
  }
}

export const diff = (parentId: string, oldNode: VNode | null, newNode: VNodeChild): Patch[] => {
  const patches: Patch[] = []
  if (isCallable(oldNode) || isCallable(newNode)) {
    return []
  }
  //oldNode being primitive is null and undefined
  if (isPrimitive(oldNode) && isPrimitive(newNode)) {
    patches.push({ type: 'CREATE', parentId: parentId, primitive: { newData: newNode as Primitive } })
    //oldNode being primitive is null and undefined
  } else if (isPrimitive(oldNode) && !isPrimitive(newNode)) {
    patches.push({ type: 'CREATE', parentId: parentId, newNodeId: (newNode as VNode).internalIdentifier })
  } else if (isReblendPrimitive(oldNode) && isPrimitive(newNode)) {
    if ((oldNode as unknown as ReblendPrimitive).reblendPrimitiveData !== newNode) {
      patches.push({
        type: 'TEXT',
        primitive: { newData: newNode as Primitive },
        oldNodeId: oldNode?.internalIdentifier,
      })
    }
  } else if (isReblendPrimitive(oldNode) && !isPrimitive(newNode)) {
    patches.push({
      type: 'REPLACE',
      parentId: parentId,
      newNodeId: (newNode as VNode).internalIdentifier,
      oldNodeId: oldNode?.internalIdentifier,
    })
  } else if (!isReblendPrimitive(oldNode) && isPrimitive(newNode)) {
    patches.push({
      type: 'REPLACE',
      parentId: parentId,
      primitive: { newData: newNode as Primitive },
      oldNodeId: oldNode?.internalIdentifier,
    })
  } else if ('displayName' in (oldNode as VNode) && 'displayName' in (newNode as VNode)) {
    const oldNodeTag = ((oldNode as VNode).displayName as string).toLowerCase()

    const newNodeTag = (
      (isPrimitive((newNode as VNode).displayName)
        ? (newNode as VNode).displayName
        : ((newNode as VNode).displayName as typeof Reblend).ELEMENT_NAME) as string
    ).toLowerCase()

    if (oldNodeTag !== newNodeTag) {
      patches.push({
        type: 'REPLACE',
        parentId: parentId,
        newNodeId: (newNode as VNode).internalIdentifier,
        oldNodeId: (oldNode as VNode).internalIdentifier,
      })
    } else {
      const propsDiff = diffProps(newNode as VNode, oldNode as VNode)
      if (propsDiff && propsDiff.length > 0) {
        patches.push({
          type: 'UPDATE',
          patches: propsDiff,
        })
      }
      patches.push(...diffChildren((oldNode as VNode).internalIdentifier, oldNode as VNode, newNode as VNode))
    }
  }

  return patches
}

export const findPatches = (data: WorkerData | undefined) => {
  if (!data) {
    return []
  }
  const patches: Patch[] = []
  const maxLength = Math.max(
    Array.isArray(data.oldVnodes) ? data.oldVnodes.length : Object.keys(data.oldVnodes || {}).length,
    (data?.newVNodes as VNodeChildren).length || (data?.newVNodes ? 1 : 0),
  )

  for (let i = 0; i < maxLength; i++) {
    const newVNode: VNodeChild = data?.newVNodes[i]
    const currentVNode = data.oldVnodes[i]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    patches.push(...diff(data?.parentId, currentVNode as any, newVNode))
  }
  return patches
}

export const deepCompare = (firstObject, secondObject) => {
  if (typeof firstObject !== 'function' && secondObject !== 'function') {
    return isEqual(firstObject, secondObject)
  }

  // 1. Check if they are the same reference
  if (firstObject === secondObject) return true

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

export const diffProps = (newNode: VNode, oldNode: VNode) => {
  const patches: PropPatch[] = []
  const oldProps: IAny = oldNode?.props || []
  const newProps: IAny = newNode?.props || []
  for (const key in newProps) {
    if (key !== 'children') {
      let oldProp = oldProps[key]
      let newProp = newProps[key]
      if (!deepCompare(oldProp, newProp)) {
        oldProp = null
        newProp = null
        patches.push({
          type: 'UPDATE',
          node: oldNode.internalIdentifier,
          newVnodeId: newNode.internalIdentifier,
          key,
        })
      }
    }
  }

  for (const key in oldProps) {
    if (key !== 'children' && !(key in newProps)) {
      patches.push({
        type: 'REMOVE',
        node: oldNode.internalIdentifier,
        newVnodeId: newNode.internalIdentifier,
        key,
      })
    }
  }

  return patches
}

export const diffChildren = (parent: string, oldNode: VNode, newNode: VNode) => {
  const oldChildren: VNodeChildren = oldNode?.props?.children || []
  const newChildren: VNodeChildren = deepFlat(newNode?.props?.children || [])
  const patches: Patch[] = []
  const maxLength = Math.max(oldChildren.length, newChildren.length)

  for (let i = 0; i < maxLength; i++) {
    const oldChild = oldChildren[i]
    const newChild = newChildren[i]
    if (isCallable(oldChild) || isCallable(newChild)) {
      continue
    }
    if (oldChild === undefined || newChild === undefined) {
      patches.push(...diffCreateOrRemove(parent, oldChild, newChild))
    } else {
      patches.push(...diff(parent, oldChild as VNode, newChild))
    }
  }

  return patches
}

export const replaceOperation = (oldNode: BaseComponent, operation: () => void) => {
  //Release some memory before doing the replace operation
  detachChildren(oldNode)
  operation()
  detach(oldNode)
}

export const applyProps = (patches: PropPatch[], vNodes: VNode | VNodeChildren) => {
  //requestAnimationFrame(() => {
  //This helps reduce onStateChange call for updates of the same node
  let nodes = new Set<BaseComponent>()
  patches?.forEach(({ type, node, key, newVnodeId }) => {
    const element = getElement(node)
    if (type === 'UPDATE') {
      let newNode = findNodeIn(vNodes, newVnodeId)
      const propValue = newNode?.props[key]
      setProps({ [key]: propValue }, element, false)
      nodes.add(element)
    } else if (type === 'REMOVE') {
      removeProps({ [key]: undefined }, element)
      nodes.add(element)
    }
  })
  nodes.forEach((node) => {
    if (!isReblendRenderedNodeStandard(node)) {
      if (isReactToReblendRenderedNode(node)) {
        ;(node as any)?.render()
      } else {
        node.onStateChange()
      }
    }
  })
  nodes = null as any
  //})
}

export const isTextNode = (node: Node): node is Text => {
  return node?.nodeType === Node.TEXT_NODE
}

export const isEmpty = (data: any) => {
  return data === undefined || data === null
}

export const diffCreateOrRemove = (parent: string, oldNode: VNodeChild, newNode: VNodeChild) => {
  const patches: Patch[] = []
  if (!oldNode) {
    patches.push({ type: 'CREATE', parentId: parent, newNodeId: (newNode as VNode).internalIdentifier })
  } else if (!newNode) {
    patches.push({ type: 'REMOVE', parentId: parent, oldNodeId: (oldNode as VNode).internalIdentifier })
  }

  return patches
}

export const getChildrenWrapperForReact = async (children: BaseComponent[]) => {
  const react = await import('react')
  return react.createElement(
    class extends react.Component {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore Any
      containerRef: React.RefObject<HTMLDivElement>
      constructor(props) {
        super(props)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore Any
        this.containerRef = react.createRef<HTMLDivElement>()
      }

      componentDidMount(): void {
        if (this.containerRef) {
          children?.forEach((child) => {
            this.containerRef.current?.appendChild(child)
            child.connectedCallback && child.connectedCallback()
          })
        }
      }

      render() {
        return react.createElement(
          'div',
          {
            [REBLEND_CHILDREN_WRAPPER_FOR__ATTRIBUTE_NAME]: '',
            ref: this.containerRef,
          },
          null,
        )
      }
    },
  )
}

export const getInternalIdentifier = (clazz: string | typeof BaseComponent) => {
  return `${typeof clazz === 'string' ? clazz : clazz.ELEMENT_NAME}_${Date.now() + rand(111111111, 999999999)}`
}

export const findNodeIn = (vNodes: VNode | VNodeChildren, newNodeId: string | undefined): VNode | null | undefined => {
  if (!Array.isArray(vNodes)) {
    vNodes = [vNodes]
  }

  for (const vNode of vNodes) {
    if (isPrimitive(vNode)) {
      continue
    } else if (Array.isArray(vNode)) {
      const found = findNodeIn(vNode, newNodeId)
      if (found) {
        return found
      }
    } else if (!(vNode as VNode).internalIdentifier) {
      continue
    } else if ((vNode as VNode).internalIdentifier === newNodeId) {
      return vNode as VNode
    } else {
      for (const prop of Object.values((vNode as VNode)?.props || {})) {
        const found = findNodeIn(prop, newNodeId)
        if (found) {
          return found
        }
      }
    }
  }

  return null
}
