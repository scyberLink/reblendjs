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
import { StateEffectiveFunction } from './hooks';
import * as lodash from 'lodash';

export type StateFunction<T> = T | ((previous: T) => T);

export type SingleState<T> = {
  value: T;
  get(): T;
  set(val: StateFunction<T>): void;
};

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

interface VNode {
  props: IAny;
  tag: string;
}

interface Patch {
  type: 'CREATE' | 'REMOVE' | 'REPLACE' | 'UPDATE' | 'TEXT';
  newNode?: VNode | string;
  oldNode?: BaseComponent;
  container?: BaseComponent;
  patches?: PropPatch[];
}

class BaseComponent extends HTMLElement implements IDelegate {
  static ELEMENT_NAME = 'BaseComponent';
  protected shadow!: ShadowRoot;
  protected shadowWrapper!: HTMLElement;
  protected shadowStyle!: HTMLStyleElement;
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
  protected container!: BaseComponent;
  stateKeys: string[] = [];
  protected attached!: boolean;

  connectedCallback() {
    this.attached = true;
  }

  constructor() {
    super();
    this.setDataID();
  }

  private setDataID() {
    this.dataId = `${rand(1111111, 9999999)}`;
    this.dataIdQuerySelector = `[data-id="${this.dataId}"]`;
    this.shadowStyle = document.createElement('style');
    this.shadowStyle.textContent = `
    ${this.dataIdQuerySelector} {

      }
    `;
    this.shadow
      ? this.shadow.appendChild(this.shadowStyle)
      : super.appendChild(this.shadowStyle);
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
    appended &&
      'componentDidMount' in appended &&
      (appended as any).componentDidMount();
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

  addStyle(styles: string[]): HTMLStyleElement;
  addStyle(style: IAny): HTMLStyleElement;
  addStyle(style: string): HTMLStyleElement;
  addStyle(style: string[] | IAny | string): HTMLStyleElement {
    let styleString: string = '';
    let previousStyle = this.shadowStyle.textContent ?? '';
    if (typeof style === 'string') {
      styleString = style;
      this.shadowStyle.textContent = previousStyle + styleString;
    } else if (!Array.isArray(style)) {
      styleString = `${cssString(style)}`;
      const startOfThisIdStyle = `${this.dataIdQuerySelector} {`;
      previousStyle = previousStyle.replace(
        startOfThisIdStyle,
        `${startOfThisIdStyle}${styleString}`
      );
      this.shadowStyle.textContent = previousStyle;
    } else if (Array.isArray(style)) {
      for (const styleI of style) {
        styleString = styleString?.concat('\n\n', styleI);
      }
      this.shadowStyle.textContent = previousStyle + styleString;
    }

    return this.shadowStyle;
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

  static register(element: typeof BaseComponent) {
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
        if (propName.startsWith('on')) {
          to[propName] = this.fn(props[propName]);
        } else {
          to[propName] = props[propName];
        }
      }
      init && to.init();
    }
  }

  static removeProps(props: IAny, to: BaseComponent) {
    if (props && to) {
      to.props = { ...to.props, ...props };

      for (let propName in props) {
        to[propName] = props[propName];
      }
    }
  }

  get state(): IAny {
    return this._state || {};
  }

  set state(value: StateFunction<IAny>) {
    this._state = {
      ...this._state,
      ...(typeof value == 'function' ? value(this._state) : value),
    };
    this.onStateChange();
  }

  setState(value: StateFunction<IAny>) {
    this.state = value;
  }

  isTextNode(node: Node): node is Text {
    return node.nodeType === Node.TEXT_NODE;
  }

  diff(
    container: BaseComponent,
    oldNode: BaseComponent,
    newNode: VNode | string
  ): Patch[] {
    if (!oldNode && !newNode) {
      return [];
    }

    const patches: Patch[] = [];

    if (!oldNode) {
      patches.push({ type: 'CREATE', container, newNode });
    } else if (!newNode) {
      patches.push({ type: 'REMOVE', container, oldNode });
    } else if (this.isTextNode(oldNode) || typeof newNode == 'string') {
      if (oldNode.textContent !== newNode) {
        patches.push({ type: 'TEXT', newNode, oldNode });
      }
      //@ts-ignore
    } else if (oldNode.tag !== newNode.tag) {
      patches.push({ type: 'REPLACE', container, newNode, oldNode });
    } else {
      const propsDiff = this.diffProps(oldNode?.props, newNode?.props);
      if (propsDiff) {
        patches.push({ type: 'REPLACE', container, newNode, oldNode });
      }
      patches.push(
        ...this.diffChildren(
          oldNode,
          oldNode.props.children,
          newNode.props.children
        )
      );
    }

    return patches;
  }

