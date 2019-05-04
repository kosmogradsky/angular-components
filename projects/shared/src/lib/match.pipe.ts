import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'match'
})
export class MatchPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(title: string, filter: string): SafeHtml {
    const index = title.toLowerCase().indexOf(filter.toLowerCase());
    const stringStart = title.slice(0, index);
    const boldString = title.slice(index, index + filter.length);
    const stringEnd = title.slice(index + filter.length);
    const spaceStart = stringStart[stringStart.length - 1] === ' ' || boldString[0] === ' ' ? '&nbsp;' : '';
    const spaceEnd = boldString[boldString.length - 1] === ' ' || stringEnd[0] === ' ' ? '&nbsp;' : '';
    const html = index !== -1 ? `${stringStart}${spaceStart}<b>${boldString}</b>${spaceEnd}${stringEnd}` : title;

    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
