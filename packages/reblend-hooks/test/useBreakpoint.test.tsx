import { useBreakpoint, DefaultBreakpointMap, createBreakpointHook } from '..'

import { describe, it, expect, afterEach, beforeEach } from '@jest/globals'
import { renderHook } from 'reblend-testing-library'
import Reblend from 'reblendjs'

interface Props {
  breakpoint: DefaultBreakpointMap
}

describe('useBreakpoint', () => {
  let matchMediaSpy

  beforeEach(async () => {
    matchMediaSpy = jest.spyOn(window, 'matchMedia')
    window.resizeTo(1024, window.innerHeight)
  })

  afterEach(async () => {
    matchMediaSpy.mockRestore()
  })

  it.each`
    width   | expected | config
    ${1024} | ${false} | ${{ md: 'down', sm: 'up' }}
    ${600}  | ${true}  | ${{ md: 'down', sm: 'up' }}
    ${991}  | ${true}  | ${{ md: 'down' }}
    ${992}  | ${false} | ${{ md: 'down' }}
    ${768}  | ${true}  | ${{ md: 'up' }}
    ${576}  | ${false} | ${{ xs: 'down' }}
    ${576}  | ${false} | ${{ md: true }}
    ${800}  | ${true}  | ${{ md: true }}
    ${1000} | ${false} | ${{ md: true }}
    ${576}  | ${false} | ${'md'}
    ${800}  | ${true}  | ${'md'}
    ${1000} | ${false} | ${'md'}
    ${500}  | ${true}  | ${{ xs: 'down' }}
    ${0}    | ${true}  | ${{ xs: 'up' }}
  `(
    'should match: $expected with config: $config at window width: $width',
    async ({ width, expected, config }) => {
      window.resizeTo(width, window.innerHeight)

      const { result, unmount } = await renderHook(function useBreakp() {
        return useBreakpoint(config)
      })

      expect(result.current.matches).toEqual(expected)
      await unmount()
    },
  )

  it('should assume pixels for number values', async () => {
    const useCustomBreakpoint = createBreakpointHook({
      xs: 0,
      sm: 400,
      md: 700,
    })

    await renderHook(function useCustomBreakp() {
      return useCustomBreakpoint('sm')
    })

    expect(matchMediaSpy).toHaveBeenCalled()
    expect(matchMediaSpy.mock.calls[0][0]).toEqual(
      '(min-width: 400px) and (max-width: 699.8px)',
    )
  })

  it('should use calc for string values', async () => {
    const useCustomBreakpoint = createBreakpointHook({
      xs: 0,
      sm: '40rem',
      md: '70rem',
    })

    await renderHook(function useCustomBreakp() {
      return useCustomBreakpoint('sm')
    })

    expect(matchMediaSpy).toHaveBeenCalled()
    expect(matchMediaSpy.mock.calls[0][0]).toEqual(
      '(min-width: 40rem) and (max-width: calc(70rem - 0.2px))',
    )
  })

  it('should flatten media', async () => {
    const useCustomBreakpoint = createBreakpointHook({
      sm: 400,
      md: 400,
    })

    await renderHook(function useCustomBreakp() {
      return useCustomBreakpoint({ sm: 'up', md: 'up' })
    })
    expect(matchMediaSpy.mock.calls[0][0]).toEqual('(min-width: 400px)')
  })
})
