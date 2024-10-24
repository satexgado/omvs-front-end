import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { ModeleFactory } from './../../../core/services/transport/modele';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IModele } from '../../../core/models/transport/modele';

@Component({
  selector: 'app-modele',
  templateUrl: './modele.component.html'
})
export class ModeleComponent extends EditableListComponent {
  modalData: IModele;

  allTypesModeles$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new ModeleFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes modeles');
    this.modalService = modalService;
  }

  openModal(content, modele: IModele) {
    this.modalData = modele;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
