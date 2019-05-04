import { ModuleWithProviders, NgModule } from '@angular/core';

import { INITIAL_LOOP, Loop, Reducer, REDUCER, StoreService } from './store.service';

@NgModule({
  imports: []
})
export class StoreModule {
  static forRoot<S, E>(initialLoop: Loop<S, E>, reducer: Reducer<S, unknown, E>): ModuleWithProviders {
    return {
      ngModule: StoreModule,
      providers: [
        {
          provide: INITIAL_LOOP,
          useValue: initialLoop
        },
        {
          provide: REDUCER,
          useValue: reducer
        },
        StoreService
      ]
    };
  }
}
