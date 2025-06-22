import { useState, useEffect, StateFunction } from 'reblendjs'

export type ImageState<T = any> = {
  image: HTMLImageElement | null
  error: unknown | null
  setImageOrUrl: StateFunction<T>
}

/**
 * Fetch and load an image for programatic use such as in a `<canvas>` element.
 *
 * @param imageOrUrl The `HtmlImageElement` or image url to load
 * @param crossOrigin The `crossorigin` attribute to set
 *
 * ```ts
 * const {imageState} = useImage('/static/kittens.png')
 * const ref = useRef<HTMLCanvasElement>()
 *
 * useEffect(() => {
 *   const ctx = ref.current.getContext('2d')
 *
 *   if (imageState.image) {
 *     ctx.drawImage(imageState.image, 0, 0)
 *   }
 * }, [ref, imageState.image])
 *
 * return (
 *   <>
 *     {error && "there was a problem loading the image"}
 *     <canvas ref={ref} />
 *   </>
 * ```
 */
export function useImage(
  imageOrUrl?: string | HTMLImageElement | null | undefined,
  crossOrigin?: 'anonymous' | 'use-credentials' | string,
) {
  const [_imageOrUrl, setImageOrUrl] = useState<typeof imageOrUrl>(null)
  const [imageState, setImageState] = useState<ImageState<typeof imageOrUrl>>({
    image: null,
    error: null,
    setImageOrUrl,
  })

  useEffect(() => {
    if (!imageOrUrl) return undefined

    let image: HTMLImageElement

    if (typeof imageOrUrl === 'string') {
      image = new Image()
      if (crossOrigin) image.crossOrigin = crossOrigin
      image.src = imageOrUrl
    } else {
      image = imageOrUrl

      if (image.complete && image.naturalHeight > 0) {
        setImageState({ image, error: null, setImageOrUrl })
        return
      }
    }

    const onLoad=() =>{
      setImageState({ image, error: null, setImageOrUrl })
    }

    const onError = (error: ErrorEvent)=> {
      setImageState({ image, error, setImageOrUrl })
    }

    image.addEventListener('load', onLoad)
    image.addEventListener('error', onError)

    return () => {
      image.removeEventListener('load', onLoad)
      image.removeEventListener('error', onError)
    }
  }, [_imageOrUrl, crossOrigin])

  return { imageState, setImageOrUrl }
}
