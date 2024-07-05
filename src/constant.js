export const guitarNoteNames = [
  'A',
  'A#/Bb',
  'B',
  'C',
  'C#/Db',
  'D',
  'D#/Eb',
  'E',
  'F',
  'F#/Gb',
  'G',
  'G#/Ab',
]

export const all24Notes = [...guitarNoteNames, ...guitarNoteNames]

export const notesStartFrom = startFrom => {
  const notePosition = all24Notes.findIndex(n => n === startFrom)

  if (notePosition == -1) return notes

  return [
    ...all24Notes.slice(notePosition),
    ...all24Notes.slice(0, notePosition),
  ]
}

export const notePositionNames = [
  notesStartFrom('E'),
  notesStartFrom('B'),
  notesStartFrom('G'),
  notesStartFrom('D'),
  notesStartFrom('A'),
  notesStartFrom('E'),
]

export const config = (() => {
  const blockWidth = 60
  const noteCircleSize = 34
  const noteCircleMargin = 2
  const inlaysPositions = [3, 5, 7, 9, 12, 15]
  const inlaySize = 8
  const fretBlockNumber = 16
  const fretLabelHeight = 40
  const fretboardHeight =
    (noteCircleSize + noteCircleMargin * 2) * (6 + 1) - 2 * noteCircleMargin

  return {
    blockWidth,
    fretboardHeight,
    fretLabelHeight,
    fretBlockNumber,
    inlaysPositions,
    inlaySize,
    noteCircleSize,
    noteCircleMargin,
  }
})()
