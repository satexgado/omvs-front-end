import { AutomobileFactory } from "./../../../core/services/transport/automobile";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditComponent } from "./edit/edit.component";
import { AppTitleService, CacheService } from "src/app/shared/services";
import { EditableListComponent } from "../../../shared/components/editable-list/editable.list.component";
import { ResourceScrollableHelper } from "../../../shared/state";
import { TransportUiService } from "../transport.service";
import { ActivatedRoute, Event, NavigationCancel, NavigationEnd, NavigationError, Router } from "@angular/router";
import { IAutomobile } from "src/app/core/models/transport/automobile";
import { Subject, Subscription } from "rxjs";
import { IAutomobileItineraire } from "src/app/core/models/transport/automobile-itineraire";
import { DashboardService } from "src/app/components/modules/tableau/dashboard/dashboard.service";
import { Filter, QueryOptions, Sort } from "src/app/shared/models/query-options";
import { AutomobileEtatFactory } from "src/app/core/services/transport/automobile-etat";
import { delay, map, retryWhen, shareReplay, take } from "rxjs/operators";
import { getTextColor } from "src/app/shared/helperfonction";
import { IAutomobileEtat } from "src/app/core/models/transport/automobile-etat";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filterGrp } from "src/app/shared/models/query-options/query-options.model";
import { CarburantTypeFactory } from "src/app/core/services/transport/carburant-type";
import { AutomobileTypeFactory } from "src/app/core/services/transport/automobile-type";
import { TransSerieFactory } from "src/app/core/services/transport/serie";
import { MarqueFactory } from "src/app/core/services/transport/marque";
import { ModeleFactory } from "src/app/core/services/transport/modele";
import { GenreFactory } from "src/app/core/services/transport/genre";
import { CrCoordonneeFactory } from "src/app/core/services/cr-coordonnee";

interface AutomobileFiltre {
  type: string;
  value: any;
  name: string;
}

@Component({
  selector: "app-automobile",
  templateUrl: "./automobile.component.html",
  styleUrls: [
    './automobile.component.css'
  ]
})
export class AutomobileComponent extends EditableListComponent {
  editModal = EditComponent;
  subscription: Subscription = new Subscription();
  selectedAuto: IAutomobile;
  fragment: string;
  automobileItineraire: IAutomobileItineraire;
  checked_point_arret: [] = [];
  missions: [] = [];
  loading_missions = true;
  view: 'card' | 'list' =  localStorage.getItem("automobileViewType") ? <'card' | 'list'>localStorage.getItem("automobileViewType"):  'card';
  allEtatAutomobiles$ = new AutomobileEtatFactory().list(new QueryOptions().setSort([
    new Sort('libelle_etat','asc')
  ])).pipe(
     shareReplay(1),
     map(data => data.data)
  );
  allInscriptions$ = this.dashService.allPersonnels(
    new QueryOptions().setSort([new Sort('nom', 'asc')]).setIncludes(['departement','poste'])
  );
  allTypeCarburants$ = new CarburantTypeFactory().list().pipe(
      shareReplay(1),
      map(data => data.data)
    );
    allTypeAutomobiles$ = new AutomobileTypeFactory().list().pipe(
      shareReplay(1),
      map(data => data.data)
    );
  
