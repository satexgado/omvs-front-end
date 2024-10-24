import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { PositionFactory } from './../../../core/services/transport/position';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IPosition } from '../../../core/models/transport/position';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html'
})
export class PositionComponent extends EditableListComponent {
  modalData: IPosition;

  allTypesPositions$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new PositionFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes positions');
    this.modalService = modalService;
  }

  openModal(content, position: IPosition) {
    this.modalData = position;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
