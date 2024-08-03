import { IAny } from '../interface/IAny';
import NullException from '../exceptions/NullException';

export function objectEquals(
  obj1: { [x: string]: any } | null,
  obj2: { [x: string]: any } | null
) {
  // Check if both object are strictly equal
  if (obj1 === obj2) {
    return true;
  }

  // Check if either object is null or not
  if (
    typeof obj1 !== 'object' ||
    obj1 == null ||
    typeof obj2 !== 'object' ||
    obj2 == null
  ) {
    return false;
  }

  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate through the keys and recursively check for equality
  for (const key of keys1) {
    if (!keys2.includes(key) || !objectEquals(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

export function getDefinedValuesFrom(object: { [key: string]: any }) {
  const definedValues: { [key: string]: any } = {};
  for (const key in object) {
    const value = object[key];
    if (value != null && value != undefined) {
      definedValues[key] = value;
    }
  }
  return definedValues;
}

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function sumField(objArr: { [key: string]: any }[], ...field: string[]) {
  if (!objArr || (Array.isArray(objArr) && objArr.length <= 0)) {
    return 0;
  }
  let sum = 0;
  for (const obj of objArr) {
    let theValue = getObjectField(obj, field);
    if (theValue) {
      if (typeof theValue === 'string') {
        theValue = parseInt(theValue);
      }
      if (typeof theValue === 'number') {
        sum += theValue;
      }
    }
  }
  return sum;
}

export function getObjectField(
  obj: { [key: string]: any },
  fields: string[]
): any {
  const f = [...fields];
  if (f.length <= 0 || !obj) {
    return obj;
  }
  const leftMostFieldName = f.shift();
  if (!leftMostFieldName) {
    return obj;
  }
  return getObjectField(obj[leftMostFieldName], f);
}

export const shallowRemoveDuplicates = (arr: any[]): any[] => {
  const unique = new Set();
  const filtered = arr?.filter(item => {
    if (item && !unique.has(item)) {
      unique.add(item);
      return true;
    }
    return false;
  });
  return filtered;
};

export const snakeCase = (camelCase: string): string => {
  return camelCase
    .replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
    .substring(1);
};

export const appendChildren = (
  parent: HTMLElement | null,
  ...children: HTMLElement[]
) => {
  if (!parent) {
    throw new NullException();
  }
  for (const child of children) {
    parent.appendChild(child);
  }
  return parent;
};

export const removeLastChild = (parent: HTMLElement | null) => {
  if (!parent) {
    throw new NullException();
  }
  const removedChild = parent.removeChild(parent.lastChild as ChildNode);

  return removedChild;
};

export const cssString = (styleObject: IAny) => {
  let styleString = '';

  for (const [key, value] of Object.entries(styleObject)) {
    styleString += `${key}: ${value === undefined ? 'initial' : value}; \n`;
  }

  return styleString.trim();
};

export const cssObjectFromString = (
  styleString: string
): CSSStyleDeclaration => {
  const regex = /([a-zA-Z-]+)\s*:\s*([^;]+)/g;
  const cssObject: CSSStyleDeclaration = {} as any;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(styleString)) !== null) {
    const styleName = match[1].trim();
    const value = match[2].trim();
    cssObject[styleName] = value;
  }

  return cssObject;
};

export const spreadTo = (parentObj: IAny, objToSpread: IAny) => {
  if (!objToSpread || !parentObj) {
    return parentObj;
  }
  const keys = Object.keys(objToSpread);
  const values = Object.values(objToSpread);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = values[i];
    parentObj[key] = value;
  }
  return parentObj;
};

export function registerElement(
  name: string,
  element: typeof HTMLElement
): any {
  if (!element) {
    throw new Error('Element to register is null');
  }

  const tagName = snakeCase(name);

  if (!customElements.get(tagName)) {
    try {
      customElements.define(tagName, element);
    } catch (error: any) {
      console.warn(error.message);
    }
  }

  return element;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const rand = (min = 1234, max = 9876) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isCallable = (obj: any) => {
  if (typeof obj !== 'function') {
    return false;
  }

  try {
    // Check if obj is a class constructor by inspecting its string representation
    // Classes typically have a string representation starting with "class"
    const str = Function.prototype.toString.call(obj);
    if (str.startsWith('class')) {
      return false;
    }
  } catch (e) {
    // If any error occurs during string conversion, assume it's not callable
    return false;
  }

  return true;
};

export const REBLEND_COMPONENT_ATTRIBUTE_NAME = 'ReblendComponent';
export const REBLEND_WRAPPER_FOR__ATTRIBUTE_NAME =
  'ReblendWrapperForReactComponent';
