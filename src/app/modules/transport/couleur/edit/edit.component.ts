import { ICouleur, Couleur } from 'src/app/core/models/transport/couleur';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CouleurFactory } from 'src/app/core/services/transport/couleur';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = 'couleur';
  @Input() item: ICouleur = new Couleur();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new CouleurFactory(), cdRef, activeModal);
  }

  createFormGroup(item: ICouleur) {
    return this.formBuilder.group({
      'description': [item.description, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
