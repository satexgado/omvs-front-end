import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CarteRapidoFactory } from 'src/app/core/services/carte-rapido';
import { CarteRapido, ICarteRapido } from 'src/app/core/models/carte-rapido';
import { DashboardService } from 'src/app/components/modules/tableau/dashboard/dashboard.service';
import { SelectIconItem } from 'src/app/shared/components/custom-input/custom-select-icon/custom-select-icon.component';
import { CarteValidator } from 'src/app/shared/validator/carte.validator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class EditComponent extends BaseEditComponent  {
  heading = 'carte rapido';
  @Input() item: ICarteRapido = new CarteRapido();
  allInscriptions$ = this.dashService.allPersonnels$;

  type_select: SelectIconItem[] = [
    {libelle: 'Prépayé', iconClass: null},
    {libelle: 'Mensuel', iconClass: null},
    {libelle: 'Annuel', iconClass: null},
  ];
  
  statut_select: SelectIconItem[] = [
    {libelle: 'Active', iconClass: null},
    {libelle: 'Suspendue', iconClass: null},
    {libelle: 'Expirée', iconClass: null},
  ];
  
  constructor(
    protected cdRef: ChangeDetectorRef,
    private dashService: DashboardService,
    activeModal: NgbActiveModal) {
    super(new CarteRapidoFactory(), cdRef, activeModal);
  }

  createFormGroup(item: ICarteRapido) {

    return this.formBuilder.group({
      'date_expiration': [item.date_expiration],
      'date_emission': [item.date_emission],
      'personnel_id': [item.personnel_id, Validators.required],
      'statut': [item.statut, Validators.required],
      'type': [item.type, Validators.required],
      'solde': [item.solde, Validators.required],
      'libelle': [item.libelle, Validators.required, CarteValidator.alreadyUsedNumberRapidoValidator(item.libelle)],
      'id': [item.id]
    });
  }
}
