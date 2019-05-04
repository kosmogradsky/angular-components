import { isBefore, max, min } from 'date-fns/esm';

export const clampRange = (boundaries: number[], range: number[]) => [
  Math.max(boundaries[0], range[0]),
  Math.min(boundaries[1], range[1])
];

export const clampTimeRange = (boundaries: Date[], range: Date[]) => [
  isBefore(max([boundaries[0], range[0]]), boundaries[1]) ? max([boundaries[0], range[0]]) : boundaries[1],
  isBefore(min([boundaries[1], range[1]]), boundaries[0]) ? boundaries[0] : min([boundaries[1], range[1]])
];
