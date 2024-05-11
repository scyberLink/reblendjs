import { rand } from "../common/md5";
import { cssString, snakeCase } from "../common/utils";
import InvalidTagNameException from "../exceptions/InvalidTagNameException";
import NullException from "../exceptions/NullException";
import IAny from "../interface/IAny";
import IPair from "../interface/IPair";
import IDelegate from "./IDelegate";
import Reactex from "./Reactex";
import ShadowMode from "./ShadowMode";

export type FunctionComponent = (props: IAny) => HTMLElement | BaseComponent;

class BaseComponent extends HTMLElement implements IDelegate {
  protected static ELEMENT_NAME = "BaseComponent";
  protected shadow!: ShadowRoot;
  protected shadowWrapper!: HTMLElement;
  protected shadowStyle!: HTMLStyleElement;
  private _scale: number = 1;
  private _rotate: number = 0;
  private initialDisplay: string = "initial";
  private showing: boolean = true;
  xOrigin?: number;
  yOrigin?: number;
  dataIdQuerySelector!: string;
  private _shadowed = "";
  props!: IAny;
  static props: IAny;

  constructor() {
    super();
    this.refresh();
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
    return this.shadowed
      ? this.shadowWrapper.removeChild(child)
      : super.removeChild(child);
  }

  // Delegate properties and methods to the shadowWrapper

  get accessKey(): string {
    return this.shadowed ? this.shadowWrapper.accessKey : super.accessKey;
  }

  set accessKey(value: string) {
    this.shadowed
      ? (this.shadowWrapper.accessKey = value)
      : (super.accessKey = value);
  }

  get attributes(): NamedNodeMap {
    return this.shadowed ? this.shadowWrapper.attributes : super.attributes;
  }

  get classList(): DOMTokenList {
    return this.shadowed ? this.shadowWrapper.classList : super.classList;
  }

  get className(): string {
    return this.shadowed ? this.shadowWrapper.className : super.className;
  }

  set className(value: string) {
    this.shadowed
      ? (this.shadowWrapper.className = value)
      : (super.className = value);
  }

  get contentEditable(): string {
    return this.shadowed
      ? this.shadowWrapper.contentEditable
      : super.contentEditable;
  }

  set contentEditable(value: string) {
    this.shadowed
      ? (this.shadowWrapper.contentEditable = value)
      : (super.contentEditable = value);
  }

  get clientWidth(): number {
    return this.shadowed ? this.shadowWrapper.clientWidth : super.clientWidth;
  }

  set clientWidth(value: number) {
    this.shadowed
      ? ((this.shadowWrapper as any).clientWidth = value)
      : ((super.clientWidth as any) = value);
  }

  get clientHeight(): number {
    return this.shadowed ? this.shadowWrapper.clientHeight : super.clientHeight;
  }

  set clientHeight(value: number) {
    this.shadowed
      ? ((this.shadowWrapper as any).clientHeight = value)
      : ((super.clientHeight as any) = value);
  }

  get innerText(): string {
    return this.shadowed ? this.shadowWrapper.innerText : super.innerText;
  }

  set innerText(value: string) {
    this.shadowed
      ? (this.shadowWrapper.innerText = value)
      : (super.innerText = value);
  }

  get innerHTML(): string {
    return this.shadowed ? this.shadowWrapper.innerHTML : super.innerHTML;
  }

  set innerHTML(value: string) {
    this.shadowed
      ? (this.shadowWrapper.innerHTML = value)
      : (super.innerHTML = value);
  }

  get dataset(): DOMStringMap {
    return this.shadowed ? this.shadowWrapper.dataset : super.dataset;
  }

  get dir(): string {
    return this.shadowed ? this.shadowWrapper.dir : super.dir;
  }

  appendChildren(...children: HTMLElement[]) {
    for (const child of children) {
      this.appendChild(child);
    }
  }

  set dir(value: string) {
    this.shadowed ? (this.shadowWrapper.dir = value) : (super.dir = value);
  }

  get draggable(): boolean {
    return this.shadowed ? this.shadowWrapper.draggable : super.draggable;
  }

  set draggable(value: boolean) {
    this.shadowed
      ? (this.shadowWrapper.draggable = value)
      : (super.draggable = value);
  }

  get children() {
    return this.shadowed ? this.shadowWrapper.children : super.children;
  }

  get hidden(): boolean {
    return this.shadowed ? this.shadowWrapper.hidden : super.hidden;
  }

