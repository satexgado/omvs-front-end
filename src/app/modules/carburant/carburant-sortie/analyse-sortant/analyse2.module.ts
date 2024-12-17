import { CustomSelectIconComponent } from './dashboard/chart/custom-select-icon/custom-select-icon.component';
import { ChoosingComponent } from './dashboard/chart/choosing/choosing.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { BarComponent } from './dashboard/chart/bar/bar.component';
import { DashboardBonCarburantSortantComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ChartConfigurationComponent } from './dashboard/chart/chart-configuration/chart-configuration.component';
import { ChooseItemModule } from 'src/app/modules/choose-item';
@NgModule({
    declarations: [
      DashboardBonCarburantSortantComponent,
      BarComponent,
      ChartComponent,
      ChoosingComponent,
      ChartConfigurationComponent,
      CustomSelectIconComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      AngularMultiSelectModule,
      ChooseItemModule
    ],
    exports: [
      DashboardBonCarburantSortantComponent,
    ],
    entryComponents: [],
})
export class AnalyseBonCarburantSortantModule {

}
