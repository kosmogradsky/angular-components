import { Pipe, PipeTransform } from '@angular/core';
import { weekLastDay } from 'utils';

@Pipe({
  name: 'weekLastDay'
})
export class WeekLastDayPipe implements PipeTransform {

  transform(value: Date) {
    return weekLastDay(value);
  }

}
