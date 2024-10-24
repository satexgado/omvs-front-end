import { Component, OnInit, ViewChild } from '@angular/core';

// FULLCALENDAR
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin, { TimeGridView } from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
import * as frLocale from 'date-fns/locale/fr';
import { OptionsInput, EventInput } from '@fullcalendar/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { MissionService } from 'src/app/services/mission.service.';

import * as moment from 'moment';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent extends BaseComponent implements OnInit {

  @ViewChild('calendar') calendar: FullCalendarComponent;
  options: OptionsInput; // calendar config option
  private theme = { textColor: '#000', backgroundColor: '#E9E9E9', borderColor: '#E9E9E9' };
  SOURCE = [];
  private lastAvaibleDate: Date; // contains last date we used to fetch event from server
  private currentDate: string; // is used to get events from database by period

  constructor(private service: MissionService) {
    super(service, '/mission/calendrier', '');

    this.canInitData = false;
    this.canInitPaginate = false;
    this.canSubscribeToData = false
    this.purgeCacheBefore = true;
  }

  ngOnInit() {
    this.options = {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin],
      themeSystem: 'bootstrap',
      defaultView: 'timeGridWeek',
      locales: allLocales,
      locale: 'fr',
      eventLimitClick: 'day',
      eventLimit: true
    };

    this.service.hideBlockSlide();
    this.currentDate = this.service.today();
    this.requestings.stat = true;
    this.getByMonth();

    this.service.dataSubject.subscribe(
      (res: any) => {
        if (res) {
          if (res.data) {
            if (res.data.length) {
              let events = [];
              res.data.forEach((item: any) => {
                events.push({
                  id: item.id,
                  title: item.name,
                  start: item.start,
                  end: item.end,
                  textColor: item.textColor,
                  backgroundColor: item.backgroundColor,
                  borderColor: item.borderColor,
                  etat: item.etat,
                  localite: item.localite,
                  type: item.type,
                  departement: item.departement,
                  niveau: item.niveau
                })
              });
              this.SOURCE = events;
            }
          }

        }
        else {
          this.SOURCE = [];
        }
      }
    )
    this.service.emitData();
  }

  ngAfterViewInit() {
    // attach methods after calendar has rendered navigations button 
    document.querySelector('.fc-prev-button').addEventListener('click', () => {
      this.onDateChange('previous');
    });

    document.querySelector('.fc-next-button').addEventListener('click', () => {
      this.onDateChange('next');
    });

    document.querySelector('.fc-today-button').addEventListener('click', () => {
      this.onDateChange('today');
    });

    this.lastAvaibleDate = this.calendar.getApi().getDate();


  }


  private onDateChange(step: string) {
    let view = this.calendar.getApi().view.title;
    const newDate = this.calendar.getApi().getDate();
    const monthBefore = moment(newDate).isBefore(this.lastAvaibleDate, 'month');
    const monthAfter = moment(newDate).isAfter(this.lastAvaibleDate, 'month');


    if (monthBefore || monthAfter) {
      this.lastAvaibleDate = newDate;
      this.currentDate = this.service.mysql_date_format(newDate);
      this.getByMonth();
    }

  }

  private sameMonthAndyear(newDate: Date, currentDate: Date): boolean {
    let newDateInfo = this.service.dateInfo(newDate);
    let currentDateInfo = this.service.dateInfo(currentDate);
    if ((newDateInfo.month == currentDateInfo.month) && (newDateInfo.year == currentDateInfo.year)) {
      return true;
    }
    return false;
  }


  private getByMonth(etats = []) {
    let formValue = { anyDate: this.currentDate};
    this.service.setLoading(true);
    this.service.post('mission/calendrier', formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.service.setData(res);
          this.service.setLoading(false);
        }
        else {
          this.service.notify('error', 'ERROR');
          this.service.setLoading(false);
        }
      },
      (error) => {
        this.service.notify('error', "serverError");
        this.service.setLoading(false);
      }
    );
  }

  private eventClick(arg: EventInput) {
    let items  = this.SOURCE.filter(event => event.id == arg.event.id);
    this.service.goTo('mission/details/'+items[0].id+'/tab/default')
    // this.currentItem = items[0];
    // this.service.toggleBlockSlide(true);
  }

  closeBlockSlide(){
    this.service.toggleBlockSlide(false);
    this.currentItem = null;
  }

}
