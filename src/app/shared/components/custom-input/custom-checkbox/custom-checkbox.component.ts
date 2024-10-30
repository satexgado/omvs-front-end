import { checkBoxRow } from 'src/app/shared/models/query-options/checkbox-row.model';
import { IBase } from 'src/app/core/models/base.interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomCheckBoxComponent,
      multi: true
    }
  ],
  styleUrls: ['./custom-checkbox.component.css']
})
export class CustomCheckBoxComponent implements ControlValueAccessor {
  onChange: (param: any) => void;
  onTouched: (param: any) => void;
  @Output() itemSelectedEmitter = new EventEmitter<any>();
  @Input() selected: string | null = null;
  checkboxItems: checkBoxRow<string>[] = [];
  @Input('createModal') createModal;
  @Input() createCallback: Function;
  @Input() createAdditionalParam: {name: string, value: any}[];
  @Output() itemCreated = new EventEmitter<any>();
 
  @Input() set items(items: IBase[]) {
    this.checkboxItems = [];
    items.forEach(element => {
      this.checkboxItems.push({
        checked: false,
        libelle: element.libelle,
        value: element.libelle
      });
    });
    this.onSetCheckBoxChecked();
  }

  constructor(protected modalSelect: NgbModal) {
  }

  onShowCreateForm() {
    if(this.createModal){
        const modalRef = this.modalSelect.open(this.createModal, { size: 'lg', centered: true, backdrop: 'static' });
        const instance = modalRef.componentInstance;
        instance.title = 'Créer';
        instance.isUpdating = false;

        if(this.createAdditionalParam && this.createAdditionalParam.length) {
          this.createAdditionalParam.forEach(element => {
            instance[element.name]= element.value;
          });
        }

        instance.newItem.subscribe(
          (data: any)=>{
            this.checkboxItems.push({
              checked: false,
              libelle: data.libelle,
              value: data.libelle
            });
            this.onSetSelected();
            this.itemCreated.emit(data);
            if(this.createCallback) {
              this.createCallback();
            }
          }
        )
    }
  }
  onSetSelected() {
    let temp = '';
    let i = 0;

    Object.values(this.checkboxItems).forEach(function (item) {
      if(item.checked)
      {
        i++;
        temp += item.value+',';
      }
    });

    if(i)
    {
      temp = temp.substring(0, temp.length - 1);
    }else{
      temp = null;
    }

    this.selected = temp;
    if (this.onChange && this.onTouched) {
      this.onChange(temp);
      this.onTouched(true);
    }
    this.itemSelectedEmitter.emit(temp);
  }

  onSetCheckBoxChecked() {
    if(this.selected && this.checkboxItems && this.checkboxItems.length) {
      this.checkboxItems.map(element=>{
        if(this.selected.includes(element.value)) {
          element.checked = true;
        }
        return element;
      })
    }
  }

  onCountChecked(checked = true) {
    if(!(this.checkboxItems && this.checkboxItems.length)) {
      return 0;
    }
    return this.checkboxItems.filter(element => element.checked == checked).length;
  }

  onsetAllCheck(statut: boolean | number) {
    this.checkboxItems = this.checkboxItems.map(
      element => {
        element.checked = !!statut;
        return element;
      }
    )
    this.onSetSelected();
  }

  writeValue( value: any ) {
    // clear selected input
    this.selected = value;
    this.onSetCheckBoxChecked();
  }

 registerOnChange( fn: (param: any) => void ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: (param: any) => void ) {
    this.onTouched = fn;
  }

}

