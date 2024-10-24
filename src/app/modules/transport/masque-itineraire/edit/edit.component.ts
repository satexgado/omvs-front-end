import { VilleFactory } from 'src/app/core/services/ville';
import { ItineraireMasque, IItineraireMasque } from 'src/app/core/models/transport/itineraire-masque';
import { Component, Input, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { SelectIconItem } from 'src/app/shared/components/custom-input/custom-select-icon/custom-select-icon.component';
import { map } from 'rxjs/operators';
import { CacheService } from 'src/app/shared/services';
import { ItineraireMasqueFactory } from 'src/app/core/services/transport/itineraire-masque';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent implements OnDestroy {
  heading = 'masque-itineraire';
  @Input() item: IItineraireMasque = new ItineraireMasque();
  villePreselectedData  = null;
  subscription: Subscription = new Subscription();

  periode_select: SelectIconItem[] = [
    {libelle:'Matin',iconClass:null},
    {libelle:'Midi',iconClass:null},
    {libelle:'Soir',iconClass:null},
  ];

  direction_select: SelectIconItem[] = [
    {libelle:'Depart',iconClass:null},
    {libelle:'Retour',iconClass:null},
    {libelle:'Intermediaire',iconClass:null},
  ];

  allVilles$ = this.cacheService.get('allVilles',new VilleFactory().list().pipe(
    map( (data: any) => {
        return data.data
    })));

    constructor(
      protected cacheService: CacheService,
      protected cdRef: ChangeDetectorRef,
      activeModal: NgbActiveModal) {
      super(new ItineraireMasqueFactory(), cdRef, activeModal);
    }

  createFormGroup(item: IItineraireMasque) {
    this.villePreselectedData = this.allVilles$.pipe(
      map((data: any)=>{
        data = data.map((element)=>{
          let result = {id : element.id ,  text: element.libelle};
          if(item.ville_id == element.id)
          {
            result['selected']= true;
          }
          return result;
        });
        return data;
      })
    );

    return this.formBuilder.group({
      'ville_id': [item.ville_id],
      'libelle': [item.libelle, Validators.required],
      'direction': [item.direction, Validators.required],
      'periode': [item.periode, Validators.required],
      'id': [item.id]
    });
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
