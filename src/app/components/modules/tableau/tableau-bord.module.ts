import { TableauBordComponent } from './tableau-bord.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableauBordRoutingModule } from './tableau-bord-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomSelectIconComponent } from './dashboard/custom-select-icon/custom-select-icon.component';
import { BarComponent } from './dashboard/chart/bar/bar.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { ChoosingComponent } from './dashboard/chart/choosing/choosing.component';
import { ChartConfigurationComponent } from './dashboard/chart/chart-configuration/chart-configuration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MissionComponent } from './mission/mission.component';
import { SharedModule } from 'src/app/shared-module/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    CustomSelectIconComponent,
    BarComponent,
    ChartComponent,
    ChoosingComponent,
    ChartConfigurationComponent,
    TableauBordComponent,
    MissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    TableauBordRoutingModule,
    SharedModule
  ],
  exports: [
  ]
})
export class TableauBordModule {
}
