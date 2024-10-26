import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from 'src/app/shared/models/query-options/query-options.model';
import { CarburantTypeFactory } from 'src/app/core/services/transport/carburant-type';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { ICarburantType } from 'src/app/core/models/transport/carburant-type';

@Component({
  selector: 'app-carburant',
  templateUrl: './carburant.component.html'
})
export class CarburantComponent extends EditableListComponent {
  modalData: ICarburantType;

  allTypesCarburants$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new CarburantTypeFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes carburants');
    this.modalService = modalService;
  }

  openModal(content, genre: ICarburantType) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
