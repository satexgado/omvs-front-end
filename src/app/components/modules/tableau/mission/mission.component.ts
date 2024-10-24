import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { DashboardService, QueryParameter } from './../dashboard/dashboard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueryOptions, Sort, Filter } from '../../query-options';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

interface MissionFiltre {
  type: string;
  value: any;
  name: string;
}

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  missions: any[];
  search: string = '';
  filtres: MissionFiltre[] = [];
  page_last;
  items_total;
  page_current = 1;
  loading = true;
  changePage: Subject<number> = new Subject<number>();
  configForm: FormGroup;
  is_showing_filter;

  dateDebut = new Date('2000');
  dateFin = new Date();
  dateDebutControl = new FormControl();
  dateFinControl = new FormControl();

  constructor(
    private service: DashboardService, 
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let sub = this.route.queryParams
    .pipe()
      .subscribe(params => {
        this.search = params.search ? params.search : '';
        this.page_current = params.page ? params.page : '';
        if(params.filtre) {
          this.filtres = JSON.parse(params.filtre);
        };
        this.getPage(this.page_current);
    });
    this.subscription.add(sub);
    this.changePage.pipe(
      // debounceTime(800), 
      distinctUntilChanged()
    )
    .subscribe(page => {
      this.page_current = page;
      this.onReload();
    });
    this.createForm();
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
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

  onReload() {
    this.router.navigate(['/dashboard/tableau'], { queryParams: { page:this.page_current ,search: this.search, filtre: JSON.stringify(this.filtres) } });
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

  changed(page: number) {
    this.changePage.next(page);
  }

  resetFormValue() {
    this.configForm.controls.value.setValue(null);
  }

  groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }

  getPage(page: number) {
    this.loading = true;
    this.page_current = page;
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
          or: true, filters: customfilter
        })
      });
    }

    param.includes = ['ville.pay','departement','equipes.personnel', 'type', 'personnel'];
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

  budgetTotal(mission: {total_budget}[]) {
    return mission.map(a => a.total_budget).reduce(function(a, b)
    {
      return a + b;
    });
  }
  
  canDisplayPage(i)  {
    const limit = 10;
    return (( i - this.page_current < limit) && ( i - this.page_current >= 0) ) || (( this.page_current - i < limit) && (this.page_current -i >= 0) )
  }
}