  diffProps(oldProps: IAny, newProps: IAny) {
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
          return true;
        }
      }
    }

    for (const key in oldProps) {
      if (key !== 'children' && !(key in newProps)) {
        return true;
      }
    }

    return false;
  }

  diffChildren(
    oldNode: BaseComponent,
    oldChildren: BaseComponent[],
    newChildren: VNode[]
  ) {
    oldChildren || (oldChildren = []);
    newChildren || (newChildren = []);
    const patches: Patch[] = [];
    const maxLength = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];
      patches.push(...this.diff(oldNode, oldChild, newChild));
    }

    return patches;
  }

  protected createElement(container: BaseComponent, { tag, props }: VNode) {
    const { children } = props;
    let clazz: typeof Reblend = tag as any as typeof Reblend;
    const isTagStandard = typeof tag === 'string';
    props || (props = {});
    isTagStandard || Object.assign(props, clazz.props);
    Object.assign(props, {
      children: BaseComponent.createChildren(children),
    });
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
          const srcTags = ['svg', 'img'];
          for (const t of srcTags) {
            if ((tag as string).toLowerCase() === t) {
              if ('src' in props) {
                ele.setAttribute('src', props.src);
              }
              break;
            }
          }
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

    BaseComponent.setProps(props, element, true);
    element.container = container;
    element.attach();
    return element;
  }

  applyPatches(patches: Patch[]) {
    patches?.forEach(({ type, newNode, oldNode, container, patches }) => {
      switch (type) {
        case 'CREATE':
          container?.appendChild(
            this.createElement(container, newNode as VNode)
          );
          break;
        case 'REMOVE':
          container?.removeChild(oldNode as any);
          break;
        case 'REPLACE':
          if (oldNode) {
            oldNode.setProps(
              {
                ...(newNode as IAny)?.props,
                children: BaseComponent.createChildren(
                  (newNode as IAny)?.props?.children
                ),
              },
              false
            );
            oldNode.attached = false;
            oldNode.attach();
            oldNode.attached = true;
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
    patches?.forEach(({ type, node, key, propValue }) => {
      if (type === 'UPDATE') {
        BaseComponent.setProps({ [key]: propValue }, node, false);
      } else if (type === 'REMOVE') {
        BaseComponent.removeProps({ [key]: undefined }, node);
      }
    });
  }

  protected attach() {
    const viewFragment = this.html();
    if (viewFragment) {
      this.innerHTML = '';
      if (Array.isArray(viewFragment)) {
        this.appendChildren(...viewFragment);
      } else {
        this.appendChildren(viewFragment);
      }
    }
  }

  protected onStateChange() {
    let viewFragments: VNode[] | VNode = this.html() as any;
    let patches: Patch[] = [];
    if (viewFragments) {
      const isFirstChildStyle =
        this.firstChild?.nodeType === Node.ELEMENT_NODE &&
        this.firstChild.nodeName === 'STYLE';
      const isViewFramentArray = Array.isArray(viewFragments);
      const maxLength = Math.max(
        isFirstChildStyle ? this.childNodes.length - 1 : this.childNodes.length,
        isViewFramentArray ? (viewFragments as any).length : 0
      );
      for (let i = 0; i < maxLength; i++) {
        const viewFragment = isViewFramentArray
          ? viewFragments[i]
          : viewFragments;
        const currentViewFragment =
          this.childNodes[isFirstChildStyle ? i + 1 : i];
        patches.push(
          ...this.diff(this, currentViewFragment as any, viewFragment as VNode)
        );
      }
      this.applyPatches(patches);
      viewFragments = null as any;
    }
  }

  protected html(): JSX.Element {
    return null as any;
  }

  static construct(
    tag: typeof Reblend | string,
    props: IAny,
    ...children: any[]
  ) {
    const container = this as any as BaseComponent;
    let clazz: typeof Reblend = tag as typeof Reblend;
    const isTagStandard = typeof tag === 'string';
    props || (props = {});
    isTagStandard || Object.assign(props, clazz.props);
    Object.assign(props, {
      children: container?.attached
        ? children
        : BaseComponent.createChildren(children),
    });
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
          const srcTags = ['svg', 'img'];
          for (const t of srcTags) {
            if ((tag as string).toLowerCase() === t) {
              if ('src' in props) {
                ele.setAttribute('src', props.src);
              }
              break;
            }
          }
          this.wrapper = ele;
        }
      };
    }

    if (!isSubclassOf(clazz, Reblend)) {
      throw new UnsupportedPrototype(`${isTagStandard ? tag : tag.name}`);
    }
    const velement = { tag: clazz.ELEMENT_NAME, props };
    if (container?.attached) {
      return velement;
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
    element.container = container;
    element.attach();
    return element;
  }

  static createChildren(
    children: any[],
    containerArr: (BaseComponent | HTMLElement)[] = []
  ) {
    for (const child of children) {
      if (Array.isArray(child)) {
        return this.createChildren(child, containerArr);
      } else {
        if (child !== undefined && child !== null) {
          if (child instanceof Reblend || child instanceof Node) {
            containerArr.push(child as any);
          } else {
            containerArr.push(
              document.createTextNode(
                `${
                  child instanceof Object && 'toString' in child
                    ? child.toString()
                    : child
                }`
              ) as unknown as HTMLElement
            );
          }
        }
      }
    }
    return containerArr;
  }

  disconnectedCallback() {
    this.cleanUp();
    this.disconnectEffects.forEach(fn => fn());
    {
      this.shadow = null as any;
      this.shadowWrapper = null as any;
      this.shadowStyle = null as any;
      this.props = null as any;
      this._state = null as any;
      this.container = null as any;
      this.stateKeys = null as any;
    }
  }

  protected cleanUp() {}

  protected effectsFn: StateEffectiveFunction[] = [];
  protected disconnectEffects: StateEffectiveFunction[] = [];

  protected apply(func: Function, label: string) {
    if (!label || typeof label !== 'string') {
      throw new Error('Invalid label');
    }

    const functionString = func.toString();
    const modifiedString = functionString.replace(/\[LABEL\]/g, label);

    const wrapperFunction = new Function(
      'lodash',
      `
    return function ${func.name}() {
      const func = ${modifiedString};
      return func.apply(this, arguments);
    }
  `
    )(lodash).bind(this);
    this.stateKeys.push(label);
    return wrapperFunction;
  }
}

registerElement(`BaseComponent`, BaseComponent);

export default BaseComponent;
