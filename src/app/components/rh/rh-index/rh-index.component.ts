import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { ActivatedRoute } from '@angular/router';
import { PersonnelService } from 'src/app/services/personnel.service';


@Component({
  selector: 'app-rh-index',
  templateUrl: './rh-index.component.html',
  styleUrls: ['./rh-index.component.sass']
})
export class RhIndexComponent extends BaseComponent implements OnInit {


  constructor(private service: PersonnelService,
    private routeObserver: ActivatedRoute,
    private formBuilder: FormBuilder) {
    super(service, '/rh/personnel', '', routeObserver);
  }

  ngOnInit() {
    super.ngOnInit();
  }


  initEditForm(item: any, index: any) {
    //set Modal Title Form
    this.modalTitle = 'EDITING';
    //save current item
    this.currentItem = item;
    //save current item index in array data from our service
    this.currentIndex = index;
    //init our edit form
    this.forms.edit = this.formBuilder.group({
      departement_id: [item.departement.id, Validators.required],
      poste_id: [item.poste.id, Validators.required],
      nom: [item.nom, Validators.required],
      prenom: [item.prenom, Validators.required],
      sexe: [item.sexe, Validators.required],
      situation_matrimoniale: [item.situation_matrimoniale, Validators.required],
      adresse: [item.adresse, Validators.required],
    });

    this.toggleView('edit');
  }

  showDescription(item: any) {
    this.currentItem = item;
  }

  edit() {
    let formValue = this.forms.edit.value;
    this.requesting = true;
    this.service.put(this.service.getServerUrl() + '/' + this.currentItem.id, formValue).subscribe(
      (res: any) => {
        if (res.success) {

          this.service.edit(res.data, this.currentIndex);
          this.service.notify("success", 'SUCCESS');
          this.toggleView('list');
          this.currentItem = null;
          this.requesting = false;

        }
        else {
          this.service.notify('error', 'ERROR');
          this.requesting = false;
        }
      },
      (error) => {
        this.service.notify('error', "serverError");
        this.requesting = false;
      }
    );
  }

}




