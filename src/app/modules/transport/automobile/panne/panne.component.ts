import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { PanneFactory } from 'src/app/core/services/transport/panne';
import { Filter, QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { Subject } from 'rxjs';
import { IPanne } from 'src/app/core/models/transport/panne';
import { PanneAffectationEditComponent } from './panne-affectation-edit/panne-affectation-edit.component';
import { IAutomobilePannePersonne } from 'src/app/core/models/transport/automobile-panne-personne';
import { AutomobilePannePersonneFactory } from 'src/app/core/services/transport/automobile-panne-personne';
import { getTextColor } from 'src/app/shared/helperfonction';

@Component({
  selector: 'app-panne-automobile',
  templateUrl: './panne.component.html',
  styleUrls: ['./panne.component.css']
})
export class PanneComponent extends EditableListComponent {

  editModal = EditComponent;
  _automobileId: number;
  selectedPanne: IPanne;
  modalData;
  isViewPanne = true;
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
    super(new ResourceScrollableHelper(new PanneFactory(),
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
      'trans_auto',
      'visi_niveau_panne_materiel',
    ];
  }

  onSetSelected(panne: IPanne = null) {
    this.selectedPanne = panne;
    if(!panne){
      return;
    }
    this.pannePersonneHelper = new ResourceScrollableHelper(new AutomobilePannePersonneFactory(),new QueryOptions(
      [
          {or: false, filters:[new Filter('panne', panne.id, 'eq')]},
      ],
      ['personne_inscription', 'trans_etat_automobile', 'cr_coordonnee'],
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
    const instance = modalRef.componentInstance as EditComponent;
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
    const instance = modalRef.componentInstance as EditComponent;
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

  onShowCreateAffectationForm(item?) {
    if(!this.selectedPanne) {
      return this.notificationService.onError("Selectionnez d'abord une commande");
    }
    const modalRef = this.modalService.open(PanneAffectationEditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as PanneAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Créer';
    instance.panneId = this.selectedPanne.id;

    // In case it's create from existing element
    if (item) {
      instance.item = item;
    }

    instance.newItem.subscribe(
      (data: any) => {
        this.pannePersonneHelper.addItem(data);
        this.selectedPanne.nb_commandes +=1;
      }
    );

  }

  onShowUpdateAffectationForm(item: IAutomobilePannePersonne) {
    if(!this.selectedPanne) {
      return this.notificationService.onError("Selectionnez d'abord une commande");
    }
    const modalRef = this.modalService.open(PanneAffectationEditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as PanneAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Modifier';
    instance.panneId = this.selectedPanne.id;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.isUpdating = true;
    modalRef.componentInstance.newItem.subscribe(
      (data) => {
        this.pannePersonneHelper.updateItem(data);
      }
    );
  }

  onDeleteAffectation(item: IAutomobilePannePersonne) {
    this.notificationService.title = 'Suppréssion';

    this.notificationService.body = 'Êtes-vous sûr(e) de vouloir supprimer?';

    const confirm = () => {
      const service = new AutomobilePannePersonneFactory()
      service.delete(item.id).subscribe(
          () => {
            this.pannePersonneHelper.removeItem(item.id);
            this.selectedPanne.nb_commandes -=1;
          }, () => {
            this.notificationService.onInfo('l\'élément est utilisé');
          }
        );
    };

    const cancel = () => {
    };

    this.notificationService.bodyMaxLength = 300;
    this.notificationService.backdrop =  0;
    this.notificationService.onConfirmation(confirm, cancel);

    this.notificationService.bodyMaxLength = 80;
    this.notificationService.backdrop =  -1;
  }

  openModal(content, genre) {
    this.modalData = genre;
    this.modalService.open(content, { size: 'lg', centered: true,  backdrop: 'static' });
  }
}
