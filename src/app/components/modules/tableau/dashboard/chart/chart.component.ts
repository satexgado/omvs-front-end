import { DashboardService, QueryParameter } from './../dashboard.service';
import { ChoosingComponent } from './choosing/choosing.component';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { BarComponent } from './bar/bar.component';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ChartConfigurationComponent } from './chart-configuration/chart-configuration.component';
import { Filter, QueryOptions, Sort } from 'src/app/components/modules/query-options';
import { ChartType, QualiteEnum } from 'src/app/components/modules/chart-enumeration';
import { ChartFormData } from 'src/app/components/modules/chart-interface';




@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  entryComponents: [ChoosingComponent, BarComponent],
  providers:[DatePipe]
})
export class ChartComponent implements OnInit {

  @ViewChild('dynamicView', {read: ViewContainerRef}) itemViewContainer: ViewContainerRef;

  chartType: ChartType;
  dateDebut = new Date('2000');
  dateFin = new Date();
  dateDebutControl = new FormControl();
  dateFinControl = new FormControl();
  updateDate;
  chartConfig: {chartFormData: ChartFormData, labels: string[], query: QueryParameter[]} = {
    chartFormData: new ChartFormData(),
    labels: [],
    query: []
  };
  sorting;
  
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver, 
    private datePipe: DatePipe,
    private service: DashboardService
    ) { }

  ngOnInit() {
    this.loadComponent();
  }

  onUpdateDate() {
    this.dateDebutControl.setValue(this.datePipe.transform(this.dateDebut, 'yyyy-MM-dd'));
    this.dateFinControl.setValue(this.datePipe.transform(this.dateFin, 'yyyy-MM-dd'));
    this.updateDate = true;
  }

  onSaveDate() {
    this.dateDebut = moment(this.dateDebutControl.value).toDate();
    this.dateFin = moment(this.dateFinControl.value).toDate();
    this.updateDate = false;
    this.chartConfig.query.map(element => {
      element.query.filter_groups[0] = 
        {or: false, filters:[new Filter('start', this.dateDebut, 'gte'),new Filter('end', this.dateFin, 'lte')]}
    
    });
    if(this.chartConfig.chartFormData.chartType) {
      this.loadComponent(this.chartConfig.chartFormData.chartType);
    }
  }

  getMonth(startDate, endDate)
  {
     startDate = moment(startDate);
     endDate = moment(endDate);
     
      let dates = [];
      
      let month = moment(startDate); //clone the startDate
      while( month < endDate ) {
          dates.push(month.format('M/YYYY'));
          month.add(1, "month");
      }
      return dates;
  }

  getAnnee(startDate, endDate)
  {
     startDate = moment(startDate);
     endDate = moment(endDate);
     
      let dates = [];
      
      let annee = moment(startDate); //clone the startDate
      while( annee <= endDate ) {
          dates.push(annee.format('YYYY'));
          annee.add(1, "year");
      }
      return dates;
  }

  getDepartement()
  {
     return [
       'DRH', 'Audit & Contrôle', 'Informatique', 'Comptabilité', 'Haut Commissaire', 'DAMG'
     ]
  }

  loadComponent(chartType: ChartType  = null)
  {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getChartComponent(chartType));
    this.itemViewContainer.clear();
    const componentRef = this.itemViewContainer.createComponent(componentFactory);
    const comp = componentRef.instance;
    if(comp instanceof ChoosingComponent ) {
      comp.chartSelect.subscribe(
        (data: ChartFormData) => {
          this.chartConfig.chartFormData = data;
          this.sorting = `grp${data.qualite}${data.valeur}`;
          this.chartConfig.query = [];
          this.chartConfig.chartFormData.datasets.forEach(dataset => {
            const queryOptions = new QueryOptions([
              {or: false, filters:[new Filter('start', this.dateDebut, 'gte'),new Filter('end', this.dateFin, 'lte')]},
            ]);
            queryOptions.setSort([new Sort(this.sorting,'desc')]);
            if(dataset.filters && dataset.filters.length) {
              const customfilter = [];
              dataset.filters.forEach(filter => {
                const fltr = new Filter(filter.type,filter.value, 'eq');
                customfilter.push(fltr);
              }); 
              queryOptions.filter_groups.push({
                or: true, filters: customfilter
              })
            }
            let libelle = dataset.libelle ? dataset.libelle : 'aucun libelle'; 
            this.chartConfig.query.push({
              libelle: libelle, query: queryOptions, couleur: dataset.couleur, type: dataset.chartType
            });
          });
          this.loadComponent(data.chartType);
        }
      )
    } 

    if(comp instanceof ChartConfigurationComponent) {
      this.setLabels(this.chartConfig.chartFormData.qualite);
      comp.chartConfig = this.chartConfig;
      comp.data$ = this.service.list(this.chartConfig.query);
    }
  }

  setLabels(qualite: QualiteEnum): any
  {
    switch(qualite) {
      case QualiteEnum.annee:
        this.chartConfig.labels = this.getAnnee(this.dateDebut, this.dateFin);
        break;
      case QualiteEnum.mois:
        this.chartConfig.labels = this.getMonth(this.dateDebut, this.dateFin);
        break;
      case QualiteEnum.departement:
        this.service.allDepartements$.subscribe(
          (data)=> {
            this.chartConfig.labels = data.map(element => element.name);
          } 
        );
        break;
      case QualiteEnum.localite:
        this.service.allLocalites$.subscribe(
          (data)=> {
            this.chartConfig.labels = data.map(element => element.name);
          } 
        );
        break;
      case QualiteEnum.pays:
        this.service.allPays$.subscribe(
          (data)=> {
           this.chartConfig.labels = data.map(element => element.name);
          }
        );
        break;
      default: 
        this.chartConfig.labels = this.getAnnee(this.dateDebut, this.dateFin);
    }
  }

  getChartComponent(chartType: ChartType): any
  {
    switch(chartType) {
      case 'bar':
        return BarComponent;
      default: 
        return ChoosingComponent;
    }
  }

}
