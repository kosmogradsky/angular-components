import { NgModule } from '@angular/core';

import { SharedModule } from 'shared';

import { CalendarPopupComponent } from './calendar-popup/calendar-popup.component';
import { CalendarTimelineComponent } from './calendar-timeline/calendar-timeline.component';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalendarComponent,
    CalendarPopupComponent,
    CalendarTimelineComponent
  ],
  exports: [
    CalendarPopupComponent
  ]
})
export class CalendarModule { }
