import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from 'src/app/shared/models/query-options/query-options.model';
import { AutomobileTypeFactory } from 'src/app/core/services/transport/automobile-type';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { IAutomobileType } from 'src/app/core/models/transport/automobile-type';

@Component({
  selector: 'app-automobile-type',
  templateUrl: './automobile-type.component.html'
})
export class AutomobileTypeComponent extends EditableListComponent {
  modalData: IAutomobileType;

  allTypesAutomobiles$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new AutomobileTypeFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes types automobiles');
    this.modalService = modalService;
  }

  openModal(content, genre: IAutomobileType) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