  set hidden(value: boolean) {
    this.shadowed
      ? (this.shadowWrapper.hidden = value)
      : (super.hidden = value);
  }

  get dataId(): string {
    return (
      this.shadowed
        ? this.shadowWrapper.getAttribute(`data-id`)
        : super.getAttribute(`data-id`) || this.dataId
    ) as string;
  }

  set dataId(value: string) {
    this.dataId = value;
    this.shadowed
      ? this.shadowWrapper.setAttribute
      : super.setAttribute(`data-id`, this.dataId);
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
    this.shadowWrapper = document.createElement("div");
    this.shadowStyle = document.createElement("style");
    this.dataId = `${rand(1111111, 9999999)}`;
    this.dataIdQuerySelector = `[data-id="${this.dataId}"]`;
    this.shadowStyle.textContent = `
    ${this.dataIdQuerySelector} {

      }
    `;
    this.shadow.appendChild(this.shadowWrapper);
    this.shadow.appendChild(this.shadowStyle);
  }

  get id(): string {
    return this.shadowed ? this.shadowWrapper.id : super.id;
  }

  set id(value: string) {
    this.shadowed ? (this.shadowWrapper.id = value) : (super.id = value);
  }

  get textContent(): string {
    return this.shadowed ? this.shadowWrapper.textContent! : super.textContent!;
  }

  set textContent(value: string) {
    this.shadowed
      ? (this.shadowWrapper.textContent = value)
      : (super.textContent = value);
  }

  toggleDisplay() {
    if (this.showing) {
      this.initialDisplay =
        (this.shadowed
          ? this.shadowWrapper.style.display
          : super.style.display) || this.initialDisplay;
      this.shadowed
        ? (this.shadowWrapper.style.display = "none")
        : (super.style.display = "none");
    } else {
      this.shadowed
        ? this.shadowWrapper.style.display
        : (super.style.display = this.initialDisplay);
    }
    this.showing = !this.showing;
  }

  get lang(): string {
    return this.shadowed ? this.shadowWrapper.lang : super.lang;
  }

  set lang(value: string) {
    this.shadowed ? (this.shadowWrapper.lang = value) : (super.lang = value);
  }

  get offsetHeight(): number {
    return this.shadowed ? this.shadowWrapper.offsetHeight : super.offsetHeight;
  }

  get offsetLeft(): number {
    return this.shadowed ? this.shadowWrapper.offsetLeft : super.offsetLeft;
  }

  get offsetParent(): Element | null {
    return this.shadowed ? this.shadowWrapper.offsetParent : super.offsetParent;
  }

  get offsetTop(): number {
    return this.shadowed ? this.shadowWrapper.offsetTop : super.offsetTop;
  }

  get offsetWidth(): number {
    return this.shadowed ? this.shadowWrapper.offsetWidth : super.offsetWidth;
  }

  get disabled() {
    return this.getDisable();
  }

  set disabled(value: boolean) {
    this.setDisable(value);
  }

  getDisable() {
    return this.shadowed
      ? this.shadowWrapper.hasAttribute("disabled")
      : super.hasAttribute("disabled");
  }

  appendChild<T extends Node>(node: T): T {
    return this.shadowed
      ? this.shadowWrapper.appendChild(node)
      : super.appendChild(node);
  }

  setDisable(value: boolean) {
    if (value) {
      this.shadowed
        ? this.shadowWrapper.setAttribute("disabled", "")
        : super.setAttribute("disabled", "");
    } else {
      this.shadowed
        ? this.shadowWrapper.removeAttribute("disabled")
        : super.removeAttribute("disabled");
    }
  }

  get style(): CSSStyleDeclaration {
    return this.shadowed ? this.shadowWrapper.style : super.style;
  }

  get tabIndex(): number {
    return this.shadowed ? this.shadowWrapper.tabIndex : super.tabIndex;
  }

  set tabIndex(value: number) {
    this.shadowed
      ? (this.shadowWrapper.tabIndex = value)
      : (super.tabIndex = value);
  }

  get title(): string {
    return this.shadowed ? this.shadowWrapper.title : super.title;
  }

  set title(value: string) {
    this.shadowed ? (this.shadowWrapper.title = value) : (super.title = value);
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
    this.shadowed
      ? this.shadowWrapper.addEventListener
      : super.addEventListener(type, listener, options);
  }

  getBoundingClientRect(): DOMRect {
    return this.shadowed
      ? this.shadowWrapper.getBoundingClientRect()
      : super.getBoundingClientRect();
  }

