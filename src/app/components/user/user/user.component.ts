import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/account/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent extends BaseComponent implements OnInit {

  constructor(private service: UserService, private formBuilder: FormBuilder,
    private routeObserver: ActivatedRoute) {

    super(service, '/user', '', routeObserver);
    this.canInitData = false;
    this.canInitPaginate = false;

  }

  ngOnInit() {

    super.ngOnInit();
    this.initAddForm();
    this.SOURCE = [
      { name: 'Opportune', photo: 'male.png' },
      { name: 'Hausmann', photo: 'female.png' },
      { name: 'Zeus', photo: 'male.png' },
      { name: 'JP', photo: 'female.png' },
      { name: 'Divine', photo: 'male.png' },
      { name: 'Ayva', photo: 'female.png' }
    ];
  }


  initAddForm() {
    this.forms.add = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    })
  }

  add() {
    const formValue = this.forms.add.value;
    this.requesting = true;
    formValue.etablissement = this.profile.currentEtablissement;

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
