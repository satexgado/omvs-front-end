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
import { map, shareReplay } from "rxjs/operators";
import { getTextColor } from "src/app/shared/helperfonction";
import { IAutomobileEtat } from "src/app/core/models/transport/automobile-etat";

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
      "trans_etat_automobile"
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

    const detailsView = 'details,panne,visite,calendrier,mission, assurance';
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
    super.ngOnInit()
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


  ngOnDestroy()
  {
      this.subscription.unsubscribe();
  }
}
