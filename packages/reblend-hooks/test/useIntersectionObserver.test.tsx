import useIntersectionObserver from '../cjs/useIntersectionObserver'

import { renderHook, act } from 'reblend-testing-library'
import Reblend, { useEffect, useProps } from 'reblendjs'

describe('useIntersectionObserver', () => {
  let observers: any[] = []
  beforeEach(() => {
    ;(window as any).IntersectionObserver = class IntersectionObserverMock {
      observe: any
      unobserve: any
      args: [IntersectionObserverCallback, IntersectionObserverInit]
      constructor(handler: any, init: any) {
        this.args = [handler, init]
        this.observe = jest.fn()
        this.unobserve = jest.fn()
        observers.push(this)
      }
    }
  })

  afterEach(() => {
    observers = []
  })

  it('should observe element', async () => {
    const element = document.createElement('span')

    const { result } = await renderHook(
      function useIntersectionO({ element }) {
        const obj = useIntersectionObserver(element)
        useProps<any>(({ current: { initialProps: element, initial } }) => {
          !initial && obj.setElement(element)
        })

        return obj
      },
      {
        initialProps: { element },
      },
    )
    const entry = {}
    expect(result.current.entries).toEqual([])

    await act(async () => {
      observers[0].args[0]([entry])
    })

    expect(result.current.entries![0]).toStrictEqual(entry)
  })

  it('should wait for element', async () => {
    const element = document.createElement('span')

    const { result, rerender, unmount } = await renderHook(
      function useIntersectionO({ element }) {
        const obj = useIntersectionObserver(element)
        useProps<any>(
          ({
            current: {
              initialProps: { element },
            },
            initial,
          }) => {
            !initial && obj.setElement(element)
          },
        )
        return obj
      },
      { initialProps: { element: null as any } },
    )

    expect(result.current.entries).toEqual([])

    expect(observers[0].observe).not.toBeCalled()

    await rerender({ element })

    expect(observers[0].observe).toBeCalledTimes(1)

    await unmount()

    expect(observers[0].unobserve).toBeCalledTimes(1)
  })

  it('should wait for root to set up observer', async () => {
    const root = document.createElement('div')
    const element = document.createElement('span')

    const { result, rerender } = await renderHook(
      function useIntersectionO({ root }) {
        const { setRoot } = useIntersectionObserver(element, { root })

        useProps<any>(
          ({
            current: {
              initialProps: { root },
            },
            initial,
          }) => {
            !initial && setRoot(root)
          },
        )
      },
      { initialProps: { root: null as null | HTMLElement } },
    )

    expect(observers).toHaveLength(0)

    await rerender({ root })

    expect(observers).toHaveLength(1)
    expect(observers[0].observe).toBeCalledTimes(1)
  })

  it('should accept a callback', async () => {
    const spy = jest.fn()
    const element = document.createElement('span')

    const { result } = await renderHook(function useIntersectionO() {
      return useIntersectionObserver(element, spy)
    })

    expect(result.current.entries).toEqual(undefined)

    const entry = {}
    await act(async () => {
      observers[0].args[0]([entry, observers[0]])
    })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenLastCalledWith([entry, observers[0]])
  })
})
