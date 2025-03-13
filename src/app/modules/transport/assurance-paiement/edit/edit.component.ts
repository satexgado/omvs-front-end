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
import { AssurancePaiement, IAssurancePaiement } from 'src/app/core/models/transport/assurance-paiement';
import { AssurancePaiementFactory } from 'src/app/core/services/transport/assurance-paiement';
import { AssuranceFactory } from 'src/app/core/services/transport/assurance';
import { QueryOptions, Sort } from 'src/app/shared/models/query-options';

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
  @Input() item: IAssurancePaiement = new AssurancePaiement();
  assuranceId: number;

  frequenceSelect = [
    {
      libelle: 'autre',
      id: 'autre'
    },
    {
      libelle: 'carte',
      id: 'carte'
    },
    {
      libelle: 'chèque',
      id: 'chèque'
    },
    
    {
      libelle: 'espece',
      id: 'espece'
    },
    {
      libelle: 'mobile money',
      id: 'mobile money'
    },
    {
      libelle: 'virement',
      id: 'virement'
    }
  ];

  protected readonly allAssurances$ = new AssuranceFactory().list(
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
    super(new AssurancePaiementFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IAssurancePaiement) {
    const assuranceId = this.assuranceId ? this.assuranceId : item.assurance_id;
    return this.formBuilder.group({
      'date_paiement':  [item.date_paiement, Validators.required],
      'assurance_id': [assuranceId],
      'type_paiement': [item.type_paiement, Validators.required],
      'montant': [item.montant, Validators.required],
      'id': [item.id]
    });
  }
}
