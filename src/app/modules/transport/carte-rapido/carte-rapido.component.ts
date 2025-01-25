import { EditableListComponent } from '../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from '../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { CarteRapidoFactory } from 'src/app/core/services/carte-rapido';
import { ICarteRapido } from 'src/app/core/models/carte-rapido';

@Component({
  selector: 'app-carte-rapido',
  templateUrl: './carte-rapido.component.html'
})
export class CarteRapidoComponent extends EditableListComponent {
  modalData: ICarteRapido;

  allTypesCarteAbonnements$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new CarteRapidoFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes cartes rapidos');
    this.modalService = modalService;
    this.dataHelper.relations = ['personne_inscription'];
  }

  openModal(content, genre: ICarteRapido) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
