import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { AutomobileEtat, IAutomobileEtat } from 'src/app/core/models/transport/automobile-etat';
import { AutomobileEtatFactory } from 'src/app/core/services/transport/automobile-etat';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = 'etat';
  @Input() item: IAutomobileEtat = new AutomobileEtat();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new AutomobileEtatFactory(), cdRef, activeModal);
  }

  changeColor(couleur) {
    const control = this.editForm.get('couleur');
    control.setValue(couleur);
    control.markAsDirty();
  }

  createFormGroup(item: IAutomobileEtat) {
    return this.formBuilder.group({
      'couleur': [item.couleur, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
