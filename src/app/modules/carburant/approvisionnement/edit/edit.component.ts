import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { BonApprovisionnement, IBonApprovisionnement } from 'src/app/core/models/transport/bon-approvisionnement';
import { BonApprovisionnementFactory } from 'src/app/core/services/transport/bon-approvisionnement';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = 'approvisionnement';
  @Input() item: IBonApprovisionnement = new BonApprovisionnement();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new BonApprovisionnementFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IBonApprovisionnement) {
    return this.formBuilder.group({
      'quantite_specifique': [item.quantite_specifique, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
