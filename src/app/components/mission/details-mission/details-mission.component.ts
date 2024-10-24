import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from 'src/app/services/mission.service.'
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-details-mission',
  templateUrl: './details-mission.component.html',
  styleUrls: ['./details-mission.component.css']
})
export class DetailsMissionComponent extends BaseComponent implements OnInit {

  private currentformStep: string;
  private current_mission_id: number;
  private equipes: any[] = [];
  private userDetails: any;
  private currentPersonnelId: number; // used in user details children component to show entire details
  private currentPersonnelIdForRapportQuotidien: number; // used in user details children component to show entire details
  private currentPersonnelIdForRapportFinal: number; // used in user details children component to show entire details
  private stepView = null;
  private stepLength = 'step-1';
  private departements = [];
  private departement_id: number = null;
  private departement_name = '';
  private departement_actuel: number = null;
  private mission_etat_id: number = null
  private mission_all_details: any;

  constructor(public service: MissionService,
    private equipeService: EquipeService,
    private routeObserver: ActivatedRoute,
    private formBuilder: FormBuilder) {
    super(service, '/mission/list', '', routeObserver);

    this.canSubscribeToData = false;
    this.canInitData = false;
    this.canGetById = true;
    this.canGetProfileInfo = false;

  }

  ngOnInit() {

    super.ngOnInit();

    this.titles.window = 'detailsGlobal';

    this.activatedRoute.paramMap.subscribe(
      (param) => {
        if (param.has('tab')) {
          this.tabs = param.get('tab');
        }
      }
    );

    this.equipeService.byMission(this.id).subscribe(
      (res: any) => {
        this.equipes = res.data;
      }
    );

    this.accountService.profile.subscribe(
      (data: any) => {
        this.profile = data;
        this.currentPersonnelIdForRapportFinal = this.profile.personnel.id;
      });


    this.service.get('rh/departement/process').subscribe(
      (res: any) => {
        this.departements = res.data;
        this.stepView = 1;
        this.getObjection(res.data[0], 'step-1');
      }
    );

  }

  private personnelDetails(item: any) {
    this.currentPersonnelId = null;
    // we wait to allow children component to be destroyed before re-recreating it again with new information
    setTimeout(() => {
      this.currentPersonnelId = item.personnel.id;
      this.service.toggleModal('#modal__flat');
    }, 100);
  }

  private rapportQuotidienByPersonnel(item: any, index: number) {
    this.currentPersonnelIdForRapportQuotidien = null;
    this.currentIndex = index;
    // we wait to allow children component to be destroyed before re-recreating it again with new information
    setTimeout(() => {
      this.currentPersonnelIdForRapportQuotidien = item.personnel.id;
    }, 100);
  }

  getObjection(item: any, stepLength: string, etat_id = null) {
    this.departement_id = null;
    // we wait to allow children component to be destroyed before re-recreating it again with new information
    setTimeout(() => {
      this.departement_id = item.id;
      this.departement_name = item.name;
      this.stepView = item.process;
      this.stepLength = stepLength;
      this.departement_actuel = item.process;
      this.mission_all_details = this.service.single;
      this.mission_etat_id = etat_id || this.service.single.etat.id;
    }, 100);
  }

  private startProcess(etat_id: number) {
    if (this.service.single.etat.id == 1 && etat_id == 2) {
      let formValue = { etat_id: etat_id, textColor: "#FFF", borderColor: "#36B9CC", backgroundColor: "#36B9CC" };
      this.service.setEtat(this.service.single.id, formValue);

      this.getObjection(this.departements[0], 'step-1', etat_id);
    }
    else if (this.service.single.etat.id == 3 && etat_id == 1) {
      let formValue = { etat_id: etat_id, textColor: "#FFF", borderColor: "#f6c23e", backgroundColor: "#f6c23e" };
      this.service.setEtat(this.service.single.id, formValue);
      this.getObjection(this.departements[0], 'step-1', etat_id);
    }


    this.switchTabs('validation');
  }


  private itineraireColSize(): string {
    let length = 0;
    this.service.single.itineraires ? length = this.service.single.itineraires.length : length = 0;
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









