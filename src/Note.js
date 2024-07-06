import {config} from './constant'
import {getNoteName} from './utils'

function Note({note, rootNote, ...props}) {
  const fretPosition = note[0]
  const stringPosition = note[1]
  const fromLeft =
    config.blockWidth * (fretPosition + 1) - config.blockWidth / 2
  const fromTop =
    config.fretboardHeight / config.stringNumber * (stringPosition - .5) + config.fretboardPaddingY 
  const noteName = getNoteName(note)
  const fontSize = noteName.length > 2 ? 10 : 14

  return (
    <g className="note" {...props}>
      <circle
        r={config.noteCircleSize / 2}
        cx={fromLeft}
        cy={fromTop}
        stroke="#000"
        strokeWidth="1"
        fill={noteName === rootNote ? '#f87171' : '#FFFFFF'}
      />
      <text
        x={fromLeft}
        y={fromTop + 5}
        style={{textAnchor: 'middle', fontSize}}
      >
        {noteName}
      </text>
    </g>
  )
}

export {Note}
