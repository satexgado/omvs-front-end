import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CrCoordonneeType, ICrCoordonneeType } from 'src/app/core/models/cr-coordonnee-type';
import { CrCoordonneeTypeFactory } from 'src/app/core/services/cr-coordonnee-type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = "Type d'automobile";
  @Input() item: ICrCoordonneeType = new CrCoordonneeType();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new CrCoordonneeTypeFactory(), cdRef, activeModal);
  }

  createFormGroup(item: ICrCoordonneeType) {
    return this.formBuilder.group({
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
