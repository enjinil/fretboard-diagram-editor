import { config } from "./constant";
import { chromaticScaleNotes } from "./scales";
import { getNoteName, makeArray } from "./utils";

function Fretboard() {
  const fretWires = makeArray(config.fretBlockNumber).map((_, i) => (
    <FretWire key={i} position={i + 1} />
  ));

  const guitarStrings = makeArray(6).map((_, i) => (
    <GuitarString key={i} position={i} />
  ));

  const neck = (
    <rect
      x={config.blockWidth}
      y="0"
      width="100%"
      height={config.fretboardHeight}
      fill="#BA8C63"
    />
  );

  const inlays = config.inlaysPositions.map((n) => {
    const offsetOn12 =
      (config.noteCircleSize + config.noteCircleMargin * 2) * 1.5;
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
    );
  });

  const fretLabels = config.inlaysPositions.map((n) => (
    <text
      key={n}
      style={{ textAnchor: "middle" }}
      fill="#444444"
      x={(n + 0.5) * config.blockWidth}
      y={config.fretboardHeight + config.fretLabelHeight / 2}
    >
      {n}
    </text>
  ));

  return (
    <>
      {neck}
      {inlays}
      {fretWires}
      {guitarStrings}
      {fretLabels}
    </>
  );
}

function FretWire({ position = 0 }) {
  const fromLeft = position * config.blockWidth - 2;
  return (
    <rect
      y="2"
      x={fromLeft}
      width="4"
      height={config.fretboardHeight - 4}
      rx="2"
      ry="2"
      fill="#d4d4d8"
    />
  );
}

function GuitarString({ position = 0 }) {
  const fromTop =
    (position + 1) * (config.noteCircleSize + config.noteCircleMargin * 2) -
    config.noteCircleMargin;
  return (
    <rect x="0" y={fromTop} height={1 + position} width="100%" fill="#EEEEEE" />
  );
}

function Notes({ notes, rootNote }) {
  return (
    <>
      {notes.map((note) => (
        <Note key={note.toString()} note={note} rootNote={rootNote} />
      ))}
    </>
  );
}

function Note({ note, rootNote, ...props }) {
  const fretPosition = note[0];
  const stringPosition = note[1];
  const fromLeft =
    config.blockWidth * (fretPosition + 1) - config.blockWidth / 2;
  const fromTop =
    (config.noteCircleSize + config.noteCircleMargin * 2) * stringPosition - 1;
  const noteName = getNoteName(note);
  const fontSize = noteName.length > 2 ? 10 : 14;

  return (
    <g className="note" {...props}>
      <circle
        r={config.noteCircleSize / 2}
        cx={fromLeft}
        cy={fromTop}
        stroke="#000"
        strokeWidth="1"
        fill={noteName === rootNote ? "#f87171" : "#FFFFFF"}
      />
      <text
        x={fromLeft}
        y={fromTop + 5}
        style={{ textAnchor: "middle", fontSize }}
      >
        {noteName}
      </text>
    </g>
  );
}

function NoteSelector({ rootNote, visible, onClick }) {
  return (
    <g role="note-selector">
      {chromaticScaleNotes().map((note) => (
        <Note
          key={note.toString()}
          onClick={() => {
            onClick(note);
          }}
          className="note-selector"
          note={note}
          rootNote={rootNote}
          style={{ opacity: visible ? 0.25 : 0, cursor: "pointer" }}
        />
      ))}
    </g>
  );
}

export { Fretboard, Notes, NoteSelector };
