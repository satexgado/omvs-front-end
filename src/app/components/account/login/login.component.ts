import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account/account.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  public form: FormGroup;
  public requesting = false;

  constructor(public service: AccountService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {

    $("body").addClass("bgTheme");

    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }


  login() {
    const formValue = this.form.value;
    this.requesting = true;

      if(formValue.email=='admin' && formValue.password == 'demo' ){
        this.service.isAuth = true;
        this.router.navigate(['/']);
      }
      else{
        this.service.create_notification('error', "Oups... il semblerait que le login soit incorrect", true, 5000);
        this.requesting = false;
      }

    // this.service.post('login', formValue).subscribe(
    //   (res: any) => {
    //     if (res.success) {
    //       localStorage.setItem('token', res.data)
    //       this.service.setAuth(true);
    //       this.router.navigate(['/']);
    //     }
    //     else {
    //       res.userNotFound ? this.service.create_notification('error', "Désolé ce compte n'existe pas", true) : null;
    //       res.passwordIncorrect ? this.service.create_notification('error', "Mot de passe incorrect", true) : null;
    //     }
    //     this.requesting = false;
    //   },
    //   (error) => {
    //     this.service.notify('error', "serverError");
    //     this.requesting = false;
    //   }
    // );

  }



}

