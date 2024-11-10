import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EditComponent} from '../edit/edit.component';
import { map, shareReplay } from 'rxjs/operators';
import { ICrCoordonneeGroupe } from 'src/app/core/models/cr-coordonnee-groupe';
import { CrCoordonneeGroupeFactory } from 'src/app/core/services/cr-coordonnee-groupe';
import { ChooseMultiItemBaseComponent } from 'src/app/modules/choose-item/multi/choose-multi-item-base.component';
import { IBase } from 'src/app/core/models/base.interface';

@Component({
  selector: 'app-coordonnee-groupe-select',
  templateUrl: './groupe-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CoordonneeGroupeSelectComponent,
      multi: true
    }
  ],
  styleUrls: ['./groupe-select.component.css']
})
export class CoordonneeGroupeSelectComponent implements ControlValueAccessor {
  onChange: (param: any) => void;
  onTouched: (param: any) => void;
  selected: IBase[];
  @Input() label = null;
  @Input() small = false;

 
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

  onChooseCoordonneeGroupes()
  {
    const modalRef = this.modalService.open(ChooseMultiItemBaseComponent,{ size: 'lg', centered: true,  backdrop: 'static' });
    const instance = modalRef.componentInstance as ChooseMultiItemBaseComponent;
    instance.createModal = EditComponent;
    instance.dataSource$ = new CrCoordonneeGroupeFactory().list().pipe(
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

