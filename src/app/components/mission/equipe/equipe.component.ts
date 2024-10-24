import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EquipeService } from 'src/app/services/equipe.service';
import { FileConfig } from 'src/app/shared-module/file-manager/file.config';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent extends BaseComponent implements OnInit {

  @Input() mission_id: number;
  @Input() billetMode: boolean;

  private searchResult = [];
  fileConfig: FileConfig;

  constructor(protected service: EquipeService, protected formBuilder: FormBuilder,
    private routeObserver: ActivatedRoute, ) {
    super(service, '', '');

    this.canInitData = false;
    this.canInitPaginate = false;

  }

  ngOnInit() {
    super.ngOnInit();
    this.initSearhForm();


    if (this.mission_id) {
      this.canInitData = true;
      this.init('/par-mission/' + this.mission_id);
    }

  }

  private initSearhForm() {
    this.forms.search = this.formBuilder.group({
      keyword: [null, Validators.required],
    })
  }

  private search() {
    const formValue = this.forms.search.value;
    if (!(/^ *$/.test(formValue.keyword)) && formValue.keyword.length) {
      this.requestings.search = true;
      this.service.get('rh/personnel/search-for-equipe/' + formValue.keyword + '/' + this.mission_id).subscribe(
        (res: any) => {
          this.searchResult = res.data;
          this.requestings.search = false;
        },
        () => { this.requestings.search = false; }
      );
    }
  }


  initAddForm() {
    this.forms.add = this.formBuilder.group({
      role_id: [null, Validators.required],
      description: [null, [Validators.required]]
    })
    this.toggleView('add');
  }

  add() {
    let formValue = this.forms.add.value;
    this.requesting = true;
    formValue.mission_id = this.mission_id;
    formValue.personnel_id = this.currentItem.id;


    this.service.post(this.service.getServerUrl(), formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.service.add(res.data);
          this.currentItem = res.data;
          this.currentIndex = this.service.dataLength() - 1;
          this.toggleView('list');
          this.requesting = false;
          this.restoreView();
          this.service.notify("success", 'SUCCESS');
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

  initEditForm() {

    this.forms.edit = this.formBuilder.group({
      role_id: [this.currentItem.role.id, Validators.required],
      description: [this.currentItem.description, [Validators.required]]
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
          this.currentItem = res.data;
          this.toggleView('list');
          this.requesting = false;
          this.service.notify("success", 'SUCCESS');

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

  details(item: any, index = null) {
    this.currentItem = item;
    if (index >= 0) this.currentIndex = index;
    this.toggleView('list');
  }

  restoreView() {
    this.initSearhForm();
    this.searchResult = [];
  }

  restoreViewAfterDeleting() {
    this.currentItem = null;
    this.restoreView();
  }


  initBilletEdit() {

    //init file edit
    this.fileConfig = {
      tableName: 'equipe',
      parent_id: this.currentItem.id,
      type: 2,
      acceptedFiles: '.pdf',
      canUploadFiles: true,
      validatorPaterns: 'application/pdf',
      canShowDiapo: false,
      canGetFiles: true,
      mediaTypeToGet: 2,
      canShowFiles: true,
      canDelete: true,
      maxFileToUpload: 1,
      maxFileSize: 2000000,
      editFileName: false
    };

    this.toggleView('billet');
  }

  billetDone() {
    this.toggleView('list');
  }

  private updateFilePath(paths: any) {
    if (paths) {
      if (paths.length) {
        this.currentItem.billet = { url: paths[0].url };
        this.service.edit(this.currentItem, this.currentIndex);
      }
      else {
        this.currentItem.billet = null;
      }
    }

  }


}

