import { notePositionNames } from "./constant";

export const getNoteName = (note) => {
  return notePositionNames[note[1] - 1][note[0]];
};

export const makeArray = (n) => Array(n).fill(null);
