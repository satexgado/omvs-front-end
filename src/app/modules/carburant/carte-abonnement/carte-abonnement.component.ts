import { EditableListComponent } from '../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from '../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { CarteAbonnementCarburantFactory } from 'src/app/core/services/carte-abonnement-carburant';
import { ICarteAbonnementCarburant } from 'src/app/core/models/carte-abonnement-carburant';

@Component({
  selector: 'app-carte-abonnement-carburant',
  templateUrl: './carte-abonnement.component.html'
})
export class CarteAbonnementCarburantComponent extends EditableListComponent {
  modalData: ICarteAbonnementCarburant;

  allTypesCarteAbonnements$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new CarteAbonnementCarburantFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes cartes abonnements');
    this.modalService = modalService;
    this.dataHelper.relations = ['personne_inscription'];
  }

  openModal(content, genre: ICarteAbonnementCarburant) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
