import { EditableListComponent } from '../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from '../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { IBonCarburantSortie } from 'src/app/core/models/transport/bon-carburant-sortie';
import { BonCarburantSortieFactory } from 'src/app/core/services/transport/bon-carburant-sortie';

@Component({
  selector: 'app-bon-carburant-sortie',
  templateUrl: './carburant-sortie.component.html'
})
export class CarburantSortieComponent extends EditableListComponent {
  modalData: IBonCarburantSortie;

  allTypesCarburantSorties$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new BonCarburantSortieFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes carburant-sortie');
    this.modalService = modalService;
    this.dataHelper.relations = [
      "trans_auto",
      "trans_type_carburant",
      "trans_bon_type_coupure",
      "trans_bon_type_engagement",
      "personnel_autorisation"
    ];
  }

  openModal(content, genre: IBonCarburantSortie) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
