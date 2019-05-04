import { Pipe, PipeTransform } from '@angular/core';
import { formatMonth } from 'utils';

@Pipe({
  name: 'formatMonth'
})
export class FormatMonthPipe implements PipeTransform {

  transform(value: Date) {
    return formatMonth(value);
  }

}
