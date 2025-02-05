import { TransSerieFactory } from 'src/app/core/services/transport/serie';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { AutomobileTypeFactory } from 'src/app/core/services/transport/automobile-type';
import { CarburantTypeFactory } from 'src/app/core/services/transport/carburant-type';
import { IAutomobile, Automobile } from 'src/app/core/models/transport/automobile';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter  } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { shareReplay, map, take, retryWhen, delay } from 'rxjs/operators';
import { CacheService } from 'src/app/shared/services';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { QueryAllOptionWithIns, QueryOptions } from 'src/app/shared/models/query-options/query-options.model';
import { EditComponent as SerieEditComponent} from '../../serie/edit/edit.component';
import { EditComponent as MarqueEditComponent} from '../../marque/edit/edit.component';
import { EditComponent as ModeleEditComponent} from '../../modele/edit/edit.component';
import { EditComponent as GenreEditComponent} from '../../genre/edit/edit.component';
import { EditComponent as CarburantEditComponent} from '../../carburant/edit/edit.component';
import { EditComponent as AutomobileTypeEditComponent} from '../../automobile-type/edit/edit.component';
import { EditComponent as CoordonneeEditComponent} from 'src/app/modules/fournisseur/coordonnee/edit/edit.component';
import { EditComponent as DossierConducteurEditComponent} from 'src/app/modules/transport/dossier-conducteur/edit/edit.component';

