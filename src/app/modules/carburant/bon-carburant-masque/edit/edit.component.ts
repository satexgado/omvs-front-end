import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { BonCarburantMasque, IBonCarburantMasque } from 'src/app/core/models/transport/bon-carburant-masque';
import { BonCarburantMasqueFactory } from 'src/app/core/services/transport/bon-carburant-masque';
import { EditComponent as ApprovisionnementEditComponent} from '../../approvisionnement/edit/edit.component';
import { EditComponent as TypeCoupureEditComponent} from '../../type-coupure/edit/edit.component';
import { EditComponent as CarburantEditComponent} from 'src/app/modules/transport/carburant/edit/edit.component';
import { EditComponent as CoordonneeEditComponent} from 'src/app/modules/fournisseur/coordonnee/edit/edit.component';
import { CarburantTypeFactory } from 'src/app/core/services/transport/carburant-type';
import { map, shareReplay } from 'rxjs/operators';
import { BonTypeCoupureFactory } from 'src/app/core/services/transport/bon-type-coupure';
import { BonApprovisionnementFactory } from 'src/app/core/services/transport/bon-approvisionnement';
import { CrCoordonneeFactory } from 'src/app/core/services/cr-coordonnee';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { QueryOptions, Sort } from 'src/app/shared/models/query-options';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditComponent extends BaseEditComponent  {
  heading = 'Masque Bon de carburant';
  @Input() item: IBonCarburantMasque = new BonCarburantMasque();
  allTypeCarburants$ = new CarburantTypeFactory().list(
    new QueryOptions().setSort([new Sort('type_carburant', 'asc')])
  ).pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly carburantEditComponent  = CarburantEditComponent;

  allCoordonnees$ = new CrCoordonneeFactory().list(
    new QueryOptions().setSort([new Sort('libelle', 'asc')])
  ).pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly coordonneeEditComponent  = CoordonneeEditComponent;

  allTypeCoupures$ = new BonTypeCoupureFactory().list(
    new QueryOptions().setSort([new Sort('libelle', 'asc')])
  ).pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly coupureEditComponent  = TypeCoupureEditComponent;

  allApprovisionnements$ = new BonApprovisionnementFactory().list(
    new QueryOptions().setSort([new Sort('libelle', 'asc')])
  ).pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly approvisionnementEditComponent  = ApprovisionnementEditComponent;

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new BonCarburantMasqueFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IBonCarburantMasque) {
    return this.formBuilder.group({
      'coordonnee_id': [item.coordonnee_id, Validators.required],
      'type_carburant': [item.type_carburant, Validators.required],
      'type_coupure': [item.type_coupure, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
