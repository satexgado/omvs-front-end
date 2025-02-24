import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { Filter, QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IEntretien } from 'src/app/core/models/transport/entretien';
import { EntretienFactory } from 'src/app/core/services/transport/entretien';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html'
})
export class EntretienComponent extends EditableListComponent {

  editModal = EditComponent;
  _automobileId: number;
  selectedSinistre: IEntretien;
  modalData;
  fragment: string;

  pannePersonneHelper: ResourceScrollableHelper;
  @Input() set automobileId(automobile_id: number) {
    if(automobile_id) {
      this.dataHelper.searchCustomFilterGroup =  {or: false, filters:[
        new Filter('automobile_id', automobile_id, 'eq'),
      ]};
    } else {
      this.dataHelper.searchCustomFilterGroup = null;
    }
    this._automobileId = automobile_id;
    this.dataHelper.loadData(1);
  }

  constructor(public route: ActivatedRoute, protected titleservice: AppTitleService,protected modalService: NgbModal) {
    super(new ResourceScrollableHelper(new EntretienFactory(),
    new QueryOptions(
      [
      ],
      [],
      64,
      1,
      [new Sort('updated_at','DESC')]
    )))
    titleservice.setTitle('automobile');
    this.modalService = modalService;
    this.dataHelper.relations = [
      'trans_type_entretien',
      'trans_auto',
      'cr_coordonnee',
    ];
  }
  ngOnInit(): void {
      super.ngOnInit();
      this.route.fragment.subscribe(fragment => {
        this.fragment = fragment;
      });
  }

  onSetSelected(panne: IEntretien = null) {
    this.selectedSinistre = panne;
  }

  onShowCreateForm(item?) {
    let _result$ = new Subject<any>();
     
    const result$ = _result$.asObservable();
    const modalRef = this.modalService.open(this.editModal, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as EditComponent;
    instance.isUpdating = false;
    instance.title = 'Créer';
    instance.automobileId = this._automobileId ? this._automobileId : null;

    // In case it's create from existing element
    if (item) {
      let libelle = item.coordonnee.libelle+ ' - ' + item.type_entretien.libelle;
      instance.title = item.libelle ? `Créer comme: ${libelle}` : 'Créer';
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
    let libelle = item.coordonnee.libelle+ ' - ' + item.type_entretien.libelle;
    instance.title =  `Modifier: ${libelle}`;
    instance.item = item;

    instance.automobileId = this._automobileId ? this._automobileId : null;
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
