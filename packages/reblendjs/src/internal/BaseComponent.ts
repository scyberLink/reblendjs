import {
  ReblendTyping,
  attributeName,
  shouldUseSetAttribute,
} from 'reblend-typing';
import {
  capitalize,
  cssString,
  isSubclassOf,
  rand,
  registerElement,
  snakeCase,
} from '../common/utils';
import InvalidTagNameException from '../exceptions/InvalidTagNameException';
import NullException from '../exceptions/NullException';
import UnsupportedPrototype from '../exceptions/UnsupportedPrototype';
import IAny from '../interface/IAny';
import IPair from '../interface/IPair';
import IDelegate from './IDelegate';
import Reblend from './Reblend';
import ShadowMode from './ShadowMode';
import {
  Ref,
  StateEffectiveFunction,
  StateEffectiveMemoFunction,
  StateFunction,
  StateFunctionValue,
  StateReducerFunction,
} from './hooks';
import * as lodash from 'lodash';
import StyleUtil from './StyleUtil';

export type ChildWithProps = {
  child: BaseComponent;
  propsKey: string[];
};

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
  props: IAny & { children: VNodeChildren };
  tag: string | typeof Reblend;
}

interface Patch {
  type: 'CREATE' | 'REMOVE' | 'REPLACE' | 'UPDATE' | 'TEXT';
  newNode?: VNodeChild;
  oldNode?: DomNodeChild;
  parent?: BaseComponent;
  patches?: PropPatch[];
}

export const REBLEND_PRIMITIVE_ELEMENT_NAME = 'ReblendPrimitive';

interface BaseComponent {
  tag: string;
}
interface ReblendPrimitive extends BaseComponent {
  node: string;
  setData(data: Primitive): this;
  getData(): Primitive;
}

class BaseComponent extends HTMLElement implements IDelegate {
  static ELEMENT_NAME = 'BaseComponent';
  protected shadow!: ShadowRoot;
  protected shadowWrapper!: HTMLElement;
  private _scale: number = 1;
  private _rotate: number = 0;
  private initialDisplay: string = 'initial';
  private showing: boolean = true;
  xOrigin?: number;
  yOrigin?: number;
  dataIdQuerySelector!: string;
  private _shadowed = '';
  props!: IAny;
  static props: IAny;
  private _dataId!: string;
  private _state!: IAny;
  styleUtil = StyleUtil;

  connectedCallback() {
    /*     this.attached = true;
     */ this.componentDidMount();
    this.mountEffects();
  }

  constructor() {
    super();
    this.setDataID();
  }

  private setDataID() {
    this.dataId = `${rand(1111111, 9999999)}`;
    this.dataIdQuerySelector = `[data-id="${this.dataId}"]`;
  }

  public get rotate(): number {
    return this._rotate;
  }

  public set rotate(value: number) {
    this._rotate = value;
    this.style.rotate = `${value}deg`;
  }

  public get scale(): number {
    return this._scale;
  }

  public set scale(value: number) {
    this._scale = value;
    this.style.transform = `scale(${value})`;
  }

  public get origin(): { x: number; y: number } {
    return {
      x: this.xOrigin || this.clientWidth / 2,
      y: this.yOrigin || this.clientHeight / 2,
    };
  }

  public set origin({ x, y }: { x: number; y: number }) {
    this.xOrigin = x;
    this.yOrigin = y;
    this.style.transformOrigin = `${this.xOrigin}px ${this.yOrigin}px`;
  }

  removeChild<T extends Node>(child: T): T {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.removeChild(child)
      : super.removeChild(child);
  }

  get accessKey(): string {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.accessKey
      : super.accessKey;
  }

