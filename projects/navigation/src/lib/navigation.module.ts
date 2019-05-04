import { ModuleWithProviders, NgModule } from '@angular/core';
import { History } from 'history';

import { LinkDirective } from './link.directive';
import { HISTORY, NavigationService } from './navigation.service';

@NgModule({
  imports: [
  ],
  declarations: [LinkDirective],
  exports: [LinkDirective]
})
export class NavigationModule {
  static forRoot(history: History): ModuleWithProviders {
    return {
      ngModule: NavigationModule,
      providers: [
        {
          provide: HISTORY,
          useValue: history
        },
        NavigationService
      ]
    };
  }
}
