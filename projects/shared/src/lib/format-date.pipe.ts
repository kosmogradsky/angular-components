import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns/esm';
import { ru } from 'date-fns/esm/locale';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(date: Date| number, template: string): string {
    return format(date, template, { locale: ru });
  }

}
