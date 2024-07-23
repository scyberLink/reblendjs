/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

import IAny from './IAny';
import { Route } from './index';
import { MethodsType } from './utils';

/**
 * Request prototype.
 * @public
 */
class Request {
  params?: IAny = {};
  body?: IAny = {};
  query: IAny = {};
  baseUrl?: string;
  next?: Function;
  originalUrl?: string;
  route?: Route;
  urlObject: URL;

  constructor(public url: string, public method: keyof MethodsType) {
    this.urlObject = new URL(decodeURI(this.url));
    this.urlObject.searchParams.forEach(
      (value, key) => (this.query[key] = value)
    );
  }
  /**
   * Return the value of param `name` when present or `defaultValue`.
   *
   *  - Checks route placeholders, ex: _/user/:id_
   *  - Checks body params, ex: id=12, {"id":12}
   *  - Checks query string params, ex: ?id=12
   *
   * To utilize request bodies, `req.body`
   * should be an object. This can be done by using
   * the `bodyParser()` middleware.
   *
   * @param {String} name
   * @param {Mixed} [defaultValue]
   * @return {String}
   * @public
   */

  param(name: string, defaultValue?: any): any {
    if (
      this.params![name] != null &&
      Object.prototype.hasOwnProperty.call(this.params, name)
    )
      return this.params![name];
    if (this.body![name] != null) return this.body![name];
    if (this.query![name] != null) return this.query![name];

    return defaultValue;
  }

  /**
   * Return the protocol string "http" or "https"
   * when requested with TLS. When the "trust proxy"
   * setting trusts the socket address, the
   * "X-Forwarded-Proto" header field will be trusted
   * and used if present.
   *
   * If you're running behind a reverse proxy that
   * supplies https for you this may be enabled.
   *
   * @return {String}
   * @public
   */
  protocol(): string {
    return this.url.split('://')[0];
  }

  /**
   * Short-hand for:
   *
   *    req.protocol === 'https'
   *
   * @return {Boolean}
   * @public
   */ secure(): boolean {
    return this.urlObject.href.includes('https');
  }

  /**
   * Short-hand for `url.parse(req.url).pathname`.
   *
   * @return {String}
   * @public
   */ path(): string {
    return this.urlObject.pathname;
  }
}

/**
 * Module exports.
 * @public
 */
export default Request;
