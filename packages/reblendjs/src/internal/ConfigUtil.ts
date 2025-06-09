import { ReblendTyping } from 'reblend-typing'

export interface IReblendAppConfig {
  noDefering?: boolean
  noPreloader?: boolean
  deferTimeout?: number
  preloaderDeferTimeout?: number
  placeholderDeferTimeout?: number
  lazyComponentDeferTimeout?: number
  preloader?: ReblendTyping.ReblendNode
  placeholder?: ReblendTyping.ReblendNode
}

export class ConfigUtil {
  static instance: ConfigUtil
  defaultConfigs: IReblendAppConfig = {
    noDefering: false,
    deferTimeout: 0,
    noPreloader: false,
    preloaderDeferTimeout: 1000,
    placeholderDeferTimeout: 100,
    lazyComponentDeferTimeout: 500,
  }
  configs: IReblendAppConfig = this.defaultConfigs

  constructor() {
    if (ConfigUtil.instance) {
      return ConfigUtil.instance
    } else {
      ConfigUtil.instance = this
    }
  }

  static getInstance() {
    return new ConfigUtil()
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
