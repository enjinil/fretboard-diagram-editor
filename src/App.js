import * as React from 'react'
import {config, guitarNoteNames} from './constant'
import {createSvgObjectUrl} from './utils'
import {Fretboard} from './Fretboard'
import {NoteSelector} from './NoteSelector'
import {Note} from './Note'
import {
  buildNotes,
  chromaticScaleNotes,
  majorScaleNotes,
  minorScaleNotes,
  scalePatterns,
} from './scales'

const SvgContainer = React.forwardRef(({children, width, height}, ref) => {
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://w3.org/2000/svg"
      width={width}
    >
      {children}
    </svg>
  )
})

export default function MyApp() {
  const [notes, setNotes] = React.useState(chromaticScaleNotes())
  const [rootNote, setRootNote] = React.useState('G')
  const [isSelectorVisible, setIsSelectorVisible] = React.useState(false)
  const [svgUrl, setSvgUrl] = React.useState('')
  const svg = React.useRef(null)

  function toggleNote(newNote) {
    const existingIndex = notes.findIndex(
      note => JSON.stringify(note) == JSON.stringify(newNote),
    )

    if (existingIndex > -1) {
      setNotes(notes.filter((_, i) => i != existingIndex))
    } else {
      setNotes([...notes, newNote])
    }
  }

  React.useEffect(() => {
    var svgEl = svg.current.cloneNode(true)

    if (svgUrl) {
      URL.revokeObjectURL(svgUrl)
    }

    setSvgUrl(createSvgObjectUrl(svgEl))
  }, [])

  return (
    <>
      <div style={{overflow: 'scroll'}}>
        <SvgContainer
          ref={svg}
          width={config.blockWidth * config.fretBlockNumber}
          height={config.fretboardHeight + config.fretLabelHeight}
        >
          <Fretboard />
          {notes.map(note => (
            <Note key={note.toString()} note={note} rootNote={rootNote} />
          ))}
          <NoteSelector
            rootNote={rootNote}
            visible={isSelectorVisible}
            onClick={toggleNote}
          />
        </SvgContainer>
      </div>
      <br />
      <div style={{display: 'flex'}}>
        <div>
          <label htmlFor="">Root note: </label>
          <select
            value={rootNote}
            onChange={e => {
              setRootNote(e.target.value)
            }}
          >
            {guitarNoteNames.map(n => {
              return (
                <option value={n} key={n}>
                  {n}
                </option>
              )
            })}
          </select>
          <label>
            <input
              type="checkbox"
              checked={isSelectorVisible}
              onChange={() => {
                setIsSelectorVisible(!isSelectorVisible)
              }}
            />
            Show all notes
          </label>
        </div>
        <div style={{marginLeft: 'auto'}}>
          <a className='save-button' href={svgUrl} download="diagram.svg">
            Save SVG
          </a>
        </div>
      </div>
      <br />
      <section>
        <fieldset>
          <button onClick={() => setNotes(chromaticScaleNotes())}>
            Chromatic
          </button>
        </fieldset>
        <fieldset>
          <legend>Major Scales</legend>
          <button onClick={() => setNotes(majorScaleNotes(rootNote))}>
            {rootNote} Major
          </button>
          |
          <button
            onClick={() =>
              setNotes(buildNotes(scalePatterns['major-c-shape'], rootNote))
            }
          >
            C Shape
          </button>
          <button
            onClick={() =>
              setNotes(buildNotes(scalePatterns['major-a-shape'], rootNote))
            }
          >
            A Shape
          </button>
          <button
            onClick={() =>
              setNotes(buildNotes(scalePatterns['major-g-shape'], rootNote))
            }
          >
            G Shape
          </button>
          <button
            onClick={() =>
              setNotes(buildNotes(scalePatterns['major-e-shape'], rootNote))
            }
          >
            E Shape
          </button>
          <button
            onClick={() =>
              setNotes(buildNotes(scalePatterns['major-d-shape'], rootNote))
            }
          >
            D Shape
          </button>
        </fieldset>
        <fieldset>
          <legend>Minor Scales</legend>
          <button onClick={() => setNotes(minorScaleNotes(rootNote))}>
            {rootNote} Minor
          </button>
          |
          <button
            onClick={() =>
              setNotes(buildNotes(scalePatterns['minor-c-shape'], rootNote))
            }
          >
            C Shape
          </button>
          <button
            onClick={() =>
              setNotes(buildNotes(scalePatterns['minor-a-shape'], rootNote))
            }
          >
            A Shape
          </button>
          <button
            onClick={() =>
              setNotes(buildNotes(scalePatterns['minor-g-shape'], rootNote))
            }
          >
            G Shape
          </button>
          <button
            onClick={() =>
              setNotes(buildNotes(scalePatterns['minor-e-shape'], rootNote))
            }
          >
            E Shape
          </button>
          <button
            onClick={() =>
              setNotes(buildNotes(scalePatterns['minor-d-shape'], rootNote))
            }
          >
            D Shape
          </button>
        </fieldset>
        <fieldset>
          <legend>Modes</legend>
          <div>
            {[
              'Ionian',
              'Dorian',
              'Phrygian',
              'Lydian',
              'Mixolydian',
              'Aeolian',
              'Locrian',
            ].map(mode => {
              return (
                <button
                  key={mode}
                  onClick={() =>
                    setNotes(
                      buildNotes(scalePatterns[mode.toLowerCase()], rootNote),
                    )
                  }
                >
                  {rootNote} {mode}
                </button>
              )
            })}
          </div>
        </fieldset>
      </section>
    </>
  )
}
