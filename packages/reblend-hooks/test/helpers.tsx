import { renderHook as baseRenderHook } from 'reblend-testing-library'

type ReblendWrapper<P> = {
  setProps(props: Partial<P>): Promise<void>
  unmount(): Promise<void>
}

export async function renderHook<T extends (props: P) => any, P = any>(
  fn: T,
  initialProps?: P,
): Promise<[ReturnType<T>, ReblendWrapper<P>]> {
  const { rerender, result, unmount } = await baseRenderHook(fn, {
    initialProps,
  })

  return [
    result.current as any,
    {
      unmount,
      async setProps(props: P) {
        await rerender({ ...initialProps, ...props })
      },
    },
  ]
}
