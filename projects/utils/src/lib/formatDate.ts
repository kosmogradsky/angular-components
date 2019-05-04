import { timeFormatLocale } from 'd3-time-format';

const locale = timeFormatLocale({
  'dateTime': '%A, %e %B %Y г. %X',
  'date': '%d.%m.%Y',
  'time': '%H:%M:%S',
  'periods': ['AM', 'PM'],
  'days': ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  'shortDays': ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  'months': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  'shortMonths': ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
});

export const formatDay = locale.format('%d.%m.%Y');
export const formatMonth = locale.format('%b \'%y');
export const weekFirstDay = (value: Date) => {
  const date = new Date(value);
  const first = new Date(
    date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1))
  );

  return locale.format('%d.%m.%Y')(first);
};
export const weekLastDay = (value: Date) => {
  const date = new Date(value);
  const first = new Date(
    date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1) + 6)
  );

  return locale.format('%d.%m.%Y')(first);
};
