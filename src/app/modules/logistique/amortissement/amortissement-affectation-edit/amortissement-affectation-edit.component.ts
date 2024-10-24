import { AmortissementDureeFactory } from 'src/app/core/services/logistique/amortissement-duree';
import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { BaseEditComponent } from 'src/app/shared';
import { IAmortissementDuree, AmortissementDuree } from 'src/app/core/models/logistique/amortissement-duree';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-amortissement-affectation-edit',
  templateUrl: './amortissement-affectation-edit.component.html',
})
export class AmortissementAffectationEditComponent extends BaseEditComponent  {
  heading = 'amortissement';
  @Input() item: IAmortissementDuree = new AmortissementDuree();
  amortissementId: number;

  constructor(
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new AmortissementDureeFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IAmortissementDuree) {
    const amortissementId = this.amortissementId ? this.amortissementId : item.amortissement_id;
    return this.formBuilder.group({
      'amortissement_id': [amortissementId],
      'duree': [item.duree, Validators.required],
      'duree_avant_remplacement': [item.duree_avant_remplacement, Validators.required],
      'alerte': [item.alerte, Validators.required],
      'valeur_prevu':  [item.valeur_prevu, Validators.required],
      'id': [item.id]
    });
  }
}