  append(...nodes: Array<Node | string>): void {
    this.shadowed
      ? this.shadowWrapper.append(...nodes)
      : super.append(...nodes);
  }

  blur(): void {
    this.shadowed ? this.shadowWrapper.blur() : super.blur();
  }

  click(): void {
    this.shadowed ? this.shadowWrapper.click() : super.click();
  }

  oncontextmenu = (e: any) => {
    e?.preventDefault();
  };

  closest(selectors: string): Element | null {
    return this.shadowed
      ? this.shadowWrapper.closest(selectors)
      : super.closest(selectors);
  }

  dispatchEvent(event: Event): boolean {
    return this.shadowed
      ? this.shadowWrapper.dispatchEvent(event)
      : super.dispatchEvent(event);
  }

  focus(options?: FocusOptions): void {
    this.shadowed ? this.shadowWrapper.focus(options) : super.focus(options);
  }

  getAttribute(name: string): string | null {
    return this.shadowed
      ? this.shadowWrapper.getAttribute(name)
      : super.getAttribute(name);
  }

  getAttributeNS(
    namespaceURI: string | null,
    localName: string
  ): string | null {
    return this.shadowed
      ? this.shadowWrapper.getAttributeNS(namespaceURI, localName)
      : super.getAttributeNS(namespaceURI, localName);
  }

  getAttributeNode(name: string): Attr | null {
    return this.shadowed
      ? this.shadowWrapper.getAttributeNode(name)
      : super.getAttributeNode(name);
  }

  getAttributeNodeNS(
    namespaceURI: string | null,
    localName: string
  ): Attr | null {
    return this.shadowed
      ? this.shadowWrapper.getAttributeNodeNS(namespaceURI, localName)
      : super.getAttributeNodeNS(namespaceURI, localName);
  }

  hasAttribute(name: string): boolean {
    return this.shadowed
      ? this.shadowWrapper.hasAttribute(name)
      : super.hasAttribute(name);
  }

  hasAttributeNS(namespaceURI: string | null, localName: string): boolean {
    return this.shadowed
      ? this.shadowWrapper.hasAttributeNS(namespaceURI, localName)
      : super.hasAttributeNS(namespaceURI, localName);
  }

  hasAttributes(): boolean {
    return this.shadowed
      ? this.shadowWrapper.hasAttributes()
      : super.hasAttributes();
  }

  insertAdjacentElement(
    position: InsertPosition,
    insertedElement: Element
  ): Element | null {
    return this.shadowed
      ? this.shadowWrapper.insertAdjacentElement(position, insertedElement)
      : super.insertAdjacentElement(position, insertedElement);
  }

  insertAdjacentHTML(position: InsertPosition, text: string): void {
    this.shadowed
      ? this.shadowWrapper.insertAdjacentHTML
      : super.insertAdjacentHTML(position, text);
  }

  insertAdjacentText(position: InsertPosition, text: string): void {
    this.shadowed
      ? this.shadowWrapper.insertAdjacentText
      : super.insertAdjacentText(position, text);
  }

  removeAttribute(name: string): void {
    this.shadowed
      ? this.shadowWrapper.removeAttribute(name)
      : super.removeAttribute(name);
  }

  removeAttributeNS(namespaceURI: string | null, localName: string): void {
    this.shadowed
      ? this.shadowWrapper.removeAttributeNS
      : super.removeAttributeNS(namespaceURI, localName);
  }

  removeAttributeNode(attr: Attr): Attr {
    return this.shadowed
      ? this.shadowWrapper.removeAttributeNode(attr)
      : super.removeAttributeNode(attr);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void {
    this.shadowed
      ? this.shadowWrapper.removeEventListener
      : super.removeEventListener(type, listener, options);
  }

  setAttribute(name: string, value: string): void {
    this.shadowed
      ? this.shadowWrapper.setAttribute(name, value)
      : super.setAttribute(name, value);
  }

  setAttributeNS(
    namespaceURI: string | null,
    qualifiedName: string,
    value: string
  ): void {
    this.shadowed
      ? this.shadowWrapper.setAttributeNS
      : super.setAttributeNS(namespaceURI, qualifiedName, value);
  }

  setAttributeNode(attr: Attr): Attr | null {
    return this.shadowed
      ? this.shadowWrapper.setAttributeNode(attr)
      : super.setAttributeNode(attr);
  }

  setAttributeNodeNS(attr: Attr): Attr | null {
    return this.shadowed
      ? this.shadowWrapper.setAttributeNodeNS(attr)
      : super.setAttributeNodeNS(attr);
  }

  toggleAttribute(qualifiedName: string, force?: boolean): boolean {
    return this.shadowed
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
    let styleString: string = "";
    let previousStyle = this.shadowStyle.textContent ?? "";
    if (typeof style === "string") {
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
        styleString = styleString?.concat("\n\n", styleI);
      }
      this.shadowStyle.textContent = previousStyle + styleString;
    }

    return this.shadowStyle;
  }

