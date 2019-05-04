import { addDays } from 'date-fns/esm';

export const firstDayOfWeek = (date: Date) => {
  const dateCopy = new Date(date);
  return new Date(
    dateCopy.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1))
  );
};

export const lastDayOfWeek = (date: Date) => {
  const dateCopy = new Date(date);
  return addDays(new Date(
    dateCopy.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1))
  ), 6);
};
