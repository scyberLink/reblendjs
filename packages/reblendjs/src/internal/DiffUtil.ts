/* eslint-disable @typescript-eslint/no-explicit-any */
export class DiffUtil {
  /**
   * Deeply flattens an array or set of elements.
   *
   * @template T
   * @param {T[] | Set<T>} data - The data to flatten.
   * @returns {T[]} A flattened array of elements.
   */
  static deepFlat<T>(data: T[] | Set<T>): T[] {
    if (!data) {
      return []
    }
    if (!(data instanceof Set) && !Array.isArray(data)) {
      data = [data]
    }
    const ts: T[] = []
    for (const t of data) {
      if (t instanceof Set || Array.isArray(t)) {
        ts.push(...DiffUtil.deepFlat(t))
      } else {
        ts.push(t)
      }
    }
    return ts
  }

  /**
   * Flattens a nested array or set of virtual nodes (VNode) and adds the result to the `containerArr`.
   *
   * @template T
   * @param {(T | T[])[] | Set<T | T[]>} arr - The array or set of VNode children to flatten.
   * @param {T[]} [containerArr=[]] - The container array to store flattened nodes.
   * @returns {T[]} The flattened array of VNode children.
   */
  static flattenVNodeChildren<T>(arr: (T | T[])[] | Set<T | T[]>, containerArr: T[] = []): T[] {
    if (!arr) {
      return []
    }

    if (!Array.isArray(arr)) {
      arr = [arr as any]
    }

    if ((arr.length || (arr as any).size) < 1) {
      return []
    }

    for (const item of arr) {
      if (item instanceof Set || Array.isArray(item)) {
        DiffUtil.flattenVNodeChildren(item as T[], containerArr)
      } else {
        containerArr.push(item as T)
      }
    }

    return containerArr
  }
}
