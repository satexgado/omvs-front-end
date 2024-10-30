import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChooseMultiItem2Component } from 'src/app/modules/choose-item/multi2/choose-multi-item2.component';
import {EditComponent} from '../edit/edit.component';
import { IItineraire } from 'src/app/core/models/transport/itineraire';
import { ItineraireFactory } from 'src/app/core/services/transport/itineraire';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-itineraire-select',
  templateUrl: './itineraire-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ItineraireSelectComponent,
      multi: true
    }
  ],
  styleUrls: ['./itineraire-select.component.css']
})
export class ItineraireSelectComponent implements ControlValueAccessor {
  onChange: (param: any) => void;
  onTouched: (param: any) => void;
  selected: IItineraire[];
  @Input() label = null;
 
  get libelle() {
    if(!(this.selected&&this.selected.length)) {
      return '';
    }
    let kk = '';
    this.selected.forEach(k=>{
      kk +=`${k.libelle};`
    })
    return kk;
  }

  constructor(
    protected modalService: NgbModal
  ) {
  }

  onSetSelected(value = null) {
    this.selected = value;
    if (this.onChange && this.onTouched) {
      this.onChange(value);
      this.onTouched(true);
    }
  }

  writeValue( value: any ) {
    // clear selected input
    this.selected = value;
  }

  registerOnChange( fn: (param: any) => void ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: (param: any) => void ) {
    this.onTouched = fn;
  }

  onChooseItineraires()
  {
    const modalRef = this.modalService.open(ChooseMultiItem2Component,{ size: 'lg', centered: true,  backdrop: 'static' });
    const instance = modalRef.componentInstance as ChooseMultiItem2Component;
    instance.createModal = EditComponent;
    instance.dataSource$ = new ItineraireFactory().list().pipe(
      shareReplay(1),
      map(data => data.data)
    )
    if(this.selected && this.selected.length){
      instance.preselected = this.selected;
    }

    instance.multipleItemChoosen.subscribe(
      (data)=>{
        this.onSetSelected(data);
      }
    )
  }

}

