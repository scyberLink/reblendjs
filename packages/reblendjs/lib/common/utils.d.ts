import IAny from '../interface/IAny';
export declare function objectEquals(
  obj1: {
    [x: string]: any;
  } | null,
  obj2: {
    [x: string]: any;
  } | null
): boolean;
export declare function getDefinedValuesFrom(object: { [key: string]: any }): {
  [key: string]: any;
};
export declare function escapeRegExp(value: string): string;
export declare function sumField(
  objArr: {
    [key: string]: any;
  }[],
  ...field: string[]
): number;
export declare function getObjectField(
  obj: {
    [key: string]: any;
  },
  fields: string[]
): any;
export declare const shallowRemoveDuplicates: (arr: any[]) => any[];
export declare const snakeCase: (camelCase: string) => string;
export declare const appendChildren: (
  parent: HTMLElement | null,
  ...children: HTMLElement[]
) => HTMLElement;
export declare const removeLastChild: (parent: HTMLElement | null) => ChildNode;
export declare const cssString: (styleObject: IAny) => string;
export declare const cssObjectFromString: (
  styleString: string
) => CSSStyleDeclaration;
export declare const spreadTo: (parentObj: IAny, objToSpread: IAny) => IAny;
export declare function registerElement(
  name: string,
  element: typeof HTMLElement
): any;
export declare function capitalize(str: string): string;
export declare const rand: (min?: number, max?: number) => number;
export declare const isSubclassOf: (
  subclass: Function,
  superclass: Function
) => boolean;
export declare const isCallable: (obj: any) => boolean;
