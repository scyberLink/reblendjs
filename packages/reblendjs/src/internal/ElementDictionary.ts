import { BaseComponent } from './BaseComponent'

//Don't export it will enforce user to do O(1) operation only.
//No search, No Iteration, just setting, accessing, and deleting
const ElementDictionary = Object.create(null)

export const hasElement = (internalId: string): boolean => {
  return !!ElementDictionary[internalId]
}

export const getElement = (internalId: string): BaseComponent => {
  return ElementDictionary[internalId]
}

export const deleteElement = (internalId: string | BaseComponent): BaseComponent | null | undefined => {
  if (!internalId) {
    return null
  }
  if (typeof internalId !== 'string') {
    internalId = internalId.internalIdentifier
  }
  const existed = ElementDictionary[internalId]
  delete ElementDictionary[internalId]
  return existed
}

export const setElement = (element: BaseComponent): void => {
  ElementDictionary[element.internalIdentifier] = element
}
