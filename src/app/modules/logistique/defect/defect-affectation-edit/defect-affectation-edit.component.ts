import { MaterielDefectPersonneFactory } from 'src/app/core/services/logistique/materiel-defect-personne';
import { MaterielDefectPersonne } from 'src/app/core/models/logistique/materiel-defect-personne';
import { IMaterielDefectPersonne } from 'src/app/core/models/logistique/materiel-defect-personne';
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
import { FournisseurFactory } from 'src/app/core/services/logistique/fournisseur';
import { Filter, QueryOptions } from 'src/app/shared/models/query-options';

@Component({
  selector: 'app-defect-affectation-edit',
  templateUrl: './defect-affectation-edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class DefectAffectationEditComponent extends BaseEditComponent implements OnInit  {
  heading = 'defect';
  @Input() item: IMaterielDefectPersonne = new MaterielDefectPersonne();
  defectId: number;

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

  constructor(
    cdRef:ChangeDetectorRef,
    protected cacheService: CacheService,
    activeModal: NgbActiveModal)
  {
    super(new MaterielDefectPersonneFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IMaterielDefectPersonne) {
    const defectId = this.defectId ? this.defectId : item.defect_id;
    return this.formBuilder.group({
      'defect_id': [defectId],
      'etat_id': [item.etat_id, Validators.required],
      'user_id': [item.user_id, Validators.required],
      'date_sortie':  [item.date_sortie, Validators.required],
      'date_retour':  [item.date_retour, Validators.required],
      'id': [item.id]
    },{validator: DateValidators.dateLessThanWithoutTime('date_sortie', 'date_retour', { 'dateSuperieur': true })});
  }
}
