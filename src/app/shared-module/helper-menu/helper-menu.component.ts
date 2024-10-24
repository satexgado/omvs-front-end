import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-helper-menu',
  templateUrl: './helper-menu.component.html',
  styleUrls: ['./helper-menu.component.sass']
})
export class HelperMenuComponent implements OnInit {

  profile: any = null;
  constructor(public accountService: AccountService) { }

  ngOnInit() {
    this.accountService.profile.subscribe(data=>this.profile=data);
  }

}
