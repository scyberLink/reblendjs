import { IAny } from '../interface/IAny'
import type { BaseComponent } from './BaseComponent'
import { Reblend } from './Reblend'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const ReblendPrimitiveNode = 'Reblend.Node.Primitive'
export const ReblendNode = 'Reblend.Node'
export const ReblendVNode = 'Reblend.VNode'
export const ReactToReblendNode = 'React.Reblend.Node'
export const ReactToReblendVNode = 'React.Reblend.VNode'
export const ReblendNodeStandard = 'Reblend.Node.Standard'
export const ReblendVNodeStandard = 'Reblend.VNode.Standard'

export type ChildWithProps = {
  child: BaseComponent
  propsKey: string[]
}

export const ERROR_EVENTNAME = 'reblend-render-error'
export type ReblendRenderingException = Error & { component: BaseComponent }

export interface PropPatch {
  type: 'REMOVE' | 'UPDATE'
  node: string
  key: string
  propValue?: string
}

export type Primitive = boolean | null | number | string | undefined
export const REBLEND_PRIMITIVE_ELEMENT_NAME = 'ReblendPrimitive'

export type VNodeChild = Primitive | VNode
export type VNodeChildren = VNodeChild[]
export type DomNodeChild = BaseComponent | ReblendPrimitive
export type DomNodeChildren = DomNodeChild[]

export interface ReactNode {
  $$typeof: symbol
  displayName: string
  render: (props: any) => any
}

export interface VNode {
  'Reblend.Node.Primitive'?: boolean
  'Reblend.Node'?: boolean
  'Reblend.VNode'?: boolean
  'React.Reblend.Node'?: boolean
  'React.Reblend.VNode'?: boolean
  'Reblend.Node.Standard'?: boolean
  'Reblend.VNode.Standard'?: boolean
  internalIdentifier: string
  props: IAny & { children: VNodeChildren }
  displayName: string | typeof Reblend | ReactNode
}

export interface Patch {
  type: 'CREATE' | 'REMOVE' | 'REPLACE' | 'UPDATE' | 'TEXT'
  newNodeId?: string
  oldNodeId?: string
  primitive?: { newData: Primitive; oldNodeId?: string }
  parentId?: string
  patches?: PropPatch[]
}

export interface ReblendPrimitive {
  reblendPrimitiveData: any
  internalIdentifier: string
  setData(data: Primitive): this & BaseComponent
  getData(): Primitive
}

export type WorkerData = {
  oldVnodes: DomNodeChild[]
  newVNodes: VNodeChild[]
  parentId: string
}
