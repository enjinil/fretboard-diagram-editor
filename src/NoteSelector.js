import {Note} from './Note'
import {chromaticScaleNotes} from './scales'

function NoteSelector({rootNote, visible, onClick}) {
  return (
    <g role="note-selector">
      {chromaticScaleNotes().map(note => (
        <Note
          key={note.toString()}
          onClick={() => {
            onClick(note)
          }}
          className="note-selector"
          note={note}
          rootNote={rootNote}
          style={{opacity: visible ? 0.25 : 0, cursor: 'pointer'}}
        />
      ))}
    </g>
  )
}

export {NoteSelector}
