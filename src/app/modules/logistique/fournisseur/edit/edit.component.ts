import { CacheService } from 'src/app/shared/services/cache.service';
import { UserFactory } from 'src/app/core/services/user.factory';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { shareReplay, map } from 'rxjs/operators';
import { FournisseurTypeFactory } from 'src/app/core/services/logistique/fournisseur-type';
import { IFournisseur, Fournisseur } from 'src/app/core/models/logistique/fournisseur';
import { FournisseurFactory } from 'src/app/core/services/logistique/fournisseur';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = 'fournisseur';
  @Input() item: IFournisseur = new Fournisseur();
  protected readonly allFournisseurType$ = this.cacheService.get(
    'allFournisseurType',
    new FournisseurTypeFactory().list().pipe(
      shareReplay(1),
      map(data => data.data)
    ),
    1800000);

    protected readonly allUsers$ = new UserFactory().list().pipe(
      shareReplay(1),
      map(data => data.data)
    );

  constructor(
    protected cacheService: CacheService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new FournisseurFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IFournisseur) {
    return this.formBuilder.group({
      'user_id': [item.user_id, Validators.required],
      'type_id': [item.type_id, Validators.required],
      'description': [item.description, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