import { MarqueFactory } from 'src/app/core/services/transport/marque';
import { ModeleFactory } from 'src/app/core/services/transport/modele';
import { GenreFactory } from 'src/app/core/services/transport/genre';
import { of, Subscription } from 'rxjs';
import { requiredFileType } from 'src/app/shared/upload-file.validator';
import { CrCoordonneeFactory } from 'src/app/core/services/cr-coordonnee';
import { DashboardService } from 'src/app/components/modules/tableau/dashboard/dashboard.service';
import { Sort } from 'src/app/shared/models/query-options';
import { DossierConducteurFactory } from 'src/app/core/services/transport/dossier-conducteur';
import { EmplacementService } from 'src/app/services/emplacement.service';
import { AddEmplacementComponent } from 'src/app/components/maps/add-emplacement/add-emplacement.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [`
    header {
        padding: 8px 0 2px;
        background: #e9e9e9;
        border-bottom: 1px solid #cfcfcf;
        -webkit-box-shadow: 0 1px 0 #fff;
        -moz-box-shadow: 0 1px 0 #fff;
        -ms-box-shadow: 0 1px 0 #fff;
        box-shadow: 0 1px 0 #fff;
    }  
  `],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class EditComponent extends BaseEditComponent  {
  subscription: Subscription = new Subscription();
  heading = 'bus';
  @Input() item: IAutomobile = new Automobile();
  @Input() affectataireOnly = false;
  allTypeCarburants$ = new CarburantTypeFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  allInscriptions$ = this.dashService.allPersonnels(
      new QueryOptions().setSort([new Sort('nom', 'asc')]).setIncludes(['departement','poste'])
  );
  readonly carburantEditComponent  = CarburantEditComponent;
  allTypeAutomobiles$ = new AutomobileTypeFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly automobileTypeEditComponent  = AutomobileTypeEditComponent;

  allSerie$ = new TransSerieFactory().list(
    
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly serieEditComponent  = SerieEditComponent;

  allMarque$ = new MarqueFactory().list(
    
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly marqueEditComponent  = MarqueEditComponent;

  allModele$ = new ModeleFactory().list(
    
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly modeleEditComponent  = ModeleEditComponent;

  allGenre$ = new GenreFactory().list(
    
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly genreEditComponent  = GenreEditComponent;

  allCoordonnee$ = new CrCoordonneeFactory().list(
    
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly coordonneeEditComponent  = CoordonneeEditComponent;

  allDossierConducteurs$ = new DossierConducteurFactory().list(
    new QueryOptions().setIncludes(
    ['type_permis','cpt_conducteur','visi_pays'])
  ).pipe(
    shareReplay(1),
    map(data => data.data)
  );
  readonly dossierConducteurEditComponent  = DossierConducteurEditComponent;
  readonly addEmplacementComponent = AddEmplacementComponent;

  transmission_select = of([
    {libelle:'Automatique', id:'Automatique'},
    {libelle:'Manuelle', id:'Manuelle'},
  ]);
  acquisition_select= of([
    {libelle:'Achat',id:'Achat'},
    {libelle:'Donation',id:'Donation'},
    {libelle:'Location',id:'Location'},
  ]);
  etat_select= of([
    {libelle:'Neuf',id:'Neuf'},
    {libelle:'Occasion',id:'Occasion'},
  ]);
  constructor(
    cdRef:ChangeDetectorRef,
    protected cacheService: CacheService,
    private dashService: DashboardService, 
    protected emplacementService: EmplacementService, 
    activeModal: NgbActiveModal)
  {
    super(new AutomobileFactory(), cdRef, activeModal);
    emplacementService.getAll();
  }

  ngOnInit() {
    super.ngOnInit();
    this.onImageChange();
  }

  onImageChange() {
    const control = this.editForm.get('image');
    let sub = this.editForm.get('image').valueChanges
      .subscribe(type => {
        control.markAsDirty();
      });
      this.subscription.add(sub);
  }

  createFormGroup(item: IAutomobile) {
    let affectataires =   this.formBuilder.array([]);

    if(item.affectataires && item.affectataires.length) {
      item.affectataires.forEach(
        (field)=> {
          affectataires.push(this.formBuilder.group({
            'personnel_id': [field.personnel_id, Validators.required],
            'libelle': [field.libelle],
            id: [field.id]
          }))
        }
      )
    }



    return this.formBuilder.group({
      'removedAffectataire': [],
      'affectataire': affectataires,
      'type_acquisition': [item.type_acquisition, Validators.required],
      'immatriculation': [item.immatriculation, Validators.required],
      'numero_chassis': [item.numero_chassis, Validators.required],
      'etat_achat': [item.etat_achat, Validators.required],
      'date_achat': [item.date_achat, Validators.required],
      'montant': [item.montant, Validators.required],
      'nombre_place': [item.nombre_place, Validators.required],
      'nombre_porte': [item.nombre_porte, Validators.required],
      'kilometrage_durant_achat': [item.kilometrage_durant_achat, Validators.required],
      'type_transmission': [item.type_transmission, Validators.required],
      'emission_co2': [item.emission_co2, Validators.required],
      'nombre_chevaux': [item.nombre_chevaux, Validators.required],
      'serie_id': [item.serie_id, Validators.required],
      'marque_id': [item.marque_id, Validators.required],
      'modele_id': [item.modele_id, Validators.required],
      'genre_id': [item.genre_id, Validators.required],
      'type_carburant_id': [item.type_carburant_id, Validators.required],
      'type_automobile_id': [item.type_automobile_id, Validators.required],
      'emplacement_id': [item.emplacement_id],
      'conducteur_id': [item.conducteur_id],
      'coordonnee_id': [item.coordonnee_id, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'image':[item.image, [requiredFileType(['png','gif','jpeg', 'jpg'])]],
      'id': [item.id]
    });
  }

  addAffectataire() {
      const control = this.editForm.get('affectataire') as FormArray;
      control.push(this.formBuilder.group({
        'personnel_id': ['', Validators.required],
        'libelle': [''],
        id: [0]
      }));
    }
  
    removeAffectataire(child_index) {
      const control = this.editForm.get('affectataire') as FormArray;
      control.markAsDirty();
      if(control.at(child_index).get('id').value) {
        const removeControl = this.editForm.get('removedAffectataire') as FormControl;
        let data = removeControl.value ? removeControl.value : [];
        data.push(control.at(child_index).get('id').value);
        removeControl.setValue(data);
      }
      control.removeAt(child_index);
   }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
