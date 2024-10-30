import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { IPanneNiveau, PanneNiveau } from 'src/app/core/models/logistique/panne-niveau';
import { PanneNiveauFactory } from 'src/app/core/services/logistique/panne-niveau';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = 'couleur';
  @Input() item: IPanneNiveau = new PanneNiveau();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new PanneNiveauFactory(), cdRef, activeModal);
  }

  changeColor(couleur) {
    const control = this.editForm.get('couleur');
    control.setValue(couleur);
    control.markAsDirty();
  }

  createFormGroup(item: IPanneNiveau) {
    return this.formBuilder.group({
      'couleur': [item.couleur, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
