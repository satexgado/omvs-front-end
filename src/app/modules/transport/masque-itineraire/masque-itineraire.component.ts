import { ItineraireMasqueFactory } from './../../../core/services/transport/itineraire-masque';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { EditableListComponent } from '../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString, QueryOptions, Filter } from '../../../shared/models/query-options';

@Component({
  selector: 'app-masque-itineraire',
  templateUrl: './masque-itineraire.component.html'
})
export class MasqueItineraireComponent extends EditableListComponent {

  editModal = EditComponent;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new ItineraireMasqueFactory(),
      new QueryOptions(
        [
          {or: false, filters:[new Filter('isIns', true, 'eq')]},
          {or: true, filters:[new Filter('searchString', '', 'ct')]},
      ],
      ['visi_ville'])
      )
    );
    titleservice.setTitle('masques itineraires');
    this.modalService = modalService;
  }

}
