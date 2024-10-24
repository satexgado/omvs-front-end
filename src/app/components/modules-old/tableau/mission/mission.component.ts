import { DashboardService, QueryParameter } from './../dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { QueryOptions, Sort, Filter } from '../../query-options';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  missions: any[];
  search: string = '';
  page_last;
  items_total;
  page_current = 1;
  loading = true;
  changePage: Subject<number> = new Subject<number>();

  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.getPage(1);
    this.changePage.pipe(
      debounceTime(1500), 
      distinctUntilChanged()
    )
    .subscribe(page => this.getPage(page))
  }

  changed(page: number) {
    this.changePage.next(page);
  }

  getPage(page: number) {
    this.loading = true;
    this.page_current = page;
    const param = new QueryOptions();
    param.filter_groups = [
        {or: false, filters:[new Filter('search_string', this.search, 'eq')]},
    ];
    param.includes = ['ville.pay','departement','equipes.personnel', 'type'];
    param.paginate = 10;
    param.page = page;
    param.sort = [new Sort('name','asc')];
    this.service.allMissions(param).subscribe(
      (data)=> {
        this.page_current =  data.current_page;
        this.page_last = data.last_page;
        this.items_total = data.total;
        this.missions = data.data;
        this.loading = false;
      }
    )
  }
  
  canDisplayPage(i)  {
    const limit = 6;
    return (( i - this.page_current < 6) && ( i - this.page_current >= 0) ) || (( this.page_current - i < 6) && (this.page_current -i >= 0) )
  }
}
