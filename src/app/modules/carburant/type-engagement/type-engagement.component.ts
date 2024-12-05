import { EditableListComponent } from '../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from '../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IBonTypeEngagement } from 'src/app/core/models/transport/bon-type-engagement';
import { BonTypeEngagementFactory } from 'src/app/core/services/transport/bon-type-engagement';

@Component({
  selector: 'app-bon-type-engagement',
  templateUrl: './type-engagement.component.html'
})
export class TypeEngagementComponent extends EditableListComponent {
  modalData: IBonTypeEngagement;

  allTypesTypeEngagements$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new BonTypeEngagementFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes type-engagement');
    this.modalService = modalService;
  }

  openModal(content, genre: IBonTypeEngagement) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
