import IAny from '../interface/IAny';
declare class GlobalConfig {
  MEMORY_STORAGE: number;
  LOCAL_STORAGE: number;
  SESSION_STORAGE: number;
  DESTROY_ALL: number;
  static _instance: any;
  dynamicConfig: IAny;
  __get: (key: any, where: any) => any;
  __set: (key: any, value: any, where: any) => void;
  __remove: (key: any, where: any) => any;
  __destroy: (where: any) => void;
  __removeFrom: (
    fromKey: any,
    valueToRemove: null | undefined,
    where: any
  ) => any;
  __has: (key: any, where: any) => boolean;
  constructor();
  get(key: any): any;
  set(key: string, value: IAny): void;
  addTo(parentKey: string, valueToAdd: any): boolean;
  addToFlashData(parentKey: any, valueToAdd: any): boolean;
  addToLocalData(parentKey: any, valueToAdd: any): boolean;
  addToSessionData(parentKey: any, valueToAdd: any): boolean;
  removeFrom(parentKey: any, valueToRemove?: null): any;
  removeFromFlashData(parentKey: any, valueToRemove?: null): any;
  removeFromLocalData(parentKey: any, valueToRemove?: null): any;
  removeFromSessionData(parentKey: any, valueToRemove?: null): any;
  getFlashData(key: any): any;
  setFlashData(key: string, value: any): void;
  getLocalData(key: string): any;
  setLocalData(key: string, value: string | number | undefined): void;
  getSessionData(key: string): any;
  setSessionData(key: string, value: boolean): void;
  has(key: any): boolean;
  isFlashData(key: any): boolean;
  isLocalData(key: any): boolean;
  isSessionData(key: any): boolean;
  remove(key: any): any;
  removeSessionData(key: string): any;
  removeLocalData(key: any): any;
  removeFlashData(key: any): any;
  destroy(): void;
  destroyLocalData(): void;
  destroySessionData(): void;
  destroyAll(): void;
  increment(
    key: string,
    returnValue?: boolean,
    throwIfNotfound?: boolean
  ): number | undefined;
  decrement(
    key: string,
    returnValue?: boolean,
    throwIfNotfound?: boolean
  ): number | undefined;
}
declare const SharedConfig: GlobalConfig;
export default SharedConfig;
