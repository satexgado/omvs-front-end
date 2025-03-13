import { shareReplay, map } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { AssuranceSinistre, IAssuranceSinistre } from 'src/app/core/models/transport/assurance-sinistre';
import { AssuranceSinistreFactory } from 'src/app/core/services/transport/assurance-sinistre';
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
  heading = 'sinistre';
  @Input() item: IAssuranceSinistre = new AssuranceSinistre();
  assuranceId: number;

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
    super(new AssuranceSinistreFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IAssuranceSinistre) {
    const assuranceId = this.assuranceId ? this.assuranceId : item.assurance_id;
    return this.formBuilder.group({
      'date_sinistre':  [item.date_sinistre, Validators.required],
      'assurance_id': [assuranceId],
      'statut': [item.statut, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'description': [item.description, Validators.required],
      'montant_remboursement': [item.montant_remboursement, Validators.required],
      'id': [item.id]
    });
  }
}
