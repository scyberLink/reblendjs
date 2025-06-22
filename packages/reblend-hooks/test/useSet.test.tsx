import { render, act, waitFor } from 'reblend-testing-library'

import { useSet, ObservableSet } from '..'
import Reblend from 'reblendjs'

describe('useSet', () => {
  describe('ObservableSet', () => {
    it('should implement a Set', async () => {
      const set = new ObservableSet(async () => {}, ['baz'])

      expect(set.size).toEqual(1)

      set.clear()
      expect(set.size).toEqual(0)

      expect(set.add('foo')).toEqual(set)

      expect(set.has('foo')).toEqual(true)

      expect(set.size).toEqual(1)

      for (const item of set) {
        expect(item).toEqual('foo')
      }

      set.add('bar')

      expect(Array.from(set.values())).toEqual(['foo', 'bar'])
      expect(Array.from(set.keys())).toEqual(['foo', 'bar'])

      expect(set[Symbol.iterator]).toBeDefined()

      expect(set.delete('bar')).toEqual(true)

      expect(set.size).toEqual(1)

      set.clear()
      expect(set.size).toEqual(0)
    })

    it('should be observable', async () => {
      const spy = jest.fn()
      const set = new ObservableSet(spy)

      set.add('foo')
      expect(spy).toHaveBeenCalledTimes(1)

      set.add('baz')
      expect(spy).toHaveBeenCalledTimes(2)

      set.delete('baz')
      expect(spy).toHaveBeenCalledTimes(3)

      set.clear()
      expect(spy).toHaveBeenCalledTimes(4)
    })
  })

  it('should rerender when the set is updated', async () => {
    let setObj
    function Wrapper() {
      setObj = useSet()
      return <span>{JSON.stringify(Array.from(setObj.set))}</span>
    }

    const wrapper = await render(<Wrapper />)

    await act(async () => {
      setObj.set.add('foo')
    })

    await waitFor(() => expect(wrapper.getByText('["foo"]')).toBeTruthy())

    await act(async () => {
      setObj.set.add('bar')
    })

    await waitFor(() => expect(wrapper.getByText('["foo","bar"]')).toBeTruthy())

    await act(async () => {
      setObj.set.clear()
    })

    await waitFor(() => expect(wrapper.getByText('[]')).toBeTruthy())
  })
})
