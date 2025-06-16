import * as ReblendTyping from 'reblend-typing'
import { Config } from 'reblend-deep-equal-iterative'

export interface IReblendAppConfig {
  noDefering?: boolean
  noPreloader?: boolean
  deferTimeout?: number
  preloaderDeferTimeout?: number
  placeholderDeferTimeout?: number
  lazyComponentDeferTimeout?: number
  preloader?: ReblendTyping.ReblendNode
  placeholder?: ReblendTyping.ReblendNode
  diffConfig?: Config
}

export class ConfigUtil {
  static instance: ConfigUtil
  static getInstance() {
    return new ConfigUtil()
  }
  defaultConfigs: IReblendAppConfig = {
    noDefering: false,
    deferTimeout: 0,
    noPreloader: false,
    preloaderDeferTimeout: 1000,
    placeholderDeferTimeout: 100,
    lazyComponentDeferTimeout: 500,
    diffConfig: {
      keyThreshold: 50,
      depthThreshold: 3,
      treatInstancesAsEqual: [Node],
      excludeKeys: ['ref'],
    },
  }
  configs: IReblendAppConfig = this.defaultConfigs

  constructor() {
    if (ConfigUtil.instance) {
      return ConfigUtil.instance
    } else {
      ConfigUtil.instance = this
    }
  }

  update(config?: IReblendAppConfig) {
    if (config) {
      Object.assign(this.configs, config)
    }
    return this.configs
  }

  reset() {
    this.configs = this.defaultConfigs
  }
}
