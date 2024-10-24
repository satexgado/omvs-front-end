import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { SharedModule } from 'src/app/shared-module/shared.module';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';

const appRoute: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: PasswordComponent },
  { path: 'reset-password/:token', component: PasswordComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  declarations: [LoginComponent, ProfileComponent, PasswordComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoute)
  ]
})
export class AccountModule { }
