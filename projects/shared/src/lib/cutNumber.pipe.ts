import { Pipe, PipeTransform } from '@angular/core';

import { separateDigits } from 'utils';

@Pipe({
  name: 'cutNumber'
})
export class CutNumberPipe implements PipeTransform {

  transform(num: number, digitsAfterComa: number = 0) {
    if (num >= 1000000000) {
        return `${Math.trunc(num) / 1000000000} млрд`;
    }
    if (num >= 1000000) {
        return `${Math.trunc(num) / 1000000} млн`;
    }
    return separateDigits(num, digitsAfterComa);
  }

}