    allSerie$ = new TransSerieFactory().list(      
    ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  
    allMarque$ = new MarqueFactory().list(
    ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
    
    allModele$ = new ModeleFactory().list(  
    ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
    
    allGenre$ = new GenreFactory().list(
      
    ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
    
    allCoordonnee$ = new CrCoordonneeFactory().list(
      
    ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
    
  configForm: FormGroup;
  filtres: AutomobileFiltre[] = [];

  getTextColor = getTextColor;
  onChangeView(view : 'card' | 'list') {
    this.view = view;
    localStorage.setItem('automobileViewType',view);
  }

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    protected uiService: TransportUiService,
    protected cacheService: CacheService,
    protected titleservice: AppTitleService,
    protected modalService: NgbModal,
    private formbuilder: FormBuilder,
    private dashService: DashboardService, 
  ) {
    super(new ResourceScrollableHelper(new AutomobileFactory()));
    titleservice.setTitle("automobile");
    this.modalService = modalService;
    this.dataHelper.relations = [
      "trans_serie",
      "trans_marque",
      "trans_modele",
      "trans_genre",
      "cr_coordonnee",
      "trans_type_carburant",
      "trans_type_automobile",
      "trans_etat_automobile",
      "conducteur.cpt_conducteur.departement",
      "conducteur.cpt_conducteur.poste",
      "emplacement.ville.pays",
      "trans_auto_affectataires.personne_inscription.departement",
      "trans_auto_affectataires.personne_inscription.poste"
    ];
  }

  ngOnInit() {
    this.subscription.add(
      this.uiService.automobileData$.subscribe(
        (automobile)=> {
          this.selectedAuto = automobile;
          if(automobile) {
            this.titleservice.setTitle(automobile.libelle? automobile.libelle: 'Parc Automobile');
            this.loadMission(automobile);
          } else {
            this.titleservice.setTitle('Parc Automobile');
          }
        }
      )
    )

    const detailsView = 'situation,details,panne,visite,calendrier,mission,assurance,affectataire';
    this.subscription.add(
      this.route.fragment.subscribe(fragment => {
        this.fragment = fragment;
        if(!detailsView.includes(fragment)) {
          this.fragment = 'details';
        }
      })
      )


    this.subscription.add(
      this.router.events.subscribe((event: Event) => {
        switch (true) {
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.onLoadChild();
            break;
          }
          default: {
            break;
          }
        }
      })
      )


    this.onLoadChild();
    this.createForm();
    super.ngOnInit();
  }

  onLoadChild() {
    if(this.route.firstChild) {
       return this.route.firstChild.data.subscribe(
       )
    }
    this.uiService.automobileData = null;
  }

  onSelectAuto(auto: IAutomobile = null) {
    this.uiService.automobileData = auto;
    this.router.navigate(["./", auto.id], { relativeTo: this.route });
  }

  openModal(content, automobile_itineraire: IAutomobileItineraire) {
    this.automobileItineraire = automobile_itineraire;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }

  loadMission(auto: IAutomobile) {
    this.loading_missions = true;
    this.missions = [];
    const param = new QueryOptions();
    param.filter_groups = [
        {or: false, filters:[new Filter('auto_id', auto.id, 'eq')]},
    ];
    param.includes = ['ville.pay','departement','equipes.personnel', 'type', 'personnel'];
    param.sort = [new Sort('name','asc')];
    this.dashService.allMissions(param).subscribe(
      (data)=> {
        this.missions = data.data;
        this.loading_missions = false;
      }
    )
  }

  onShowUpdateForm(item: any, modal = this.editModal) {
    let _result$ = new Subject<any>();
    const result$ = _result$.asObservable();
    super.onShowUpdateForm(item, modal).subscribe(
      (data) => {
        if(this.selectedAuto && this.selectedAuto.id == data.id) {
          Object.assign(this.selectedAuto,data);
        }
        _result$.next(data);
      }
    );
    return result$;
  }

  onUpdateItem(index: number, value, colname: string) {
    let _result$ = new Subject<any>();
    const result$ = _result$.asObservable();
    super.onUpdateItem(index, value, colname).subscribe(
      (data) => {
        if(this.selectedAuto && this.selectedAuto.id == data.id) {
          Object.assign(this.selectedAuto,data);
        }
        _result$.next(data);
      }
    );
    return result$;
  }

  onUpdateEtat(auto: IAutomobile, etat:IAutomobileEtat) {
    auto.etat_id = etat.id;
    auto.etat = etat;
    this.dataHelper.updateItem(auto);
    if(this.selectedAuto && this.selectedAuto.id == auto.id) {
      Object.assign(this.selectedAuto,auto);
    }

    let data = {};
    data['id'] = auto.id;
    data['etat_id'] = etat.id;
    this.dataHelper.service.update(data).subscribe();
  }


  onAddFilter() {
    const type = this.configForm.controls.type.value;
    const value = this.configForm.controls.value.value;
    const filter: AutomobileFiltre = {
      name: `${type.toString().replace('_id','').replace('_', ' ')}: ${value.libelle}`,
      value: value.id,
      type: type
    };
    this.filtres.push(filter);
    this.onReload()
  }

  createForm() {
    this.configForm = this.formbuilder.group({
      type: ['affectataire_id', Validators.required],
      value: [null, Validators.required]
      });
  }

  onRemoveFilter(i) {
    this.filtres.splice(i,1);
    this.onReload();
  }

  groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }

  resetFormValue() {
    this.configForm.controls.value.setValue(null);
  }

  onReload() {   
    const filter_groups: filterGrp[] = [];
    const filtresGroup = this.groupBy(this.filtres, (c) => c.type)
    if(this.filtres && this.filtres.length) {
      Object.values(filtresGroup).forEach(function (filtre: AutomobileFiltre[]) {
        const customfilter = [];
        filtre.forEach(filter => {
          const fltr = new Filter(filter.type,filter.value, 'eq');
          customfilter.push(fltr);
        }); 
        filter_groups.push({
          or: true, filters: customfilter
        })
      });
    }
    this.dataHelper.searchCustomFilterGroup = filter_groups;
    this.dataHelper.page = 1;
  }

  ngOnDestroy()
  {
      this.subscription.unsubscribe();
  }
}
