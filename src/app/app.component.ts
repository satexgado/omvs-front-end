import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as serverInfo from './services/server';

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

declare var $: any;
declare var Swiper: any;
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private menu: any[] = [];
  private adminMenu: any[];
  private profile = { userType: 1 };
  loading = false;

  constructor(private translate: TranslateService, public router: Router, public http: HttpClient) {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });



    this.adminMenu = [
      { name: 'HOME', link: '' },
      { name: 'ABOUT', link: '/about' },
      { name: 'CONTACT', link: '/contact' },
      { name: 'PAYS', link: '/pays' },
      { name: 'USERS', link: '/user' },
      { name: 'PHARMACIES', link: '/pharmacie' },
      { name: 'CALENDAR', link: '/calendrier' },
      { name: 'DASHBOARD', link: '/dashboard' },
    ];

  }

  ngOnInit() {
    if (this.profile) {

      if (this.profile.userType == 1) {
        this.menu = this.adminMenu;
      }
      else {

      }
    }
  }

}
