import { IEntretienType, EntretienType } from 'src/app/core/models/transport/entretien-type';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { EntretienTypeFactory } from 'src/app/core/services/transport/entretien-type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = 'type entretien';
  @Input() item: IEntretienType = new EntretienType();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new EntretienTypeFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IEntretienType) {
    return this.formBuilder.group({
      'condition_entretien': [item.condition_entretien, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
