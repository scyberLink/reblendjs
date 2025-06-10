import { Reblend } from '../Reblend'
import * as ReblendTyping from 'reblend-typing'

export function Placeholder({
  style,
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isPlaceholder = true,
}: {
  style?: ReblendTyping.CSSProperties
  children?: Reblend.JSX.Element
  isPlaceholder?: boolean
}) {
  return (
    <div style={styles.placeholder}>
      <div style={{ ...styles.loadingBar, ...(style || {}) }}>{children}</div>
      <style>{`
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  )
}

;(Placeholder as ReblendTyping.FC).props = { isPlaceholder: true }

const styles: { [key: string]: ReblendTyping.CSSProperties } = {
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  loadingBar: {
    width: '100%',
    minHeight: '10px',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(90deg, #f0f0f0 25%,rgb(178, 175, 175) 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite',
  },
}
