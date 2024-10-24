import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { LieuFactory } from './../../../core/services/transport/lieu';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { ILieu } from '../../../core/models/transport/lieu';

@Component({
  selector: 'app-lieu',
  templateUrl: './lieu.component.html'
})
export class LieuComponent extends EditableListComponent {
  modalData: ILieu;

  allTypesLieus$: Observable<object>;
  editModal= EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new LieuFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes lieus');
    this.modalService = modalService;
  }

  openModal(content, lieu: ILieu) {
    this.modalData = lieu;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
