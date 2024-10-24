import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString, QueryOptions } from './../../../shared/models/query-options/query-options.model';
import { ItineraireFactory } from './../../../core/services/transport/itineraire';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { Filter } from 'src/app/shared/models/query-options';

@Component({
  selector: 'app-itineraire',
  templateUrl: './itineraire.component.html'
})
export class ItineraireComponent extends EditableListComponent {

  editModal = EditComponent;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new ItineraireFactory(),
        new QueryOptions(
          [
            {or: false, filters:[new Filter('isIns', true, 'eq')]},
            {or: true, filters:[new Filter('searchString', '', 'ct')]},
        ],
        ['trans_point_arrets'],
        )
      )
    );
    titleservice.setTitle('mes itineraires');
    this.modalService = modalService;
  }

}
