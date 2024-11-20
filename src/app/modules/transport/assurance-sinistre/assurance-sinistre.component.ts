import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { Filter, QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IAssuranceSinistre } from 'src/app/core/models/transport/assurance-sinistre';
import { AssuranceSinistreFactory } from 'src/app/core/services/transport/assurance-sinistre';

@Component({
  selector: 'app-assurance-sinistre',
  templateUrl: './assurance-sinistre.component.html'
})
export class AssuranceSinistreComponent extends EditableListComponent {

  editModal = EditComponent;
  _assuranceId: number;
  selectedSinistre: IAssuranceSinistre;
  modalData;
  fragment: string;

  pannePersonneHelper: ResourceScrollableHelper;
  @Input() set assuranceId(assurance_id: number) {
    if(assurance_id) {
      this.dataHelper.searchCustomFilterGroup =  {or: false, filters:[
        new Filter('assurance_id', assurance_id, 'eq'),
      ]};
    } else {
      this.dataHelper.searchCustomFilterGroup = null;
    }
    this._assuranceId = assurance_id;
    this.dataHelper.loadData(1);
  }

  constructor(public route: ActivatedRoute, protected titleservice: AppTitleService,protected modalService: NgbModal) {
    super(new ResourceScrollableHelper(new AssuranceSinistreFactory(),
    new QueryOptions(
      [
      ],
      [],
      64,
      1,
      [new Sort('updated_at','DESC')]
    )))
    titleservice.setTitle('assurance');
    this.modalService = modalService;
  }
  ngOnInit(): void {
      super.ngOnInit();
      this.route.fragment.subscribe(fragment => {
        this.fragment = fragment;
      });
  }

  onSetSelected(panne: IAssuranceSinistre = null) {
    this.selectedSinistre = panne;
  }

  onShowCreateForm(item?) {
    let _result$ = new Subject<any>();
    const result$ = _result$.asObservable();
    const modalRef = this.modalService.open(this.editModal, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as EditComponent;
    instance.isUpdating = false;
    instance.title = 'Créer';
    instance.assuranceId = this._assuranceId ? this._assuranceId : null;

    // In case it's create from existing element
    if (item) {
      instance.title = item.libelle ? `Créer comme: ${item.libelle}` : 'Créer';
      instance.item = item;
    }

    instance.newItem.subscribe(
      (data: any) => {
        this.dataHelper.addItem(data);
        _result$.next(data);
      }
    );

    return result$;
  }

  onShowUpdateForm(item) {
    let _result$ = new Subject<any>();
    const result$ = _result$.asObservable();
    const modalRef = this.modalService.open(this.editModal, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as EditComponent;
    instance.isUpdating = true;
    instance.title =  `Modifier: ${item.libelle}`;
    instance.item = item;

    instance.assuranceId = this._assuranceId ? this._assuranceId : null;
    instance.newItem.subscribe(
      (data: any) => {
        this.dataHelper.updateItem(data);
        _result$.next(data);
      }
    );

    return result$;
  }


  openModal(content, genre) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
