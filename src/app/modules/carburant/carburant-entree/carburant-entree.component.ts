import { EditableListComponent } from '../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from '../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IBonCarburantEntree } from 'src/app/core/models/transport/bon-carburant-entree';
import { BonCarburantEntreeFactory } from 'src/app/core/services/transport/bon-carburant-entree';

@Component({
  selector: 'app-bon-carburant-entree',
  templateUrl: './carburant-entree.component.html'
})
export class CarburantEntreeComponent extends EditableListComponent {
  modalData: IBonCarburantEntree;

  allTypesCarburantEntrees$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new BonCarburantEntreeFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes carburant-entree');
    this.modalService = modalService;
    this.dataHelper.relations = [
      "cr_coordonnee",
      "trans_type_carburant",
      "trans_bon_type_coupure",
      "trans_bon_approvisionnement"
    ];
  }

  openModal(content, genre: IBonCarburantEntree) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
