import {notePositionNames} from './constant'

function getNoteName(note) {
  return notePositionNames[note[1] - 1][note[0]]
}

function makeArray(n) {
  return Array(n).fill(null)
}

function createSvgObjectUrl(svgEl) {
  if (!svgEl) return

  // Remove note selector
  svgEl.querySelector('[role=note-selector]')?.remove()

  var serializer = new XMLSerializer()
  var source = serializer.serializeToString(svgEl)

  return URL.createObjectURL(new Blob([source], {type: 'image/svg+xml'}))
}

export {getNoteName, makeArray, createSvgObjectUrl}