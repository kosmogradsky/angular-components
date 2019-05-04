import { Pipe, PipeTransform } from '@angular/core';

import { separateDigits } from 'utils';

@Pipe({
  name: 'separateDigits'
})
export class SeparateDigitsPipe implements PipeTransform {

  transform(num: number, digitsAfterComa: number = 0) {
    return separateDigits(num, digitsAfterComa);
  }

}
