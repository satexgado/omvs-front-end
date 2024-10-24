import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared.module';

//DOWNLOAED
import { AngularEditorModule } from '@kolkov/angular-editor';

//COMPONENTS
import { AddTypeMissionComponent } from './add-type-mission/add-type-mission.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { RhPluginModule } from '../rh/rh-plugin.module';
import { MapsPluginModule } from '../maps/maps-plugin.module';
import { ChargeComponent } from './charge/charge.component';
import { EquipeComponent } from './equipe/equipe.component';
import { MaterielComponent } from './materiel/materiel.component';
import { NoMissionComponent } from './no-mission/no-mission.component';
import { ItineraireComponent } from './itineraire/itineraire.component';
import { RapportQuotidienComponent } from './rapport-quotidien/rapport-quotidien.component';
import { RapportFinalComponent } from './rapport-final/rapport-final.component';
import { EvaluationSingleComponent } from './evaluation-single/evaluation-single.component';
import { TraitementComponent } from './traitement/traitement.component';
import { OrdreComponent } from './ordre/ordre.component';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [AddTypeMissionComponent, AddMissionComponent, ChargeComponent, EquipeComponent, MaterielComponent, NoMissionComponent, ItineraireComponent, RapportQuotidienComponent, RapportFinalComponent, EvaluationSingleComponent, TraitementComponent, OrdreComponent],
  imports: [
    SharedModule,
    AngularEditorModule,
    RhPluginModule,
    MapsPluginModule,
    NgxPaginationModule
  ],
  exports: [AddTypeMissionComponent, AddMissionComponent, ChargeComponent, EquipeComponent, MaterielComponent, ItineraireComponent, RapportQuotidienComponent, RapportFinalComponent, EvaluationSingleComponent, TraitementComponent, OrdreComponent]
})

export class MissionPluginModule { }