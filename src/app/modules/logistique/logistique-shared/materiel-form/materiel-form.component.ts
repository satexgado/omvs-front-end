import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { IMateriel, Materiel } from 'src/app/core/models/materiel';
import { MaterielFactory } from 'src/app/core/services/materiel';

@Component({
  selector: 'app-materiel-form',
  templateUrl: './materiel-form.component.html',
})
export class MaterielFormComponent extends BaseEditComponent  {
  heading = 'modele';
  @Input() item: IMateriel = new Materiel();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new MaterielFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IMateriel) {
    return this.formBuilder.group({
      'quantite': [item.quantite, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
