import { MaterielBesoinPersonneFactory } from 'src/app/core/services/logistique/materiel-besoin-personne';
import { MaterielBesoinPersonne } from 'src/app/core/models/logistique/materiel-besoin-personne';
import { IMaterielBesoinPersonne } from 'src/app/core/models/logistique/materiel-besoin-personne';
import { DateValidators } from 'src/app/shared/date.validator';
import { MaterielEtatFactory } from 'src/app/core/services/logistique/materiel-etat';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services';
import { shareReplay, map } from 'rxjs/operators';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { UserFactory } from 'src/app/core/services/user.factory';
import { DashboardService } from 'src/app/components/modules/tableau/dashboard/dashboard.service';
import { QueryOptions, Sort } from 'src/app/shared/models/query-options';

@Component({
  selector: 'app-besoin-affectation-edit',
  templateUrl: './besoin-affectation-edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class BesoinAffectationEditComponent extends BaseEditComponent implements OnInit  {
  heading = 'besoin';
  @Input() item: IMaterielBesoinPersonne = new MaterielBesoinPersonne();
  besoinId: number;

  protected readonly allUsers$ = new UserFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  allInscriptions$ = this.dashService.allPersonnels(
    new QueryOptions().setSort([new Sort('nom', 'asc')]).setIncludes(['departement','poste'])
  );
  protected readonly allEtatMateriels$ = this.cacheService.get(
    'allEtatMateriels',
    new MaterielEtatFactory().list().pipe(
      shareReplay(1),
      map(data => data.data)
    ),
    1800000
  );

  constructor(
    cdRef:ChangeDetectorRef,
    protected cacheService: CacheService,
    protected dashService: DashboardService,  
    activeModal: NgbActiveModal)
  {
    super(new MaterielBesoinPersonneFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IMaterielBesoinPersonne) {
    const besoinId = this.besoinId ? this.besoinId : item.besoin_id;
    return this.formBuilder.group({
      'besoin_id': [besoinId],
      'quantite': [item.quantite, Validators.required],
      'user_id': [item.user_id, Validators.required],
      'date_traite':  [item.date_traite, Validators.required],
      'date_reception':  [item.date_reception, Validators.required],
      'id': [item.id]
    },{validator: DateValidators.dateLessThanWithoutTime('date_traite', 'date_reception', { 'dateSuperieur': true })});
  }
}
