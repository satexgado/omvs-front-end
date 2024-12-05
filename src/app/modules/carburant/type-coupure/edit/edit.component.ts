import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { BonTypeCoupure, IBonTypeCoupure } from 'src/app/core/models/transport/bon-type-coupure';
import { BonTypeCoupureFactory } from 'src/app/core/services/transport/bon-type-coupure';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = 'type-coupure';
  @Input() item: IBonTypeCoupure = new BonTypeCoupure();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new BonTypeCoupureFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IBonTypeCoupure) {
    return this.formBuilder.group({
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
