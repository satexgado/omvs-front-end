import { Component, OnInit, ViewChild } from '@angular/core';

// FULLCALENDAR
import { FullCalendarComponent } from '@fullcalendar-vision/angular';
// import * as frLocale from 'date-fns/locale/fr';
import { OptionsInput, EventInput } from '@fullcalendar/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { MissionService } from 'src/app/services/mission.service.';
import { CalendarOptions } from '@fullcalendar-vision/angular';
import frLocale from '@fullcalendar-vision/core/locales/fr';

import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent extends BaseComponent implements OnInit {

  @ViewChild('calendar') calendar: FullCalendarComponent;
  options: CalendarOptions = {
    locale: 'fr',
    locales: [ frLocale ],
    headerToolbar: {
      left: 'prevYear,prev,today,next,nextYear',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' 
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.eventClick.bind(this),
  }; // calendar config option
  private theme = { textColor: '#000', backgroundColor: '#E9E9E9', borderColor: '#E9E9E9' };
  SOURCE = [];
  private lastAvaibleDate: Date; // contains last date we used to fetch event from server
  private currentDate: string; // is used to get events from database by period
  changeMonth: Subject<void> = new Subject<void>();

  constructor(private service: MissionService) {
    super(service, '/mission/calendrier', '');

    this.canInitData = false;
    this.canInitPaginate = false;
    this.canSubscribeToData = false
    this.purgeCacheBefore = true;
  }

  changed() {
    this.changeMonth.next();
  }

  ngOnInit() {
    this.service.hideBlockSlide();
    this.currentDate = this.service.today();
    this.requestings.stat = true;
    this.getByMonth();

    this.changeMonth.pipe(
      debounceTime(1500)
    ).subscribe(() => this.getByMonth());

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
              this.options.events = events;
            }
          }

        }
        else {
          this.options.events = [];
        }
      }
    )
    this.service.emitData();
  }

  ngAfterViewInit() {
    // attach methods after calendar has rendered navigations button 
    // document.querySelector('.fc-prev-button').addEventListener('click', () => {
    //   this.onDateChange('previous');
    // });

    // document.querySelector('.fc-next-button').addEventListener('click', () => {
    //   this.onDateChange('next');
    // });

    // document.querySelector('.fc-today-button').addEventListener('click', () => {
    //   this.onDateChange('today');
    // });

    // document.querySelector('.fc-prevYear-button').addEventListener('click', () => {
    //   this.onDateChange('prevYear','year');
    // });

    // document.querySelector('.fc-nextYear-button').addEventListener('click', () => {
    //   this.onDateChange('nextYear','year');
    // });

    // this.lastAvaibleDate = this.calendar.getApi().getDate();


  }


  private onDateChange(step: string, range:moment.unitOfTime.StartOf = 'month') {
    let view = this.calendar.getApi().view.title;
    const newDate = this.calendar.getApi().getDate();
    const monthBefore = moment(newDate).isBefore(this.lastAvaibleDate, range);
    const monthAfter = moment(newDate).isAfter(this.lastAvaibleDate, range);


    if (monthBefore || monthAfter) {
      this.lastAvaibleDate = newDate;
      this.currentDate = this.service.mysql_date_format(newDate);
      this.changed();
      // this.getByMonth();
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
    this.service.post('mission/calendrier').subscribe(
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
    let items = [];
    if(Array.isArray(this.options.events)) {
      items  = this.options.events.filter(event => event.id == arg.event.id);
    }
    this.service.goTo('mission/details/'+items[0].id+'/tab/default')
    // this.currentItem = items[0];
    // this.service.toggleBlockSlide(true);
  }

  closeBlockSlide(){
    this.service.toggleBlockSlide(false);
    this.currentItem = null;
  }

}
