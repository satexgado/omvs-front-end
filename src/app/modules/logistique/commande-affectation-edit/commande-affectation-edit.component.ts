import { UserFactory } from 'src/app/core/services/user.factory';
import { MaterielCommandePersonneFactory } from 'src/app/core/services/materiel-commande-personne';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services';
import { shareReplay, map } from 'rxjs/operators';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { IMaterielCommandePersonne, MaterielCommandePersonne } from 'src/app/core/models/materiel-commande-personne';
import { DashboardService } from 'src/app/components/modules/tableau/dashboard/dashboard.service';

@Component({
  selector: 'app-commande-affectation-edit',
  templateUrl: './commande-affectation-edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class CommandeAffectationEditComponent extends BaseEditComponent implements OnInit  {
  heading = 'commande';
  @Input() item: IMaterielCommandePersonne = new MaterielCommandePersonne();
  commandeId: number;

  protected readonly allUsers$ = this.dashService.allPersonnels$;

  constructor(
    cdRef:ChangeDetectorRef,
    protected cacheService: CacheService,
    protected dashService: DashboardService,
    activeModal: NgbActiveModal)
  {
    super(new MaterielCommandePersonneFactory(), cdRef, activeModal);
  }

  ngOnInit() {
    if(this.commandeId) {
      return super.ngOnInit();
    }
    this.notificationService.onError('Un problème est survenue');
  }

  createFormGroup(item: IMaterielCommandePersonne) {
    const commandeId = this.commandeId ? this.commandeId : item.commande_id;
    return this.formBuilder.group({
      'commande_id': [commandeId],
      'user_id': [item.user_id, Validators.required],
      'quantite': [item.quantite, Validators.required],
      'date':  [item.date, Validators.required],
      'id': [item.id]
    });
  }
}
