import { AutomobileItineraireFactory } from 'src/app/core/services/transport/automobile-itineraire';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { IAutomobileItineraire } from 'src/app/core/models/transport/automobile-itineraire';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppTitleService } from 'src/app/shared/services';
import { EditComponent as AutomobileItineraireEditComponent } from 'src/app/modules/transport/automobile-itineraire/edit/edit.component';
import { IAutomobile } from 'src/app/core/models/transport/automobile';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { QueryOptions, Filter } from 'src/app/shared/models/query-options';

@Component({
  selector: 'app-automobile-itineraire',
  templateUrl: './automobile-itineraire.component.html'
})
export class AutomobileItineraireComponent extends EditableListComponent implements OnInit {

    subscription: Subscription = new Subscription();
    automobile: IAutomobile;
    modalData: IAutomobileItineraire;
    checked_point_arret: [] = [];
    editModal = AutomobileItineraireEditComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        protected titleService: AppTitleService,
        protected modalService: NgbModal) {
        super(null)
        this.modalService = modalService;
     }

     @Input()  set initAutomobile(automobile: IAutomobile) {
      this.automobile = automobile;
      this.dataHelper = new ResourceScrollableHelper(
        new AutomobileItineraireFactory(),
        new QueryOptions(
          [
            {or: false, filters:[
                new Filter('bus',this.automobile.id,'eq')
            ]}
        ],
        ['trans_itineraire.trans_masque_itineraire.visi_ville',
        'trans_itineraire.trans_lieu_arrivee',
        'trans_itineraire.trans_point_arrets',
        'trans_itineraire.trans_point_depart'
        ]
        )
      );
      super.ngOnInit();
    };


    ngOnInit() {
        
    }

  onShowCreateForm(item?) {
      const modalRef = this.modalService.open(this.editModal, { size: 'lg', centered: true, backdrop: 'static' });
      modalRef.componentInstance.isUpdating = false;
      modalRef.componentInstance.title = 'Créer';

      // In case it's create from existing element
      if (item) {
        modalRef.componentInstance.title = item.libelle ? `Créer comme: ${item.libelle}` : 'Créer';
        modalRef.componentInstance.item = item;
      } else {
        modalRef.componentInstance.automobile = this.automobile;
      }

    modalRef.componentInstance.newItem.subscribe(
      (data: any) => {
        this.dataHelper.addItem(data);
      }
    );

    return of(true);
  }

    openModal(content, automobile_itineraire: IAutomobileItineraire) {
      this.modalData = automobile_itineraire;
      this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
        this.automobile = null;
    }

}
