/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

import debugModule from 'debug';
//@ts-ignore
import flatten from 'array-flatten';
import Layer from './layer';
import { methods } from '../utils';

const debug = debugModule('express:router:route');

/**
 * Module exports.
 * @public
 */
export default class Route {
  path: string;
  stack: any[];
  methods: Record<string, boolean>;
  [method: string]: any;
  constructor(path: string) {
    this.path = path;
    this.stack = [];

    debug('new %o', path);

    // route handlers for various http methods
    this.methods = {};

    methods.forEach(method => {
      this[method] = function (...handlers: Function[]): Route {
        const handles = flatten(handlers);

        for (const handle of handles) {
          if (typeof handle !== 'function') {
            const type = toString.call(handle);
            const msg = `Route.${method}() requires a callback function but got a ${type}`;
            throw new Error(msg);
          }

          debug('%s %o', method, this.path);

          const layer = new Layer('/', {}, handle);
          layer.method = method;

          this.methods[method] = true;
          this.stack.push(layer);
        }

        return this;
      };
    });
  }

  /**
   * Determine if the route handles a given method.
   * @private
   */
  _handles_method(method: string): boolean {
    if (this.methods._all) {
      return true;
    }

    // normalize name
    let name = typeof method === 'string' ? method.toLowerCase() : method;

    if (name === 'head' && !this.methods['head']) {
      name = 'get';
    }

    return Boolean(this.methods[name]);
  }

  /**
   * @return {Array} supported HTTP methods
   * @private
   */
  _options(): string[] {
    const methods = Object.keys(this.methods);

    // append automatic head
    if (this.methods.get && !this.methods.head) {
      methods.push('head');
    }

    for (let i = 0; i < methods.length; i++) {
      // make upper case
      methods[i] = methods[i].toUpperCase();
    }

    return methods;
  }

  /**
   * dispatch req, res into this route
   * @private
   */
  dispatch(req: any, res: any, done: (err?: any) => void): void {
    let idx = 0;
    const stack = this.stack;
    let sync = 0;

    if (stack.length === 0) {
      return done();
    }
    let method =
      typeof req.method === 'string' ? req.method.toLowerCase() : req.method;

    if (method === 'head' && !this.methods['head']) {
      method = 'get';
    }

    req.route = this;

    next();

    function next(err?: any) {
      // signal to exit route
      if (err && err === 'route') {
        return done();
      }

      // signal to exit router
      if (err && err === 'router') {
        return done(err);
      }

      // max sync stack
      if (++sync > 100) {
        return next(err);
      }

      const layer = stack[idx++];

      // end of layers
      if (!layer) {
        return done(err);
      }

      if (layer.method && layer.method !== method) {
        next(err);
      } else if (err) {
        layer.handle_error(err, req, res, next);
      } else {
        layer.handle_request(req, res, next);
      }

      sync = 0;
    }
  }

  /**
   * Add a handler for all HTTP verbs to this route.
   *
   * Behaves just like middleware and can respond or call `next`
   * to continue processing.
   *
   * You can use multiple `.all` call to add multiple handlers.
   *
   *   function check_something(req, res, next){
   *     next();
   *   };
   *
   *   function validate_user(req, res, next){
   *     next();
   *   };
   *
   *   route
   *   .all(validate_user)
   *   .all(check_something)
   *   .get(function(req, res, next){
   *     res.send('hello world');
   *   });
   *
   * @param {function} handler
   * @return {Route} for chaining
   * @api public
   */
  all(...handlers: Function[]): Route {
    const handles = flatten(handlers);

    for (const handle of handles) {
      if (typeof handle !== 'function') {
        const type = toString.call(handle);
        const msg = `Route.all() requires a callback function but got a ${type}`;
        throw new TypeError(msg);
      }

      const layer = new Layer('/', {}, handle);
      layer.method = undefined;

      this.methods._all = true;
      this.stack.push(layer);
    }

    return this;
  }
}
