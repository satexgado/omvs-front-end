import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString, QueryOptions } from './../../../shared/models/query-options/query-options.model';
import { DossierConducteurFactory } from './../../../core/services/transport/dossier-conducteur';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { Filter } from 'src/app/shared/models/query-options';

@Component({
  selector: 'app-dossier-conducteur',
  templateUrl: './dossier-conducteur.component.html'
})
export class DossierConducteurComponent extends EditableListComponent {

  editModal = EditComponent;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new DossierConducteurFactory(),
      new QueryOptions([
        {or: false, filters:[new Filter('isIns', true, 'eq')]},
        {or: true, filters:[new Filter('searchString', '', 'ct')]},
      ],
      ['type_permis','cpt_conducteur','visi_pays']))
    );
    titleservice.setTitle('mes dossier-conducteurs');
    this.modalService = modalService;
  }

}
