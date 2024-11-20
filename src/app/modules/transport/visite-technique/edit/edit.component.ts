import { shareReplay, map } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { IVisiteTechnique, VisiteTechnique } from 'src/app/core/models/transport/visite-technique';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { VisiteTechniqueFactory } from 'src/app/core/services/transport/visite-technique';
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
  heading = 'sinistre';
  @Input() item: IVisiteTechnique = new VisiteTechnique();
  automobileId: number;

  frequenceSelect = [
    {
      libelle: 'en attente',
      id: 'en attente'
    },
    {
      libelle: 'traité',
      id: 'traité'
    },
    {
      libelle: 'refusé',
      id: 'refusé'
    }
  ];

  protected readonly allAutomobiles$ = new AutomobileFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );

  protected readonly allCoordonnees$ = new CrCoordonneeFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );

  constructor(
    protected cacheService: CacheService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new VisiteTechniqueFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IVisiteTechnique) {
    const automobileId = this.automobileId ? this.automobileId : item.auto_id;
    return this.formBuilder.group({
      'date_visite':  [item.date_visite, Validators.required],
      'auto_id': [automobileId],
      'coordonnee_id': [item.coordonnee_id, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
