import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { UserComponent } from './user/user.component';

const appRoute: Routes = [
  { path: '', component: UserComponent },
  { path: 'page/:page', component: UserComponent }
];

@NgModule({
  declarations: [UserComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoute)
  ]
})
export class UserModule { }
