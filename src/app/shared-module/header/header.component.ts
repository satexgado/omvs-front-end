import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  profile: any = null;
  constructor(public accountService: AccountService) { }

  ngOnInit() {
    this.profile =  this.accountService.profile.value;
  }

}
