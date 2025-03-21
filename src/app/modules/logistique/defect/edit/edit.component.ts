import { DateValidators } from 'src/app/shared/date.validator';
import { UserFactory } from 'src/app/core/services/user.factory';
import { FournisseurFactory } from 'src/app/core/services/logistique/fournisseur';
import { shareReplay, map } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { IDefect, Defect } from 'src/app/core/models/logistique/defect';
import { DefectFactory } from 'src/app/core/services/logistique/defect';
import { CacheService } from 'src/app/shared/services/cache.service';
import { QueryOptions, Filter, Sort } from 'src/app/shared/models/query-options';
import { MaterielFactory } from 'src/app/core/services/materiel';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { MaterielService } from 'src/app/services/materiel.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditComponent extends BaseEditComponent implements OnInit {
  heading = 'defect';
  @Input() item: IDefect = new Defect();
  allMateriels$=this.materielService.allData;
  allFounisseurs$;
  protected readonly allUsers$ = new UserFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );

  materielId: number;

  constructor(
    protected cacheService: CacheService,
    protected materielService: MaterielService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new DefectFactory(), cdRef, activeModal);
  }

  ngOnInit() {
    if(this.materielId) {
      return super.ngOnInit();
    }
    this.materielService.getAll();
    super.ngOnInit();
  }

  createFormGroup(item: IDefect) {
    const materielId = this.materielId ? this.materielId : item.materiel_id;
    return this.formBuilder.group({
      'user_id': [item.user_id],
      'fournisseur_id': [item.fournisseur_id],
      'quantite': [item.quantite],
      'date_reception':  [item.date_reception, Validators.required],
      'date_signalement':  [item.date_signalement, Validators.required],
      'materiel_id': [materielId],
      'description': [item.description, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    },{validator: DateValidators.dateLessThanWithoutTime('date_reception', 'date_signalement', { 'dateSuperieur': true })});
  }
}
