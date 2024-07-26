import { ReblendTyping } from 'reblend-typing';
import IAny from '../interface/IAny';
import IPair from '../interface/IPair';
import IDelegate from './IDelegate';
import Reblend from './Reblend';
import {
  Ref,
  StateEffectiveFunction,
  StateEffectiveMemoFunction,
  StateFunction,
  StateFunctionValue,
  StateReducerFunction,
} from './hooks';
export type ChildWithProps = {
  child: BaseComponent;
  propsKey: string[];
};
export declare const ERROR_EVENTNAME = 'reblend-render-error';
interface PropPatch {
  type: 'REMOVE' | 'UPDATE';
  node: BaseComponent;
  key: string;
  propValue?: string;
}
export type Primitive = boolean | null | number | string | undefined;
type VNodeChild = Primitive | VNode;
type VNodeChildren = VNodeChild[];
type DomNodeChild = Text | BaseComponent | ReblendPrimitive;
type DomNodeChildren = DomNodeChild[];
interface VNode {
  props: IAny & {
    children: VNodeChildren;
  };
  tag: string | typeof Reblend;
}
interface Patch {
  type: 'CREATE' | 'REMOVE' | 'REPLACE' | 'UPDATE' | 'TEXT';
  newNode?: VNodeChild;
  oldNode?: DomNodeChild;
  parent?: BaseComponent;
  patches?: PropPatch[];
}
export declare const REBLEND_PRIMITIVE_ELEMENT_NAME = 'ReblendPrimitive';
interface BaseComponent {
  tag: string;
  [stateKey: string]: any;
}
interface ReblendPrimitive extends BaseComponent {
  node: string;
  setData(data: Primitive): this;
  getData(): Primitive;
}
declare class BaseComponent extends HTMLElement implements IDelegate {
  static ELEMENT_NAME: string;
  protected shadow: ShadowRoot;
  protected shadowWrapper: HTMLElement;
  private _scale;
  private _rotate;
  private initialDisplay;
  private showing;
  xOrigin?: number;
  yOrigin?: number;
  dataIdQuerySelector: string;
  private _shadowed;
  props: IAny;
  static props: IAny;
  private _dataId;
  private _state;
  styleUtil: {
    elementStyles: {
      [elementQuerySelector: string]: CSSStyleDeclaration;
    };
    styleElement: HTMLStyleElement;
    init(): void;
    update(
      elementQuerySelector: string,
      style: CSSStyleDeclaration | string
    ): void;
    remove(elementQuerySelector: string, styleKey: string): void;
    refresh(): void;
  };
  connectedCallback(): void;
  constructor();
  private setDataID;
  get rotate(): number;
  set rotate(value: number);
  get scale(): number;
  set scale(value: number);
  get origin(): {
    x: number;
    y: number;
  };
  set origin({ x, y }: { x: number; y: number });
  removeChild<T extends Node>(child: T): T;
  get accessKey(): string;
  set accessKey(value: string);
  get childNodes(): NodeListOf<DomNodeChild>;
  set childNodes(value: NodeListOf<DomNodeChild>);
  get attributes(): NamedNodeMap;
  get classList(): DOMTokenList;
  get className(): string;
  set className(value: string);
  get contentEditable(): string;
  set contentEditable(value: string);
  get clientWidth(): number;
  set clientWidth(value: number);
  get clientHeight(): number;
  set clientHeight(value: number);
  get innerText(): string;
  set innerText(value: string);
  get innerHTML(): string;
  set innerHTML(value: string);
  get dataset(): DOMStringMap;
  get dir(): string;
  appendChildren(...children: HTMLElement[]): void;
  set dir(value: string);
  get draggable(): boolean;
  set draggable(value: boolean);
  get children(): HTMLCollection;
  set children(value: HTMLCollection);
  get hidden(): boolean;
  set hidden(value: boolean);
  get dataId(): string;
  set dataId(value: string);
  get shadowed(): string;
  set shadowed(value: string);
  setWrappers(wrapper: HTMLElement): void;
  set wrapper(element: HTMLElement);
  get wrapper(): HTMLElement;
  get id(): string;
  set id(value: string);
  get textContent(): string;
  set textContent(value: string);
  toggleDisplay(): void;
  get lang(): string;
  set lang(value: string);
  get offsetHeight(): number;
  get offsetLeft(): number;
  get offsetParent(): Element | null;
  get offsetTop(): number;
  get offsetWidth(): number;
  get disabled(): boolean;
  set disabled(value: boolean);
  getDisable(): boolean;
  appendChild<T extends Node>(node: T): T;
  setDisable(value: boolean): void;
  get style(): CSSStyleDeclaration;
  set style(value: string);
  get tabIndex(): number;
  set tabIndex(value: number);
  get title(): string;
  set title(value: string);
  set onselect(value: any);
  oncopy: (ev: any) => void;
  oncut: (ev: any) => void;
  onpaste: (ev: any) => void;
  onresize: (ev: any) => void;
  onwheel: (ev: any) => void;
  ondragover: (event: DragEvent) => void;
  ondrop: (event: DragEvent) => void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  getBoundingClientRect(): DOMRect;
  append(...nodes: Array<Node | string>): void;
  blur(): void;
  click(): void;
  oncontextmenu: (e: any) => void;
  closest(selectors: string): Element | null;
  dispatchEvent(event: Event): boolean;
  focus(options?: FocusOptions): void;
  getAttribute(name: string): string | null;
  getAttributeNS(namespaceURI: string | null, localName: string): string | null;
  getAttributeNode(name: string): Attr | null;
  getAttributeNodeNS(
    namespaceURI: string | null,
    localName: string
  ): Attr | null;
  hasAttribute(name: string): boolean;
  hasAttributeNS(namespaceURI: string | null, localName: string): boolean;
  hasAttributes(): boolean;
  insertAdjacentElement(
    position: InsertPosition,
    insertedElement: Element
  ): Element | null;
  insertAdjacentHTML(position: InsertPosition, text: string): void;
  insertAdjacentText(position: InsertPosition, text: string): void;
  removeAttribute(name: string): void;
  removeAttributeNS(namespaceURI: string | null, localName: string): void;
  removeAttributeNode(attr: Attr): Attr;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
  setAttribute(name: string, value: string): void;
  setAttributeNS(
    namespaceURI: string | null,
    qualifiedName: string,
    value: string
  ): void;
  setAttributeNode(attr: Attr): Attr | null;
  setAttributeNodeNS(attr: Attr): Attr | null;
  toggleAttribute(qualifiedName: string, force?: boolean): boolean;
  getShadowWrapper(): HTMLElement;
  addStyle(styles: string[]): void;
  addStyle(style: IAny): void;
  addStyle(style: string): void;
  addPseudoClass(clazz: string, style: IAny): void;
  hovered(style: IAny): void;
  setCursor(cursor: 'pointer' | 'grab' | 'grabbing' | 'default'): void;
  addInlineStyle({ name, value }: IPair): void;
  addClassNames(...classNames: string[]): void;
  removeClassNames(...classNames: string[]): void;
  replaceClassName(oldClassName: string, newClassName: string): boolean;
  static hasName(element: typeof BaseComponent): boolean | '';
  static register<T extends typeof BaseComponent>(element: T): T;
  setScale(scale: number): void;
  init(): void;
  componentDidMount(): void;
  private setProps;
  static fn(eventCallback?: (e: Event) => any): (e: any) => any;
  static setProps(props: IAny, to: BaseComponent, init: boolean): void;
  static removeProps(props: IAny, to: BaseComponent): void;
  get state(): IAny;
  set state(value: StateFunctionValue<IAny>);
  setState(value: StateFunctionValue<IAny>): void;
  isTextNode(node: Node): node is Text;
  diffCreateOrRemove(
    parent: BaseComponent,
    oldNode: DomNodeChild,
    newNode: VNodeChild
  ): Patch[];
  isReblendPrimitiveElement(element: any): boolean;
  diff(
    parent: BaseComponent,
    oldNode: DomNodeChild,
    newNode: VNodeChild
  ): Patch[];
  diffProps(newNode: VNode, oldNode: BaseComponent): PropPatch[];
  diffChildren(
    parent: BaseComponent,
    oldChildren: DomNodeChildren,
    newChildren: VNodeChildren
  ): Patch[];
  protected static createElement(vNode: VNode): BaseComponent;
  applyPatches(patches: Patch[]): void;
  applyProps(patches?: PropPatch[]): void;
  static isArray(obj: any): boolean;
  protected attach(): void;
  private applyEffects;
  static flattenVNodeChildren<T>(arr: (T | T[])[], containerArr?: T[]): T[];
  private catch;
  protected onStateChange(): Promise<void>;
  protected html(): VNode | VNodeChildren;
  static construct(
    tag: typeof Reblend | string | VNode[],
    props: IAny,
    ...children: VNodeChildren
  ): VNode | VNodeChildren;
  static isPrimitive(data: any): boolean;
  private static ReblendPrimitive;
  protected static createChildren(
    children: VNodeChildren,
    containerArr?: (BaseComponent | HTMLElement)[]
  ): (HTMLElement | BaseComponent)[];
  private onMountEffects;
  private mountEffects;
  disconnectedCallback(): void;
  protected cleanUp(): void;
  protected componentWillUnmount(): void;
  private effectsFn;
  private disconnectEffects;
  static mountOn(
    elementId: string,
    app: typeof Reblend | ReblendTyping.FunctionComponent,
    props?: IAny
  ): void;
  stateIdNotIncluded: Error;
  useState<T>(
    initial: StateFunctionValue<T>,
    ...dependencyStringAndOrStateKey: string[]
  ): [T, StateFunction<T>];
  useEffect(
    fn: StateEffectiveFunction,
    dependencies: any[],
    ...dependencyStringAndOrStateKey: string[]
  ): void;
  useReducer<T>(
    reducer: StateReducerFunction<T>,
    initial: StateFunctionValue<T>,
    ...dependencyStringAndOrStateKey: string[]
  ): [T, StateFunction<T>];
  useMemo<T>(
    fn: StateEffectiveMemoFunction<T>,
    dependencies?: any[],
    ...dependencyStringAndOrStateKey: string[]
  ): any;
  /**
   * Keeps variable out of state management
   *
   * Changes to current does not cause effect
   * @param initial Initial value of current
   * @returns Ref<T>
   */
  useRef<T>(initial?: T): Ref<T>;
  useCallback(fn: Function): any;
}
export default BaseComponent;
