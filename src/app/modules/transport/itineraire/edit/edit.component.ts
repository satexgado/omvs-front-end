import { LieuFactory } from 'src/app/core/services/transport/lieu';
import { ItineraireFactory } from 'src/app/core/services/transport/itineraire';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter  } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormArray, FormControl } from '@angular/forms';
import { IItineraire, Itineraire } from 'src/app/core/models/transport/itineraire';
import { EditComponent as MasqueEditComponent} from '../../masque-itineraire/edit/edit.component';
import { ItineraireMasqueFactory } from 'src/app/core/services/transport/itineraire-masque';
import { QueryAllOptionWithIns, QueryOptions } from 'src/app/shared/models/query-options/query-options.model';
import { retryWhen, delay, take, shareReplay, map } from 'rxjs/operators';
import { EditComponent as LieuEditComponent} from '../../lieu/edit/edit.component';
import { Filter } from 'src/app/shared/models/query-options';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class EditComponent extends BaseEditComponent  {
  heading = 'itineraire';
  @Input() item: IItineraire = new Itineraire();

  allLieu$ = new LieuFactory().list(
    QueryAllOptionWithIns
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly lieuEditComponent  = LieuEditComponent;


  allMasque$ = new ItineraireMasqueFactory().list(
    new QueryOptions(
      [
          {or: false, filters:[new Filter('isIns', true, 'eq')]},
      ], ['visi_ville']
    )
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly masqueEditComponent  = MasqueEditComponent;

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new ItineraireFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IItineraire) {
    let point_arrets = [];
    if(item.point_arrets)
    {
      item.point_arrets.forEach(element => {
        point_arrets.push( new FormControl(element.id, Validators.required));
      });
    }
    return this.formBuilder.group({
      'heure_depart': [item.heure_depart, Validators.required],
      'heure_arrive': [item.heure_arrive  , Validators.required],
      'libelle': [item.libelle  , Validators.required],
      'point_depart_id': [item.point_depart_id, Validators.required],
      'masque_id': [item.masque_id, Validators.required],
      'lieu_arrivee_id': [item.lieu_arrivee_id, Validators.required],
      'point_arrets': this.formBuilder.array(point_arrets),
      'id': [item.id]
    });
  }

  addPointArret() {
    const control = this.editForm.get('point_arrets') as FormArray;
    control.push(new FormControl(null, Validators.required));
  }

  removePointArret(child_index) {
    const control = this.editForm.get('point_arrets') as FormArray;
    control.markAsDirty();
    control.removeAt(child_index);
 }
}
