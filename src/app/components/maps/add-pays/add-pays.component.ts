import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaysService } from 'src/app/services/pays.service';

@Component({
  selector: 'app-add-pays',
  templateUrl: './add-pays.component.html',
  styleUrls: ['./add-pays.component.sass']
})
export class AddPaysComponent extends BaseComponent implements OnInit {
  

  constructor(private service: PaysService, private formBuilder: FormBuilder,
    private routeObserver: ActivatedRoute, ) {
    super(service, '/localisation/pays', '');

    // AVOID TO FETCH DATA AGAIN IF EXIST
    this.getDataAnyway = false
  }

  ngOnInit() {

    super.ngOnInit();
    this.initAddForm();
    this.service.formSubject.subscribe(
      (res: boolean)=>{
        if(res){
          this.initAddForm();
          
        }
      }
    );
  }
  


  initAddForm() {
    this.forms.add = this.formBuilder.group({
      name: [null, [Validators.required]]
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

