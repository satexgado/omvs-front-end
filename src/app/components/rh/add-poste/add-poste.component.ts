import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PosteService } from 'src/app/services/poste.service';

@Component({
  selector: 'app-add-poste',
  templateUrl: './add-poste.component.html',
  styleUrls: ['./add-poste.component.sass']
})
export class AddPosteComponent   extends BaseComponent implements OnInit {
  

  constructor(private service: PosteService, private formBuilder: FormBuilder,
    private routeObserver: ActivatedRoute, ) {
    super(service, '/rh/poste', '');

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



