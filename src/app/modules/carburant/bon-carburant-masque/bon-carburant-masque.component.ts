import { EditableListComponent } from '../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from '../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IBonCarburantMasque } from 'src/app/core/models/transport/bon-carburant-masque';
import { BonCarburantMasqueFactory } from 'src/app/core/services/transport/bon-carburant-masque';

@Component({
  selector: 'app-bon-carburant-masque',
  templateUrl: './bon-carburant-masque.component.html'
})
export class BonCarburantMasqueComponent extends EditableListComponent {
  modalData: IBonCarburantMasque;

  allTypesCarburants$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new BonCarburantMasqueFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes carburant-entree');
    this.modalService = modalService;
    this.dataHelper.relations = [
      "cr_coordonnee",
      "trans_type_carburant",
      "trans_type_coupure"
    ];
  }

  openModal(content, genre: IBonCarburantMasque) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
