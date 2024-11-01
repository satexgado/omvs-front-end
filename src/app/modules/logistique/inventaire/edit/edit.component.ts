import { shareReplay, map } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { IInventaire, Inventaire } from 'src/app/core/models/logistique/inventaire';
import { InventaireFactory } from 'src/app/core/services/logistique/inventaire';
import { CacheService } from 'src/app/shared/services/cache.service';
import { QueryOptions, Filter, Sort } from 'src/app/shared/models/query-options';
import { MaterielFactory } from 'src/app/core/services/materiel';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { SelectIconItem } from 'src/app/shared/components/custom-input/custom-select-icon/custom-select-icon.component';
import { MaterielEtatFactory } from 'src/app/core/services/logistique/materiel-etat';
import { UserFactory } from 'src/app/core/services/user.factory';
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
  heading = 'inventaire';
  @Input() item: IInventaire = new Inventaire();
  allMateriels$=this.materielService.allData;
  materielId: number;

  constructor(
    protected cacheService: CacheService,
    protected materielService: MaterielService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new InventaireFactory(), cdRef, activeModal);
  }

  ngOnInit() {
    if(this.materielId) {
      return super.ngOnInit();
    }
    this.materielService.getAll();
    super.ngOnInit();
  }

  createFormGroup(item: IInventaire) {
    const materielId = this.materielId ? this.materielId : item.materiel_id;
    return this.formBuilder.group({
      'prix': [item.prix, Validators.required],
      'stock_normal': [item.stock_normal, Validators.required],
      'quantite_defectueux': [item.quantite_defectueux, Validators.required],
      'date':  [item.date, Validators.required],
      'materiel_id': [materielId],
      'quantite_stock': [item.quantite_stock, Validators.required],
      'id': [item.id]
    });
  }
}
