import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';

import { I18nService, Translations } from './i18n.service';

@Pipe({
  name: 'i18n',
  pure: false
})
export class I18nPipe implements PipeTransform, OnDestroy {
  latestTranslations: Translations;
  i18nSubscription = this.i18n.translations.subscribe(translations => {
    this.latestTranslations = translations;
    this.cd.markForCheck();
  });

  constructor(private i18n: I18nService, private cd: ChangeDetectorRef) { }

  transform(key: string, ...args) {
    const requestedTranslation = this.latestTranslations[key];

    return typeof requestedTranslation === 'function' ?
      requestedTranslation(...args) :
      requestedTranslation;
  }

  ngOnDestroy() {
    this.i18nSubscription.unsubscribe();
  }
}