  addPseudoClass(clazz: string, style: IAny) {
    if (!clazz) {
      throw new NullException("Pseudo Class name not provided");
    }

    if (!style) {
      throw new NullException("Pseudo Class style not provided");
    }

    if (!clazz.includes(":")) {
      clazz = `:${clazz}`;
    }
    clazz = `${this.dataIdQuerySelector}${clazz}`;
    this.addStyle(`${clazz}{${cssString(style)}}`);
  }

  hovered(style: IAny) {
    this.addPseudoClass("hover", style);
  }

  setCursor(cursor: "pointer" | "grab" | "grabbing" | "default") {
    this.style.cursor = `${cursor}`;
  }

  addInlineStyle({ name, value }: IPair) {
    this.shadowed
      ? (this.shadowWrapper.style[name as any] = value)
      : (super.style[name as any] = value);
  }

  addClassNames(...classNames: string[]) {
    this.shadowed
      ? this.shadowWrapper.classList.add(...classNames)
      : super.classList.add(...classNames);
  }

  removeClassNames(...classNames: string[]) {
    this.shadowed
      ? this.shadowWrapper.classList.remove
      : super.classList.remove(...classNames);
  }

  replaceClassName(oldClassName: string, newClassName: string) {
    return this.shadowed
      ? this.shadowWrapper.classList.replace(oldClassName, newClassName)
      : super.classList.replace(oldClassName, newClassName);
  }

  public static register(element: typeof BaseComponent) {
    if (!element.ELEMENT_NAME || element.ELEMENT_NAME === "BaseComponent") {
      throw new InvalidTagNameException(
        "Please declare a static field ELEMENT_NAME in your derive class of BaseComponent"
      );
    }
    const tagName = `${snakeCase(element.ELEMENT_NAME)}-reactex`;
    try {
      customElements.define(tagName, element);
    } catch (error: any) {
      console.warn(error.message);
    }
  }

  setScale(scale: number) {
    this.scale = scale;
  }

  private setProps(props: IAny) {
    BaseComponent.setProps(props, this);
  }

  static setProps(props: IAny, to?: HTMLElement) {
    if (props && to) {
      (to as BaseComponent).props = props;

      if ("shadowed" in props) {
        (to as BaseComponent).shadowed = props[`shadowed`];
      }

      for (let propName in props) {
        if (propName.startsWith("on")) {
          to[propName] = props[propName];
        } else {
          to.setAttribute(propName, props[propName]);
        }
      }
    }
  }

  protected refresh() {
    this.innerHTML = "";
    const html = this.html();
    if (html) {
      this.appendChild(html);
    }
  }

  protected html(): JSX.Element {
    return null as any;
  }

  static construct(
    tag: typeof BaseComponent | string | FunctionComponent,
    props: IAny,
    ...children: any[]
  ) {
    let element: HTMLElement | BaseComponent | null = null;
    if (typeof tag === "string") {
      element = document.createElement(tag);
      BaseComponent.setProps(props, element);
    } else {
      tag = tag as typeof BaseComponent;
      const propes = { ...tag.props, ...props };
      if (!tag.ELEMENT_NAME) {
        tag = class extends Reactex {
          static ELEMENT_NAME = (tag as typeof Object).name;
          constructor() {
            super();
            this.html = (() => (tag as FunctionComponent)(propes)).bind(this);
          }
        };
      }
      BaseComponent.register(tag);
      element = new tag();
      (element as BaseComponent).setProps(propes);
    }

    for (let child of children) {
      if (child)
        element?.appendChild(
          typeof child === "string" ? document.createTextNode(child) : child
        );
    }
    return element;
  }

  static Fragment = class extends BaseComponent {
    static ELEMENT_NAME = "Fragment";

    constructor() {
      super();
    }

    protected html() {
      return document.createTextNode("") as unknown as HTMLElement;
    }
  };
}

export default BaseComponent;
