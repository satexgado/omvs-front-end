import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { MarqueFactory } from './../../../core/services/transport/marque';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IMarque } from '../../../core/models/transport/marque';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html'
})
export class MarqueComponent extends EditableListComponent {
  modalData: IMarque;

  allTypesMarques$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new MarqueFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes marques');
    this.modalService = modalService;
  }

  openModal(content, marque: IMarque) {
    this.modalData = marque;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
