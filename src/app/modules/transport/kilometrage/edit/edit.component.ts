import { shareReplay, map } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { IKilometrage, Kilometrage } from 'src/app/core/models/transport/kilometrage';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { KilometrageFactory } from 'src/app/core/services/transport/kilometrage';
import { CrCoordonneeFactory } from 'src/app/core/services/cr-coordonnee';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditComponent extends BaseEditComponent {
  heading = 'kilometrage';
  @Input() item: IKilometrage = new Kilometrage();
  automobileId: number;


  protected readonly allAutomobiles$ = new AutomobileFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );

  constructor(
    protected cacheService: CacheService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new KilometrageFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IKilometrage) {
    const automobileId = this.automobileId ? this.automobileId : item.automobile_id;
    return this.formBuilder.group({
      'date_donnee':  [item.date_donnee, Validators.required],
      'automobile_id': [automobileId],
      'kilometrage': [item.kilometrage, Validators.required],
      'id': [item.id]
    });
  }
}
