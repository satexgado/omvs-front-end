import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { DefectFactory } from 'src/app/core/services/logistique/defect';
import { Filter, QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { Subject } from 'rxjs';
import { IDefect } from 'src/app/core/models/logistique/defect';
import { DefectAffectationEditComponent } from './defect-affectation-edit/defect-affectation-edit.component';
import { IMaterielDefectPersonne } from 'src/app/core/models/logistique/materiel-defect-personne';
import { MaterielDefectPersonneFactory } from 'src/app/core/services/logistique/materiel-defect-personne';

@Component({
  selector: 'app-defect-materiel',
  templateUrl: './defect.component.html',
  styleUrls: ['./defect.component.css']
})
export class DefectComponent extends EditableListComponent {

  editModal = EditComponent;
  _materielId: number;
  selectedDefect: IDefect;
  defectPersonneHelper: ResourceScrollableHelper;
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
    super(new ResourceScrollableHelper(new DefectFactory(),
    new QueryOptions(
      [
      ],
      [],
      64,
      1,
      [new Sort('updated_at','DESC')]
    )))
    titleservice.setTitle('defects');
    this.modalService = modalService;
    this.dataHelper.relations = [
      'visi_materiel',
      'personne_inscription',
      'visi_fournisseur_materiel.fournisseur_inscription',
    ];
  }

  onSetSelected(defect: IDefect = null) {
    this.selectedDefect = defect;
    if(!defect){
      return;
    }
    this.defectPersonneHelper = new ResourceScrollableHelper(new MaterielDefectPersonneFactory(),new QueryOptions(
      [
          {or: false, filters:[new Filter('defect', defect.id, 'eq')]},
      ],
      ['personne_inscription','visi_etat_materiel'],
      8,
      1,
      [new Sort('updated_at','DESC')]
    ));
    this.defectPersonneHelper.withoutPaginate = true;
    this.defectPersonneHelper.loadData(1);
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
    if(!this.selectedDefect) {
      return this.notificationService.onError("Selectionnez d'abord une commande");
    }
    const modalRef = this.modalService.open(DefectAffectationEditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as DefectAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Créer';
    instance.defectId = this.selectedDefect.id;

    // In case it's create from existing element
    if (item) {
      instance.item = item;
    }

    instance.newItem.subscribe(
      (data: any) => {
        this.defectPersonneHelper.addItem(data);
      }
    );

  }

  onShowUpdateAffectationForm(item: IMaterielDefectPersonne) {
    if(!this.selectedDefect) {
      return this.notificationService.onError("Selectionnez d'abord une commande");
    }
    const modalRef = this.modalService.open(DefectAffectationEditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as DefectAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Modifier';
    instance.defectId = this.selectedDefect.id;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.isUpdating = true;
    modalRef.componentInstance.newItem.subscribe(
      (data) => {
        this.defectPersonneHelper.updateItem(data);
      }
    );
  }

  onDeleteAffectation(item: IMaterielDefectPersonne) {
    this.notificationService.title = 'Suppréssion';

    this.notificationService.body = 'Êtes-vous sûr(e) de vouloir supprimer?';

    const confirm = () => {
      const service = new MaterielDefectPersonneFactory()
      service.delete(item.id).subscribe(
          () => {
            this.defectPersonneHelper.removeItem(item.id)
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
