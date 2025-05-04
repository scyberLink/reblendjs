import { Reblend } from '../Reblend'
import { ReblendTyping } from 'reblend-typing'

export default function Placeholder({
  style,
  children,
}: {
  style?: ReblendTyping.CSSProperties
  children?: Reblend.JSX.Element
}) {
  return (
    <div style={styles.placeholder as any}>
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

const styles = {
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
