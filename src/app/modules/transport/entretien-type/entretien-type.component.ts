import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { EntretienTypeFactory } from './../../../core/services/transport/entretien-type';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IEntretienType } from '../../../core/models/transport/entretien-type';

@Component({
  selector: 'app-entretien-type',
  templateUrl: './entretien-type.component.html'
})
export class EntretienTypeComponent extends EditableListComponent {
  modalData: IEntretienType;

  allTypesEntretienTypes$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new EntretienTypeFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes entretien-types');
    this.modalService = modalService;
  }

  openModal(content, entretienType: IEntretienType) {
    this.modalData = entretienType;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
