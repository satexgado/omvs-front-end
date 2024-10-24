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
import { IMaterielPannePersonne, MaterielPannePersonne } from 'src/app/core/models/logistique/materiel-panne-personne';
import { MaterielPannePersonneFactory } from 'src/app/core/services/logistique/materiel-panne-personne';
import { UserFactory } from 'src/app/core/services/user.factory';
import { FournisseurFactory } from 'src/app/core/services/logistique/fournisseur';
import { Filter, QueryOptions } from 'src/app/shared/models/query-options';

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
  @Input() item: IMaterielPannePersonne = new MaterielPannePersonne();
  panneId: number;

  protected readonly allUsers$ = new UserFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );

  protected readonly allEtatMateriels$ = this.cacheService.get(
    'allEtatMateriels',
    new MaterielEtatFactory().list().pipe(
      shareReplay(1),
      map(data => data.data)
    ),
    1800000
  );

  allFounisseurs$;
  constructor(
    cdRef:ChangeDetectorRef,
    protected cacheService: CacheService,
    activeModal: NgbActiveModal)
  {
    super(new MaterielPannePersonneFactory(), cdRef, activeModal);
  }

  ngOnInit() {
    this.cacheService.get('affectation-parent').subscribe(
      (data: {relationName: string,relationId: number})=>{
        const queryOptions: QueryOptions = new QueryOptions(
          [
            {or: false, filters: [new Filter(`${data.relationName}_by_id`, data.relationId, 'eq')]}
          ],
        );

        // queryOptions.sort = [new Sort('libelle_materiel','ASC')];
        queryOptions.includes = ['fournisseur_inscription'];

        this.allFounisseurs$ = new FournisseurFactory().list(queryOptions).pipe(
            shareReplay(1),
            map(data => data.data)
        );
        super.ngOnInit();
      },()=> {
        this.notificationService.onError('Un problème est survenue');
      }
    )
  }

  createFormGroup(item: IMaterielPannePersonne) {
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
