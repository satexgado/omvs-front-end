import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { BonCarburantEntree, IBonCarburantEntree } from 'src/app/core/models/transport/bon-carburant-entree';
import { BonCarburantEntreeFactory } from 'src/app/core/services/transport/bon-carburant-entree';
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



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditComponent extends BaseEditComponent  {
  heading = 'Entrée Bon de carburant';
  @Input() item: IBonCarburantEntree = new BonCarburantEntree();
  allTypeCarburants$ = new CarburantTypeFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly carburantEditComponent  = CarburantEditComponent;

  allCoordonnees$ = new CrCoordonneeFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly coordonneeEditComponent  = CoordonneeEditComponent;

  allTypeCoupures$ = new BonTypeCoupureFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly coupureEditComponent  = TypeCoupureEditComponent;

  allApprovisionnements$ = new BonApprovisionnementFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly approvisionnementEditComponent  = ApprovisionnementEditComponent;

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new BonCarburantEntreeFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IBonCarburantEntree) {
    return this.formBuilder.group({
      'coordonnee_id': [item.coordonnee_id, Validators.required],
      'type_carburant': [item.type_carburant, Validators.required],
      'type_coupure': [item.type_coupure, Validators.required],
      'nombre_coupure': [item.nombre_coupure, Validators.required],
      'date_emission': [item.date_emission, Validators.required],
      'approvisionnement_id': [item.approvisionnement_id, Validators.required],
      'id': [item.id]
    });
  }
}
