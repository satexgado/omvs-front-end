import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IPanneNiveau } from 'src/app/core/models/logistique/panne-niveau';
import { PanneNiveauFactory } from 'src/app/core/services/logistique/panne-niveau';
import { getTextColor } from 'src/app/shared/helperfonction';

@Component({
  selector: 'app-panne-niveau',
  templateUrl: './panne-niveau.component.html'
})
export class PanneNiveauComponent extends EditableListComponent {
  modalData: IPanneNiveau;

  editModal = EditComponent;
  getTextColor = getTextColor;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new PanneNiveauFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes niveaux de pannes');
    this.modalService = modalService;
  }

  openModal(content, couleur: IPanneNiveau) {
    this.modalData = couleur;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
