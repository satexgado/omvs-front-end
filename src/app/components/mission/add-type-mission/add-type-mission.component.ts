import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TypeMissionService } from 'src/app/services/type-mission.service';

@Component({
  selector: 'app-add-type-mission',
  templateUrl: './add-type-mission.component.html',
  styleUrls: ['./add-type-mission.component.sass']
})
export class AddTypeMissionComponent  extends BaseComponent implements OnInit {
  

  constructor(private service: TypeMissionService, private formBuilder: FormBuilder,
    private routeObserver: ActivatedRoute, ) {
    super(service, '/mission/type', '');

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


