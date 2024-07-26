import { attributeName, shouldUseSetAttribute } from 'reblend-typing';
import {
  capitalize,
  cssString,
  isCallable,
  isSubclassOf,
  rand,
  registerElement,
  snakeCase,
} from '../common/utils';
import InvalidTagNameException from '../exceptions/InvalidTagNameException';
import NullException from '../exceptions/NullException';
import UnsupportedPrototype from '../exceptions/UnsupportedPrototype';
import Reblend from './Reblend';
import ShadowMode from './ShadowMode';
import * as lodash from 'lodash';
import StyleUtil from './StyleUtil';
export const ERROR_EVENTNAME = 'reblend-render-error';
export const REBLEND_PRIMITIVE_ELEMENT_NAME = 'ReblendPrimitive';
class BaseComponent extends HTMLElement {
  static ELEMENT_NAME = 'BaseComponent';
  shadow;
  shadowWrapper;
  _scale = 1;
  _rotate = 0;
  initialDisplay = 'initial';
  showing = true;
  xOrigin;
  yOrigin;
  dataIdQuerySelector;
  _shadowed = '';
  props;
  static props;
  _dataId;
  _state;
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
  setDataID() {
    this.dataId = `${rand(1111111, 9999999)}`;
    this.dataIdQuerySelector = `[data-id="${this.dataId}"]`;
  }
  get rotate() {
    return this._rotate;
  }
  set rotate(value) {
    this._rotate = value;
    this.style.rotate = `${value}deg`;
  }
  get scale() {
    return this._scale;
  }
  set scale(value) {
    this._scale = value;
    this.style.transform = `scale(${value})`;
  }
  get origin() {
    return {
      x: this.xOrigin || this.clientWidth / 2,
      y: this.yOrigin || this.clientHeight / 2,
    };
  }
  set origin({ x, y }) {
    this.xOrigin = x;
    this.yOrigin = y;
    this.style.transformOrigin = `${this.xOrigin}px ${this.yOrigin}px`;
  }
  removeChild(child) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.removeChild(child)
      : super.removeChild(child);
  }
  get accessKey() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.accessKey
      : super.accessKey;
  }
  set accessKey(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.accessKey = value)
      : (super.accessKey = value);
  }
  get childNodes() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.childNodes
      : super.childNodes;
  }
  set childNodes(value) {
    /* this.wrapper || this.shadowed
          ? (this.shadowWrapper.childNodes = value)
          : (super.childNodes = value); */
  }
  get attributes() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.attributes
      : super.attributes;
  }
  get classList() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.classList
      : super.classList;
  }
  get className() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.className
      : super.className;
  }
  set className(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.className = value)
      : (super.className = value);
  }
  get contentEditable() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.contentEditable
      : super.contentEditable;
  }
  set contentEditable(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.contentEditable = value)
      : (super.contentEditable = value);
  }
  get clientWidth() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.clientWidth
      : super.clientWidth;
  }
  set clientWidth(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.clientWidth = value)
      : (super.clientWidth = value);
  }
  get clientHeight() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.clientHeight
      : super.clientHeight;
  }
  set clientHeight(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.clientHeight = value)
      : (super.clientHeight = value);
  }
  get innerText() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.innerText
      : super.innerText;
  }
  set innerText(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.innerText = value)
      : (super.innerText = value);
  }
  get innerHTML() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.innerHTML
      : super.innerHTML;
  }
  set innerHTML(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.innerHTML = value)
      : (super.innerHTML = value);
  }
  get dataset() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.dataset
      : super.dataset;
  }
  get dir() {
    return this.wrapper || this.shadowed ? this.shadowWrapper.dir : super.dir;
  }
  appendChildren(...children) {
    for (const child of children) {
      this.appendChild(child);
    }
  }
  set dir(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.dir = value)
      : (super.dir = value);
  }
  get draggable() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.draggable
      : super.draggable;
  }
  set draggable(value) {
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
  get hidden() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.hidden
      : super.hidden;
  }
  set hidden(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.hidden = value)
      : (super.hidden = value);
  }
  get dataId() {
    return (
      (this.wrapper || this.shadowed
        ? this.shadowWrapper.getAttribute(`data-id`)
        : super.getAttribute(`data-id`)) || this._dataId
    );
  }
  set dataId(value) {
    this._dataId = value;
    this.wrapper || this.shadowed
      ? this.shadowWrapper.setAttribute(`data-id`, this._dataId)
      : super.setAttribute(`data-id`, this._dataId);
  }
  get shadowed() {
    return this._shadowed;
  }
  set shadowed(value) {
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
  setWrappers(wrapper) {
    this.shadowWrapper = wrapper;
    this.shadow
      ? this.shadow.appendChild(this.shadowWrapper)
      : super.appendChild(this.shadowWrapper);
  }
  set wrapper(element) {
    this.setWrappers(element);
  }
  get wrapper() {
    return this.shadowWrapper;
  }
  get id() {
    return this.wrapper || this.shadowed ? this.shadowWrapper.id : super.id;
  }
  set id(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.id = value)
      : (super.id = value);
  }
  get textContent() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.textContent
      : super.textContent;
  }
  set textContent(value) {
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
  get lang() {
    return this.wrapper || this.shadowed ? this.shadowWrapper.lang : super.lang;
  }
  set lang(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.lang = value)
      : (super.lang = value);
  }
  get offsetHeight() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.offsetHeight
      : super.offsetHeight;
  }
  get offsetLeft() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.offsetLeft
      : super.offsetLeft;
  }
  get offsetParent() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.offsetParent
      : super.offsetParent;
  }
  get offsetTop() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.offsetTop
      : super.offsetTop;
  }
  get offsetWidth() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.offsetWidth
      : super.offsetWidth;
  }
  get disabled() {
    return this.getDisable();
  }
  set disabled(value) {
    this.setDisable(value);
  }
  getDisable() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.hasAttribute('disabled')
      : super.hasAttribute('disabled');
  }
  appendChild(node) {
    const appended =
      this.wrapper || this.shadowed
        ? this.shadowWrapper.appendChild(node)
        : super.appendChild(node);
    return appended;
  }
  setDisable(value) {
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
  get style() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.style
      : super.style;
  }
  set style(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.style = value)
      : (super.style = value);
  }
  get tabIndex() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.tabIndex
      : super.tabIndex;
  }
  set tabIndex(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.tabIndex = value)
      : (super.tabIndex = value);
  }
  get title() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.title
      : super.title;
  }
  set title(value) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.title = value)
      : (super.title = value);
  }
  set onselect(value) {}
  oncopy = ev => {
    ev?.preventDefault();
  };
  oncut = ev => {
    ev?.preventDefault();
  };
  onpaste = ev => {
    ev?.preventDefault();
  };
  onresize = ev => {
    ev?.preventDefault();
  };
  onwheel = ev => {
    ev?.preventDefault();
  };
  ondragover = event => {
    event.preventDefault();
  };
  ondrop = event => {
    event.preventDefault();
  };
  // ... (other delegated methods)
  addEventListener(type, listener, options) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.addEventListener
      : super.addEventListener(type, listener, options);
  }
  getBoundingClientRect() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.getBoundingClientRect()
      : super.getBoundingClientRect();
  }
  append(...nodes) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.append(...nodes)
      : super.append(...nodes);
  }
  blur() {
    this.wrapper || this.shadowed ? this.shadowWrapper.blur() : super.blur();
  }
  click() {
    this.wrapper || this.shadowed ? this.shadowWrapper.click() : super.click();
  }
  oncontextmenu = e => {
    e?.preventDefault();
  };
  closest(selectors) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.closest(selectors)
      : super.closest(selectors);
  }
  dispatchEvent(event) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.dispatchEvent(event)
      : super.dispatchEvent(event);
  }
  focus(options) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.focus(options)
      : super.focus(options);
  }
  getAttribute(name) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.getAttribute(name)
      : super.getAttribute(name);
  }
  getAttributeNS(namespaceURI, localName) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.getAttributeNS(namespaceURI, localName)
      : super.getAttributeNS(namespaceURI, localName);
  }
  getAttributeNode(name) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.getAttributeNode(name)
      : super.getAttributeNode(name);
  }
  getAttributeNodeNS(namespaceURI, localName) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.getAttributeNodeNS(namespaceURI, localName)
      : super.getAttributeNodeNS(namespaceURI, localName);
  }
  hasAttribute(name) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.hasAttribute(name)
      : super.hasAttribute(name);
  }
  hasAttributeNS(namespaceURI, localName) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.hasAttributeNS(namespaceURI, localName)
      : super.hasAttributeNS(namespaceURI, localName);
  }
  hasAttributes() {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.hasAttributes()
      : super.hasAttributes();
  }
  insertAdjacentElement(position, insertedElement) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.insertAdjacentElement(position, insertedElement)
      : super.insertAdjacentElement(position, insertedElement);
  }
  insertAdjacentHTML(position, text) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.insertAdjacentHTML
      : super.insertAdjacentHTML(position, text);
  }
  insertAdjacentText(position, text) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.insertAdjacentText
      : super.insertAdjacentText(position, text);
  }
  removeAttribute(name) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.removeAttribute(name)
      : super.removeAttribute(name);
  }
  removeAttributeNS(namespaceURI, localName) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.removeAttributeNS
      : super.removeAttributeNS(namespaceURI, localName);
  }
  removeAttributeNode(attr) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.removeAttributeNode(attr)
      : super.removeAttributeNode(attr);
  }
  removeEventListener(type, listener, options) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.removeEventListener
      : super.removeEventListener(type, listener, options);
  }
  setAttribute(name, value) {
    if (typeof value == 'object') {
      value = value.toString();
    }
    this.wrapper || this.shadowed
      ? this.shadowWrapper.setAttribute(name, value)
      : super.setAttribute(name, value);
  }
  setAttributeNS(namespaceURI, qualifiedName, value) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.setAttributeNS
      : super.setAttributeNS(namespaceURI, qualifiedName, value);
  }
  setAttributeNode(attr) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.setAttributeNode(attr)
      : super.setAttributeNode(attr);
  }
  setAttributeNodeNS(attr) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.setAttributeNodeNS(attr)
      : super.setAttributeNodeNS(attr);
  }
  toggleAttribute(qualifiedName, force) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.toggleAttribute(qualifiedName, force)
      : super.toggleAttribute(qualifiedName, force);
  }
  getShadowWrapper() {
    return this.shadowWrapper;
  }
  addStyle(style) {
    if (typeof style === 'string') {
      this.styleUtil.update(this.dataIdQuerySelector, style);
    } else if (!Array.isArray(style)) {
      this.styleUtil.update(this.dataIdQuerySelector, style);
    } else if (Array.isArray(style)) {
      let styleString = '';
      for (const styleI of style) {
        styleString = styleString?.concat('\n\n', styleI);
      }
      this.styleUtil.update(this.dataIdQuerySelector, styleString);
    }
  }
  addPseudoClass(clazz, style) {
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
  hovered(style) {
    this.addPseudoClass('hover', style);
  }
  setCursor(cursor) {
    this.style.cursor = `${cursor}`;
  }
  addInlineStyle({ name, value }) {
    this.wrapper || this.shadowed
      ? (this.shadowWrapper.style[name] = value)
      : (super.style[name] = value);
  }
  addClassNames(...classNames) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.classList.add(...classNames)
      : super.classList.add(...classNames);
  }
  removeClassNames(...classNames) {
    this.wrapper || this.shadowed
      ? this.shadowWrapper.classList.remove
      : super.classList.remove(...classNames);
  }
  replaceClassName(oldClassName, newClassName) {
    return this.wrapper || this.shadowed
      ? this.shadowWrapper.classList.replace(oldClassName, newClassName)
      : super.classList.replace(oldClassName, newClassName);
  }
  static hasName(element) {
    return element.ELEMENT_NAME && element.ELEMENT_NAME !== 'BaseComponent';
  }
  static register(element) {
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
    } catch (error) {
      //better left empty
      //console.warn(error.message);
    }
    return element;
  }
  setScale(scale) {
    this.scale = scale;
  }
  init() {}
  componentDidMount() {}
  setProps(props, init) {
    BaseComponent.setProps(props, this, init);
  }
  static fn(eventCallback = () => {}) {
    return e => eventCallback(e);
  }
  static setProps(props, to, init) {
    if (props && to) {
      to.props = { ...to.props, ...props };
      if ('shadowed' in props) {
        to.shadowed = props[`shadowed`];
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
  static removeProps(props, to) {
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
  get state() {
    return this._state || {};
  }
  set state(value) {
    this._state = {
      ...this._state,
      ...(typeof value == 'function' ? value(this._state) : value),
    };
    this.onStateChange();
  }
  setState(value) {
    this.state = value;
  }
  isTextNode(node) {
    return node?.nodeType === Node.TEXT_NODE;
  }
  diffCreateOrRemove(parent, oldNode, newNode) {
    const patches = [];
    if (!oldNode) {
      patches.push({ type: 'CREATE', parent, newNode });
    } else if (!newNode) {
      patches.push({ type: 'REMOVE', parent, oldNode });
    }
    return patches;
  }
  isReblendPrimitiveElement(element) {
    return (
      !BaseComponent.isPrimitive(element) &&
      element.tag === REBLEND_PRIMITIVE_ELEMENT_NAME
    );
  }
  diff(parent, oldNode, newNode) {
    const patches = [];
    if (
      BaseComponent.isPrimitive(oldNode) &&
      BaseComponent.isPrimitive(newNode)
    ) {
      patches.push({ type: 'CREATE', parent, newNode });
    } else if (
      BaseComponent.isPrimitive(oldNode) &&
      !BaseComponent.isPrimitive(newNode)
    ) {
      patches.push({ type: 'CREATE', parent, newNode });
    } else if (
      this.isReblendPrimitiveElement(oldNode) &&
      BaseComponent.isPrimitive(newNode)
    ) {
      if (oldNode.getData() !== newNode) {
        oldNode.setData(newNode);
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
      !this.isReblendPrimitiveElement(oldNode) &&
      BaseComponent.isPrimitive(newNode)
    ) {
      patches.push({ type: 'REPLACE', parent, newNode, oldNode });
    } else if (
      oldNode.tag.toLowerCase() !==
      (BaseComponent.isPrimitive(newNode.tag)
        ? newNode.tag
        : newNode.tag.ELEMENT_NAME
      ).toLowerCase()
    ) {
      patches.push({ type: 'REPLACE', parent, newNode, oldNode });
    } else {
      const propsDiff = this.diffProps(newNode, oldNode);
      if (propsDiff && propsDiff.length > 0) {
        patches.push({
          type: 'UPDATE',
          patches: propsDiff,
        });
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
  diffProps(newNode, oldNode) {
    const patches = [];
    const oldProps = oldNode?.props;
    const newProps = newNode?.props;
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
  diffChildren(parent, oldChildren, newChildren) {
    oldChildren || (oldChildren = []);
    newChildren || (newChildren = []);
    const patches = [];
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
  static createElement(vNode) {
    if (BaseComponent.isPrimitive(vNode)) {
      return new BaseComponent.ReblendPrimitive().setData(vNode);
    }
    const { tag } = vNode;
    const { children } = vNode.props || {};
    let clazz = tag;
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
        static ELEMENT_NAME = capitalize(`${tag}`);
        constructor() {
          super();
          const ele = document.createElement(tag);
          this.wrapper = ele;
        }
      };
    }
    if (!isSubclassOf(clazz, Reblend)) {
      throw new UnsupportedPrototype(`${isTagStandard ? tag : tag.name}`);
    }
    BaseComponent.register(clazz);
    const element = new clazz();
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
  applyPatches(patches) {
    patches?.forEach(({ type, newNode, oldNode, parent, patches }) => {
      switch (type) {
        case 'CREATE':
          parent?.appendChild(BaseComponent.createElement(newNode));
          break;
        case 'REMOVE':
          oldNode && parent?.removeChild(oldNode);
          break;
        case 'REPLACE':
          if (oldNode) {
            const newNodeElement = BaseComponent.createElement(newNode);
            oldNode?.parentNode?.replaceChild(newNodeElement, oldNode);
            oldNode && 'disconnectedCallback' && oldNode.disconnectedCallback();
            oldNode = null;
          }
          break;
        case 'TEXT':
          oldNode && (oldNode.textContent = newNode);
          break;
        case 'UPDATE':
          this.applyProps(patches);
          break;
      }
    });
  }
  applyProps(patches) {
    //This helps reduce onStateChange call for updates of the same node
    const nodes = new Set();
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
  static isArray(obj) {
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
  attach() {
    this.catch(() => {
      let vNodes = this.html();
      //if (!vNodes) return;
      this.innerHTML = '';
      const isVNodesArray = Array.isArray(vNodes);
      if (isVNodesArray && vNodes.length < 1) {
        return;
      }
      if (isVNodesArray) {
        vNodes = BaseComponent.flattenVNodeChildren(vNodes);
      }
      if (isVNodesArray) {
        if (vNodes[0] && vNodes[0].parentNode) {
          vNodes = null;
          return;
        }
        vNodes = BaseComponent.createChildren(vNodes);
        this.appendChildren(...vNodes);
      } else {
        if (vNodes?.parentNode) {
          vNodes = null;
          return;
        }
        vNodes = BaseComponent.createElement(vNodes);
        this.appendChildren(vNodes);
      }
    });
  }
  applyEffects() {
    this.effectsFn.forEach(effectFn => effectFn());
  }
  static flattenVNodeChildren(arr, containerArr = []) {
    if (!arr || arr.length < 1) {
      return [];
    }
    for (const item of arr) {
      if (Array.isArray(item)) {
        BaseComponent.flattenVNodeChildren(item, containerArr);
      } else {
        containerArr.push(item);
      }
    }
    return containerArr;
  }
  catch(fn) {
    const handleError = error => {
      window.dispatchEvent(
        new CustomEvent(ERROR_EVENTNAME, {
          detail: ((error.component = this), error),
        })
      );
      throw error;
    };
    try {
      const result = fn();
      // Check if the result is a promise
      if (result && typeof result.then === 'function') {
        return result.catch(handleError);
      }
    } catch (error) {
      handleError(error);
    }
  }
  async onStateChange() {
    this.catch(async () => {
      this.applyEffects();
      let vNodes = this.html();
      let patches = [];
      const isVNodesArray = Array.isArray(vNodes);
      if (isVNodesArray) {
        vNodes = BaseComponent.flattenVNodeChildren(vNodes);
      }
      if (isVNodesArray) {
        if (vNodes[0] && vNodes[0].parentNode) {
          vNodes = null;
          return;
        }
      } else {
        if (vNodes?.parentNode) {
          vNodes = null;
          return;
        }
      }
      const maxLength = Math.max(
        this.childNodes.length,
        isVNodesArray ? vNodes.length : 1
      );
      for (let i = 0; i < maxLength; i++) {
        const newVNode = isVNodesArray ? vNodes[i] : vNodes;
        const currentVNode = this.childNodes[i];
        patches.push(...this.diff(this, currentVNode, newVNode));
      }
      vNodes = null;
      this.applyPatches(patches);
    });
  }
  html() {
    return null;
  }
  static construct(tag, props, ...children) {
    if (Array.isArray(tag)) {
      return tag;
    }
    let clazz = tag;
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
  static isPrimitive(data) {
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
    return primitves.some(
      primitve => primitve === (data === null ? 'null' : dataType)
    );
  }
  static ReblendPrimitive = BaseComponent.register(
    class ReblendPrimitive extends BaseComponent {
      static ELEMENT_NAME = REBLEND_PRIMITIVE_ELEMENT_NAME;
      reblendPrimitiveData;
      node = null;
      constructor() {
        super();
      }
      html() {
        return this.node;
      }
      setData(data) {
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
      cleanUp() {
        if (this.node) {
          this.removeChild(this.node);
          this.node = null;
        }
      }
    }
  );
  static createChildren(children, containerArr = []) {
    for (let child of children) {
      if (isCallable(child)) {
        containerArr.push(child);
      } else if (Array.isArray(child)) {
        BaseComponent.createChildren(child, containerArr);
      } else if (BaseComponent.isPrimitive(child)) {
        containerArr.push(new BaseComponent.ReblendPrimitive().setData(child));
      } else if (child instanceof Reblend || child instanceof Node) {
        containerArr.push(child);
      } else if ('tag' in child && 'props' in child) {
        const domChild = BaseComponent.createElement(child);
        containerArr.push(domChild);
      } else {
        throw new TypeError('Invalid child node  in children');
      }
    }
    return containerArr;
  }
  onMountEffects = [];
  mountEffects() {
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
      this.shadow = null;
      this.shadowWrapper = null;
      this.props = null;
      this._state = null;
      this.parentElement?.removeChild(this);
    }
  }
  cleanUp() {}
  componentWillUnmount() {}
  effectsFn = [];
  disconnectEffects = [];
  static mountOn(elementId, app, props) {
    const root = document.getElementById(elementId);
    if (!root) {
      throw new Error('Invalid root id');
    }
    const vNodes = BaseComponent.construct(app, props || {}, ...[]);
    const nodes = BaseComponent.createChildren(
      Array.isArray(vNodes) ? vNodes : [vNodes]
    );
    for (const node of nodes) {
      root.append(node);
    }
  }
  stateIdNotIncluded = new Error('State Identifier/Key not specified');
  useState(initial, ...dependencyStringAndOrStateKey) {
    const stateID = dependencyStringAndOrStateKey.pop();
    if (!stateID) {
      throw this.stateIdNotIncluded;
    }
    if (typeof initial === 'function') initial = initial();
    this[stateID] = initial;
    const variableSetter = value => {
      if (typeof value === 'function') {
        value = value(this[stateID]);
      }
      if (!lodash.isEqual(this[stateID], value)) {
        this[stateID] = value;
        this.onStateChange();
      }
    };
    return [initial, variableSetter];
  }
  useEffect(fn, dependencies, ...dependencyStringAndOrStateKey) {
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
  useReducer(reducer, initial, ...dependencyStringAndOrStateKey) {
    reducer = reducer.bind(this);
    const stateID = dependencyStringAndOrStateKey.pop();
    if (!stateID) {
      throw this.stateIdNotIncluded;
    }
    let [state, setState] = this.useState(initial, stateID);
    this[stateID] = state;
    const fn = newValue => {
      let reducedVal;
      if (typeof newValue === 'function') {
        reducedVal = reducer(this[stateID], newValue(this[stateID]));
      } else {
        reducedVal = reducer(this[stateID], newValue);
      }
      setState(reducedVal);
    };
    return [this[stateID], fn];
  }
  useMemo(fn, dependencies, ...dependencyStringAndOrStateKey) {
    fn = fn.bind(this);
    const stateID = dependencyStringAndOrStateKey.pop();
    if (!stateID) {
      throw this.stateIdNotIncluded;
    }
    let [state, setState] = this.useState(fn(), stateID);
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
  /**
   * Keeps variable out of state management
   *
   * Changes to current does not cause effect
   * @param initial Initial value of current
   * @returns Ref<T>
   */
  useRef(initial) {
    const ref = { current: initial };
    return ref;
  }
  useCallback(fn) {
    return fn.bind(this);
  }
}
registerElement(`BaseComponent`, BaseComponent);
export default BaseComponent;
