import { EditableListComponent } from './../../../shared/components/editable-list/editable.list.component';
import { DefaultQueryOptionWithInsAndSeachString } from './../../../shared/models/query-options/query-options.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { ResourceScrollableHelper } from '../../../shared/state';
import { ITransSerie } from 'src/app/core/models/transport/serie';
import { TransSerieFactory } from 'src/app/core/services/transport/serie';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html'
})
export class SerieComponent extends EditableListComponent {
  modalData: ITransSerie;

  allTypesSeries$: Observable<object>;
  editModal = EditComponent;
  linkFromRoot;

  constructor(
    protected titleservice: AppTitleService,
    protected modalService: NgbModal) {
    super(
      new ResourceScrollableHelper(new TransSerieFactory(),
      DefaultQueryOptionWithInsAndSeachString
      )
    );
    titleservice.setTitle('mes series');
    this.modalService = modalService;
  }

  openModal(content, serie: ITransSerie) {
    this.modalData = serie;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
