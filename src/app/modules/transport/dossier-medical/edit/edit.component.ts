import { DossierTypeFactory } from 'src/app/core/services/transport/dossier-type';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { QueryOptions } from 'src/app/shared/models/query-options';
import { IDossierMedical, DossierMedical } from 'src/app/core/models/transport/dossier-medical';
import { DossierMedicalFactory } from 'src/app/core/services/transport/dossier-medical';
import { UserService } from 'src/app/services/account/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class EditComponent extends BaseEditComponent  {
  heading = 'dossier-medical';
  @Input() item: IDossierMedical = new DossierMedical();
  allTypeDossiers$ = new DossierTypeFactory().list().pipe(
    map( (data: any) => {
        return data.data
    }
  ));;
  allInscriptions$ = this.userService.allData;

  constructor(
    protected cdRef: ChangeDetectorRef,
    private userService: UserService,
    activeModal: NgbActiveModal) {
    super(new DossierMedicalFactory(), cdRef, activeModal);
  }
  ngOnInit(): void {
    this.userService.getAll();
      super.ngOnInit();
  }
  createFormGroup(item: DossierMedical) {

    return this.formBuilder.group({
      'date_obtention': [item.date_obtention, Validators.required],
      'proprietaire_id': [item.proprietaire_id, Validators.required],
      'type_dossier_id': [item.type_dossier_id, Validators.required],
      'remarque': [item.remarque, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
