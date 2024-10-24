import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItineraireService } from 'src/app/services/itineraire.service';
import { MissionService } from 'src/app/services/mission.service.';


@Component({
  selector: 'app-itineraire',
  templateUrl: './itineraire.component.html',
  styleUrls: ['./itineraire.component.css']
})
export class ItineraireComponent extends BaseComponent implements OnInit {

  @Input() mission_id: number;

  constructor(private service: ItineraireService, protected missionService: MissionService, private formBuilder: FormBuilder,
    private routeObserver: ActivatedRoute, ) {
    super(service, '', '');

    this.canInitData = false;
    this.canInitPaginate = false;

  }

  ngOnInit() {
    super.ngOnInit();

    if (this.mission_id) {
      this.canInitData = true;
      this.init('/par-mission/' + this.mission_id);
      this.missionService.getById(this.mission_id);
    }
  }


  initAddForm() {
    this.forms.add = this.formBuilder.group({
      localite_id: [null, Validators.required],
      objectif: [null, Validators.required]
    })
    this.toggleView('add');
  }

  add() {
    let formValue = this.forms.add.value;
    this.requesting = true;
    formValue.mission_id = this.mission_id;


    this.service.post(this.service.getServerUrl(), formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.service.add(res.data, 'push');
          this.service.notify("success", 'SUCCESS');
          this.toggleView('list');
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

  initEditForm(item: any, index: any) {
    //set Modal Title Form
    this.modalTitle = 'EDITING';
    //save current item
    this.currentItem = item;
    //save current item index in array data from our service
    this.currentIndex = index;
    //init our edit form
    this.forms.edit = this.formBuilder.group({
      localite_id: [item.localite_id, Validators.required],
      objectif: [item.objectif, Validators.required]
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

  colSize(): string {
    let length = 0;
    this.SOURCE ? length = this.SOURCE.data.length : length = 0;
    let result = ' col-6';
    switch (length) {
      case 0:
        result = ' col-6';
        break;
      case 1:
        result = ' col-4';
        break;

      default:
        result = ' col-3';
        break;
    }

    return result;
  }



}

