import { IDocumentPermi, DocumentPermi } from 'src/app/core/models/transport/document-permi';
import { PermiTypeFactory } from 'src/app/core/services/transport/permi-type';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter  } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { shareReplay, map } from 'rxjs/operators';
import { QueryOptions } from 'src/app/shared/models/query-options';
import { CacheService } from 'src/app/shared/services';
import { DocumentPermiFactory } from 'src/app/core/services/transport/document-permi';
import { UserService } from 'src/app/services/account/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class EditComponent extends BaseEditComponent  {
  heading = 'document-permi';
  @Input() item: IDocumentPermi = new DocumentPermi();
  allTypePermis$ = this.cacheService.get(
    'allTypePermis',
    new PermiTypeFactory().list().pipe(
      shareReplay(1),
      map(data => data.data)
    ),
    1800000);
  allInscriptions$ = this.userService.allData;

  constructor(
    protected cdRef: ChangeDetectorRef,
    protected cacheService: CacheService,
    private userService: UserService,
    activeModal: NgbActiveModal) {
    super(new DocumentPermiFactory(), cdRef, activeModal);
  }

  ngOnInit(): void {
    this.userService.getAll();
      super.ngOnInit();
  }
  createFormGroup(item: IDocumentPermi) {

    return this.formBuilder.group({
      'date_obtention': [item.date_obtention, Validators.required],
      'proprietaire_id': [item.proprietaire_id, Validators.required],
      'type_permis_id': [item.type_permis_id, Validators.required],
      'remarque': [item.remarque, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
