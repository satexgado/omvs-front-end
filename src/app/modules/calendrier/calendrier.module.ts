import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarUiComponent } from './calendar-ui.component';
import { CalendrierEventEditModalComponent } from './event-edit-modal/event-edit-modal.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CalendarViewUiComponent } from './view-ui/calendar-view-ui.component';
import { FullCalendarModule } from '@fullcalendar-vision/angular';
import dayGridPlugin from '@fullcalendar-vision/daygrid';
import timeGridPlugin from '@fullcalendar-vision/timegrid';
import listPlugin from '@fullcalendar-vision/list';
import interactionPlugin from '@fullcalendar-vision/interaction';
import rrulePlugin from '@fullcalendar-vision/rrule'
import { CustomInputModule } from 'src/app/shared/components/custom-input';
import { ChooseItemModule } from '../choose-item';
import { ItineraireModule } from '../transport/itineraire/itineraire.module';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  rrulePlugin
]);

@NgModule({
    declarations: [
        CalendarUiComponent,
        CalendarViewUiComponent,
        CalendrierEventEditModalComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        FullCalendarModule,
        CustomInputModule,
        ChooseItemModule,
        ItineraireModule
    ],
    exports: [
      CalendarUiComponent,
      CalendarViewUiComponent,
      CalendrierEventEditModalComponent,
    ],
    entryComponents: [CalendrierEventEditModalComponent],
})
export class CalendrierModule {

}
