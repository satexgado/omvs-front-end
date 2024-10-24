import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// SERVICES
import { TranslateModule } from '@ngx-translate/core';
import { PluginMissionComponent } from './plugin-mission/plugin-mission.component';


@NgModule({
  declarations: [PluginMissionComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  exports:[PluginMissionComponent]
})
export class PluginModule { }
