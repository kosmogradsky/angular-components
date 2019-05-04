import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nModule } from 'i18n';
import { NavigationModule } from 'navigation';

import { CheckRowComponent } from './check-row/check-row.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { FormatDatePipe } from './format-date.pipe';
import { FormatMonthPipe } from './format-month.pipe';
import { IconToggleComponent } from './icon-toggle/icon-toggle.component';
import { IconComponent } from './icon/icon.component';
import { KeysPipe } from './keys.pipe';
import { MatchPipe } from './match.pipe';
import { NotificationComponent } from './notification/notification.component';
import { NounPipe } from './noun.pipe';
import { PageTitleComponent } from './page-title/page-title.component';
import { SafeStylePipe } from './safe-style.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { ScrollComponent } from './scroll/scroll.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SeparateDigitsPipe } from './separate-digits.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StickyComponent } from './sticky/sticky.component';
import { SvgBasePipe } from './svg-base.pipe';
import { TimesPipe } from './times.pipe';
import { TooltipComponent } from './tooltip/tooltip.component';

import { CutNumberPipe } from './cutNumber.pipe';
import { DraggableDirective } from './draggable.directive';
import { FormatDayPipe } from './format-day.pipe';
import { MovableDirective } from './movable.directive';
import { RibbonLoaderComponent } from './ribbon-loader/ribbon-loader.component';
import { WeekFirstDayPipe } from './week-first-day.pipe';
import { WeekLastDayPipe } from './week-last-day.pipe';

@NgModule({
  imports: [
    CommonModule,
    NavigationModule,
    I18nModule,
    FormsModule
  ],
  declarations: [
    ContextMenuComponent,
    TimesPipe,
    PageTitleComponent,
    IconComponent,
    SeparateDigitsPipe,
    KeysPipe,
    SearchInputComponent,
    IconToggleComponent,
    CheckboxComponent,
    CheckboxComponent,
    CheckRowComponent,
    ScrollComponent,
    TooltipComponent,
    SidebarComponent,
    SafeStylePipe,
    FormatDatePipe,
    SvgBasePipe,
    FormatMonthPipe,
    NounPipe,
    SafeUrlPipe,
    StickyComponent,
    NotificationComponent,
    MatchPipe,
    DraggableDirective,
    MovableDirective,
    RibbonLoaderComponent,
    FormatDayPipe,
    WeekFirstDayPipe,
    WeekLastDayPipe,
    CutNumberPipe
  ],
  exports: [
    ContextMenuComponent,
    CommonModule,
    PageTitleComponent,
    I18nModule,
    FormsModule,
    SeparateDigitsPipe,
    TimesPipe,
    KeysPipe,
    IconComponent,
    SearchInputComponent,
    IconToggleComponent,
    CheckboxComponent,
    TooltipComponent,
    CheckboxComponent,
    CheckRowComponent,
    ScrollComponent,
    SidebarComponent,
    SafeStylePipe,
    FormatDatePipe,
    SvgBasePipe,
    SafeUrlPipe,
    FormatMonthPipe,
    NounPipe,
    StickyComponent,
    NotificationComponent,
    MatchPipe,
    DraggableDirective,
    MovableDirective,
    RibbonLoaderComponent,
    FormatDayPipe,
    WeekFirstDayPipe,
    WeekLastDayPipe,
    CutNumberPipe,
  ]
})

export class SharedModule {
}
