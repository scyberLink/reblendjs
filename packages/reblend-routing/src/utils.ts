/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

import qs from 'qs';
import { Request } from './index';

/**
 * Check if `path` looks absolute.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */
export function isAbsolute(path: string): boolean {
  if (path[0] === '/') return true;
  if (path[1] === ':' && (path[2] === '\\' || path[2] === '/')) return true; // Windows device path
  if (path.substring(0, 2) === '\\\\') return true; // Microsoft Azure absolute path
  return false;
}

/**
 * Compile "query parser" value to function.
 *
 * @param  {String|Function} val
 * @return {Function}
 * @api private
 */
export function compileQueryParser(
  val: string | ((str: string) => Record<string, any>)
): (str: string) => Record<string, any> {
  let fn: (str: string) => Record<string, any>;

  if (typeof val === 'function') {
    return val;
  }

  switch (val) {
    case 'simple':
      fn = parseSimpleQueryString;
      break;
    case 'extended':
      fn = parseExtendedQueryString;
      break;
    default:
      throw new TypeError(`unknown value for query parser function: ${val}`);
  }

  return fn;
}

/**
 * Parse a simple query string with URLSearchParams.
 *
 * @param {String} str
 * @return {Object}
 * @private
 */
function parseSimpleQueryString(str: string): Record<string, string> {
  const params = new URLSearchParams(str);
  const result: Record<string, string> = {};
  params.forEach((value, key) => (result[key] = value));
  return result;
}

/**
 * Parse an extended query string with qs.
 *
 * @param {String} str
 * @return {Object}
 * @private
 */
function parseExtendedQueryString(str: string): Record<string, any> {
  return qs.parse(str, {
    allowPrototypes: true,
  });
}

export type MethodsType = {
  get: (path: string, handler: (req: Request, next: Function) => any) => any;
  put: (path: string, handler: (req: Request, next: Function) => any) => any;
  post: (path: string, handler: (req: Request, next: Function) => any) => any;
  update: (path: string, handler: (req: Request, next: Function) => any) => any;
  option: (path: string, handler: (req: Request, next: Function) => any) => any;
  patch: (path: string, handler: (req: Request, next: Function) => any) => any;
};
export const methods = ['get', 'put', 'post', 'update', 'option', 'patch'];
export const REQUEST_EVENT = 'routing-request';
export const REQUEST_NOTFOUND = 'routing-request-notfound';
