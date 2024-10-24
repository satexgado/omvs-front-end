import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { BesoinFactory } from 'src/app/core/services/logistique/besoin';
import { Filter, QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { Subject } from 'rxjs';
import { IBesoin } from 'src/app/core/models/logistique/besoin';
import { BesoinAffectationEditComponent } from './besoin-affectation-edit/besoin-affectation-edit.component';
import { IMaterielBesoinPersonne } from 'src/app/core/models/logistique/materiel-besoin-personne';
import { MaterielBesoinPersonneFactory } from 'src/app/core/services/logistique/materiel-besoin-personne';
import { IMateriel } from 'src/app/core/models/materiel';

@Component({
  selector: 'app-besoin-materiel',
  templateUrl: './besoin.component.html',
  styleUrls: ['./besoin.component.css']
})
export class BesoinComponent extends EditableListComponent {

  editModal = EditComponent;
  _materielId: number;
  selectedBesoin: IBesoin;
  besoinPersonneHelper: ResourceScrollableHelper;
  @Input() set materielId(materiel_id: number) {
    if(materiel_id) {
      this.dataHelper.searchCustomFilterGroup =  {or: false, filters:[
        new Filter('materiel', materiel_id, 'eq'),
      ]};
    } else {
      this.dataHelper.searchCustomFilterGroup = null;
    }
    this._materielId = materiel_id;
    this.dataHelper.loadData(1);
  }

  constructor(protected titleservice: AppTitleService,protected modalService: NgbModal) {
    super(new ResourceScrollableHelper(new BesoinFactory(),
    new QueryOptions(
      [
      ],
      [],
      64,
      1,
      [new Sort('updated_at','DESC')]
    )))
    titleservice.setTitle('besoins');
    this.modalService = modalService;
    this.dataHelper.relations = [
      'visi_materiel','visi_niveau_urgence_materiel'
    ];
  }

  onSetMaterielID(materiel: IMateriel) {
    this.materielId = materiel ? materiel.id : null;
  }

  onSetSelected(besoin: IBesoin = null) {
    this.selectedBesoin = besoin;
    if(!besoin){
      return;
    }
    this.besoinPersonneHelper = new ResourceScrollableHelper(new MaterielBesoinPersonneFactory(),new QueryOptions(
      [
          {or: false, filters:[new Filter('besoin', besoin.id, 'eq')]},
      ],
      ['personne_inscription'],
      8,
      1,
      [new Sort('updated_at','DESC')]
    ));
    this.besoinPersonneHelper.withoutPaginate = true;
    this.besoinPersonneHelper.loadData(1);
  }

  onShowCreateForm(item?) {
    let _result$ = new Subject<any>();
    const result$ = _result$.asObservable();
    const modalRef = this.modalService.open(this.editModal, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as EditComponent;
    instance.isUpdating = false;
    instance.title = 'Créer';
    instance.materielId = this._materielId ? this._materielId : null;

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

  onShowCreateAffectationForm(item?) {
    if(!this.selectedBesoin) {
      return this.notificationService.onError("Selectionnez d'abord une commande");
    }
    const modalRef = this.modalService.open(BesoinAffectationEditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as BesoinAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Créer';
    instance.besoinId = this.selectedBesoin.id;

    // In case it's create from existing element
    if (item) {
      instance.item = item;
    }

    instance.newItem.subscribe(
      (data: IMaterielBesoinPersonne) => {
        this.besoinPersonneHelper.addItem(data);
        this.selectedBesoin.quantite_recu = this.selectedBesoin.quantite_recu +  data.quantite;
        this.dataHelper.updateItem(this.selectedBesoin);
      }
    );

  }

  onShowUpdateAffectationForm(item: IMaterielBesoinPersonne) {
    if(!this.selectedBesoin) {
      return this.notificationService.onError("Selectionnez d'abord une commande");
    }
    const modalRef = this.modalService.open(BesoinAffectationEditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as BesoinAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Modifier';
    instance.besoinId = this.selectedBesoin.id;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.isUpdating = true;
    modalRef.componentInstance.newItem.subscribe(
      (data: IMaterielBesoinPersonne) => {
        const difference = data.quantite - item.quantite  ;
        this.selectedBesoin.quantite_recu = this.selectedBesoin.quantite_recu + difference;
        this.besoinPersonneHelper.updateItem(data);
        this.dataHelper.updateItem(this.selectedBesoin);
      }
    );
  }

  onDeleteAffectation(item: IMaterielBesoinPersonne) {
    this.notificationService.title = 'Suppréssion';

    this.notificationService.body = 'Êtes-vous sûr(e) de vouloir supprimer?';

    const confirm = () => {
      const service = new MaterielBesoinPersonneFactory()
      service.delete(item.id).subscribe(
          () => {
            this.selectedBesoin.quantite_recu = this.selectedBesoin.quantite_recu - item.quantite;
            this.dataHelper.updateItem(this.selectedBesoin);
            this.besoinPersonneHelper.removeItem(item.id);
            this.notificationService.onSuccess("L'élément a été supprimé");
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
}
