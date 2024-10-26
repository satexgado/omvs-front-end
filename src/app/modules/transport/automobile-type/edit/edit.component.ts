import { IAutomobileType, AutomobileType } from 'src/app/core/models/transport/automobile-type';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { AutomobileTypeFactory } from 'src/app/core/services/transport/automobile-type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = "Type d'automobile";
  @Input() item: IAutomobileType = new AutomobileType();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new AutomobileTypeFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IAutomobileType) {
    return this.formBuilder.group({
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
