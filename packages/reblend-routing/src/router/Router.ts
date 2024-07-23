/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

import Route from './Route';
import Layer from './layer';
import mixin from 'utils-merge';
import debugModule from 'debug';
//@ts-ignore
import flatten from 'array-flatten';
import { methods } from '../utils';
import Request from '../Request';
import IAny from '../IAny';

const debug = debugModule('express:router');
const objectRegExp = /^\[object (\S+)\]$/;

interface RouterOptions {
  caseSensitive?: boolean;
  mergeParams?: boolean;
  strict?: boolean;
}

/**
 * Initialize a new `Router` with the given `options`.
 *
 * @param {Object} [options]
 * @return {Router} which is a callable function
 * @public
 */

interface Router {
  (req: any, res: any, next: any): void;
  params: Record<string, any[]>;
  _params: any[];
  caseSensitive: boolean;
  mergeParams: boolean;
  strict: boolean;
  stack: any[];
  param(name: string | Function, fn: Function): Router;
  handle(req: any, res: any, out: any): void;
  process_params(layer: any, called: any, req: any, done: Function): void;
  use(fn: Function | string, ...fns: Function[]): Router;
  route(path: string): Route;
  [method: string]: any;
}

class Router {
  constructor(options: RouterOptions) {
    this.params = {};
    this._params = [];
    this.caseSensitive = options.caseSensitive || false;
    this.mergeParams = options.mergeParams || false;
    this.strict = options.strict || false;
    this.stack = [];
    // create Router#VERB functions
    methods.forEach(method => {
      this[method] = function (path: string) {
        const route = this.route(path);
        route[method].apply(route, Array.prototype.slice.call(arguments, 1));
        return this;
      };
    });
  }

  /**
   * Map the given param placeholder `name`(s) to the given callback.
   *
   * Parameter mapping is used to provide pre-conditions to routes
   * which use normalized placeholders. For example a _:user_id_ parameter
   * could automatically load a user's information from the database without
   * any additional code,
   *
   * The callback uses the same signature as middleware, the only difference
   * being that the value of the placeholder is passed, in this case the _id_
   * of the user. Once the `next()` function is invoked, just like middleware
   * it will continue on to execute the route, or subsequent parameter functions.
   *
   * Just like in middleware, you must either respond to the request or call next
   * to avoid stalling the request.
   *
   *  app.param('user_id', function(req, res, next, id){
   *    User.find(id, function(err, user){
   *      if (err) {
   *        return next(err);
   *      } else if (!user) {
   *        return next(new Error('failed to load user'));
   *      }
   *      req.user = user;
   *      next();
   *    });
   *  });
   *
   * @param {String} name
   * @param {Function} fn
   * @return {app} for chaining
   * @public
   */

  param(name: string | Function, fn: Function): Router {
    // param logic
    if (typeof name === 'function') {
      this._params.push(name);
      return this;
    }

    // apply param functions
    const params = this._params;
    const len = params.length;
    let ret;

    if (name[0] === ':') {
      name = name.slice(1);
    }

    for (let i = 0; i < len; ++i) {
      if ((ret = params[i](name, fn))) {
        fn = ret;
      }
    }

    // ensure we end up with a
    // middleware function
    if (typeof fn !== 'function') {
      throw new Error('invalid param() call for ' + name + ', got ' + fn);
    }

    (this.params[name] = this.params[name] || []).push(fn);
    return this;
  }

  /**
   * Dispatch a req, res into the router.
   * @private
   */

