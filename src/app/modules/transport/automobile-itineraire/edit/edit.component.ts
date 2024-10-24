import { AutomobileItineraireFactory } from 'src/app/core/services/transport/automobile-itineraire';
import { ItineraireFactory } from 'src/app/core/services/transport/itineraire';
import { IAutomobileItineraire, AutomobileItineraire } from 'src/app/core/models/transport/automobile-itineraire';
import { Component, Input, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { NgbActiveModal, NgbDateNativeAdapter, NgbDateAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormArray} from '@angular/forms';
import { Subscription } from 'rxjs';
import { IAutomobile } from 'src/app/core/models/transport/automobile';
import { QueryAllOptionWithIns } from 'src/app/shared/models/query-options/query-options.model';
import { map } from 'rxjs/operators';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';


@Component({
  selector: 'app-edit-automobile-itineraire',
  templateUrl: './edit.component.html',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class EditComponent extends BaseEditComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  heading = 'itineraire';
  @Input() item: IAutomobileItineraire = new AutomobileItineraire();
  @Input() automobile: IAutomobile;
  allItineraire$ = new ItineraireFactory().list(
    QueryAllOptionWithIns
  ).pipe(
    map( (data: any) => {
        return data.data
    }
  ));
  hoveredDate: NgbDate;

  constructor(
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new AutomobileItineraireFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IAutomobileItineraire) {
    let automobile = null;

    if(item.automobile) {
      automobile = item.automobile_id
    } else if(this.automobile) {
      automobile = this.automobile.id;
    }
    return this.formBuilder.group({
      'commentaire':[item.commentaire],
      'date_debut':[item.date_debut, Validators.required],
      'date_fin':[item.date_fin, Validators.required],
      'automobile_id': [automobile, Validators.required],
      'itineraire_id':[item.itineraire_id, Validators.required],
      'id': [item.id]
    });
  }

  onDateSelection(date: NgbDate) {
    const items = this.editForm ;
    let adater = new NgbDateNativeAdapter();
    let fromDate = adater.fromModel(items.get('date_debut').value) ;
    let toDate = adater.fromModel(items.get('date_fin').value);

    if (!fromDate && !toDate) {
      let debut = new Date(date.year, date.month-1, date.day);
      items.get('date_debut').setValue(debut);
    } else if (fromDate && !toDate && date.after(fromDate)) {
      let fin = new Date(date.year, date.month-1, date.day);
      items.get('date_fin').setValue(fin);
    } else {
      items.get('date_fin').setValue(null);
      let debut = new Date(date.year, date.month-1, date.day);
      items.get('date_debut').setValue(debut);
    }
  }

  isHovered(date: NgbDate) {
    const items = this.editForm ;
    let adater = new NgbDateNativeAdapter();
    let fromDate = adater.fromModel(items.get('date_debut').value) ;
    let toDate = adater.fromModel(items.get('date_fin').value);
    return fromDate && !toDate && this.hoveredDate && date.after(fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    const items = this.editForm ;
    let adater = new NgbDateNativeAdapter();
    let fromDate = adater.fromModel(items.get('date_debut').value) ;
    let toDate = adater.fromModel(items.get('date_fin').value);
    return date.after(fromDate) && date.before(toDate);
  }

  isRange(date: NgbDate) {
    const items = this.editForm ;
    let adater = new NgbDateNativeAdapter();
    let fromDate = adater.fromModel(items.get('date_debut').value) ;
    let toDate = adater.fromModel(items.get('date_fin').value);
    return date.equals(fromDate) || date.equals(toDate) || this.isInside(date) || this.isHovered(date);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}

