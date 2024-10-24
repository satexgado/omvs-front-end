import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { DossierMedicalFactory } from './../../../core/services/transport/dossier-medical';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html'
})
export class DossierMedicalComponent extends EditableListComponent {

  editModal = EditComponent;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new DossierMedicalFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes dossier-medicals');
    this.modalService = modalService;
  }

}