  handle(req: Request, out: any): void {
    const self = this;

    debug('dispatching %s %s', req.method, req.url);

    let idx = 0;
    const protohost = getProtohost(req.url) || '';
    let removed = '';
    let slashAdded = false;
    let sync = 0;
    let paramcalled = {};

    // store options for OPTIONS request
    // only used if OPTIONS request
    const options: string | any[] = [];

    // middleware and routes
    let stack = self.stack;

    // manage inter-router variables
    let parentParams = req.params;
    let parentUrl = req.baseUrl || '';
    let done = restore(out, req, 'baseUrl', 'next', 'params');

    // setup next layer
    req.next = next;

    // setup basic req values
    req.baseUrl = parentUrl;
    req.originalUrl = req.originalUrl || req.url;

    next();

    function next(err?: unknown) {
      let layerError = err === 'route' ? null : err;

      // remove added slash
      if (slashAdded) {
        req.url = req.url.slice(1);
        slashAdded = false;
      }

      // restore altered req.url
      if (removed.length !== 0) {
        req.baseUrl = parentUrl;
        req.url = protohost + removed + req.url.slice(protohost.length);
        removed = '';
      }

      // signal to exit router
      if (layerError === 'router') {
        done(null);
        return;
      }

      // no more matching layers
      if (idx >= stack.length) {
        done(layerError);
        return;
      }

      // max sync stack
      if (++sync > 100) {
        return next(err);
      }

      // get pathname of request
      const path = req.urlObject.pathname;

      if (path == null) {
        return done(layerError);
      }

      // find next matching layer
      let layer: Layer = null as any;
      let match;
      let route: Route = null as any;

      while (match !== true && idx < stack.length) {
        layer = stack[idx++];
        match = matchLayer(layer, path);
        route = layer.route as Route;

        if (typeof match !== 'boolean') {
          // hold on to layerError
          layerError = layerError || match;
        }

        if (match !== true) {
          continue;
        }

        if (!route) {
          // process non-route handlers normally
          continue;
        }

        if (layerError) {
          // routes do not match with a pending error
          match = false;
          continue;
        }

        const method = req.method;
        const has_method = route._handles_method(method as string);
      }

      // no match
      if (match !== true) {
        return done(layerError);
      }

      // store route for dispatch on change
      if (route) {
        req.route = route;
      }

      // Capture one-time layer values
      req.params = self.mergeParams
        ? mergeParams(layer.params as any, parentParams)
        : layer.params;
      const layerPath = layer.path;

      // this should be done for the layer
      self.process_params(layer, paramcalled, req, function (err: any) {
        if (err) {
          next(layerError || err);
        } else if (route) {
          layer.handle_request(req, next);
        } else {
          trim_prefix(layer, layerError, layerPath as string, path);
        }

        sync = 0;
      });
    }

    function trim_prefix(
      layer: Layer,
      layerError: any,
      layerPath: string,
      path: string | any[]
    ) {
      if (layerPath.length !== 0) {
        // Validate path is a prefix match
        if (layerPath !== path.slice(0, layerPath.length)) {
          next(layerError);
          return;
        }

        // Validate path breaks on a path separator
        const c = path[layerPath.length];
        if (c && c !== '/' && c !== '.') return next(layerError);

        // Trim off the part of the url that matches the route
        removed = layerPath;
        req.url = protohost + req.url.slice(protohost.length + removed.length);

        // Ensure leading slash
        if (!protohost && req.url[0] !== '/') {
          req.url = '/' + req.url;
          slashAdded = true;
        }

        // Setup base URL (no trailing slash)
        req.baseUrl =
          parentUrl +
          (removed[removed.length - 1] === '/'
            ? removed.substring(0, removed.length - 1)
            : removed);
      }

      debug('trim prefix (%s) from url %s', layerPath, req.url);

      const trace = layerError ? new Error() : null;

      try {
        layer.handle_request(req, next);
      } catch (err) {
        next(err);
      }
    }
  }

  /**
   * Process any parameters for the layer.
   * @private
   */

  process_params(
    layer: Layer,
    called: {},
    req: Request,
    done: { (err?: any): void; (arg0: undefined): void }
  ): void {
    const params = this.params;

    // captured parameters from the layer, keys and values
    const keys = layer.keys;

    // fast track
    if (!keys || keys.length === 0) {
      return done();
    }

    let paramcalled = called;
    let paramIndex = 0;
    let paramVal = null;
    let paramCallbacks = null;
    let paramCallback = null;

    function param(err?: undefined) {
      if (err) {
        return done(err);
      }

      if (paramIndex >= keys.length) {
        return done();
      }

      paramVal = req.params![keys[paramIndex].name];
      paramCallbacks = params[keys[paramIndex].name];

      // param logic
      if (!paramCallbacks) {
        return param();
      }

      paramCallback = paramCallbacks[paramIndex++];

      if (paramCallback.length === 4) {
        paramCallback(err, req, param);
      } else {
        paramCallback(req, param, paramVal);
      }
    }

    param();
  }

  /**
   * Add a router middleware and mark as a router.
   *
   * @return {Router} for chaining
   * @public
   */

