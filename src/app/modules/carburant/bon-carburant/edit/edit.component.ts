import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { BonCarburantMasqueFactory } from 'src/app/core/services/transport/bon-carburant-masque';
import { EditComponent as BonCarburantMasqueEditComponent} from 'src/app/modules/carburant/bon-carburant-masque/edit/edit.component';
import { CarburantTypeFactory } from 'src/app/core/services/transport/carburant-type';
import { map, shareReplay } from 'rxjs/operators';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { BonCarburant, IBonCarburant } from 'src/app/core/models/transport/bon-carburant';
import { QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { BonCarburantFactory } from 'src/app/core/services/transport/bon-carburant';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditComponent extends BaseEditComponent  {
  heading = 'Bon de carburant';
  @Input() item: IBonCarburant = new BonCarburant();
  allBonCarburantMasques$ = new BonCarburantMasqueFactory().list(
    new QueryOptions().setSort([new Sort('libelle', 'asc')])
  ).pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly bonCarburantMasqueEditComponent  = BonCarburantMasqueEditComponent;

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new BonCarburantFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IBonCarburant) {
    return this.formBuilder.group({
      'masque_bon_carburant_id': [item.masque_bon_carburant_id, Validators.required],
      'quantiteEnStock': [item.quantiteEnStock, Validators.required],
      'date_expiration': [item.date_expiration, Validators.required],
      'id': [item.id]
    });
  }
}
