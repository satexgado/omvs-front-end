import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { ActivatedRoute } from '@angular/router';
import { PersonnelService } from 'src/app/services/personnel.service'

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.sass']
})
export class AddPersonnelComponent extends BaseComponent implements OnInit {

  constructor(private service: PersonnelService,
    private routeObserver: ActivatedRoute,
    private formBuilder: FormBuilder) {
    super(service, '/rh/personnel', '', routeObserver);

    // AVOID TO FETCH DATA AGAIN IF EXIST
    this.getDataAnyway = false
  }

  ngOnInit() {

    super.ngOnInit();

    this.initAddForm();
    this.service.formSubject.subscribe(
      (res: boolean) => {
        if (res) {
          this.initAddForm();
        }
      }
    );

  }


  initAddForm() {
    this.forms.add = this.formBuilder.group({
      departement_id: [null, Validators.required],
      poste_id: [null, Validators.required],
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      sexe: [null, Validators.required],
      situation_matrimoniale: [null, Validators.required],
      adresse: [null, Validators.required],
    });
  }

  add() {
    const formValue = this.forms.add.value;
    this.requesting = true;

    this.service.post(this.service.getServerUrl(), formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.service.add(res.data);
          this.service.notify("success", 'SUCCESS');
          this.initAddForm();
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