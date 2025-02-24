import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString, QueryOptions } from './../../../shared/models/query-options/query-options.model';
import { DossierConducteurFactory } from './../../../core/services/transport/dossier-conducteur';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { Filter } from 'src/app/shared/models/query-options';
import { Subscription } from 'rxjs';
import { IDossierConducteur } from 'src/app/core/models/transport/dossier-conducteur';
import { TransportUiService } from '../transport.service';
import { ActivatedRoute, Event, NavigationCancel, NavigationEnd, NavigationError, Router } from "@angular/router";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-dossier-conducteur',
  templateUrl: './dossier-conducteur.component.html',
  styleUrls:['./dossier-conducteur.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class DossierConducteurComponent extends EditableListComponent {
  subscription: Subscription = new Subscription();
  selectedDossier: IDossierConducteur;
  modalData: IDossierConducteur;
  editModal = EditComponent;
  view: 'card' | 'list' =  localStorage.getItem("userViewType") ? <'card' | 'list'>localStorage.getItem("userViewType"):  'card';
  onChangeView(view : 'card' | 'list') {
    this.view = view;
    localStorage.setItem('userViewType',view);
  }

  constructor(
    protected titleservice: AppTitleService,
    protected uiService: TransportUiService,
    public route: ActivatedRoute,
    private router: Router,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new DossierConducteurFactory(),
      new QueryOptions([
        {or: false, filters:[new Filter('isIns', true, 'eq')]},
        {or: true, filters:[new Filter('searchString', '', 'ct')]},
      ],
      ['type_permis','cpt_conducteur.departement','cpt_conducteur.poste','visi_pays']))
    );
    titleservice.setTitle('mes dossier-conducteurs');
    this.modalService = modalService;
  }

  ngOnInit() {
    this.subscription.add(
      this.uiService.conducteurData$.subscribe(
        (dossierconducteur)=> {
          this.selectedDossier = dossierconducteur;

          if(dossierconducteur) {
            this.titleservice.setTitle(dossierconducteur.libelle? dossierconducteur.libelle: 'Parc Automobile');
          } else {
            this.titleservice.setTitle('mes dossier-conducteurs');
          }
        }
      )
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
    this.uiService.conducteurData = null;
  }

  onSelectDossier(dossier: IDossierConducteur = null) {
    this.uiService.conducteurData = dossier;
    this.router.navigate(["./", dossier.id], { relativeTo: this.route });
  }

  ngOnDestroy()
  {
      this.subscription.unsubscribe();
  }

  openModal(content, data: IDossierConducteur) {
    this.modalData = data;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
