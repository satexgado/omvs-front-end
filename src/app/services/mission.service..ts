import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { VilleService } from './ville.service';
import { DepartementService } from './departement.service';
import { TypeMissionService } from './type-mission.service';
import { AccountService } from './account/account.service';
import { ImputationService } from './imputation.service';

@Injectable({
  providedIn: 'root'
})

export class MissionService extends BaseService {

  niveaux = [];
  statuts = [];
  imputations = [];

  constructor(public typeService: TypeMissionService, public localiteService: VilleService, public departementService: DepartementService, public imputationService: ImputationService) {
    super('mission');
    this.initExtraData();
  }

  initExtraData() {
    this.typeService.getAll();
    this.localiteService.getAll();
    this.departementService.getAll();
    this.imputationService.getAll();

    if (!this.niveaux.length) {
      this.get('etat/get-all/niveau').subscribe(
        (res: any) => {
          if (res.data) {
            this.niveaux = res.data
          }
        }
      );

      this.get('etat/get-all/mission').subscribe(
        (res: any) => {
          if (res.data) {
            this.statuts = res.data
          }
        }
      );
    }

  }

  borderByStatut(etat: any): string {
    let result = '';
    if (etat) {
      switch (etat.id) {
        case 1: // enAttente
          result = ' border-left-warning'
          break;
        case 2: // TRAITEMENT
          result = ' border-left-info'
          break;
        case 3: // REJETE
          result = ' border-left-danger'
          break;
        case 4: // ANNULE
          result = ' border-left-danger'
          break;
        case 5: // ACCEPTE
          result = ' border-left-success'
          break;
        case 9: // En cours
          result = ' border-left-primary'
          break;
        case 10: // SUSPENDU
          result = ' border-left-orange'
          break;

        default:
          result = ' border-left-secondary';
          break;
      }
    }
    return result;
  }

  colorByStatut(etat: any): string {
    let result = '';
    if (etat) {
      switch (etat.id) {
        case 1: // enAttente
          result = ' text-warning'
          break;
        case 2: // TRAITEMENT
          result = ' text-info'
          break;
        case 3: // REJETE
          result = ' text-danger'
          break;
        case 4: // ANNULE
          result = ' text-danger'
          break;
        case 5: // ACCEPTE
          result = ' text-success'
          break;
        case 9: // En cours
          result = ' text-primary'
          break;
        case 10: // SUSPENDU
          result = ' text-orange'
          break;

        default:
          result = ' text-secondary';
          break;
      }
    }
    return result;
  }

  // not used

  moneyFormat_2(x: any) {
    if (x == null) {
      return 0;
    }
    else {
      let parts = x.toString().split(" ");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(" ");
    }
  }

  randomData(start: number, limit: number): any[] {
    let i = 0;
    let result = [];
    while (i <= limit) {
      result[i] = start + 10;
      start += 10;
      i++;
    }
    return result;
  }

  getRandomColor(limit: number) {
    let i = 0;
    let result = [];
    while (i <= limit) {
      let color = Math.floor(0x1000000 * Math.random()).toString(16);
      let value = '#' + ('000000' + color).slice(-6);
      result[i] = value;
      i++;
    }
    return result;

  }

  setEtat(mission_id: number, formValue: any) {

    this.requestings.etat = true;
    this.put(this.getServerUrl() + '/' + mission_id, formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.single.etat = res.data.etat;
        }
        else {
          this.notify('error', 'ERROR');
        }

        this.requestings.etat = false;
      },
      (error) => {
        this.notify('error', "serverError");
        this.requestings.etat = false;
      }
    );
  }


  set_current_departement_traitement(current_departement_traitement: number, mission_id: number) {
    let formValue = { current_departement_traitement: current_departement_traitement };
    this.requestings.processDepartement = true;
    this.put(this.getServerUrl() + '/' + mission_id, formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.single.current_departement_traitement = res.data.current_departement_traitement;
          this.notify("success", 'SUCCESS');
        }
        else {
          this.notify('error', 'ERROR');
        }
        this.requestings.processDepartement = false;
      },
      (error) => {
        this.notify('error', "serverError");
        this.requestings.processDepartement = false;
      }
    );
  }


}
