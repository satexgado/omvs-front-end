import { IPermiType, PermiType } from 'src/app/core/models/transport/permi-type';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { PermiTypeFactory } from 'src/app/core/services/transport/permi-type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = "Type de permis";
  @Input() item: IPermiType = new PermiType();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new PermiTypeFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IPermiType) {
    return this.formBuilder.group({
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
