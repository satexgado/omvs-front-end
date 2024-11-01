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
import { Subscription } from "rxjs";
import { IAutomobileItineraire } from "src/app/core/models/transport/automobile-itineraire";

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

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    protected uiService: TransportUiService,
    protected cacheService: CacheService,
    protected titleservice: AppTitleService,
    protected modalService: NgbModal
  ) {
    super(new ResourceScrollableHelper(new AutomobileFactory()));
    titleservice.setTitle("automobile");
    this.modalService = modalService;
    this.dataHelper.relations = [
      "trans_serie",
      "trans_marque",
      "trans_modele",
      "trans_genre",
      "trans_couleur",
      "trans_type_carburant",
      "trans_type_automobile",
    ];
  }

  ngOnInit() {
    this.subscription.add(
      this.uiService.automobileData$.subscribe(
        (automobile)=> {
          this.selectedAuto = automobile;

          if(automobile) {
            this.titleservice.setTitle(automobile.libelle? automobile.libelle: 'Parc Automobile');
          } else {
            this.titleservice.setTitle('Parc Automobile');
          }
        }
      )
    )

    const detailsView = 'details,panne,affectation,calendrier,itineraire';
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

  ngOnDestroy()
  {
      this.subscription.unsubscribe();
  }
}
