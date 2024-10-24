import { AutomobileItineraireFactory } from 'src/app/core/services/transport/automobile-itineraire';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { IAutomobileItineraire } from 'src/app/core/models/transport/automobile-itineraire';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent as AutomobileEditComponent } from '../../edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditComponent as AutomobileItineraireEditComponent } from 'src/app/modules/transport/automobile-itineraire/edit/edit.component';
import { IAutomobile } from 'src/app/core/models/transport/automobile';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { QueryOptions, Filter } from 'src/app/shared/models/query-options';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { QueryAllOptionWithIns } from 'src/app/shared/models/query-options/query-options.model';

@Component({
  selector: 'app-automobile-details-edit',
  templateUrl: './automobile-details-edit.component.html'
})
export class AutomobileDetailsEditComponent extends EditableListComponent implements OnInit {

    subscription: Subscription = new Subscription();
    automobile: IAutomobile;
    modalData: IAutomobileItineraire;
    automobile_list: IAutomobile[];
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



    ngOnInit() {
        let sub = this.route.data
        .subscribe((data: { automobile: IAutomobile }) =>
          {
            if(!data.automobile)
            {
              this.router.navigate(['/transport/mes-autos']);
              return;
            }
            this.automobile = data.automobile;
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
          });

          const automobileService = new AutomobileFactory();
        let subs_all_auto = automobileService.list(
          QueryAllOptionWithIns
        )
        .subscribe(
            data => {
                this.automobile_list = data.data;
            }
        );

        this.subscription.add(sub);
        this.subscription.add(subs_all_auto);
    }

    onUpdateForm() {
        const modalRef = this.modalService.open(AutomobileEditComponent, { size: 'lg', centered: true,  backdrop: 'static' });
        modalRef.componentInstance.title = 'Modifier';
        modalRef.componentInstance.item = this.automobile;
        modalRef.componentInstance.isUpdating = true;
        modalRef.componentInstance.newItem.subscribe(
            (data)=>{
            this.automobile = data[0];
            }
        )
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
