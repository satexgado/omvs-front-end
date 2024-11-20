import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

// FULLCALENDAR
import { FullCalendarComponent } from '@fullcalendar-vision/angular';
// import * as frLocale from 'date-fns/locale/fr';
import { OptionsInput, EventInput } from '@fullcalendar/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { MissionService } from 'src/app/services/mission.service.';
import { CalendarOptions } from '@fullcalendar-vision/angular';
import frLocale from '@fullcalendar-vision/core/locales/fr';

import * as moment from 'moment';
import { range, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filter, QueryOptions, Sort } from '../../modules/query-options';
import { DashboardService } from '../../modules/tableau/dashboard/dashboard.service';

interface MissionFiltre {
  type: string;
  value: any;
  name: string;
}

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent extends BaseComponent implements OnInit {

  search: string = '';
  filtres: MissionFiltre[] = [];
  configForm: FormGroup;
  is_showing_filter;

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

  constructor(private service: MissionService, private cdr: ChangeDetectorRef, protected dashboardService: DashboardService,private formbuilder: FormBuilder) {
    super(service, '/mission/calendrier', '');

    this.canInitData = false;
    this.canInitPaginate = false;
    this.canSubscribeToData = false
    this.purgeCacheBefore = true;
  }

  GetCalendarDateRange() {
    let view = this.calendar.getApi().view;
    let start = view.currentStart;
    let end = view.currentEnd;
    let dates = { start: start, end: end };
    return dates;
  }

  onAddFilter() {
    const type = this.configForm.controls.type.value;
    const value = this.configForm.controls.value.value;
    const filter: MissionFiltre = {
      name: `${type.toString().replace('_id','').replace('_', ' ')}: ${value.name}`,
      value: value.id,
      type: type
    };
    this.filtres.push(filter);
    this.onReload()
  }

  onRemoveFilter(i) {
    this.filtres.splice(i,1);
    this.onReload();
  }

  showFilter(state: boolean)
  {
    this.is_showing_filter = state;
    if(state) {
      this.createForm();
    }
  }

  createForm() {
    this.configForm = this.formbuilder.group({
      type: ['type_id', Validators.required],
      value: [null, Validators.required]
      });
  }

  resetFormValue() {
    this.configForm.controls.value.setValue(null);
  }

  groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }

  ngAfterViewInit() {
    // attach methods after calendar has rendered navigations button 
    document.querySelector('.fc-prev-button').addEventListener('click', () => {
      this.onReload();
    });

    document.querySelector('.fc-next-button').addEventListener('click', () => {
      this.onReload();
    });

    document.querySelector('.fc-today-button').addEventListener('click', () => {
      this.onReload();
    });

    document.querySelector('.fc-prevYear-button').addEventListener('click', () => {
      this.onReload();
    });

    document.querySelector('.fc-nextYear-button').addEventListener('click', () => {
      this.onReload();
    });

    this.onReload();
    this.cdr.detectChanges();
  }

  onReload() {
    this.service.setLoading(true);
    const param = new QueryOptions();
    param.filter_groups = [
        {or: false, filters:[new Filter('search_string', this.search, 'eq')]},
    ];
     const filtresGroup = this.groupBy(this.filtres, (c) => c.type)
    
    if(this.filtres && this.filtres.length) {
      Object.values(filtresGroup).forEach(function (filtre: MissionFiltre[]) {
        const customfilter = [];
        filtre.forEach(filter => {
          const fltr = new Filter(filter.type,filter.value, 'eq');
          customfilter.push(fltr);
        }); 
        param.filter_groups.push({
          or: false, filters: customfilter
        })
      });
    }
    param.filter_groups.push({
      or: false, filters: [new Filter('archive',0, 'eq')]
    })
    let range = this.GetCalendarDateRange()
    param.filter_groups.push({
      or: false, filters: [new Filter('start',range.start, 'lte'),new Filter('end',range.end, 'gte')]
    });
    param.includes = ['ville.pay','departement','equipes.personnel', 'type', 'personnel','etat'];
    param.sort = [new Sort('name','asc')];
    this.dashboardService.allMissions(param).subscribe(
      (res: any) => {
        if (res.data) {
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
    )
  }

  ngOnInit() {
    this.service.hideBlockSlide();
    this.currentDate = this.service.today();
    this.requestings.stat = true;
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
    this.createForm();
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
