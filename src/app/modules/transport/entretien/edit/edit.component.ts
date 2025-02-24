import { shareReplay, map, retryWhen, delay, take } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { IEntretien, Entretien } from 'src/app/core/models/transport/entretien';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { EntretienFactory } from 'src/app/core/services/transport/entretien';
import { CrCoordonneeFactory } from 'src/app/core/services/cr-coordonnee';
import { DateValidators } from 'src/app/shared/date.validator';
import { EditComponent as CoordonneeEditComponent} from 'src/app/modules/fournisseur/coordonnee/edit/edit.component';
import { EditComponent as EntretienTypeEditComponent} from 'src/app/modules/transport/entretien-type/edit/edit.component';
import { EntretienTypeFactory } from 'src/app/core/services/transport/entretien-type';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EditComponent extends BaseEditComponent {
  heading = 'entretien';
  @Input() item: IEntretien = new Entretien();
  automobileId: number;

  frequenceSelect = [
    {
      libelle: 'En cours',
      id: 'En cours'
    },
    {
      libelle: 'Non',
      id: 'Non'
    },
    {
      libelle: 'Oui',
      id: 'Oui'
    }
  ];

  protected readonly allAutomobiles$ = new AutomobileFactory().list().pipe(
    retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data)
  );

  protected readonly allCoordonnees$ = new CrCoordonneeFactory().list(
      
    ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
    readonly coordonneeEditComponent  = CoordonneeEditComponent;

    protected readonly allEntretienTypes$ = new EntretienTypeFactory().list(
      
    ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
    readonly entretienTypeEditComponent  = EntretienTypeEditComponent;

  constructor(
    protected cacheService: CacheService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new EntretienFactory(), cdRef, activeModal);
  }

  ngOnInit() {
    super.ngOnInit();
    this.onChanges();
    this.updateDate(this.editForm.get('statut').value);
  }

  onChanges(): void {
      let statutControl = this.editForm.get('statut') as FormControl;
   
      statutControl.valueChanges.subscribe(val => {
        this.updateDate(val);
        this.cdRef.detectChanges();
      });

  }

  updateDate(val) {
    let dateDebutControl = this.editForm.get('date_debut') as FormControl;
    let dateFinControl = this.editForm.get('date_fin') as FormControl;
    switch(val) {
      case 'Oui':
        this.editForm.setValidators([DateValidators.dateLessThan('date_debut','date_fin', { 'dateSuperieur': true })]);
        dateDebutControl.setValidators([Validators.required]);
        dateFinControl.setValidators([Validators.required]);
        dateDebutControl.setValue(this.item&& this.item.date_debut? this.item.date_debut : new Date());
        dateFinControl.setValue(this.item&& this.item.date_fin? this.item.date_fin : new Date());  
      break;
      case 'Non':
        this.editForm.setValidators(null);
        dateDebutControl.setValidators(null);
        dateFinControl.setValidators(null);
        dateDebutControl.setValue(null);
        dateFinControl.setValue(null);
      break;
      default: 
      this.editForm.setValidators(null);
        dateDebutControl.setValidators([Validators.required]);
        dateDebutControl.setValue(this.item&& this.item.date_debut? this.item.date_debut : new Date());
        dateFinControl.setValidators(null);
        dateFinControl.setValue(null);
    }
    dateDebutControl.markAsDirty();
    dateFinControl.markAsDirty();
    dateDebutControl.markAsTouched();
    dateFinControl.markAsTouched();
    dateDebutControl.updateValueAndValidity();
    dateFinControl.updateValueAndValidity();
    this.editForm.updateValueAndValidity();
  }

  createFormGroup(item: IEntretien) {
    const automobileId = this.automobileId ? this.automobileId : item.automobile_id;
    return this.formBuilder.group({
      'date_debut':  [item.date_debut],
      'date_fin':  [item.date_fin],
      'statut':  [item.statut, Validators.required],
      'type_entretien_id':  [item.type_entretien_id, Validators.required],
      'automobile_id': [automobileId],
      'coordonnee_id': [item.coordonnee_id, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    }, {validator: DateValidators.dateLessThan('date_debut','date_fin', { 'dateSuperieur': true })});
  }
}
