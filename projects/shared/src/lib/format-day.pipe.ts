import { Pipe, PipeTransform } from '@angular/core';
import { formatDay } from 'utils';

@Pipe({
  name: 'formatDay'
})
export class FormatDayPipe implements PipeTransform {

  transform(value: Date) {
    return formatDay(value);
  }

}
