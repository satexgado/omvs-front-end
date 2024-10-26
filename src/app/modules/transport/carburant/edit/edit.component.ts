import { ICarburantType, CarburantType } from 'src/app/core/models/transport/carburant-type';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CarburantTypeFactory } from 'src/app/core/services/transport/carburant-type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = 'carburant';
  @Input() item: ICarburantType = new CarburantType();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new CarburantTypeFactory(), cdRef, activeModal);
  }

  createFormGroup(item: ICarburantType) {
    return this.formBuilder.group({
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
