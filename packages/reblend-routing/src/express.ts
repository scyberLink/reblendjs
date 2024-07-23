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
 */

import mixin from 'merge-descriptors';
import Route from './router/Route';
import Router from './router/Router';
import Request from './Request';
import application from './application';

/**
 * Create an express application.
 *
 * @return {Function}
 * @api public
 */
function createApplication() {
  const app = function (req: string, next: Function) {
    (app as any).handle(req, next);
  };

  mixin(app, application, false);

  // expose the prototype that will get set on requests
  (app as any).request = Object.create(Request, {
    app: { configurable: true, enumerable: true, writable: true, value: app },
  });

  (app as any).init();
  return app;
}

/**
 * Expose the prototypes.
 */
export { application, Request as request };

/**
 * Expose constructors.
 */
export { Route, Router };

// Export the createApplication function as the default export
export default createApplication;
