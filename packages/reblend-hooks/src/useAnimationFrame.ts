import { useEffect, useState } from 'reblendjs'
import { useMounted } from './useMounted'

export interface UseAnimationFrameReturn {
  cancel(): void

  /**
   * Request for the provided callback to be called on the next animation frame.
   * Previously registered callbacks will be cancelled
   */
  request(callback: FrameRequestCallback): void
}
export type AnimationFrameState = {
  fn: FrameRequestCallback
}
/**
 * Returns a controller object for requesting and cancelling an animation frame that is properly cleaned up
 * once the component unmounts. New requests cancel and replace existing ones.
 *
 * ```ts
 * const [style, setStyle] = useState({});
 * const animationFrame = useAnimationFrame();
 *
 * const handleMouseMove = (e) => {
 *   animationFrame.request(() => {
 *     setStyle({ top: e.clientY, left: e.clientY })
 *   })
 * }
 *
 * const handleMouseUp = () => {
 *   animationFrame.cancel()
 * }
 *
 * return (
 *   <div onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
 *     <Ball style={style} />
 *   </div>
 * )
 * ```
 */
export function useAnimationFrame(): UseAnimationFrameReturn {
  const isMounted = useMounted()

  const [animationFrame, setAnimationFrameState] =
    useState<AnimationFrameState | null>(null)

  useEffect(() => {
    if (!animationFrame) {
      return
    }

    const { fn } = animationFrame
    const handle = requestAnimationFrame(fn)
    return () => {
      cancelAnimationFrame(handle)
    }
  }, [animationFrame])

  return {
    request: (callback: FrameRequestCallback) => {
      if (!isMounted()) return
      setAnimationFrameState({ fn: callback } as any)
    },
    cancel: () => {
      if (!isMounted()) return
      setAnimationFrameState(null as any)
    },
  }
}
