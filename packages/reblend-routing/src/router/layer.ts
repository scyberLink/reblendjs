/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

//@ts-ignore
import pathRegexp, { Key } from 'path-to-regexp';
import debugModule from 'debug';
import Route from './Route';
import Request from '../Request';

const debug = debugModule('express:router:layer');

/**
 * Module variables.
 * @private
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Module exports.
 * @public
 */
export default class Layer {
  handle!: Function;
  name!: string;
  params: Record<string, any> | undefined;
  path: string | undefined;
  keys!: Key[];
  regexp: any;
  route?: Route;
  method?: string;

  constructor(path: string, options: Record<string, any>, fn: Function) {
    if (!(this instanceof Layer)) {
      return new Layer(path, options, fn);
    }

    debug('new %o', path);
    const opts = options || {};

    this.handle = fn;
    this.name = fn.name || '<anonymous>';
    this.params = undefined;
    this.path = undefined;
    this.keys = [];
    this.regexp = pathRegexp(path, this.keys, opts);

    // set fast path flags
    this.regexp.fast_star = path === '*';
    this.regexp.fast_slash = path === '/' && opts.end === false;
  }

  /**
   * Handle the error for the layer.
   *
   * @param {Error} error
   * @param {Request} req
   * @param {function} next
   * @api private
   */
  handle_error(error: Error, req: any, next: Function) {
    const fn = this.handle;

    if (fn.length !== 4) {
      // not a standard error handler
      return next(error);
    }

    try {
      fn(error, req, next);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handle the request for the layer.
   *
   * @param {Request} req
   * @param {function} next
   * @api private
   */
  handle_request(req: Request, next: Function) {
    const fn = this.handle;

    if (fn.length > 3) {
      // not a standard request handler
      return next();
    }

    try {
      fn(req, next);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Check if this route matches `path`, if so
   * populate `.params`.
   *
   * @param {String} path
   * @return {Boolean}
   * @api private
   */
  match(path: string): boolean {
    let match: RegExpExecArray | null | undefined;

    if (path != null) {
      // fast path non-ending match for / (any path matches)
      if (this.regexp.fast_slash) {
        this.params = {};
        this.path = '';
        return true;
      }

      // fast path for * (everything matched in a param)
      if (this.regexp.fast_star) {
        this.params = { '0': decode_param(path) };
        this.path = path;
        return true;
      }

      // match the path
      match = this.regexp.exec(path);
    }

    if (!match) {
      this.params = undefined;
      this.path = undefined;
      return false;
    }

    // store values
    this.params = {};
    this.path = match[0];

    const keys = this.keys;
    const params = this.params;

    for (let i = 1; i < match.length; i++) {
      const key = keys[i - 1];
      const prop = key.name;
      const val = decode_param(match[i]);

      if (val !== undefined || !hasOwnProperty.call(params, prop)) {
        params[prop] = val;
      }
    }

    return true;
  }
}

/**
 * Decode param value.
 *
 * @param {string} val
 * @return {string}
 * @private
 */
function decode_param(val: string): string {
  if (typeof val !== 'string' || val.length === 0) {
    return val;
  }

  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = `Failed to decode param '${val}'`;
      (err as any).status = (err as any).statusCode = 400;
    }

    throw err;
  }
}
