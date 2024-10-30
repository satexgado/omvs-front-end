import { shareReplay, map } from 'rxjs/operators';
import { Component, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { IPanne, Panne } from 'src/app/core/models/transport/panne';
import { PanneNiveauFactory } from 'src/app/core/services/logistique/panne-niveau';
import { PanneFactory } from 'src/app/core/services/transport/panne';
import { CacheService } from 'src/app/shared/services/cache.service';
import { QueryOptions, Filter, Sort } from 'src/app/shared/models/query-options';
import { NgbDateToStringAdapter } from 'src/app/shared/components/custom-input/ngb-datetime/ngb-date-to-string-adapter';
import { CustomDateParserFormatter } from 'src/app/shared/custom-config/ngdatepicker.custom';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import {EditComponent as PanneNiveauEditComponent} from 'src/app/modules/logistique/panne-niveau/edit/edit.component'

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
  allAutomobiles$;
  automobileId: number;

    protected readonly allPanneNiveau$ = this.cacheService.get(
      'allPanneNiveau',
      new PanneNiveauFactory().list().pipe(
        shareReplay(1),
        map(data => data.data)
      ),
      1800000);
  readonly panneNiveauEditComponent = PanneNiveauEditComponent;
  constructor(
    protected cacheService: CacheService,
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new PanneFactory(), cdRef, activeModal);
  }

  ngOnInit() {
    if(this.automobileId) {
      return super.ngOnInit();
    }
    this.cacheService.get('affectation-parent').subscribe(
      (data: {relationName: string,relationId: number})=>{
        const queryOptions: QueryOptions = new QueryOptions(
          [
            {or: false, filters: [new Filter(`${data.relationName}_by_id`, data.relationId, 'eq')]}
          ],
        );

        queryOptions.sort = [new Sort('designation','ASC')];
        this.allAutomobiles$ = new AutomobileFactory().list(queryOptions).pipe(
            shareReplay(1),
            map(data => data.data)
        );
        super.ngOnInit();
      },()=> {
        this.notificationService.onError('Un problème est survenue');
      }
    )
  }

  createFormGroup(item: IPanne) {
    const automobileId = this.automobileId ? this.automobileId : item.automobile_id;
    return this.formBuilder.group({
      'date':  [item.date, Validators.required],
      'automobile_id': [automobileId],
      'niveau_id': [item.niveau_id, Validators.required],
      'description': [item.description, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