  set accessKey(value: string) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.accessKey = value)
      : (super.accessKey = value);
  }

  get childNodes(): NodeListOf<DomNodeChild> {
    return (
      this.wrapper || this.shadowed
        ? this.shadowWrapper.childNodes
        : super.childNodes
    ) as NodeListOf<DomNodeChild>;
  }

  set childNodes(value: NodeListOf<DomNodeChild>) {
    /* this.wrapper || this.shadowed
      ? (this.shadowWrapper.childNodes = value)
      : (super.childNodes = value); */
  }

  get attributes(): NamedNodeMap {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.attributes
      : super.attributes;
  }

  get classList(): DOMTokenList {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.classList
      : super.classList;
  }

  get className(): string {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.className
      : super.className;
  }

  set className(value: string) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.className = value)
      : (super.className = value);
  }

  get contentEditable(): string {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.contentEditable
      : super.contentEditable;
  }

  set contentEditable(value: string) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.contentEditable = value)
      : (super.contentEditable = value);
  }

  get clientWidth(): number {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.clientWidth
      : super.clientWidth;
  }

  set clientWidth(value: number) {
    this.wrapper || this.shadowed
      ? ((this.shadowWrapper as any).clientWidth = value)
      : ((super.clientWidth as any) = value);
  }

  get clientHeight(): number {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.clientHeight
      : super.clientHeight;
  }

  set clientHeight(value: number) {
    this.wrapper || this.shadowed
      ? ((this.shadowWrapper as any).clientHeight = value)
      : ((super.clientHeight as any) = value);
  }

  get innerText(): string {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.innerText
      : super.innerText;
  }

  set innerText(value: string) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.innerText = value)
      : (super.innerText = value);
  }

  get innerHTML(): string {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.innerHTML
      : super.innerHTML;
  }

  set innerHTML(value: string) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.innerHTML = value)
      : (super.innerHTML = value);
  }

  get dataset(): DOMStringMap {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.dataset
      : super.dataset;
  }

  get dir(): string {
    return this.wrapper || this.shadowed ? this.shadowWrapper.dir : super.dir;
  }

  appendChildren(...children: HTMLElement[]) {
    for (const child of children) {
      this.appendChild(child);
    }
  }

  set dir(value: string) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.dir = value)
      : (super.dir = value);
  }

  get draggable(): boolean {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.draggable
      : super.draggable;
  }

  set draggable(value: boolean) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.draggable = value)
      : (super.draggable = value);
  }

  get children() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.children
      : super.children;
  }

  set children(value) {
    /* this.wrapper || this.shadowed
      ? ((<any>this.shadowWrapper.children) = value)
      : ((<any>super.children) = value); */
  }

  get hidden(): boolean {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.hidden
      : super.hidden;
  }

  set hidden(value: boolean) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.hidden = value)
      : (super.hidden = value);
  }

  get dataId(): string {
    return (
      (this.wrapper || this.shadowed
        ? this.shadowWrapper.getAttribute(`data-id`)
        : super.getAttribute(`data-id`)) || this._dataId
    );
  }

  set dataId(value: string) {
    this._dataId = value;
    this.wrapper || this.shadowed
      ? this.shadowWrapper.setAttribute(`data-id`, this._dataId)
      : super.setAttribute(`data-id`, this._dataId);
  }

  get shadowed(): string {
    return this._shadowed;
  }

  set shadowed(value: string) {
    switch (value) {
      case ShadowMode.OPEN:
        this._shadowed = value;
        break;

      case ShadowMode.CLOSE:
        this._shadowed = value;
        break;

      default:
        throw new Error(`Invalid shadowed value`);
    }

    this.shadow = this.attachShadow({ mode: value });
    this.shadowWrapper = document.createElement('div');
    this.setWrappers(this.shadowWrapper);
  }

  setWrappers(wrapper: HTMLElement) {
    this.shadowWrapper = wrapper;
    this.shadow
      ? this.shadow.appendChild(this.shadowWrapper)
      : super.appendChild(this.shadowWrapper);
  }

  set wrapper(element: HTMLElement) {
    this.setWrappers(element);
  }

  get wrapper() {
    return this.shadowWrapper;
  }

  get id(): string {
    return this.wrapper || this.shadowed ? this.shadowWrapper.id : super.id;
  }

  set id(value: string) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.id = value)
      : (super.id = value);
  }

  get textContent(): string {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.textContent!
      : super.textContent!;
  }

  set textContent(value: string) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.textContent = value)
      : (super.textContent = value);
  }

  toggleDisplay() {
    if (this.showing) {
      this.initialDisplay =
        (this.wrapper || this.shadowed
          ? this.shadowWrapper.style.display
          : super.style.display) || this.initialDisplay;
      this.wrapper || this.shadowed
        ? (this.shadowWrapper.style.display = 'none')
        : (super.style.display = 'none');
    } else {
      this.wrapper || this.shadowed
        ? this.shadowWrapper.style.display
        : (super.style.display = this.initialDisplay);
    }
    this.showing = !this.showing;
  }

  get lang(): string {
    return this.wrapper || this.shadowed ? this.shadowWrapper.lang : super.lang;
  }

  set lang(value: string) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.lang = value)
      : (super.lang = value);
  }

  get offsetHeight(): number {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.offsetHeight
      : super.offsetHeight;
  }

  get offsetLeft(): number {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.offsetLeft
      : super.offsetLeft;
  }

  get offsetParent(): Element | null {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.offsetParent
      : super.offsetParent;
  }

  get offsetTop(): number {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.offsetTop
      : super.offsetTop;
  }

  get offsetWidth(): number {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.offsetWidth
      : super.offsetWidth;
  }

  get disabled() {
    return this.getDisable();
  }

  set disabled(value: boolean) {
    this.setDisable(value);
  }

  getDisable() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.hasAttribute('disabled')
      : super.hasAttribute('disabled');
  }

  appendChild<T extends Node>(node: T): T {
    const appended =
      this.wrapper || this.shadowed
        ? this.shadowWrapper.appendChild(node)
        : super.appendChild(node);
    return appended;
  }

  setDisable(value: boolean) {
    if (value) {
      this.wrapper || this.shadowed
        ? this.shadowWrapper.setAttribute('disabled', '')
        : super.setAttribute('disabled', '');
    } else {
      this.wrapper || this.shadowed
        ? this.shadowWrapper.removeAttribute('disabled')
        : super.removeAttribute('disabled');
    }
  }

  get style(): CSSStyleDeclaration {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.style
      : super.style;
  }

  set style(value: string) {
    this.wrapper || this.shadowed
      ? ((<any>this.shadowWrapper.style) = value)
      : ((<any>super.style) = value);
  }

  get tabIndex(): number {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.tabIndex
      : super.tabIndex;
  }

  set tabIndex(value: number) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.tabIndex = value)
      : (super.tabIndex = value);
  }

  get title(): string {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.title
      : super.title;
  }

  set title(value: string) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.title = value)
      : (super.title = value);
  }

  set onselect(value: any) {}

  oncopy = (ev: any) => {
    ev?.preventDefault();
  };

  oncut = (ev: any) => {
    ev?.preventDefault();
  };

  onpaste = (ev: any) => {
    ev?.preventDefault();
  };

  onresize = (ev: any) => {
    ev?.preventDefault();
  };

  onwheel = (ev: any) => {
    ev?.preventDefault();
  };

  ondragover = (event: DragEvent) => {
    event.preventDefault();
  };

  ondrop = (event: DragEvent) => {
    event.preventDefault();
  };
  // ... (other delegated methods)

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.addEventListener
      : super.addEventListener(type, listener, options);
  }

  getBoundingClientRect(): DOMRect {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.getBoundingClientRect()
      : super.getBoundingClientRect();
  }

  append(...nodes: Array<Node | string>): void {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.append(...nodes)
      : super.append(...nodes);
  }

  blur(): void {
    this.wrapper || this.shadowed ? this.shadowWrapper.blur() : super.blur();
  }

  click(): void {
    this.wrapper || this.shadowed ? this.shadowWrapper.click() : super.click();
  }

  oncontextmenu = (e: any) => {
    e?.preventDefault();
  };

  closest(selectors: string): Element | null {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.closest(selectors)
      : super.closest(selectors);
  }

  dispatchEvent(event: Event): boolean {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.dispatchEvent(event)
      : super.dispatchEvent(event);
  }

  focus(options?: FocusOptions): void {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.focus(options)
      : super.focus(options);
  }

  getAttribute(name: string): string | null {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.getAttribute(name)
      : super.getAttribute(name);
  }

  getAttributeNS(
    namespaceURI: string | null,
    localName: string
  ): string | null {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.getAttributeNS(namespaceURI, localName)
      : super.getAttributeNS(namespaceURI, localName);
  }

  getAttributeNode(name: string): Attr | null {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.getAttributeNode(name)
      : super.getAttributeNode(name);
  }

  getAttributeNodeNS(
    namespaceURI: string | null,
    localName: string
  ): Attr | null {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.getAttributeNodeNS(namespaceURI, localName)
      : super.getAttributeNodeNS(namespaceURI, localName);
  }

  hasAttribute(name: string): boolean {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.hasAttribute(name)
      : super.hasAttribute(name);
  }

  hasAttributeNS(namespaceURI: string | null, localName: string): boolean {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.hasAttributeNS(namespaceURI, localName)
      : super.hasAttributeNS(namespaceURI, localName);
  }

  hasAttributes(): boolean {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.hasAttributes()
      : super.hasAttributes();
  }

  insertAdjacentElement(
    position: InsertPosition,
    insertedElement: Element
  ): Element | null {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.insertAdjacentElement(position, insertedElement)
      : super.insertAdjacentElement(position, insertedElement);
  }

  insertAdjacentHTML(position: InsertPosition, text: string): void {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.insertAdjacentHTML
      : super.insertAdjacentHTML(position, text);
  }

  insertAdjacentText(position: InsertPosition, text: string): void {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.insertAdjacentText
      : super.insertAdjacentText(position, text);
  }

  removeAttribute(name: string): void {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.removeAttribute(name)
      : super.removeAttribute(name);
  }

  removeAttributeNS(namespaceURI: string | null, localName: string): void {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.removeAttributeNS
      : super.removeAttributeNS(namespaceURI, localName);
  }

  removeAttributeNode(attr: Attr): Attr {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.removeAttributeNode(attr)
      : super.removeAttributeNode(attr);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.removeEventListener
      : super.removeEventListener(type, listener, options);
  }

  setAttribute(name: string, value: string): void {
    if (typeof value == 'object') {
      value = (value as Object).toString();
    }
    this.wrapper || this.shadowed
      ? this.shadowWrapper.setAttribute(name, value)
      : super.setAttribute(name, value);
  }

  setAttributeNS(
    namespaceURI: string | null,
    qualifiedName: string,
    value: string
  ): void {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.setAttributeNS
      : super.setAttributeNS(namespaceURI, qualifiedName, value);
  }

  setAttributeNode(attr: Attr): Attr | null {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.setAttributeNode(attr)
      : super.setAttributeNode(attr);
  }

  setAttributeNodeNS(attr: Attr): Attr | null {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.setAttributeNodeNS(attr)
      : super.setAttributeNodeNS(attr);
  }

  toggleAttribute(qualifiedName: string, force?: boolean): boolean {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.toggleAttribute(qualifiedName, force)
      : super.toggleAttribute(qualifiedName, force);
  }

  public getShadowWrapper(): HTMLElement {
    return this.shadowWrapper;
  }

  /* addStylesheets(...paths: string[]) {
    this.addStyle(...paths)
    throw new Error("Not implemented")
  } */

  addStyle(styles: string[]): void;
  addStyle(style: IAny): void;
  addStyle(style: string): void;
  addStyle(style: string[] | IAny | string): void {
    if (typeof style === 'string') {
      this.styleUtil.update(this.dataIdQuerySelector, style);
    } else if (!Array.isArray(style)) {
      this.styleUtil.update(this.dataIdQuerySelector, style as any);
    } else if (Array.isArray(style)) {
      let styleString = '';
      for (const styleI of style as []) {
        styleString = styleString?.concat('\n\n', styleI);
      }
      this.styleUtil.update(this.dataIdQuerySelector, styleString);
    }
  }

  addPseudoClass(clazz: string, style: IAny) {
    if (!clazz) {
      throw new NullException('Pseudo Class name not provided');
    }

    if (!style) {
      throw new NullException('Pseudo Class style not provided');
    }

    if (!clazz.includes(':')) {
      clazz = `:${clazz}`;
    }
    clazz = `${this.dataIdQuerySelector}${clazz}`;
    this.addStyle(`${clazz}{${cssString(style)}}`);
  }

  hovered(style: IAny) {
    this.addPseudoClass('hover', style);
  }

  setCursor(cursor: 'pointer' | 'grab' | 'grabbing' | 'default') {
    this.style.cursor = `${cursor}`;
  }

  addInlineStyle({ name, value }: IPair) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.style[name as any] = value)
      : (super.style[name as any] = value);
  }

  addClassNames(...classNames: string[]) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.classList.add(...classNames)
      : super.classList.add(...classNames);
  }

  removeClassNames(...classNames: string[]) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.classList.remove
      : super.classList.remove(...classNames);
  }

  replaceClassName(oldClassName: string, newClassName: string) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.classList.replace(oldClassName, newClassName)
      : super.classList.replace(oldClassName, newClassName);
  }

  static hasName(element: typeof BaseComponent) {
    return element.ELEMENT_NAME && element.ELEMENT_NAME !== 'BaseComponent';
  }

  static register<T extends typeof BaseComponent>(element: T) {
    if (!BaseComponent.hasName(element)) {
      throw new InvalidTagNameException(
        `Please declare a static field ELEMENT_NAME in "${
          element.name || 'your derived'
        }" class of BaseComponent`
      );
    }
    // @ts-ignore
    element.prototype.tag = element.ELEMENT_NAME;
    const tagName = `${snakeCase(element.ELEMENT_NAME)}-${rand(
      111111,
      999999
    )}-reblend`;
    try {
      const registered = customElements.get(tagName);
      if (!registered) {
        customElements.define(tagName, element);
      }
    } catch (error: any) {
      //better left empty
      //console.warn(error.message);
    }
    return element;
  }

  setScale(scale: number) {
    this.scale = scale;
  }

  init() {}
  componentDidMount() {}

  private setProps(props: IAny, init: boolean) {
    BaseComponent.setProps(props, this, init);
  }

  static fn(eventCallback: (e: Event) => any = () => {}) {
    return e => eventCallback(e);
  }

  static setProps(props: IAny, to: BaseComponent, init: boolean) {
    if (props && to) {
      to.props = { ...to.props, ...props };

      if ('shadowed' in props) {
        (to as BaseComponent).shadowed = props[`shadowed`];
      }

      for (let propName in props) {
        const _attributeName = attributeName(propName);
        const propValue = props[propName];
        if (propName.startsWith('on')) {
          to[_attributeName] = this.fn(propValue);
        } else {
          if (_attributeName == 'style') {
            to.addStyle(propValue);
          } else {
            const _shouldUseSetAttribute = shouldUseSetAttribute(propName);
            _shouldUseSetAttribute
              ? to.setAttribute(_attributeName, propValue)
              : (to[_attributeName] = propValue);
          }
        }
      }
      init && to.init();
    }
  }

  static removeProps(props: IAny, to: BaseComponent) {
    if (props && to) {
      to.props = { ...to.props, ...props };

      for (let propName in props) {
        const _attributeName = attributeName(propName);
        //const propValue = props[propName];
        const _shouldUseSetAttribute = shouldUseSetAttribute(propName);

        _shouldUseSetAttribute
          ? to.removeAttribute(_attributeName)
          : delete to[_attributeName];
      }
    }
  }

  get state(): IAny {
    return this._state || {};
  }

  set state(value: StateFunctionValue<IAny>) {
    this._state = {
      ...this._state,
      ...(typeof value == 'function' ? value(this._state) : value),
    };
    this.onStateChange();
  }

  setState(value: StateFunctionValue<IAny>) {
    this.state = value;
  }

  isTextNode(node: Node): node is Text {
    return node?.nodeType === Node.TEXT_NODE;
  }

  diffCreateOrRemove(
    parent: BaseComponent,
    oldNode: DomNodeChild,
    newNode: VNodeChild
  ) {
    const patches: Patch[] = [];
    if (!oldNode) {
      patches.push({ type: 'CREATE', parent, newNode });
    } else if (!newNode) {
      patches.push({ type: 'REMOVE', parent, oldNode });
    }

    return patches;
  }

  isReblendPrimitiveElement(element: any) {
    return (
      !BaseComponent.isPrimitive(element) &&
      element.tag === REBLEND_PRIMITIVE_ELEMENT_NAME
    );
  }

  diff(
    parent: BaseComponent,
    oldNode: DomNodeChild,
    newNode: VNodeChild
  ): Patch[] {
    const patches: Patch[] = [];

    if (
      this.isReblendPrimitiveElement(oldNode) &&
      BaseComponent.isPrimitive(newNode)
    ) {
      if ((<ReblendPrimitive>oldNode).getData() !== newNode) {
        (<ReblendPrimitive>oldNode).setData(newNode as Primitive);
      }
    } else if (
      this.isReblendPrimitiveElement(oldNode) &&
      !BaseComponent.isPrimitive(newNode)
    ) {
      patches.push({ type: 'REPLACE', parent, newNode, oldNode });
    } else if (this.isTextNode(oldNode) && BaseComponent.isPrimitive(newNode)) {
      if (oldNode.textContent !== newNode) {
        patches.push({ type: 'TEXT', newNode, oldNode });
      }
    } else if (
      this.isTextNode(oldNode) &&
      !BaseComponent.isPrimitive(newNode)
    ) {
      patches.push({ type: 'REPLACE', parent, newNode, oldNode });
    } else if (
      ((oldNode as BaseComponent).tag as string).toLowerCase() !==
      (
        (BaseComponent.isPrimitive((newNode as VNode).tag)
          ? (newNode as VNode).tag
          : ((newNode as VNode).tag as typeof Reblend).ELEMENT_NAME) as string
      ).toLowerCase()
    ) {
      patches.push({ type: 'REPLACE', parent, newNode, oldNode });
    } else {
      const propsDiff = this.diffProps(
        newNode as VNode,
        oldNode as BaseComponent
      );
      if (propsDiff && propsDiff.length > 0) {
        patches.push({
          type: 'UPDATE',
          patches: propsDiff,
        });
      }
      patches.push(
        ...this.diffChildren(
          oldNode as BaseComponent,
          (oldNode as BaseComponent).props.children,
          (newNode as VNode).props.children
        )
      );
    }

    return patches;
  }

  diffProps(newNode: VNode, oldNode: BaseComponent) {
    const patches: PropPatch[] = [];
    const oldProps: IAny = oldNode?.props;
    const newProps: IAny = newNode?.props;
    for (const key in newProps) {
      if (key !== 'children') {
        let oldProp =
          typeof oldProps[key] === 'function'
            ? oldProps[key].toString()
            : oldProps[key];
        let newProp =
          typeof newProps[key] === 'function'
            ? newProps[key].toString()
            : newProps[key];
        if (!lodash.isEqual(oldProp, newProp)) {
          oldProp = null;
          newProp = null;
          patches.push({
            type: 'UPDATE',
            node: oldNode,
            key,
            propValue: newProps[key],
          });
        }
      }
    }

    for (const key in oldProps) {
      if (key !== 'children' && !(key in newProps)) {
        patches.push({
          type: 'REMOVE',
          node: oldNode,
          key,
          propValue: undefined,
        });
      }
    }

    return patches;
  }

  diffChildren(
    parent: BaseComponent,
    oldChildren: DomNodeChildren,
    newChildren: VNodeChildren
  ) {
    oldChildren || (oldChildren = []);
    newChildren || (newChildren = []);
    const patches: Patch[] = [];
    const maxLength = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];
      if (oldChild === undefined || newChild === undefined) {
        patches.push(...this.diffCreateOrRemove(parent, oldChild, newChild));
      } else {
        patches.push(...this.diff(parent, oldChild, newChild));
      }
    }

    return patches;
  }

  protected static createElement(vNode: VNode): BaseComponent {
    const { tag } = vNode;
    const { children } = vNode.props;
    let clazz: typeof Reblend = tag as any as typeof Reblend;
    const isTagStandard = typeof tag === 'string';
    const props = {
      ...vNode.props,
      children: BaseComponent.createChildren(children),
      ...(isTagStandard && clazz.props ? clazz.props : {}),
    };
    if (
      !isTagStandard &&
      isSubclassOf(clazz, Reblend) &&
      !BaseComponent.hasName(clazz)
    ) {
      clazz.ELEMENT_NAME = `Anonymous`;
    }
    if (isTagStandard) {
      clazz = class extends Reblend {
        static ELEMENT_NAME: string = capitalize(`${tag}`);

        constructor() {
          super();
          const ele = document.createElement(tag as string);
          this.wrapper = ele;
        }
      };
    }

    if (!isSubclassOf(clazz, Reblend)) {
      throw new UnsupportedPrototype(
        `${isTagStandard ? tag : (tag as any).name}`
      );
    }

    BaseComponent.register(clazz);
    const element: Reblend = new (clazz as any)();
    if ('ref' in props) {
      if (!props.ref) {
        throw new Error('Invalid ref object');
      }
      const ref = props.ref;
      delete props.ref;
      const descriptor = Object.getOwnPropertyDescriptor(ref, 'current');

      if (!descriptor || descriptor.configurable) {
        Object.defineProperty(ref, 'current', {
          value: element,
          configurable: false,
          writable: false,
        });
      }
    }
    BaseComponent.setProps(props, element, true);
    element.attach();
    return element;
  }

  applyPatches(patches: Patch[]) {
    patches?.forEach(({ type, newNode, oldNode, parent, patches }) => {
      switch (type) {
        case 'CREATE':
          parent?.appendChild(BaseComponent.createElement(newNode as VNode));
          break;
        case 'REMOVE':
          oldNode && parent?.removeChild(oldNode);
          break;
        case 'REPLACE':
          if (oldNode) {
            const newNodeElement = BaseComponent.createElement(
              newNode as VNode
            );
            oldNode?.parentNode?.replaceChild(newNodeElement, oldNode);
          }
          break;
        case 'TEXT':
          oldNode && (oldNode.textContent = newNode as string);
          break;
        case 'UPDATE':
          this.applyProps(patches);
          break;
      }
    });
  }

  applyProps(patches?: PropPatch[]) {
    //This helps reduce onStateChange call for updates of the same node
    const nodes = new Set<BaseComponent>();
    patches?.forEach(({ type, node, key, propValue }) => {
      if (type === 'UPDATE') {
        BaseComponent.setProps({ [key]: propValue }, node, false);
        nodes.add(node);
      } else if (type === 'REMOVE') {
        BaseComponent.removeProps({ [key]: undefined }, node);
        nodes.add(node);
      }
    });
    nodes.forEach(node => node.onStateChange());
  }

  static isArray(obj: any) {
    const arrayProperties = [
      'pop',
      'push',
      'length',
      'shift',
      'unshift',
      'splice',
      'slice',
      'find',
      'includes',
    ];
    return (
      typeof obj === 'object' &&
      arrayProperties.every(property => property in obj)
    );
  }

  protected attach() {
    let vNodes = this.html();
    if (!vNodes) return;
    this.innerHTML = '';
    const isVNodesArray = Array.isArray(vNodes);
    if (isVNodesArray && (vNodes as []).length < 1) {
      return;
    }
    if (isVNodesArray) {
      vNodes = BaseComponent.flattenVNodeChildren(vNodes as VNodeChildren);
    }
    if (isVNodesArray) {
      if (vNodes[0] && vNodes[0].parentNode) {
        vNodes = null as any;
        return;
      }
      vNodes = BaseComponent.createChildren(vNodes as VNodeChildren) as any;
      this.appendChildren(...(vNodes as any));
    } else {
      if ((vNodes as any).parentNode) {
        vNodes = null as any;
        return;
      }
      vNodes = BaseComponent.createElement(vNodes as VNode) as any;
      this.appendChildren(vNodes as any);
    }
  }

  private applyEffects() {
    this.effectsFn.forEach(effectFn => effectFn());
  }

  static flattenVNodeChildren<T>(
    arr: (T | T[])[],
    containerArr: T[] = []
  ): T[] {
    if (!arr || arr.length < 1) {
      return [];
    }

    for (const item of arr) {
      if (Array.isArray(item)) {
        BaseComponent.flattenVNodeChildren(item as T[], containerArr);
      } else {
        containerArr.push(item as T);
      }
    }

    return containerArr;
  }

  protected async onStateChange() {
    this.applyEffects();
    let vNodes = this.html();
    let patches: Patch[] = [];
    if (vNodes) {
      const isVNodesArray = Array.isArray(vNodes);
      if (isVNodesArray) {
        vNodes = BaseComponent.flattenVNodeChildren(vNodes as VNodeChildren);
      }
      if (isVNodesArray) {
        if (vNodes[0] && vNodes[0].parentNode) {
          vNodes = null as any;
          return;
        }
      } else {
        if ((vNodes as any).parentNode) {
          vNodes = null as any;
          return;
        }
      }
      const maxLength = Math.max(
        this.childNodes.length,
        isVNodesArray ? (vNodes as VNodeChildren).length : 0
      );
      for (let i = 0; i < maxLength; i++) {
        const newVNode: VNodeChild = isVNodesArray ? vNodes[i] : vNodes;
        const currentVNode = this.childNodes[i];
        patches.push(...this.diff(this, currentVNode, newVNode));
      }
      vNodes = null as any;
      this.applyPatches(patches);
    }
  }

  protected html(): VNode | VNodeChildren {
    return null as any;
  }

  static construct(
    tag: typeof Reblend | string | VNode[],
    props: IAny,
    ...children: VNodeChildren
  ): VNode | VNodeChildren {
    if (Array.isArray(tag)) {
      return tag as [];
    }
    let clazz: typeof Reblend = tag as typeof Reblend;
    const isTagStandard = typeof tag === 'string';
    if (!isTagStandard && clazz.ELEMENT_NAME === 'Fragment') {
      return children;
    }
    const velement = {
      tag: clazz,
      props: {
        ...(props || {}),
        children,
        ...(!isTagStandard && clazz.props ? clazz.props : {}),
      },
    };
    return velement;
  }

  static isPrimitive(data: any) {
    const primitves = [
      'string',
      'number',
      'boolean',
      'bigint',
      'null',
      'undefined',
      'symbol',
    ];
    const dataType = typeof data;
    return primitves.some(primitve => primitve === dataType);
  }

  private static ReblendPrimitive = BaseComponent.register(
    class ReblendPrimitive extends BaseComponent {
      static ELEMENT_NAME = REBLEND_PRIMITIVE_ELEMENT_NAME;
      private reblendPrimitiveData: Primitive;
      private node: Text | null = null;

      constructor() {
        super();
      }

      protected html() {
        return this.node as any;
      }

      setData(data: Primitive) {
        this.reblendPrimitiveData = data;
        if (
          this.reblendPrimitiveData !== undefined &&
          this.reblendPrimitiveData !== null
        ) {
          const textContent = `${this.reblendPrimitiveData}`;

          if (textContent) {
            if (this.node) {
              this.node.textContent = textContent;
            } else {
              this.node = document.createTextNode(textContent);
              this.appendChild(this.node);
            }
          }
        }
        return this;
      }

      getData() {
        return this.reblendPrimitiveData;
      }

      protected cleanUp(): void {
        if (this.node) {
          this.removeChild(this.node);
          this.node = null;
        }
      }
    }
  );

  protected static createChildren(
    children: VNodeChildren,
    containerArr: (BaseComponent | HTMLElement)[] = []
  ) {
    for (const child of children) {
      if (Array.isArray(child)) {
        BaseComponent.createChildren(child as any, containerArr);
      } else if (BaseComponent.isPrimitive(child)) {
        containerArr.push(
          new BaseComponent.ReblendPrimitive().setData(child as Primitive)
        );
      } else if (child instanceof Reblend || child instanceof Node) {
        containerArr.push(child as any);
      } else if ('tag' in <any>child && 'props' in <any>child) {
        const domChild = BaseComponent.createElement(child as any);
        containerArr.push(domChild);
      } else {
        throw new TypeError('Invalid child node  in children');
      }
    }
    return containerArr;
  }

  private onMountEffects: StateEffectiveFunction[] = [];

  private mountEffects() {
    this.onMountEffects.forEach(fn => {
      const disconnectEffect = fn();
      disconnectEffect && this.disconnectEffects.push(disconnectEffect);
    });
  }

  disconnectedCallback() {
    this.cleanUp();
    this.componentWillUnmount();
    this.disconnectEffects.forEach(fn => fn());
    {
      this.shadow = null as any;
      this.shadowWrapper = null as any;
      this.props = null as any;
      this._state = null as any;
      this.parentElement?.removeChild(this);
    }
  }

  protected cleanUp() {}
  protected componentWillUnmount() {}

  private effectsFn: StateEffectiveFunction[] = [];
  private disconnectEffects: StateEffectiveFunction[] = [];

  static mountOn(
    elementId: string,
    app: typeof Reblend | ReblendTyping.FunctionComponent,
    props?: IAny
  ) {
    const root = document.getElementById(elementId);
    if (!root) {
      throw new Error('Invalid root id');
    }
    const vNodes = BaseComponent.construct(app as any, props || {}, ...[]);
    const nodes = BaseComponent.createChildren(
      Array.isArray(vNodes) ? (vNodes as any) : [vNodes]
    );
    for (const node of nodes) {
      root.append(node);
    }
  }

  useState<T>(initial: StateFunctionValue<T>): [T, StateFunction<T>] {
    const stateID: string = arguments[arguments.length - 1];
    if (typeof initial === 'function') initial = (initial as Function)();
    this[stateID] = initial;
    const variableSetter: StateFunction<T> = (value: StateFunctionValue<T>) => {
      if (typeof value === 'function') {
        value = (value as Function)(this[stateID]);
      }
      if (!lodash.isEqual(this[stateID], value)) {
        this[stateID] = value as T;
        this.onStateChange();
      }
    };

    return [initial as T, variableSetter];
  }

  useEffect(fn: StateEffectiveFunction, dependencies: any[]) {
    fn = fn.bind(this);
    const dep = new Function(`return (${dependencies})`).bind(this);
    const cacher = () => lodash.cloneDeep(dep());
    let caches = cacher();
    const internalFn = () => {
      if (!dependencies || !lodash.isEqual(dep(), caches)) {
        caches = cacher();
        fn();
      }
    };
    this.effectsFn.push(internalFn);
    this.onMountEffects.push(fn);
  }

  useReducer<T>(
    reducer: StateReducerFunction<T>,
    initial: StateFunctionValue<T>
  ): [T, StateFunction<T>] {
    reducer = reducer.bind(this);
    const stateID: string = arguments[arguments.length - 1];
    //@ts-ignore
    let [state, setState] = this.useState<T>(initial, stateID);
    this[stateID] = state;
    const fn: StateFunction<T> = (newValue: StateFunctionValue<T>) => {
      let reducedVal: StateFunctionValue<T>;
      if (typeof newValue === 'function') {
        reducedVal = reducer(
          this[stateID],
          (newValue as Function)(this[stateID])
        );
      } else {
        reducedVal = reducer(this[stateID], newValue as T);
      }
      setState(reducedVal);
    };

    return [this[stateID], fn];
  }

  useMemo<T>(fn: StateEffectiveMemoFunction<T>, dependencies?: any[]) {
    fn = fn.bind(this);
    const stateID: string = arguments[arguments.length - 1];
    //@ts-ignore
    let [state, setState] = this.useState<T>(fn(), stateID);
    this[stateID] = state;
    const dep = new Function(`return (${dependencies})`).bind(this);
    const cacher = () => lodash.cloneDeep(dep());
    let caches = cacher();
    const internalFn = () => {
      const depData = dep();
      if (!dependencies || !lodash.isEqual(depData, caches)) {
        caches = cacher();
        setState(fn());
      }
    };
    this?.effectsFn.push(internalFn);
    return this[stateID];
  }

  useRef<T>(initial?: T) {
    const ref: Ref<T> = { current: initial };
    return ref;
  }

  useCallback(fn: Function) {
    return fn.bind(this);
  }
}

registerElement(`BaseComponent`, BaseComponent);

export default BaseComponent;
