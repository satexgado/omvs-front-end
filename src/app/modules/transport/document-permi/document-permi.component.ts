import { DocumentPermiFactory } from './../../../core/services/transport/document-permi';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { DefaultQueryOptionWithInsAndSeachString } from '../../../shared/models/query-options';
import { EditableListComponent } from 'src/app/shared';

@Component({
  selector: 'app-document-permi',
  templateUrl: './document-permi.component.html'
})
export class DocumentPermiComponent extends EditableListComponent {


  editModal = EditComponent;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new DocumentPermiFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes documents de permis');
    this.modalService = modalService;
  }
}
