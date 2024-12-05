import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { BonCarburantSortie, IBonCarburantSortie } from 'src/app/core/models/transport/bon-carburant-sortie';
import { BonCarburantSortieFactory } from 'src/app/core/services/transport/bon-carburant-sortie';
import { EditComponent as EngagementEditComponent} from '../../type-engagement/edit/edit.component';
import { EditComponent as TypeCoupureEditComponent} from '../../type-coupure/edit/edit.component';
import { EditComponent as CarburantEditComponent} from 'src/app/modules/transport/carburant/edit/edit.component';
import { EditComponent as AutomobileEditComponent} from 'src/app/modules/transport/automobile/edit/edit.component';
import { CarburantTypeFactory } from 'src/app/core/services/transport/carburant-type';
import { map, shareReplay } from 'rxjs/operators';
import { BonTypeCoupureFactory } from 'src/app/core/services/transport/bon-type-coupure';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { BonTypeEngagementFactory } from 'src/app/core/services/transport/bon-type-engagement';
import { DashboardService } from 'src/app/components/modules/tableau/dashboard/dashboard.service';
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
  @Input() item: IBonCarburantSortie = new BonCarburantSortie();
  allTypeCarburants$ = new CarburantTypeFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly carburantEditComponent  = CarburantEditComponent;

  allAutomobiles$ = new AutomobileFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly automobileEditComponent  = AutomobileEditComponent;

  allTypeCoupures$ = new BonTypeCoupureFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly coupureEditComponent  = TypeCoupureEditComponent;

  allEngagements$ = new BonTypeEngagementFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly engagementEditComponent  = EngagementEditComponent;

  protected readonly allUsers$ = this.dashService.allPersonnels$;

  constructor(
    protected dashService: DashboardService,
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new BonCarburantSortieFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IBonCarburantSortie) {
    return this.formBuilder.group({
      'auto_id': [item.auto_id, Validators.required],
      'type_carburant': [item.type_carburant, Validators.required],
      'type_coupure': [item.type_coupure, Validators.required],
      'nombre_coupure': [item.nombre_coupure, Validators.required],
      'quantite_litre': [item.quantite_litre, Validators.required],
      'date_reception': [item.date_reception, Validators.required],
      'type_engagement': [item.type_engagement, Validators.required],
      'autorise_par': [item.autorise_par, Validators.required],
      'id': [item.id]
    });
  }
}
