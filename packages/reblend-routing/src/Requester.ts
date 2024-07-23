/*!
 * scyberLink
 * Copyright(c) 2024 Emmanuel Paul Elom
 * MIT Licensed
 */

'use strict';

import Request from './Request';
import { MethodsType, REQUEST_EVENT } from './utils';

class Requester {
  static for(url: string, method: keyof MethodsType) {
    const req = new Request(url, method);
    dispatchEvent(new CustomEvent(REQUEST_EVENT, { detail: req }));
  }
}

export default Requester;
