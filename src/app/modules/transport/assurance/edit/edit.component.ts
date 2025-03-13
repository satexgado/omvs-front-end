import { shareReplay, map } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { CrCoordonneeFactory } from 'src/app/core/services/cr-coordonnee';
import { Assurance, IAssurance } from 'src/app/core/models/transport/assurance';
import { AssuranceFactory } from 'src/app/core/services/transport/assurance';
import { QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { DateValidators } from 'src/app/shared/date.validator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditComponent extends BaseEditComponent {
  heading = 'assurance';
  @Input() item: IAssurance = new Assurance();
  automobileId: number;

  frequenceSelect = [
    {
      libelle: 'mois',
      id: 'mois'
    },
    {
      libelle: 'an(s)',
      id: 'an(s)'
    }
  ];

  tagList = [
    {
      id: 'actif',
      libelle: 'actif'
    },
    {
      id: 'expiré',
      libelle: 'expiré'
    },
    {
      id: 'suspendu',
      libelle: 'suspendu'
    }
  ]

  protected readonly allAutomobiles$ = new AutomobileFactory().list(
    new QueryOptions().setSort([new Sort('designation', 'asc')])
  ).pipe(
    shareReplay(1),
    map(data => data.data)
  );

  protected readonly allCoordonnees$ = new CrCoordonneeFactory().list(
    new QueryOptions().setSort([new Sort('libelle', 'asc')])
  ).pipe(
    shareReplay(1),
    map(data => data.data)
  );
  constructor(
    protected cacheService: CacheService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new AssuranceFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IAssurance) {
    const automobileId = this.automobileId ? this.automobileId : item.auto_id;
    return this.formBuilder.group({
      'date_debut':  [item.date_debut, Validators.required],
      'date_fin':  [item.date_fin, Validators.required],
      'auto_id': [automobileId],
      'coordonnee_id': [item.coordonnee_id, Validators.required],
      'description': [item.description, Validators.required],
      'prime': [item.prime, Validators.required],
      'etat_contrat': [item.etat_contrat, Validators.required],
      'periodicite': [item.periodicite, Validators.required],
      'duree_periodicite': [item.duree_periodicite, Validators.required],
      'numero_contrat': [item.numero_contrat, Validators.required],  
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    }, {validator: DateValidators.dateLessThan('date_debut','date_fin', { 'dateSuperieur': true })});
  }
}
