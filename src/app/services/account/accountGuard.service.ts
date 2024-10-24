import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountGuard implements CanActivate {

    constructor(private accountService: AccountService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {

        // check if the user is already logged

        if (this.accountService.isAuth) {
            return true;
        }

        this.router.navigate(['/account/login']);

        // return true;

    }


}