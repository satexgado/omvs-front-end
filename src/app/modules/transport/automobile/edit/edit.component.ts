import { TransSerieFactory } from 'src/app/core/services/transport/serie';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { AutomobileTypeFactory } from 'src/app/core/services/transport/automobile-type';
import { CarburantTypeFactory } from 'src/app/core/services/transport/carburant-type';
import { IAutomobile, Automobile } from 'src/app/core/models/transport/automobile';
import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter  } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { SelectIconItem } from 'src/app/shared/components/custom-input/custom-select-icon/custom-select-icon.component';
import { shareReplay, map, take, retryWhen, delay } from 'rxjs/operators';
import { CacheService } from 'src/app/shared/services';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { QueryAllOptionWithIns } from 'src/app/shared/models/query-options/query-options.model';
import { EditComponent as SerieEditComponent} from '../../serie/edit/edit.component';
import { EditComponent as MarqueEditComponent} from '../../marque/edit/edit.component';
import { EditComponent as ModeleEditComponent} from '../../modele/edit/edit.component';
import { EditComponent as GenreEditComponent} from '../../genre/edit/edit.component';
import { EditComponent as CouleurEditComponent} from '../../couleur/edit/edit.component';
import { MarqueFactory } from 'src/app/core/services/transport/marque';
import { ModeleFactory } from 'src/app/core/services/transport/modele';
import { GenreFactory } from 'src/app/core/services/transport/genre';
import { CouleurFactory } from 'src/app/core/services/transport/couleur';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class EditComponent extends BaseEditComponent  {
  heading = 'bus';
  @Input() item: IAutomobile = new Automobile();
  allTypeCarburants$ = new CarburantTypeFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  allTypeAutomobiles$ = new AutomobileTypeFactory().list().pipe(
    shareReplay(1),
    map(data => data.data)
  );
  allSerie$ = new TransSerieFactory().list(
    QueryAllOptionWithIns
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly serieEditComponent  = SerieEditComponent;

  allMarque$ = new MarqueFactory().list(
    QueryAllOptionWithIns
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly marqueEditComponent  = MarqueEditComponent;

  allModele$ = new ModeleFactory().list(
    QueryAllOptionWithIns
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly modeleEditComponent  = ModeleEditComponent;

  allGenre$ = new GenreFactory().list(
    QueryAllOptionWithIns
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly genreEditComponent  = GenreEditComponent;

  allCouleur$ = new CouleurFactory().list(
    QueryAllOptionWithIns
  ).pipe(retryWhen(errors => errors.pipe(delay(5000), take(10))), shareReplay(1), map(data => data.data));
  readonly couleurEditComponent  = CouleurEditComponent;

  transmission_select: SelectIconItem[] = [
    {libelle:'Automatique',iconClass:null},
    {libelle:'Manuelle',iconClass:null},
  ];
  acquisition_select: SelectIconItem[] = [
    {libelle:'Achat',iconClass:null},
    {libelle:'Location',iconClass:null},
  ];
  etat_select: SelectIconItem[] = [
    {libelle:'Neuf',iconClass:null},
    {libelle:'Occasion',iconClass:null},
  ];
  constructor(
    cdRef:ChangeDetectorRef,
    protected cacheService: CacheService,
    activeModal: NgbActiveModal)
  {
    super(new AutomobileFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IAutomobile) {

    return this.formBuilder.group({
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
      'couleur_id': [item.couleur_id, Validators.required],
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
