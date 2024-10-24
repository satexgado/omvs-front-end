import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { FournisseurFactory } from 'src/app/core/services/logistique/fournisseur';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html'
})
export class FournisseurComponent extends EditableListComponent {

  editModal = EditComponent;

  constructor(protected titleservice: AppTitleService,protected modalService: NgbModal) {
    super(new ResourceScrollableHelper(new FournisseurFactory()))
    titleservice.setTitle('fournisseurs');
    this.modalService = modalService;
  }

}
