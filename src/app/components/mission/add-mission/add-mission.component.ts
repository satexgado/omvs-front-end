import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from 'src/app/services/mission.service.'
import { ArchiveService } from 'src/app/services/archive.service'
import { FileConfig } from 'src/app/shared-module/file-manager/file.config';
import { MissionValidator } from 'src/app/shared/validator/mission.validator';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent extends BaseComponent implements OnInit {

  @Input() mission_id: any;
  @Input() currentStep: string;
  @Input() input_currentItem: {};
  @Input() input_currentIndex: number;
  @Input() billetMode: boolean;

  currentFormAction: string = 'CREATE';
  fileConfig: FileConfig;
  archives = [{ name: 'Oui', value: 1 }, { name: 'Non', value: 0 }];

  constructor(private service: MissionService,
    private archiveService: ArchiveService,
    private routeObserver: ActivatedRoute,
    private formBuilder: FormBuilder,
    private missionValidator:MissionValidator) {
    super(service, '/mission/list', '', routeObserver);

    // AVOID TO FETCH DATA AGAIN IF EXIST
    this.getDataAnyway = false
  }

  ngOnInit() {

    super.ngOnInit();

    this.mission_id ? this.currentFormAction = 'EDIT' : this.currentFormAction = 'CREATE';
    this.currentStep ? this.currentView = this.currentStep : this.currentView = 'addOrEdit';
    this.input_currentItem ? this.currentItem = this.input_currentItem : this.currentItem = null;
    this.input_currentIndex ? this.currentIndex = this.input_currentIndex : this.currentIndex = null;

    this.initAddForm();

    this.service.initExtraData();

    this.service.formSubject.subscribe(
      (res: boolean) => {
        if (res) {
          this.initAddForm();
        }
      }
    );

  }

  private switchStep(step?: string) {
    this.currentView = step;
    this.toggleView(step);
  }

  private stepLength(): string {
    switch (this.currentView) {
      case 'charge':
        return 'step-40'
        break;
      case 'equipe':
        return 'step-60'
        break;
      case 'materiel':
        return 'step-80'
        break;

      case 'itineraire':
        return 'step-100'
        break;

      default:
        return 'step-20'
        break;
    }
  }

  private addOrEdit() {
    this.currentItem ? this.edit() : this.add();
  }


  private initAddForm() {
    if (this.currentItem) {
      this.forms.add = this.formBuilder.group({
        departement_id: [this.currentItem.departement_id, Validators.required],
        type_id: [this.currentItem.type_id, Validators.required],
        niveau_id: [this.currentItem.niveau_id, Validators.required],
        localite_id: [this.currentItem.localite.id, Validators.required],
        depart: [this.currentItem.depart.id, Validators.required],
        name: [this.currentItem.name, Validators.required],
        code: [this.currentItem.code, Validators.required, this.missionValidator.alreadyUsedCodeValidator(this.currentItem.code)],
        start: [this.currentItem.start, Validators.required],
        end: [this.currentItem.end, Validators.required],
        archive: [this.currentItem.archive, Validators.required],
      });

      //init file edit
      this.fileConfig = {
        tableName: 'mission',
        parent_id: this.currentItem.id,
        type: 2,
        acceptedFiles: '.pdf',
        canUploadFiles: true,
        validatorPaterns: 'application/pdf',
        canShowDiapo: true,
        canGetFiles: true,
        mediaTypeToGet: 2,
        canShowFiles: true,
        canDelete: true,
        maxFileToUpload: 8,
        maxFileSize: 2000000,
        editFileName: true
      };

      // set form action name
      this.currentFormAction = 'EDIT';

    }
    else {
      this.forms.add = this.formBuilder.group({
        departement_id: [null, Validators.required],
        type_id: [null, Validators.required],
        niveau_id: [null, Validators.required],
        localite_id: [null, Validators.required],
        depart: [null, Validators.required],
        name: [null, Validators.required],
        code: [null, Validators.required, this.missionValidator.alreadyUsedCodeValidator()],
        start: [null, Validators.required],
        end: [null, Validators.required],
        archive: [true, Validators.required]
      });
    }
  }

  add() {
    const formValue = this.forms.add.value;
    formValue.personnel_id = this.profile.user_id;
    this.requesting = true;

    this.service.post(this.service.getServerUrl(), formValue).subscribe(
      (res: any) => {
        if (res.success) {
          if (res.data.archive == 0) {
            this.service.add(res.data)
          }
          else {
            this.archiveService.add(res.data);
          }

          this.mission_id = res.data.id;
          this.currentFormAction = 'EDIT';
          this.service.notify("success", 'SUCCESS');
          this.requesting = false;

          //init file edit
          this.fileConfig = {
            tableName: 'mission',
            parent_id: res.data.id,
            type: 2,
            acceptedFiles: '.pdf',
            canUploadFiles: true,
            validatorPaterns: 'application/pdf',
            canShowDiapo: true,
            canGetFiles: true,
            mediaTypeToGet: 2,
            canShowFiles: true,
            canDelete: true,
            maxFileToUpload: 8,
            maxFileSize: 2000000
          };

          this.currentItem = res.data;

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

  edit() {
    let formValue = this.forms.add.value;
    this.requesting = true;
    this.service.put(this.service.getServerUrl() + '/' + this.currentItem.id, formValue).subscribe(
      (res: any) => {
        if (res.success) {


          if (res.data.archive) {
            if (this.archiveService.sourceHasData) {
              this.currentIndex ? this.archiveService.edit(res.data, this.currentIndex) : null;
            }
          }
          else {
            if (this.service.sourceHasData) {
              this.currentIndex ? this.service.edit(res.data, this.currentIndex) : null;
            }
          }

          this.service.notify("success", 'SUCCESS');
          this.currentItem = res.data;
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