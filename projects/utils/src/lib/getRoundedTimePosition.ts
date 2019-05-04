import { ScaleTime } from 'd3-scale';
import { timeMonth, CountableTimeInterval } from 'd3-time';

export const getRoundedTimePosition = (position: number, scale: ScaleTime<number, number>, timeFunc: CountableTimeInterval = timeMonth) => {
  const date = scale.invert(position);
  const roundedDate = timeFunc.round(date);
  const roundedPosition = scale(roundedDate);

  return roundedPosition;
};
