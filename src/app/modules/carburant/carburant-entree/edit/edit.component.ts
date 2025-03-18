import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { BonCarburantEntree, IBonCarburantEntree } from 'src/app/core/models/transport/bon-carburant-entree';
import { BonCarburantEntreeFactory } from 'src/app/core/services/transport/bon-carburant-entree';
import { EditComponent as BonCarburantEditComponent} from '../../bon-carburant/edit/edit.component';
import { map, shareReplay } from 'rxjs/operators';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { BonCarburantFactory } from 'src/app/core/services/transport/bon-carburant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [
    DatePipe,
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditComponent extends BaseEditComponent  {
  heading = 'Entrée Bon de carburant';
  @Input() item: IBonCarburantEntree = new BonCarburantEntree();
  allBonCarburantMasques$ = new BonCarburantFactory().list(
      new QueryOptions().setSort([new Sort('masque_libelle', 'asc')]).setIncludes(
        [
          "trans_bon_carburant_masque.cr_coordonnee",
        "trans_bon_carburant_masque.trans_type_carburant",
        "trans_bon_carburant_masque.trans_type_coupure"
        ]
      )
    ).pipe(
      shareReplay(1),
      map(data => data.data.map(item => {
        item['displayLibelle'] = ` ${item.libelle}  (${this.datePipe.transform(item.date_expiration,'dd/MM/yyyy')}) `;
        return item;
      }))
    );
  readonly bonCarburantEditComponent  = BonCarburantEditComponent;

  constructor(
    protected cdRef: ChangeDetectorRef,
    private datePipe: DatePipe,
    activeModal: NgbActiveModal) {
    super(new BonCarburantEntreeFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IBonCarburantEntree) {
    return this.formBuilder.group({
      'bon_carburant_id': [item.bon_carburant_id, Validators.required],
      'nombre_coupure': [item.nombre_coupure, Validators.required],
      'date_emission': [item.date_emission, Validators.required],
      'id': [item.id]
    });
  }
}
