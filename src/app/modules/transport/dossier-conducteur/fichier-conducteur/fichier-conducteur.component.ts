import { of } from 'rxjs';
import { Filter, QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { EditComponent } from './edit/edit.component';
import { EditableListComponent } from 'src/app/shared';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FichierConducteurFactory } from 'src/app/core/services/transport/fichier-conducteur';
import { AppTitleService } from 'src/app/shared/services';
import { FichierConducteur, IFichierConducteur } from 'src/app/core/models/transport/fichier-conducteur';

@Component({
  selector: 'app-fichier-conducteur',
  templateUrl: './fichier-conducteur.component.html'
})
export class FichierConducteurComponent extends EditableListComponent implements OnInit {

  editModal = EditComponent;
    _conducteurId: number;
    modalData;
  
    pannePersonneHelper: ResourceScrollableHelper;
    @Input() set conducteurId(conducteur_id: number) {
      if(conducteur_id) {
        this.dataHelper.searchCustomFilterGroup =  {or: false, filters:[
          new Filter('conducteur_id', conducteur_id, 'eq'),
        ]};
      } else {
        this.dataHelper.searchCustomFilterGroup = null;
      }
      this._conducteurId = conducteur_id;
      this.dataHelper.loadData(1);
    }
  
    constructor(public route: ActivatedRoute, protected titleservice: AppTitleService,protected modalService: NgbModal) {
      super(new ResourceScrollableHelper(new FichierConducteurFactory(),
      new QueryOptions(
        [
        ],
        [],
        64,
        1,
        [new Sort('updated_at','DESC')]
      )))
      titleservice.setTitle('conducteur');
      this.modalService = modalService;
      this.dataHelper.relations = [
        'trans_dossier_conducteur'
      ];
    }


  onShowCreateForm(item?: IFichierConducteur, modal = this.editModal) {
    if(!item) {
      item = new FichierConducteur();
      item.conducteur_id = this._conducteurId;
    }
    super.onShowCreateForm(item).subscribe()
    return of(true);
 }

 onGetIcon(item: IFichierConducteur): string {
    const extension = item.document.split('.').pop();'';

    switch(extension) {
      case 'jpg': return 'fal fa-file-image';
      case 'jpeg': return 'fal fa-file-image';
      case 'png': return 'fal fa-file-image';
      case 'pdf': return 'fal fa-file-pdf';
      default: return 'fal fa-file';
    }
 }
}
