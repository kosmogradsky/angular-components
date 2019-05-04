import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translations {
  [key: string]: string | ((...args) => string);
}

@Injectable()
export class I18nService {
  private _translations = new BehaviorSubject<Translations>({});
  readonly translations = this._translations.asObservable();

  loadTranslations(translations: Translations) {
    this._translations.next(translations);
  }

}
