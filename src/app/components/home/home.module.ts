import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { HomeComponent } from './home.component';
// COMPONENT

const appRoute: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoute)
  ]
})

export class HomeModule { }
