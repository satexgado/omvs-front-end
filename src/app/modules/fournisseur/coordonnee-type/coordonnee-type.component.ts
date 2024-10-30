import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from 'src/app/shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { ICrCoordonneeType } from 'src/app/core/models/cr-coordonnee-type';
import { CrCoordonneeTypeFactory } from 'src/app/core/services/cr-coordonnee-type';

@Component({
  selector: 'app-coordonnee-type',
  templateUrl: './coordonnee-type.component.html'
})
export class CoordonneeTypeComponent extends EditableListComponent {
  modalData: ICrCoordonneeType;

  allTypesCoordonneees$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new CrCoordonneeTypeFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes types coordonnees');
    this.modalService = modalService;
  }

  openModal(content, genre: ICrCoordonneeType) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
