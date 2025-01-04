import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IAutomobileEtat } from 'src/app/core/models/transport/automobile-etat';
import { AutomobileEtatFactory } from 'src/app/core/services/transport/automobile-etat';
import { getTextColor } from 'src/app/shared/helperfonction';

@Component({
  selector: 'app-etat',
  templateUrl: './etat.component.html'
})
export class EtatComponent extends EditableListComponent {
  modalData: IAutomobileEtat;

  editModal = EditComponent;
  linkFromRoot;
  getTextColor = getTextColor;
  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new AutomobileEtatFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes etats');
    this.modalService = modalService;
  }

  openModal(content, genre: IAutomobileEtat) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
