import { AutomobileFactory } from './../../../core/services/transport/automobile';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditableListComponent } from '../../../shared/components/editable-list/editable.list.component';
import { ResourceScrollableHelper } from '../../../shared/state';

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html'
})
export class AutomobileComponent extends EditableListComponent {

  editModal = EditComponent;

  constructor(protected titleservice: AppTitleService,protected modalService: NgbModal) {
    super(new ResourceScrollableHelper(new AutomobileFactory()))
    titleservice.setTitle('automobile');
    this.modalService = modalService;
  }
}
