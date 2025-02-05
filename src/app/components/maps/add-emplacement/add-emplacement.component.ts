import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmplacementService } from 'src/app/services/emplacement.service';

@Component({
  selector: 'app-add-emplacement',
  templateUrl: './add-emplacement.component.html',
  styleUrls: ['./add-emplacement.component.sass']
})
export class AddEmplacementComponent  extends BaseComponent implements OnInit {
  

  constructor(private service: EmplacementService, private formBuilder: FormBuilder,
    private routeObserver: ActivatedRoute, ) {
    super(service, '/localisation/emplacement', '');

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
      ville_id: [null, Validators.required],
      libelle: ['', Validators.required]
    })
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




