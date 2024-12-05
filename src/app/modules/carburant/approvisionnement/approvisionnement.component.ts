import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IBonApprovisionnement } from 'src/app/core/models/transport/bon-approvisionnement';
import { BonApprovisionnementFactory } from 'src/app/core/services/transport/bon-approvisionnement';

@Component({
  selector: 'app-bon-approvisionnement',
  templateUrl: './approvisionnement.component.html'
})
export class ApprovisionnementComponent extends EditableListComponent {
  modalData: IBonApprovisionnement;

  allTypesApprovisionnements$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new BonApprovisionnementFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes approvisionnement');
    this.modalService = modalService;
  }

  openModal(content, genre: IBonApprovisionnement) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
