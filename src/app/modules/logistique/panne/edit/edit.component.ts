import { shareReplay, map } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { IPanne, Panne } from 'src/app/core/models/logistique/panne';
import { PanneNiveauFactory } from 'src/app/core/services/logistique/panne-niveau';
import { PanneFactory } from 'src/app/core/services/logistique/panne';
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
  heading = 'panne';
  @Input() item: IPanne = new Panne();
  allMateriels$=this.materielService.allData;
  materielId: number;

    protected readonly allPanneNiveau$ = this.cacheService.get(
      'allPanneNiveau',
      new PanneNiveauFactory().list().pipe(
        shareReplay(1),
        map(data => data.data)
      ),
      1800000);

  constructor(
    protected cacheService: CacheService,
    protected materielService: MaterielService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new PanneFactory(), cdRef, activeModal);
  }

  ngOnInit() {
    if(this.materielId) {
      return super.ngOnInit();
    }
    this.materielService.getAll();
    super.ngOnInit();
  }

  createFormGroup(item: IPanne) {
    const materielId = this.materielId ? this.materielId : item.materiel_id;
    return this.formBuilder.group({
      'quantite': [item.quantite],
      'date':  [item.date, Validators.required],
      'materiel_id': [materielId],
      'niveau_id': [item.niveau_id, Validators.required],
      'description': [item.description, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
