import { CustomAdapter, CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { MaterielFactory } from 'src/app/core/services/materiel';
import { QueryOptions, Filter, Sort } from 'src/app/shared/models/query-options';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {  Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services';
import { shareReplay, map } from 'rxjs/operators';
import { IMaterielCommande, MaterielCommande } from 'src/app/core/models/materiel-commande';
import { MaterielCommandeFactory } from 'src/app/core/services/materiel-commande';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { MaterielService } from 'src/app/services/materiel.service';

@Component({
  selector: 'app-commande-edit',
  templateUrl: './commande-edit.component.html',
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateToStringAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class CommandeEditComponent extends BaseEditComponent implements OnInit  {
  heading = 'commande';
  @Input() item: IMaterielCommande = new MaterielCommande();
  allMateriels$ = this.materielService.allData;
  materielId: number;

  constructor(
    cdRef:ChangeDetectorRef,
    protected cacheService: CacheService,
    protected materielService: MaterielService,
    activeModal: NgbActiveModal)
  {
    super(new MaterielCommandeFactory(), cdRef, activeModal);
  }

  ngOnInit() {
    if(this.materielId) {
      return super.ngOnInit();
    }
    this.materielService.getAll();
    super.ngOnInit();
  }

  createFormGroup(item: IMaterielCommande) {
    const materielId = this.materielId ? this.materielId : item.materiel_id;
    return this.formBuilder.group({
      'materiel_id': [materielId],
      'quantite': [item.quantite, Validators.required],
      'prix': [item.prix, Validators.required],
      'date_commande':  [item.date_commande, Validators.required],
      // 'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
