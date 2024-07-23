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

import Router from './router/Router';
import debugLib from 'debug';
import { compileQueryParser } from './utils';
//@ts-ignore
import flatten from 'array-flatten';
//@ts-ignore
import setPrototypeOf from 'setprototypeof';
import Request from './Request';

const debug = debugLib('express:application');

/**
 * Module variables.
 * @private
 */

const { slice } = Array.prototype;

/**
 * Application prototype.
 */

interface IApplication {
  cache: Record<string, any>;
  settings: Record<string, any>;
  locals: Record<string, any>;
  mountpath: string;
  _router: Router;
  parent?: IApplication;
  init: () => void;
  defaultConfiguration: () => void;
  lazyrouter: () => void;
  handle: (req: Request, callback?: Function) => void;
  use: (...args: any[]) => this;
  route: (path: string) => any;
  param: (name: string | string[], fn: Function) => this;
  set: (setting: string, val?: any) => any;
  get: (setting: string) => any;
  path: () => string;
  enabled: (setting: string) => boolean;
  disabled: (setting: string) => boolean;
  enable: (setting: string) => this;
  disable: (setting: string) => this;
  configure: (env?: string | Function, fn?: Function) => this;
  logerror: (i: any) => any;
  request: Request;
  wrap: Function;
}

const app: IApplication = {
  cache: {},
  settings: {},
  locals: {},
  request: null as any,
  mountpath: '/',
  _router: null as any,

  init() {
    this.cache = {};
    this.settings = {};

    this.defaultConfiguration();
  },

  defaultConfiguration() {
    this.set('query parser', 'extended');
    this.set('subdomain offset', 2);
    this.set('trust proxy', false);

    debug('booting in %s mode', 'default');

    addEventListener('mount', ({ detail }: any) => {
      const parent: IApplication = detail;
      // inherit protos
      setPrototypeOf(this.request, parent.request);
      setPrototypeOf(this.settings, parent.settings);
    });

    // setup locals
    this.locals = Object.create(null);

    // top-most app is mounted at /
    this.mountpath = '/';

    // default locals
    this.locals.settings = this.settings;
  },

  lazyrouter() {
    if (!this._router) {
      this._router = new Router({
        caseSensitive: this.enabled('case sensitive routing'),
        strict: this.enabled('strict routing'),
      });
    }
  },

  handle(req: Request, callback?: Function) {
    const router = this._router;

    // no routes
    if (!router) {
      debug('no routes defined on app');
      return;
    }

    router.handle(req, callback);
  },

  use(...args: any[]) {
    let offset = 0;
    let path = '/';

    // default path to '/'
    // disambiguate app.use([fn])
    if (typeof args[0] !== 'function') {
      let arg = args[0];

      while (Array.isArray(arg) && arg.length !== 0) {
        arg = arg[0];
      }

      // first arg is the path
      if (typeof arg !== 'function') {
        offset = 1;
        path = args[0];
      }
    }

    const fns = flatten(slice.call(args, offset));

    if (fns.length === 0) {
      throw new TypeError('app.use() requires a middleware function');
    }

    // setup router
    this.lazyrouter();
    const router = this._router;

    fns.forEach((fn: any) => {
      // non-express app
      if (!fn || !fn.handle || !fn.set) {
        return router.use(path, fn);
      }

      debug('.use app under %s', path);
      fn.mountpath = path;
      fn.parent = this;

      // restore .app property on req and res
      router.use(path, function mounted_app(req: string, next: Function) {
        fn.handle(req, (err: Error) => {
          next(err);
        });
      });

      // mounted an app
      dispatchEvent(new CustomEvent('mount', { detail: this }));
    }, this);

    return this;
  },

  route(path: string) {
    this.lazyrouter();
    return this._router.route(path);
  },

  param(name: string | string[], fn: Function) {
    this.lazyrouter();

    if (Array.isArray(name)) {
      for (let i = 0; i < name.length; i++) {
        this.param(name[i], fn);
      }

      return this;
    }

    this._router.param(name, fn);

    return this;
  },

  set(setting: string, val?: any) {
    if (arguments.length === 1) {
      // app.get(setting)
      return this.settings[setting];
    }

    debug('set "%s" to %o', setting, val);

    // set value
    this.settings[setting] = val;

    // trigger matched settings
    switch (setting) {
      case 'query parser':
        this.set('query parser fn', compileQueryParser(val));
        break;
    }

    return this;
  },
  get(setting: string) {
    return this.settings[setting];
  },

  path() {
    return this.parent ? this.parent.path() + this.mountpath : this.mountpath;
  },

  enabled(setting: string) {
    return Boolean(this.set(setting));
  },

  disabled(setting: string) {
    return !this.set(setting);
  },

  enable(setting: string) {
    return this.set(setting, true);
  },

  disable(setting: string) {
    return this.set(setting, false);
  },

  configure(env?: string | Function, fn?: Function) {
    let envs: string | string[] = 'all';
    const args = slice.call(arguments);

    fn = args.pop();

    if (args.length) {
      envs = args;
    }

    if (envs === 'all' || (<string>envs).includes(this.settings.env)) {
      fn?.call(this);
    }

    return this;
  },

  /**
   * Log error using console.error.
   *
   * @param {Error} err
   * @private
   */

  logerror(this: IApplication, err: Error) {
    /* istanbul ignore next */
    if (this.get('env') !== 'test') console.error(err.stack || err.toString());
  },

  /**
   * Convert a callback to a standard middleware function.
   *
   * @param {Function} fn
   * @return {Function}
   * @private
   */

  wrap(fn: Function): Function {
    return ((...args: any[]) => fn.apply(this, args)).bind(this);
  },
};

export default app;
