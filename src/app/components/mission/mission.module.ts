import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { Routes, RouterModule} from '@angular/router';
// DOWNLOADED
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!

//PLUSGIN
import { PluginModule } from 'src/app/plugin/plugin.module';
import { MissionPluginModule } from './mission-plugin.module';
import { MapsPluginModule } from '../maps/maps-plugin.module';
//COMPONENTS
import { MissionIndexComponent } from './mission-index/mission-index.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { SuiviComponent } from './suivi/suivi.component';
import { TypeMissionComponent } from './type-mission/type-mission.component';
import { DetailsMissionComponent } from './details-mission/details-mission.component';
import { ArchiveComponent } from './archive/archive.component';
import { RhPluginModule } from '../rh/rh-plugin.module';

const appRoute: Routes = [
  { path: '', component: MissionIndexComponent },
  { path: 'list', component: MissionIndexComponent },
  { path: 'list/page/:page', component: MissionIndexComponent },
  { path: 'type', component: TypeMissionComponent },
  { path: 'type/page/:page', component: TypeMissionComponent },
  { path: 'details/:id/tab/:tab', component: DetailsMissionComponent },
  { path: 'calendrier', component: CalendrierComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'archive/page/:page', component: ArchiveComponent },
];

@NgModule({
  declarations: [MissionIndexComponent, CalendrierComponent, EvaluationComponent, SuiviComponent, TypeMissionComponent, DetailsMissionComponent, ArchiveComponent],
  imports: [
    SharedModule,
    PluginModule,
    MissionPluginModule,
    MapsPluginModule,
    RhPluginModule,
    FullCalendarModule,
    RouterModule.forChild(appRoute)
  ]
})

export class MissionModule { }

