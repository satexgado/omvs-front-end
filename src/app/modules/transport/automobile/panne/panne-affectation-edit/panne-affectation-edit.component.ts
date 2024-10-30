import { DateValidators } from 'src/app/shared/date.validator';
import { AutomobileEtatFactory } from 'src/app/core/services/transport/automobile-etat';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services';
import { shareReplay, map } from 'rxjs/operators';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { IAutomobilePannePersonne, AutomobilePannePersonne } from 'src/app/core/models/transport/automobile-panne-personne';
import { AutomobilePannePersonneFactory } from 'src/app/core/services/transport/automobile-panne-personne';
import { FournisseurFactory } from 'src/app/core/services/logistique/fournisseur';
import { Filter, QueryOptions } from 'src/app/shared/models/query-options';
import { DashboardService } from 'src/app/components/modules/tableau/dashboard/dashboard.service';
import { CrCoordonnee } from 'src/app/core/models/cr-coordonnee';
import { CrCoordonneeFactory } from 'src/app/core/services/cr-coordonnee';

@Component({
  selector: 'app-panne-affectation-edit',
  templateUrl: './panne-affectation-edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class PanneAffectationEditComponent extends BaseEditComponent implements OnInit  {
  heading = 'panne';
  @Input() item: IAutomobilePannePersonne = new AutomobilePannePersonne();
  panneId: number;

  protected readonly allUsers$ = this.dashService.allPersonnels$;

  protected readonly allEtatAutomobiles$ = this.cacheService.get(
    'allEtatAutomobiles',
    new AutomobileEtatFactory().list().pipe(
      shareReplay(1),
      map(data => data.data)
    ),
    1800000
  );

  allFounisseurs$ = this.cacheService.get(
    'allFounisseurs',
    new CrCoordonneeFactory().list().pipe(
      shareReplay(1),
      map(data => data.data)
    ),
    1800000
  );;
  constructor(
    cdRef:ChangeDetectorRef,
    protected cacheService: CacheService,
    protected dashService: DashboardService,
    activeModal: NgbActiveModal)
  {
    super(new AutomobilePannePersonneFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IAutomobilePannePersonne) {
    const panneId = this.panneId ? this.panneId : item.panne_id;
    return this.formBuilder.group({
      'panne_id': [panneId],
      'fournisseur_id': [item.fournisseur_id, Validators.required],
      'etat_id': [item.etat_id, Validators.required],
      'user_id': [item.user_id, Validators.required],
      'date_sortie':  [item.date_sortie, Validators.required],
      'date_retour':  [item.date_retour, Validators.required],
      'id': [item.id]
    },{validator: DateValidators.dateLessThanWithoutTime('date_sortie', 'date_retour', { 'dateSuperieur': true })});
  }
}
