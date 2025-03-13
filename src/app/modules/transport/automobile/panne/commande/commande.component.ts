import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from '../edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { PanneFactory } from 'src/app/core/services/transport/panne';
import { Filter, QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { Subject } from 'rxjs';
import { PanneAffectationEditComponent } from '../panne-affectation-edit/panne-affectation-edit.component';
import { IAutomobilePannePersonne } from 'src/app/core/models/transport/automobile-panne-personne';
import { AutomobilePannePersonneFactory } from 'src/app/core/services/transport/automobile-panne-personne';
import { getTextColor } from 'src/app/shared/helperfonction';

@Component({
  selector: 'app-commande-automobile',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent extends EditableListComponent {

  editModal = PanneAffectationEditComponent;
  _automobileId: number;
  selectedCommande: IAutomobilePannePersonne;
  modalData;
  pannePersonneHelper: ResourceScrollableHelper;
  getTextColor = getTextColor;
  @Input() set automobileId(automobile_id: number) {
    if(automobile_id) {
      this.dataHelper.searchCustomFilterGroup =  {or: false, filters:[
        new Filter('automobile', automobile_id, 'eq'),
      ]};
    } else {
      this.dataHelper.searchCustomFilterGroup = null;
    }
    this._automobileId = automobile_id;
    this.dataHelper.loadData(1);
  }

  constructor(protected titleservice: AppTitleService,protected modalService: NgbModal) {
    super(new ResourceScrollableHelper(new AutomobilePannePersonneFactory(),
    new QueryOptions(
      [
      ],
      [],
      64,
      1,
      [new Sort('updated_at','DESC')]
    )))
    titleservice.setTitle('pannes');
    this.modalService = modalService;
    this.dataHelper.relations = [
      'personne_inscription', 'trans_etat_automobile', 'cr_coordonnee',
      'trans_panne_automobile.visi_niveau_panne_materiel','trans_panne_automobile.trans_auto'
    ];
  }

  onSetSelected(commande: IAutomobilePannePersonne = null) {
    this.selectedCommande = commande;
    if(!commande){
      return;
    }
    this.pannePersonneHelper = new ResourceScrollableHelper(new PanneFactory(),new QueryOptions(
      [
          {or: false, filters:[new Filter('id_postes', commande.panne_id, 'eq')]},
      ],
      ['trans_auto',
      'visi_niveau_panne_materiel',],
      8,
      1,
      [new Sort('updated_at','DESC')]
    ));
    this.pannePersonneHelper.withoutPaginate = true;
    this.pannePersonneHelper.loadData(1);
  }

  onShowCreateForm(item?) {
    let _result$ = new Subject<any>();
    const result$ = _result$.asObservable();
    const modalRef = this.modalService.open(this.editModal, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as PanneAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Créer';
    instance.automobileId = this._automobileId ? this._automobileId : null;

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
    const instance = modalRef.componentInstance as PanneAffectationEditComponent;
    instance.isUpdating = true;
    instance.title =  `Modifier: ${item.libelle}`;
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



  onShowUpdatePanneForm(item: IAutomobilePannePersonne) {
    const modalRef = this.modalService.open(EditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as EditComponent;
    instance.isUpdating = false;
    instance.title = 'Modifier';
    instance.automobileId = this._automobileId ? this._automobileId : null;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.isUpdating = true;
    modalRef.componentInstance.newItem.subscribe(
      (data) => {
        this.pannePersonneHelper.updateItem(data);
      }
    );
  }

  openModal(content, genre) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
