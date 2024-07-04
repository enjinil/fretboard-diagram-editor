import { notePositionNames, notesStartFrom } from "./constant";
import { getNoteName } from "./utils";

const intervalPatterns = {
  major: "2|2|1|2|2|2|1",
  minor: "2|1|2|2|1|2|2",
};

function majorScaleNoteNames(rootNote) {
  const noteNames = notesStartFrom(rootNote);
  const { names } = intervalPatterns.major.split("|").reduce(
    (result, interval) => {
      result.lastPosition += +interval;
      result.names.push(noteNames[result.lastPosition]);
      return result;
    },
    { names: [rootNote], lastPosition: 0 }
  );

  return names;
}

function minorScaleNoteNames(rootNote) {
  const noteNames = notesStartFrom(rootNote);
  const { names } = intervalPatterns.minor.split("|").reduce(
    (result, interval) => {
      result.lastPosition += +interval;
      result.names.push(noteNames[result.lastPosition]);
      return result;
    },
    { names: [rootNote], lastPosition: 0 }
  );

  return names;
}

export const scalePatterns = {
  "major-c-shape": "6/124|134|134|13|124|124",
  "major-a-shape": "4/24|124|124|134|245|24",
  "major-g-shape": "3/245|245|24|124|235|245",
  "major-e-shape": "2/124|124|134|134|24|124",
  "major-d-shape": "7/245|24|124|124|245|245",
  "minor-c-shape": "4/124|134|134|13|124|124",
  "minor-a-shape": "2/24|124|124|134|245|24",
  "minor-g-shape": "1/245|245|24|124|235|245",
  "minor-e-shape": "7/124|124|134|134|24|124",
  "minor-d-shape": "5/245|24|124|124|245|245",
  ionian: "1/24|124|134|134|24|12",
  dorian: "1/245|24|124|124|245|245",
  phrygian: "1/124|134|134|13|124|124",
  lydian: "1/24|134|134|13|124|124",
  mixolydian: "1/24|124|124|134|245|246",
  aeolian: "1/245|245|24|124|235|245",
  locrian: "1/124|124|134|134|24|124",
};

export const chromaticScaleNotes = () => {
  return new Array(6)
    .fill(null)
    .map((_, string) => {
      return new Array(16).fill(null).map((_, fret) => {
        return [fret, string + 1];
      });
    })
    .flat();
};

export const majorScaleNotes = (rootNote) => {
  const noteNames = majorScaleNoteNames(rootNote);

  return chromaticScaleNotes().filter((note) => {
    return noteNames.includes(getNoteName(note));
  });
};

export const minorScaleNotes = (rootNote) => {
  const noteNames = minorScaleNoteNames(rootNote);

  return chromaticScaleNotes().filter((note) => {
    return noteNames.includes(getNoteName(note));
  });
};

export const buildNotes = (patternString, rootNote, startOn = 0) => {
  const notes = patternString
    .split("/")[1]
    .split("|")
    .map((s, i) => {
      return s.split("").map((n) => [+n, 6 - i]);
    })
    .flat();

  const rootNth = +patternString.split("/")[0];
  const rootNotePosition = notes[rootNth - 1];
  const rootNoteOnFretboard = findRootNotePosition(
    rootNote,
    rootNotePosition[1],
    Math.max(rootNotePosition[0] - 1, startOn)
  );
  const difference = rootNoteOnFretboard - rootNotePosition[0];

  if (difference == 0) return notes;

  return notes.map((note) => [note[0] + difference, note[1]]);
};

function findRootNotePosition(rootNote, stringNumber, startOn = 1) {
  return notePositionNames[stringNumber - 1].findIndex((noteName, index) => {
    return noteName == rootNote && index >= startOn;
  });
}
