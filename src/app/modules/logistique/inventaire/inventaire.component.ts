import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { InventaireFactory } from 'src/app/core/services/logistique/inventaire';
enum InventaireViewEnum {
  tous = 1,
  stock = 2,
  defectueux = 3,
  normal = 4,
}
@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html'
})
export class InventaireComponent extends EditableListComponent {

  editModal = EditComponent;
  view: InventaireViewEnum = InventaireViewEnum.tous;
  enumView = InventaireViewEnum;
  constructor(protected titleservice: AppTitleService,protected modalService: NgbModal) {
    super(new ResourceScrollableHelper(new InventaireFactory()))
    titleservice.setTitle('inventaires');
    this.modalService = modalService;
    this.dataHelper.relations = [
      'visi_materiel'
    ];
  }

}
