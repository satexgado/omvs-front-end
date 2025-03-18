import { EditableListComponent } from '../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from '../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IBonCarburant } from 'src/app/core/models/transport/bon-carburant';
import { BonCarburantFactory } from 'src/app/core/services/transport/bon-carburant';

@Component({
  selector: 'app-bon-carburant',
  templateUrl: './bon-carburant.component.html'
})
export class BonCarburantComponent extends EditableListComponent {
  modalData: IBonCarburant;

  allTypesCarburants$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new BonCarburantFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes bons carburant');
    this.modalService = modalService;
    this.dataHelper.relations = [
      "trans_bon_carburant_masque.cr_coordonnee",
      "trans_bon_carburant_masque.trans_type_carburant",
      "trans_bon_carburant_masque.trans_type_coupure"
    ];
  }

  openModal(content, genre: IBonCarburant) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
