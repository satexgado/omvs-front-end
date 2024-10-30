import { NiveauUrgenceFactory } from 'src/app/core/services/logistique/niveau-urgence';
import { shareReplay, map } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { IBesoin, Besoin } from 'src/app/core/models/logistique/besoin';
import { BesoinFactory } from 'src/app/core/services/logistique/besoin';
import { CacheService } from 'src/app/shared/services/cache.service';
import { QueryOptions, Filter, Sort } from 'src/app/shared/models/query-options';
import { MaterielFactory } from 'src/app/core/services/materiel';
import { MaterielService } from 'src/app/services/materiel.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent extends BaseEditComponent implements OnInit {
  heading = 'besoin';
  @Input() item: IBesoin = new Besoin();
  allMateriels$ = this.materielService.allData;
  protected readonly allNiveaus$ = new NiveauUrgenceFactory().list().pipe(
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
    super(new BesoinFactory(), cdRef, activeModal);
  }

  ngOnInit() {
    if(this.materielId) {
      return super.ngOnInit();
    }

    this.materielService.getAll();
    super.ngOnInit(); 
  }

  createFormGroup(item: IBesoin) {
    const materielId = this.materielId ? this.materielId : item.materiel_id;
    return this.formBuilder.group({
      'niveau_id': [item.niveau_id, Validators.required],
      'quantite': [item.quantite, Validators.required],
      'materiel_id': [materielId],
      'description': [item.description, Validators.required],
      // 'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
