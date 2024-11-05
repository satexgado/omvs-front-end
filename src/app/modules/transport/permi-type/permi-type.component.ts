import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from 'src/app/shared/models/query-options/query-options.model';
import { PermiTypeFactory } from 'src/app/core/services/transport/permi-type';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { IPermiType } from 'src/app/core/models/transport/permi-type';

@Component({
  selector: 'app-permi-type',
  templateUrl: './permi-type.component.html'
})
export class PermiTypeComponent extends EditableListComponent {
  modalData: IPermiType;

  allTypesPermis$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new PermiTypeFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes types permis');
    this.modalService = modalService;
  }

  openModal(content, genre: IPermiType) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
