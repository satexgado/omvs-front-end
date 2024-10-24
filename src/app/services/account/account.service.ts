import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { BaseService } from '../base.service';

@Injectable({
    providedIn: 'root'
})

export class AccountService extends BaseService {

    public auth = new BehaviorSubject<any>(false);
    public readonly profile = new BehaviorSubject<any>(
        {
            user_id: 1,
            user_type_id: 2,
            personnel:{
                id: 1,
                nom: 'Opportun',
                prenom: 'Karhyt',
                departement_id: 12,
                poste_id: 6,
                
            },
        }
    );

    //say if we alreday printed a welcom message to a user
    public welcomedUser = false;

    constructor() {
        super('');

        this.checkSession();

    }


    get isAuth(): boolean {
        return this.auth.value;
    }

    set isAuth(state: boolean) {
        this.auth.next(state);
    }

    login(accoutInfo: any) {
        localStorage.setItem('account', JSON.stringify(accoutInfo));
        this.checkSession();
    }

    checkSession() {
        if (!this.auth.value && localStorage.getItem('account')) {
            this.profile.next(JSON.parse(localStorage.getItem('account')));
            this.auth.next(true);
        }

    }

    logout() {
        this.auth.next(false);
        this.goTo('/account/login');
    }

    logout_in_server() {
        this.get('logout').subscribe(
            (res: any) => {
                if (res.success) {
                    localStorage.removeItem('token');
                }
            },
            (error) => {
                this.notify('error', "serverError");
            }
        )
    }

}