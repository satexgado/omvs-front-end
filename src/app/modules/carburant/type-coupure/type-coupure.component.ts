import { EditableListComponent } from '../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from '../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IBonTypeCoupure } from 'src/app/core/models/transport/bon-type-coupure';
import { BonTypeCoupureFactory } from 'src/app/core/services/transport/bon-type-coupure';

@Component({
  selector: 'app-bon-type-coupure',
  templateUrl: './type-coupure.component.html'
})
export class TypeCoupureComponent extends EditableListComponent {
  modalData: IBonTypeCoupure;

  allTypesTypeCoupures$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new BonTypeCoupureFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes type-coupure');
    this.modalService = modalService;
  }

  openModal(content, genre: IBonTypeCoupure) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
