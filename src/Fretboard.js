import {config} from './constant'
import {makeArray} from './utils'

function Fretboard() {
  return (
    <>
      <Neck />
      <Inlays />
      <FretWires />
      <GuitarStrings />
      <FretLabels />
    </>
  )
}

function Neck() {
  return (
    <rect
      x={config.blockWidth}
      y="0"
      width="100%"
      height={config.fretboardHeight}
      fill="#BA8C63"
    />
  )
}

function FretLabels() {
  return config.inlaysPositions.map(n => (
    <text
      key={n}
      style={{textAnchor: 'middle'}}
      fill="#444444"
      x={(n + 0.5) * config.blockWidth}
      y={config.fretboardHeight + config.fretLabelHeight / 2}
    >
      {n}
    </text>
  ))
}

function FretWires() {
  const fromLeft = position => position * config.blockWidth - 2
  return makeArray(config.fretBlockNumber).map((_, i) => (
    <rect
      y="2"
      x={fromLeft(i + 1)}
      width="4"
      height={config.fretboardHeight - 4}
      rx="2"
      ry="2"
      fill="#d4d4d8"
    />
  ))
}

function Inlays() {
  return config.inlaysPositions.map(n => {
    const offsetOn12 =
      (config.noteCircleSize + config.noteCircleMargin * 2) * 1.5
    return n == 12 ? (
      <g key={n}>
        <circle
          cx={(n + 0.5) * config.blockWidth}
          cy={config.fretboardHeight / 2 - offsetOn12}
          r={config.inlaySize}
          fill="#111111"
        />
        <circle
          cx={(n + 0.5) * config.blockWidth}
          cy={config.fretboardHeight / 2 + offsetOn12}
          r={config.inlaySize}
          fill="#111111"
        />
      </g>
    ) : (
      <circle
        key={n}
        cx={(n + 0.5) * config.blockWidth}
        cy={config.fretboardHeight / 2}
        r={config.inlaySize}
        fill="#111111"
      />
    )
  })
}

function GuitarStrings() {
  const fromTop = position => {
    return (position + 1) * (config.noteCircleSize + config.noteCircleMargin * 2) - config.noteCircleMargin
  }
  return makeArray(6).map((_, i) => (
    <rect
      x="0"
      y={fromTop(i)}
      height={1 + i}
      width="100%"
      fill="#EEEEEE"
    />
  ))
}

export {Fretboard}
