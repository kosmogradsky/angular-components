import { addDays, addMonths, addSeconds, addWeeks, differenceInCalendarDays } from 'date-fns/esm';

export const secondsFrom1990 = {
  convertFrom: (seconds: number) => addSeconds(new Date(1990, 0, 1), seconds)
};


export const daysFrom1990 = {
  convertTo: (date: Date) => differenceInCalendarDays(date, new Date(1990, 0, 1)),
  convertFrom: (days: number) => addDays(new Date(1990, 0, 1), days)
};


export const monthsFrom1990 = {
  convertFrom: (months: number) => addMonths(new Date(1990, 0, 1), months)
};

export const weeksFrom1990 = {
  convertFrom: (weeks: number) => addWeeks(new Date(1990, 0, 1), weeks)
};
