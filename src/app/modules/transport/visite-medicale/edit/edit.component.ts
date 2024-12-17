import { shareReplay, map } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { IVisiteMedicale, VisiteMedicale } from 'src/app/core/models/transport/visite-medicale';
import { QueryOptions } from 'src/app/shared/models/query-options';
import { VisiteMedicaleFactory } from 'src/app/core/services/transport/visite-medicale';
import { DossierConducteurFactory } from 'src/app/core/services/transport/dossier-conducteur';


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
  @Input() item: IVisiteMedicale = new VisiteMedicale();
  conducteurId: number;

  protected readonly allConducteurs$ = new DossierConducteurFactory().list(new QueryOptions().setIncludes(['cpt_conducteur'])).pipe(
    shareReplay(1),
    map(data => data.data)
  );

  constructor(
    protected cacheService: CacheService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new VisiteMedicaleFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IVisiteMedicale) {
    const conducteurId = this.conducteurId ? this.conducteurId : item.conducteur_id;
    return this.formBuilder.group({
      'date_visite':  [item.date_visite, Validators.required],
      'conducteur_id': [conducteurId],
      'diagnostic': [item.diagnostic, Validators.required],
      'traitements_prescrits': [item.traitements_prescrits, Validators.required],
      'commentaires': [item.commentaires, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
