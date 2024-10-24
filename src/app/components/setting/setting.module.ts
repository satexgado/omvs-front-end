import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { Routes, RouterModule } from '@angular/router';


import { ConfigurationComponent } from './configuration/configuration.component';
import { ImputationComponent } from './imputation/imputation.component';
import { NoteComponent } from './note/note.component';
import { RoleComponent } from './role/role.component';

const appRoute: Routes = [
  { path: '', component: ConfigurationComponent },
];

@NgModule({
  declarations: [ConfigurationComponent, ImputationComponent, NoteComponent, RoleComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoute)
  ]
})

export class SettingModule { }


