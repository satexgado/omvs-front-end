import { DateValidators } from 'src/app/shared/date.validator';
import { AutomobileEtatFactory } from 'src/app/core/services/transport/automobile-etat';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services';
import { shareReplay, map, retryWhen, delay, take } from 'rxjs/operators';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { IAutomobilePannePersonne, AutomobilePannePersonne } from 'src/app/core/models/transport/automobile-panne-personne';
import { AutomobilePannePersonneFactory } from 'src/app/core/services/transport/automobile-panne-personne';
import { Filter, QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { DashboardService } from 'src/app/components/modules/tableau/dashboard/dashboard.service';
import { CrCoordonneeFactory } from 'src/app/core/services/cr-coordonnee';
import { EditComponent as EtatEditComponent} from 'src/app/modules/transport/etat/edit/edit.component';
import { EditComponent as PanneEditComponent} from '../edit/edit.component';
import { DatePipe } from '@angular/common';
import { PanneFactory } from 'src/app/core/services/transport/panne';
@Component({
  selector: 'app-panne-affectation-edit',
  templateUrl: './panne-affectation-edit.component.html',
  providers: [
    DatePipe,
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class PanneAffectationEditComponent extends BaseEditComponent implements OnInit  {
  heading = 'panne';
  @Input() item: IAutomobilePannePersonne = new AutomobilePannePersonne();
  panneId: number;
  set automobileId(value: number) {
    if(value) {
      this.allPanneAutomobiles$ =  new PanneFactory().list(
        new QueryOptions().setFilterGroups(
          [
            {or: false, filters:[new Filter('automobile', value, 'eq')]},
          ]
        ).setSort([new Sort('libelle_panne', 'asc')]).setIncludes(['trans_auto'])
      ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data.map(item => {
        item['displayLibelle'] = ` ${item.libelle}  (${item.automobile ? item.automobile.libelle+' - ' : ''}${this.datePipe.transform(item.date,'dd/MM/yyyy')}) `;
        return item;
      })));
    } else {
      this.allPanneAutomobiles$ = new PanneFactory().list(
        new QueryOptions().setSort([new Sort('libelle_panne', 'asc')]).setIncludes(['trans_auto'])
      ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data.map(item => {
        item['displayLibelle'] = ` ${item.libelle}  (${item.automobile ? item.automobile.libelle+' - ' : ''}${this.datePipe.transform(item.date,'dd/MM/yyyy')}) `;
        return item;
      })));
    
    }
    
  }
  
  protected readonly allUsers$ = this.dashService.allPersonnels(
    new QueryOptions().setSort([new Sort('nom', 'asc')]).setIncludes(['departement','poste'])
  );

  protected allPanneAutomobiles$ = new PanneFactory().list(
    new QueryOptions().setSort([new Sort('libelle_panne', 'asc')]).setIncludes(['trans_auto'])
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data.map(item => {
    item['displayLibelle'] = ` ${item.libelle}  (${item.automobile ? item.automobile.libelle+' - ' : ''}${this.datePipe.transform(item.date,'dd/MM/yyyy')}) `;
    return item;
  })));
  panneEditComponent = PanneEditComponent;
  
  protected readonly allEtatAutomobiles$ = this.cacheService.get(
    'allEtatAutomobiles',
    new AutomobileEtatFactory().list(
    new QueryOptions().setSort([new Sort('libelle_etat', 'asc')])

    ).pipe(
      shareReplay(1),
      map(data => data.data)
    ),
    1800000
  );
  etatEditComponent = EtatEditComponent;
  allFounisseurs$ = this.cacheService.get(
    'allFounisseurs',
    new CrCoordonneeFactory().list(
      new QueryOptions().setSort([new Sort('libelle', 'asc')])
    ).pipe(
      shareReplay(1),
      map(data => data.data)
    ),
    1800000
  );;
  constructor(
    cdRef:ChangeDetectorRef,
    protected cacheService: CacheService,
    protected dashService: DashboardService,
    private datePipe: DatePipe,
    activeModal: NgbActiveModal)
  {
    super(new AutomobilePannePersonneFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IAutomobilePannePersonne) {
    const panneId = this.panneId ? this.panneId : item.panne_id;
    return this.formBuilder.group({
      'remarque': [item.remarque],
      'panne_id': [panneId],
      'fournisseur_id': [item.fournisseur_id, Validators.required],
      'etat_id': [item.etat_id, Validators.required],
      'user_id': [item.user_id, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'date_sortie':  [item.date_sortie, Validators.required],
      'date_retour':  [item.date_retour, Validators.required],
      'id': [item.id]
    },{validator: DateValidators.dateLessThanWithoutTime('date_sortie', 'date_retour', { 'dateSuperieur': true })});
  }
}
