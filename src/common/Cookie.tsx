/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
/* eslint-disable require-jsdoc */
import { YEAR } from '../config/constants'

class Cookie {
  name: any
  value: any
  maxAge: number
  path: string
  constructor(name: any, value: string, maxAge = YEAR, path = '/') {
    if (typeof value == 'object') {
      value = JSON.stringify(value)
    }
    this.name = name
    this.value = value
    this.maxAge = Date.now() + maxAge
    this.path = path
    this.set()
  }

  set() {
    document.cookie = `${this.name}=${encodeURIComponent(this.value)}; max-age=${this.maxAge}; path=${this.path}`
  }

  static get(name: string, returnJsonIfPossible = true) {
    const cookies = document.cookie.split('; ')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=')
      if (cookie[0] === name) {
        let value = decodeURIComponent(cookie[1])
        if (returnJsonIfPossible) {
          try {
            const converted = JSON.parse(value)
            if (converted) {
              value = converted
            }
          } catch (error) {}
        }
        return value
      }
    }
    return null
  }

  static delete(name: any) {
    document.cookie = `${name}=; max-age=-1; path=/;`
  }

  static has(key: any) {
    return Cookie.get(key) || false
  }

  static replace(name: any, value: string, maxAge = YEAR, path = '/') {
    if (typeof value == 'object') {
      value = JSON.stringify(value)
    }
    new Cookie(name, value, maxAge, path)
    const stored = Cookie.get(name)
    return stored || false
  }
}

export default Cookie
