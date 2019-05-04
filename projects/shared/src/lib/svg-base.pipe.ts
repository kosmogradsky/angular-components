import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'svgBase'
})
export class SvgBasePipe implements PipeTransform {

  constructor() {}

  transform(path: string) {
    return `url(${window.location.pathname + path})`;
  }

}
