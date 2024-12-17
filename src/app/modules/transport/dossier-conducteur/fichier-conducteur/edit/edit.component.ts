import { CacheService } from 'src/app/shared/services';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {  Validators } from '@angular/forms';
import { FichierConducteur, IFichierConducteur } from 'src/app/core/models/transport/fichier-conducteur';
import { FichierConducteurFactory } from 'src/app/core/services/transport/fichier-conducteur';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = 'Document Etudiant';
  @Input() item: FichierConducteur = new FichierConducteur();


  constructor(
    protected cacheService: CacheService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new FichierConducteurFactory(),cdRef, activeModal);
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}


  createFormGroup(item: IFichierConducteur) {
    return this.formBuilder.group({
      'document': [item.document, Validators.required],
      'conducteur_id': [item.conducteur_id, Validators.required],
      'libelle':  [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
