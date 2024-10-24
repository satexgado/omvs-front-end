import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { ActivatedRoute } from '@angular/router';
import { MaterielService } from 'src/app/services/materiel.service';



@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent extends BaseComponent implements OnInit {

  pays = [];

  constructor(private service: MaterielService,
    private routeObserver: ActivatedRoute,
    private formBuilder: FormBuilder) {
    super(service, '/materiel/stock', '', routeObserver);
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
      quantite: [item.quantite, Validators.required],
      name: [item.name, Validators.required]
    });

    this.toggleView('edit');
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



