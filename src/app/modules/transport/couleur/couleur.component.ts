import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { CouleurFactory } from './../../../core/services/transport/couleur';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { ICouleur } from '../../../core/models/transport/couleur';

@Component({
  selector: 'app-couleur',
  templateUrl: './couleur.component.html'
})
export class CouleurComponent extends EditableListComponent {
  modalData: ICouleur;

  editModal = EditComponent;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new CouleurFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes couleurs');
    this.modalService = modalService;
  }

  openModal(content, couleur: ICouleur) {
    this.modalData = couleur;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
