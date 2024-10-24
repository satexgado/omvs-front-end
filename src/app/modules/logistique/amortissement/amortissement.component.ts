import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AppTitleService } from 'src/app/shared/services';
import { EditableListComponent } from 'src/app/shared/components/editable-list/editable.list.component';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { AmortissementFactory } from 'src/app/core/services/logistique/amortissement';
import { Filter, QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { Subject } from 'rxjs';
import { IAmortissement } from 'src/app/core/models/logistique/amortissement';
import { AmortissementAffectationEditComponent } from './amortissement-affectation-edit/amortissement-affectation-edit.component';
import { IAmortissementDuree } from 'src/app/core/models/logistique/amortissement-duree';
import { AmortissementDureeFactory } from 'src/app/core/services/logistique/amortissement-duree';
import * as moment from 'moment';

@Component({
  selector: 'app-amortissement-materiel',
  templateUrl: './amortissement.component.html',
  styleUrls: ['./amortissement.component.css']
})
export class AmortissementComponent extends EditableListComponent {

  editModal = EditComponent;
  _materielId: number;
  selectedAmortissement: IAmortissement;
  amortissementPersonneHelper: ResourceScrollableHelper;
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
    super(new ResourceScrollableHelper(new AmortissementFactory(),
    new QueryOptions(
      [
      ],
      [],
      64,
      1,
      [new Sort('updated_at','DESC')]
    )))
    titleservice.setTitle('amortissements');
    this.modalService = modalService;
    this.dataHelper.relations = [
      'personne_inscription','visi_etat_materiel', 'visi_materiel'
    ];
  }

  onSetSelected(amortissement: IAmortissement = null) {
    this.selectedAmortissement = amortissement;
    if(!amortissement){
      return;
    }
    this.amortissementPersonneHelper = new ResourceScrollableHelper(new AmortissementDureeFactory(),new QueryOptions(
      [
          {or: false, filters:[new Filter('amortissement', amortissement.id, 'eq')]},
      ],
      [],
      8,
      1,
      [new Sort('updated_at','DESC')]
    ));
    this.amortissementPersonneHelper.withoutPaginate = true;
    this.amortissementPersonneHelper.loadData(1);
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
    if(!this.selectedAmortissement) {
      return this.notificationService.onError("Selectionnez d'abord une commande");
    }
    const modalRef = this.modalService.open(AmortissementAffectationEditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as AmortissementAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Créer';
    instance.amortissementId = this.selectedAmortissement.id;

    // In case it's create from existing element
    if (item) {
      instance.item = item;
    }

    instance.newItem.subscribe(
      (data: any) => {
        this.amortissementPersonneHelper.addItem(data);
      }
    );

  }

  onShowUpdateAffectationForm(item: IAmortissementDuree) {
    if(!this.selectedAmortissement) {
      return this.notificationService.onError("Selectionnez d'abord une commande");
    }
    const modalRef = this.modalService.open(AmortissementAffectationEditComponent, { size: 'lg', centered: true, backdrop: 'static' });
    const instance = modalRef.componentInstance as AmortissementAffectationEditComponent;
    instance.isUpdating = false;
    instance.title = 'Modifier';
    instance.amortissementId = this.selectedAmortissement.id;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.isUpdating = true;
    modalRef.componentInstance.newItem.subscribe(
      (data) => {
        this.amortissementPersonneHelper.updateItem(data);
      }
    );
  }

  onDeleteAffectation(item: IAmortissementDuree) {
    this.notificationService.title = 'Suppréssion';

    this.notificationService.body = 'Êtes-vous sûr(e) de vouloir supprimer?';

    const confirm = () => {
      const service = new AmortissementDureeFactory()
      service.delete(item.id).subscribe(
          () => {
            this.amortissementPersonneHelper.removeItem(item.id)
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

  onGetFinVie(duree: number) {
    if(!this.selectedAmortissement) {
      return new Date();
    }
    let dt = new Date(+this.selectedAmortissement.date);
    return new Date(dt.setFullYear(dt.getFullYear() + duree));
  }

  onGetALA(amortissementDuree: IAmortissementDuree) {
    const prix_achat = this.selectedAmortissement.prix;
    const valeur_terme = amortissementDuree.valeur_prevu;
    const duree = amortissementDuree.duree;
    const result = ((prix_achat*3) - (valeur_terme*3))/(duree*3);
    return result;
  }

  onGetALM(amortissementDuree: IAmortissementDuree) {
    const ala = this.onGetALA(amortissementDuree);
    return (ala*3)/12;
  }

  onGetVA(amortissementDuree: IAmortissementDuree) {
    const prix_achat = this.selectedAmortissement.prix;
    const today2 = moment(new Date());
    const dat2 = moment(this.selectedAmortissement.date);
    const daydiff = today2.diff(dat2,'day');
    const result1 = ((this.onGetALA(amortissementDuree)*3)*(daydiff*3))/365;
    const va = (prix_achat*3) - result1;
    return  Math.round((va + Number.EPSILON) * 100) / 100;
  }

}
