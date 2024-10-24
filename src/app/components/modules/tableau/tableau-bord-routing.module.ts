import { TableauBordComponent } from './tableau-bord.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MissionComponent } from './mission/mission.component';


const routes: Routes = [
  {path: '', 
    component: TableauBordComponent,
    children: [
      {path: '', redirectTo: 'tableau'},
      {path: 'graphique-personnalise', component: DashboardComponent},
      {path: 'tableau', component: MissionComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class TableauBordRoutingModule {}
