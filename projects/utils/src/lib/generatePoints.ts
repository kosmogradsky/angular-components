import { timeMonth } from 'd3-time';
import { addMonths } from 'date-fns/esm';

const generatePoints = () => timeMonth.range(
  new Date(),
  addMonths(new Date(), 24)
)
  .map(date => ({
    date: date.valueOf(),
    value: Math.round(Math.random() * 70000) + 10000
  }));

export default generatePoints;
