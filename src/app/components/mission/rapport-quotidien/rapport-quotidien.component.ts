import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RapportQuotidienService } from 'src/app/services/rapport-quotidien.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-rapport-quotidien',
  templateUrl: './rapport-quotidien.component.html',
  styleUrls: ['./rapport-quotidien.component.css']
})
export class RapportQuotidienComponent extends BaseComponent implements OnInit {

  @Input() mission_id: number;
  @Input() personnel_id: number;
  textEditorConfig: AngularEditorConfig;

  constructor(private service: RapportQuotidienService, private formBuilder: FormBuilder,
    private routeObserver: ActivatedRoute, ) {
    super(service, '', '');

    this.canInitData = false;
    this.canInitPaginate = false;

  }

  ngOnInit() {
    super.ngOnInit();

    this.textEditorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '250px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'description',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' }
      ],
      customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      sanitize: true,
      toolbarPosition: 'top',
    };

    if (this.mission_id) {
      this.canInitData = true;
      this.init('/par-personnel/' + this.mission_id+'/'+this.personnel_id);
      
    }
  }


  initAddForm() {
    this.forms.add = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, [Validators.required]]
    })
    this.toggleView('add');
  }

  add() {
    let formValue = this.forms.add.value;
    this.requesting = true;
    formValue.mission_id = this.mission_id;
    formValue.personnel_id = this.personnel_id;
    

    this.service.post(this.service.getServerUrl(), formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.service.add(res.data);
          this.service.notify("success", 'SUCCESS');
          this.initAddForm();
          this.toggleView('list');
          this.requesting = false;
          this.restoreTitle();
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
      name: [item.name, Validators.required],
      description: [item.description, [Validators.required] ]
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
          this.restoreTitle();
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

  details(item: any){
    this.currentItem = item;
    this.toggleView('details');
  }

  private restoreTitle(){
    this.currentItem = null
  }
}
