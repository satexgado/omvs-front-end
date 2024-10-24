import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ObjectionService } from 'src/app/services/objection.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MissionService } from 'src/app/services/mission.service.';

@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent extends BaseComponent implements OnInit {

  @Input() mission_id: number;
  @Input() mission_etat_id: number;
  @Input() departement_id: number;
  @Input() departement_actuel: number;
  @Input() departement_name: string;
  @Input() departement_affecte: number;
  @Input() mission_all_details: any;
  private textEditorConfig: AngularEditorConfig;
  private etat_id = 3;
  private termine: boolean = false;
  private config: any;
  private imputations = [];

  constructor(private service: ObjectionService, public missionService: MissionService, private formBuilder: FormBuilder,
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
      this.init('/par-mission/' + this.mission_id + '/' + this.departement_id);

      this.service.get('imputation/par-mission/' + this.mission_id).subscribe(
        (res: any) => {
          if (res.success && res.data.length) {
            res.data.forEach((item: any) => {
              this.imputations.push(item.imputation);
            });
          }
          this.initOrdreForm();
        }
      );

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
    formValue.departement_id = this.departement_id;
    formValue.etat_id = this.etat_id;


    this.service.post(this.service.getServerUrl(), formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.service.add(res.data);
          this.service.notify("success", 'SUCCESS');
          this.initAddForm();
          this.toggleView('list');
          this.requesting = false;
          this.restoreTitle();

          // if (this.departement_actuel == 1) {
          //   let formValue = { etat_id: this.etat_id, textColor: "#FFF", borderColor: "#E74A3B", backgroundColor: "#E74A3B" };
          //   this.missionService.setEtat(this.mission_id, formValue);
          // }

          let formValue = { etat_id: this.etat_id, textColor: "#FFF", borderColor: "#E74A3B", backgroundColor: "#E74A3B" };
          this.missionService.setEtat(this.mission_id, formValue);

          this.mission_etat_id = this.etat_id;

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
      description: [item.description, [Validators.required]]
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

  private processDepartement() {

    // departement suivant (Toujours en cours de traitement)
    if (this.departement_actuel < 3) {
      let formValue = { etat_id: 2, textColor: "#FFF", borderColor: "#E74A3B", backgroundColor: "#E74A3B" };
      this.missionService.setEtat(this.mission_id, formValue);
      this.missionService.set_current_departement_traitement(this.departement_actuel + 1, this.mission_id);

    }
    else { // VALIDATION FINALE
      let formValue = { etat_id: 5, textColor: "#FFF", borderColor: "#7AB835", backgroundColor: "#7AB835" };
      this.missionService.setEtat(this.mission_id, formValue);
      this.missionService.set_current_departement_traitement(this.departement_actuel + 1, this.mission_id);

      this.termine = true;
    }
  }

  private initOrdreForm() {
    this.forms.ordre = this.formBuilder.group({
      imputation: [this.imputations, Validators.required]
    });

    this.config = {
      displayKey: "name", //if objects array passed which key to be displayed defaults to description
      search: false, //true/false for the search functionlity defaults to false,
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Selectionner',// text to be displayed when no item is selected defaults to Select,
      limitTo: 3, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'plus', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Rien à afficher!', // text to be displayed when no items are found while searching
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
      clearOnSelection: false // clears search criteria when an option is selected if set to true, default is false
    }

  }

  details(item: any) {
    this.currentItem = item;
    this.toggleView('details');
  }

  private restoreTitle() {
    this.currentItem = null
  }

  ordreMission() {
    this.toggleView('ordre');
  }

  private completeInfo() {
    let formValue = this.service.get_array_key_values(this.forms.ordre.value.imputation, 'id');
    this.requesting = true;

    this.service.post('imputation/' + this.mission_id, formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.missionService
          this.service.notify("success", 'SUCCESS');
          this.requesting = false;
          this.mission_all_details.imputations = this.forms.ordre.value.imputation;
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

