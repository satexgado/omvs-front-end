import { CommandeAffectationEditComponent } from './../commande-affectation-edit/commande-affectation-edit.component';
import { Filter } from 'src/app/shared/models/query-options/filter.model';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandeEditComponent } from '../commande-edit/commande-edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { IMaterielCommande } from 'src/app/core/models/materiel-commande';
import { MaterielCommandeFactory } from 'src/app/core/services/materiel-commande';
import { Subject } from 'rxjs';
import { Sort, QueryOptions } from 'src/app/shared/models/query-options';
import { IMaterielCommandePersonne } from 'src/app/core/models/materiel-commande-personne';
import { MaterielCommandePersonneFactory } from 'src/app/core/services/materiel-commande-personne';

@Component({
  selector: 'app-commande-materiel',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent extends EditableListComponent{

  modalData: IMaterielCommande;
  editModal = CommandeEditComponent;
  _materielId: number;
  selectedCommande: IMaterielCommande;
  @Input() set materielId(materiel_id: number) {
    if(materiel_id) {
      this.dataHelper.searchCustomFilterGroup =  {or: false, filters:[
        new Filter('id_materiel', materiel_id, 'eq'),
      ]};
    } else {
      this.dataHelper.searchCustomFilterGroup = null;
    }
    this._materielId = materiel_id;

    this.dataHelper.loadData(1);
  }

  constructor(protected titleservice: AppTitleService,protected modalService: NgbModal) {
    super(new ResourceScrollableHelper(new MaterielCommandeFactory(),
    new QueryOptions(
      [
      ],
      [],
      64,
      1,
      [new Sort('updated_at','DESC')]
    )
    ))
    titleservice.setTitle('commandes');
    this.modalService = modalService;
    this.dataHelper.relations = ['cr_coordonnee','visi_materiel','visi_affectation_commande_materiel_personnes.personne_inscription'];
  }

  onSetSelected(commande: IMaterielCommande = null) {
    this.selectedCommande = commande;
  }

  onShowCreateForm(item?) {
    let _result$ = new Subject<any>();
    const result$ = _result$.asObservable();
    const modalRef = this.modalService.open(this.editModal, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as CommandeEditComponent;
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
    if(!this.selectedCommande) {
      return this.notificationService.onError("Selectionnez d'abord une commande");
    }
    const modalRef = this.modalService.open(CommandeAffectationEditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as CommandeAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Créer';
    instance.commandeId = this.selectedCommande.id;

    // In case it's create from existing element
    if (item) {
      instance.item = item;
    }

    instance.newItem.subscribe(
      (data: any) => {
        if(!this.selectedCommande.affectation_personnes) {
          this.selectedCommande.affectation_personnes = [];
        }
        this.selectedCommande.affectation_personnes.push(data);
        this.dataHelper.updateItem(this.selectedCommande);
      }
    );

  }

  onShowUpdateAffectationForm(item: IMaterielCommandePersonne) {
    if(!this.selectedCommande) {
      return this.notificationService.onError("Selectionnez d'abord une commande");
    }
    const modalRef = this.modalService.open(CommandeAffectationEditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as CommandeAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Modifier';
    instance.commandeId = this.selectedCommande.id;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.isUpdating = true;
    modalRef.componentInstance.newItem.subscribe(
      (data) => {
        this.selectedCommande.affectation_personnes.map(element => {
            if (element.id === data.id ) {
                element = data;
            }
            return element;
        });
        this.dataHelper.updateItem(this.selectedCommande);
      }
    );
  }

  onDeleteAffectation(item: IMaterielCommandePersonne) {
    this.notificationService.title = 'Suppréssion';

    this.notificationService.body = 'Êtes-vous sûr(e) de vouloir supprimer?';

    const confirm = () => {
      const service = new MaterielCommandePersonneFactory()
      service.delete(item.id).subscribe(
          () => {
            const index = this.selectedCommande.affectation_personnes.findIndex(element => element.id === item.id);
            this.selectedCommande.affectation_personnes.splice(index, 1);
            this.dataHelper.updateItem(this.selectedCommande);
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
