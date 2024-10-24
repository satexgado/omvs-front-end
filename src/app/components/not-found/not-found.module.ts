import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoute: Routes = [
  { path: '', component: NotFoundComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(appRoute)
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
