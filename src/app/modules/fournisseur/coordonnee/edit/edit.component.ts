import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {  FormArray, FormControl, Validators } from '@angular/forms';
import { CrCoordonnee, ICrCoordonnee } from 'src/app/core/models/cr-coordonnee';
import { CrCoordonneeFactory } from 'src/app/core/services/cr-coordonnee';
import { ICrCoordonneeGroupe } from 'src/app/core/models/cr-coordonnee-groupe';
import { CrCoordonneeGroupeFactory } from 'src/app/core/services/cr-coordonnee-groupe';
import { QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { CoordonneeValidator } from 'src/app/shared/validator/coordonnee.validator';
import { EditComponent as TypeEditComponent} from 'src/app/modules/fournisseur/coordonnee-type/edit/edit.component';
import { CrCoordonneeTypeFactory } from 'src/app/core/services/cr-coordonnee-type';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [`
    header {
        padding: 8px 0 2px;
        background: #e9e9e9;
        border-bottom: 1px solid #cfcfcf;
        -webkit-box-shadow: 0 1px 0 #fff;
        -moz-box-shadow: 0 1px 0 #fff;
        -ms-box-shadow: 0 1px 0 #fff;
        box-shadow: 0 1px 0 #fff;
    }  
  `],
})
export class EditComponent extends BaseEditComponent  {
  heading = 'coordonnee';
  @Input() item: CrCoordonnee = new CrCoordonnee();
  tagList = [
    {
      id: 'fournisseur',
      libelle: 'fournisseur'
    },
    {
      id: 'partenaire',
      libelle: 'partenaire'
    }
  ]
  readonly typeEditComponent =TypeEditComponent;
  allGroupes: ICrCoordonneeGroupe[] = [];
  loading_groupes = true;
  multiParameter2 = {
    singleSelection: false,
    selectAllText: 'Tout selectionner',
    unSelectAllText: 'Tout deselectionner',
    itemsShowLimit: 5,
    labelKey: 'libelle',
    enableSearchFilter: true,
    tagToBody: true
  };
  constructor(
    cdRef:ChangeDetectorRef,
    activeModal: NgbActiveModal)
  {
    super(new CrCoordonneeFactory(),cdRef, activeModal);
    const typeService = new CrCoordonneeTypeFactory();
    typeService.list().subscribe(
      (data)=>{
        this.tagList = [...this.tagList,...data.data.map(type=>{return {id:type.libelle, libelle: type.libelle}})];
      }
    )
  }

  ngOnInit() {
    const service = new CrCoordonneeGroupeFactory();
    service.list(new QueryOptions().setSort([new Sort('libelle', 'ASC')])).subscribe(
      (data)=> {
        this.allGroupes = data.data;
        this.loading_groupes = false;
      }
    );
 
    super.ngOnInit();
    this.onChange();
  }


  onChange() {
    const groupesIdControl = this.editForm.get('groupes_id') as FormControl;
    const groupesControl = this.editForm.get('groupes') as FormControl;
    groupesControl.valueChanges.subscribe(
      (value)=>{
        if(value && value.length) {
          groupesIdControl.setValue(value.map(el=>el.id));
        } else {
          groupesIdControl.setValue(null);
        }
        groupesIdControl.markAsDirty();
        groupesIdControl.markAsTouched();
      }
    )
  }

  createFormGroup(item: ICrCoordonnee) {
    let contacts =   this.formBuilder.array([]);

    if(item.contacts && item.contacts.length) {
      item.contacts.forEach(
        (field)=> {
          contacts.push(this.formBuilder.group({
            'statut': [field.statut, Validators.required],
            'libelle': [field.libelle, Validators.required],
            'email': [field.email, Validators.required],
            'telephone': [field.telephone, Validators.required],
            id: [field.id]
          }))
        }
      )
    }
    return this.formBuilder.group({
      'removedContact': [],
      'contact': contacts,
      'groupes': [item.groupes ? item.groupes : []],
      'groupes_id': [item.groupes && item.groupes.length ? item.groupes.map(el=>el.id) : null],
      'tag': [item.tag, Validators.required],
      'site': [item.site],
      'email': [item.email, Validators.required],
      'telephone': [item.telephone, Validators.required],
      'adresse': [item.adresse, Validators.required],
      'condition_suivi': [item.condition_suivi],
      'commentaire': [item.commentaire],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }

  addContact() {
    const control = this.editForm.get('contact') as FormArray;
    control.push(this.formBuilder.group({
      'statut': ['', Validators.required],
      'libelle': ['', Validators.required],
      'email': ['', Validators.required],
      'telephone': ['', Validators.required],
      id: [0]
    }));
  }

  removeContact(child_index) {
    const control = this.editForm.get('contact') as FormArray;
    control.markAsDirty();
    if(control.at(child_index).get('id').value) {
      const removeControl = this.editForm.get('removedContact') as FormControl;
      let data = removeControl.value ? removeControl.value : [];
      data.push(control.at(child_index).get('id').value);
      removeControl.setValue(data);
    }
    control.removeAt(child_index);
 }
}
