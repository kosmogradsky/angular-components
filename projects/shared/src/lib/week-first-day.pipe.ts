import { Pipe, PipeTransform } from '@angular/core';
import { weekFirstDay } from 'utils';

@Pipe({
  name: 'weekFirstDay'
})
export class WeekFirstDayPipe implements PipeTransform {

  transform(value: Date) {
    return weekFirstDay(value);
  }

}
