import { act, render, waitFor } from 'reblend-testing-library'

import useMap, { ObservableMap } from '../cjs/useMap'
import Reblend from 'reblendjs'

describe('useMap', () => {
  describe('ObservableMap', () => {
    it('should implement a Map', async () => {
      const map = new ObservableMap(async () => {}, [['baz', false]])

      expect(map.size).toEqual(1)

      map.clear()
      expect(map.size).toEqual(0)

      expect(map.set('foo', true)).toEqual(map)

      expect(map.get('foo')).toEqual(true)

      expect(map.size).toEqual(1)

      for (const item of map) {
        expect(item[0]).toEqual('foo')
        expect(item[1]).toEqual(true)
      }

      map.set('bar', false)

      expect(Array.from(map.values())).toEqual([true, false])
      expect(Array.from(map.keys())).toEqual(['foo', 'bar'])

      expect(map[Symbol.iterator]).toBeDefined()

      expect(map.delete('bar')).toEqual(true)

      expect(map.size).toEqual(1)

      map.clear()
      expect(map.size).toEqual(0)
    })

    it('should be observable', async () => {
      const spy = jest.fn()
      const map = new ObservableMap(spy)

      map.set('foo', true)
      expect(spy).toHaveBeenCalledTimes(1)

      map.set('baz', 3)
      expect(spy).toHaveBeenCalledTimes(2)

      map.delete('baz')
      expect(spy).toHaveBeenCalledTimes(3)

      map.clear()
      expect(spy).toHaveBeenCalledTimes(4)
    })
  })

  it('should rerender when the map is updated', async () => {
    let mapObj
    function Wrapper() {
      mapObj = useMap()
      return <span>{JSON.stringify(Array.from(mapObj.map.entries()))}</span>
    }

    const wrapper = await render(<Wrapper />)

    await act(async () => {
      mapObj.map.set('foo', true)
    })

    await waitFor(() =>
      expect(wrapper.getByText('[["foo",true]]')).toBeTruthy(),
    )

    await act(async () => {
      mapObj.map.set('bar', true)
    })

    await waitFor(() =>
      expect(wrapper.getByText('[["foo",true],["bar",true]]')).toBeTruthy(),
    )

    await act(async () => {
      mapObj.map.clear()
    })

    await waitFor(() => expect(wrapper.getByText('[]')).toBeTruthy())
  })
})