  use(fn: Function | string, ...fns: Function[]): Router {
    let offset = 0;
    let path = '/';

    // default path to '/'
    if (typeof fn !== 'function') {
      offset = 1;
      path = fn;
    }

    const callbacks = flatten(Array.prototype.slice.call(arguments, offset));

    if (callbacks.length === 0) {
      throw new TypeError('Router.use() requires a middleware function');
    }

    for (let i = 0; i < callbacks.length; i++) {
      const fn = callbacks[i];

      if (typeof fn !== 'function') {
        throw new TypeError(
          'Router.use() requires a middleware function but got a ' + gettype(fn)
        );
      }

      debug('use %s %s', path, fn.name || '<anonymous>');

      const layer = new Layer(
        path,
        {
          sensitive: this.caseSensitive,
          strict: false,
          end: false,
        },
        fn
      );

      layer.route = undefined;

      this.stack.push(layer);
    }

    return this;
  }

  /**
   * Create a new Route for the given path.
   *
   * Each route contains a separate middleware stack and VERB handlers.
   *
   * See the Route api documentation for details on adding handlers
   * and middleware to routes.
   *
   * @param {String} path
   * @return {Route}
   * @public
   */

  route(path: string): Route {
    const route = new Route(path);

    const layer = new Layer(
      path,
      {
        sensitive: this.caseSensitive,
        strict: this.strict,
        end: true,
      },
      route.dispatch.bind(route)
    );

    layer.route = route;

    this.stack.push(layer);
    return route;
  }
}

/**
 * Append methods to a list of methods.
 *
 * @param {Array} list
 * @param {Array} addition
 * @private
 */

function appendMethods(list: any[], addition: string | any[]) {
  for (let i = 0; i < addition.length; i++) {
    const method = addition[i];
    if (list.indexOf(method) === -1) {
      list.push(method);
    }
  }
}

/**
 * Get get protocol + host for a URL.
 *
 * @param {string} url
 * @private
 */

function getProtohost(url: string) {
  if (url.length === 0 || url[0] === '/') {
    return undefined;
  }

  const fqdnIndex = url.indexOf('://');

  return fqdnIndex !== -1 && url.lastIndexOf('?', fqdnIndex) === -1
    ? url.substring(0, url.indexOf('/', 3 + fqdnIndex))
    : undefined;
}

/**
 * Get type for error message.
 *
 * @param  {Mixed} thing
 * @return {String}
 * @private
 */

function gettype(thing: any) {
  const str = toString.call(thing);
  return str.replace(objectRegExp, '$1');
}

/**
 * Merge params with parent params
 *
 * @param {Object} params
 * @param {Object} parent
 * @return {Object} merged params
 * @private
 */

function mergeParams(params: any[], parent: any): IAny {
  if (typeof parent !== 'object' || !parent) {
    return params;
  }

  // make copy of parent for base
  const obj = mixin({}, parent);

  // simple non-numeric merging
  if (!(0 in params) || !(0 in parent)) {
    return mixin(obj, params);
  }

  let i = 0;
  let o = 0;

  // determine numeric gap in params
  while (i in params) {
    i++;
  }

  // determine numeric gap in parent
  while (o in parent) {
    o++;
  }

  // offset numeric indices in params before merge
  for (i--; i >= 0; i--) {
    params[i + o] = params[i];

    // create holes for the merge when necessary
    if (i < o) {
      delete params[i];
    }
  }

  return mixin(obj, params);
}

/**
 * Restore obj props after function.
 *
 * @param {Object} obj
 * @param {String} prop
 * @param {Mixed} val
 * @return {Function}
 * @private
 */

function restore(
  fn: Function,
  obj: { [x: string]: any },
  ..._properties: any[]
) {
  const props = new Array(arguments.length - 2);
  const vals = new Array(arguments.length - 2);

  for (let i = 0; i < props.length; i++) {
    props[i] = arguments[i + 2];
    vals[i] = obj[props[i]];
  }

  return function (err?: any) {
    // restore vals
    for (let i = 0; i < props.length; i++) {
      obj[props[i]] = vals[i];
    }
    //@ts-ignore
    return fn.apply(this, arguments);
  };
}

/**
 * Wrap a function
 *
 * @param {function} old
 * @param {function} fn
 * @return {function}
 * @private
 */

function wrap(
  old: (err?: any) => any,
  fn: { (old: any, err: any): any; apply?: any }
) {
  return function proxy(this: any) {
    fn.apply(this, [old].concat(Array.prototype.slice.call(arguments)));
  };
}

export default Router;
/**
 * Match path to a layer.
 *
 * @param {Layer} layer
 * @param {string} path
 * @private
 */

function matchLayer(layer: Layer, path: string) {
  try {
    return layer.match(path);
  } catch (err) {
    return err;
  }
}
