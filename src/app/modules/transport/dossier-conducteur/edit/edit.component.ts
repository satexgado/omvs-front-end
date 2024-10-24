import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { PermiTypeFactory } from 'src/app/core/services/transport/permi-type';
import { Component, Input, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter  } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SelectIconItem } from 'src/app/shared/components/custom-input/custom-select-icon/custom-select-icon.component';
import { PaysFactory } from 'src/app/core/services/pays';
import { DossierConducteurFactory } from 'src/app/core/services/transport/dossier-conducteur';
import { IDossierConducteur, DossierConducteur } from 'src/app/core/models/transport/dossier-conducteur';
import { QueryOptions } from 'src/app/shared/models/query-options';
import { UserService } from 'src/app/services/account/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class EditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  heading = 'dossier-conducteur';
  @Input() item: IDossierConducteur = new DossierConducteur();
  allTypePermis$ = new PermiTypeFactory().list().pipe(
    map( (data: any) => {
        return data.data
    }
  ));
  allInscriptions$ = this.userService.allData;

  allPays$ = new PaysFactory().list().pipe(
    map( (data: any) => {
        return data.data
    }
  ));
  typePermisPreselectedData  = null;
  subscription: Subscription = new Subscription();
  fumer_alcool_select: SelectIconItem[] = [
    {libelle: 'Non', iconClass: null},
    {libelle: 'Oui', iconClass: null},
    {libelle: 'j\'ai arreté', iconClass: null},
    {libelle: 'J\'en prend modérément', iconClass: null},
    {libelle: 'J\'en prends rarement', iconClass: null},
  ];

  oui_non_select: SelectIconItem[] = [
    {libelle: 'Oui', iconClass: null},
    {libelle: 'Non', iconClass: null},
  ];

  oreille_select: SelectIconItem[] = [
    {libelle: 'Une', iconClass: null},
    {libelle: 'Deux', iconClass: null},
  ];

  consultation_select: SelectIconItem[] = [
    {libelle: '3 mois', iconClass: null},
    {libelle: '6 mois', iconClass: null},
    {libelle: '1 an', iconClass: null},
    {libelle: '2 ans', iconClass: null},
    {libelle: 'plus', iconClass: null},
  ];
  proprietaire;

  constructor(
    protected cdRef: ChangeDetectorRef,
    private userService: UserService,
    activeModal: NgbActiveModal) {
    super(new DossierConducteurFactory(), cdRef, activeModal);
  }

  ngOnInit() {
    this.userService.getAll();
    super.ngOnInit();
    this.onControlValueChange();
  }


  createFormGroup(item: IDossierConducteur) {
    this.proprietaire = item.conducteur_id;
    console.log(item);
    let type_permis = item.type_permis ? item.type_permis.map((element => element.id)) : [];
    this.typePermisPreselectedData = this.allTypePermis$.pipe(
      map((data: any) => {
        data = data.map((element) => {
          const result = {id : element.id ,  text: element.libelle, selected: false};
          if (type_permis.includes(element.id)) {
            result.selected = true;
          }
          return result;
        });
        return data;
      })
    );
    return this.formBuilder.group({
      conducteur_id: [item.conducteur_id, Validators.required],
      type_permis: [null, Validators.required],
      date_obtention: [item.date_obtention, Validators.required],
      lieu_obtention_permis_id: [item.lieu_obtention_permis_id, Validators.required],
      numero_permis: [item.numero_permis, Validators.required],
      etes_vous_fumeur: [item.etes_vous_fumeur, Validators.required],
      depuis_quand_avez_vous_arrete_fumer: [item.depuis_quand_avez_vous_arrete_fumer, Validators.required],
      prenez_vous_lalcool: [item.prenez_vous_lalcool, Validators.required],
      depuis_quand_avez_vous_arrete_alcool: [item.depuis_quand_avez_vous_arrete_alcool, Validators.required],
      avez_vous_difficulter_entendre: [item.avez_vous_difficulter_entendre, Validators.required],
      quel_difficulte: [item.quel_difficulte, Validators.required],
      combien_doreille: [item.combien_doreille, Validators.required],
      laquel: [item.laquel, Validators.required],
      avez_vous_des_difficultes_voir: [item.avez_vous_des_difficultes_voir, Validators.required],
      utilisez_vous_des_correcteurs: [item.utilisez_vous_des_correcteurs, Validators.required],
      avez_vous_consulte_un_specialiste: [item.avez_vous_consulte_un_specialiste, Validators.required],
      a_quand_remonte_votre_consultation: [item.a_quand_remonte_votre_consultation, Validators.required],
      depuis_combien_de_temps_conduisez_vous_annee: [item.depuis_combien_de_temps_conduisez_vous_annee, Validators.required],
      avez_vous_exercez_autre_part: [item.avez_vous_exercez_autre_part, Validators.required],
      reference: [item.reference, Validators.required],
      id: [item.id]
    });
  }

  onControlValueChange() {
    // fumeur
    const control_arreter_fumer = this.editForm.get('depuis_quand_avez_vous_arrete_fumer');
    const sub1 = this.editForm.get('etes_vous_fumeur').valueChanges
      .subscribe(type => {

        if (type === 'j\'ai arreté') {
          control_arreter_fumer.setValidators([Validators.required]);
        } else {
          control_arreter_fumer.setValue(null);
          control_arreter_fumer.setValidators(null);
        }
        control_arreter_fumer.updateValueAndValidity();
      });

      // alcool
    const control_arreter_alcool = this.editForm.get('depuis_quand_avez_vous_arrete_alcool');
    const sub2 = this.editForm.get('prenez_vous_lalcool').valueChanges
      .subscribe(type => {

        if (type === 'j\'ai arreté') {
          control_arreter_alcool.setValidators([Validators.required]);
        } else {
          control_arreter_alcool.setValue(null);
          control_arreter_alcool.setValidators(null);
        }
        control_arreter_alcool.updateValueAndValidity();
      });

      // audition
    const control_difficulte = this.editForm.get('quel_difficulte');
    const control_oreille = this.editForm.get('combien_doreille');

    const sub3 = this.editForm.get('avez_vous_difficulter_entendre').valueChanges
      .subscribe(type => {
        if (type === 'Oui') {
          control_difficulte.setValidators([Validators.required]);
          control_oreille.setValidators([Validators.required]);

        } else {
          control_difficulte.setValue(null);
          control_difficulte.setValidators(null);

          control_oreille.setValue(null);
          control_oreille.setValidators(null);
        }
        control_difficulte.updateValueAndValidity();
        control_oreille.updateValueAndValidity();

      });

      // vue
    const control_correcteur = this.editForm.get('utilisez_vous_des_correcteurs');
    const control_specialiste = this.editForm.get('avez_vous_consulte_un_specialiste');
    const control_laquel = this.editForm.get('laquel');

    const sub4 = this.editForm.get('avez_vous_des_difficultes_voir').valueChanges
      .subscribe(type => {
        if (type === 'Oui') {
          control_correcteur.setValidators([Validators.required]);
          control_specialiste.setValidators([Validators.required]);
          control_laquel.setValidators([Validators.required]);

        } else {
          control_correcteur.setValue(null);
          control_correcteur.setValidators(null);

          control_specialiste.setValue(null);
          control_specialiste.setValidators(null);

          control_laquel.setValue(null);
          control_laquel.setValidators(null);
        }
        control_correcteur.updateValueAndValidity();
        control_specialiste.updateValueAndValidity();
        control_laquel.updateValueAndValidity();

      });

      // consultation
    const control_consultation = this.editForm.get('a_quand_remonte_votre_consultation');
    const sub5 = this.editForm.get('avez_vous_consulte_un_specialiste').valueChanges
      .subscribe(type => {

        if (type === 'Oui') {
          control_consultation.setValidators([Validators.required]);
        } else {
          control_consultation.setValue(null);
          control_consultation.setValidators(null);
        }
        control_consultation.updateValueAndValidity();
      });

      // Autre
    const control_reference = this.editForm.get('reference');
    const sub6 = this.editForm.get('avez_vous_exercez_autre_part').valueChanges
      .subscribe(type => {

        if (type === 'Oui') {
          control_reference.setValidators([Validators.required]);
        } else {
          control_reference.setValue(null);
          control_reference.setValidators(null);
        }
        control_reference.updateValueAndValidity();
      });

    this.subscription.add(sub1);
    this.subscription.add(sub2);
    this.subscription.add(sub3);
    this.subscription.add(sub4);
    this.subscription.add(sub5);
    this.subscription.add(sub6);
    this.cdRef.detectChanges();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
