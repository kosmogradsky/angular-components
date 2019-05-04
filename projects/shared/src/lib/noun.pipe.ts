import { Pipe, PipeTransform } from '@angular/core';

import { noun } from 'utils';

@Pipe({
  name: 'noun'
})
export class NounPipe implements PipeTransform {

  transform(count: number, words: string[]): any {
    return noun(count, words);
  }

}
