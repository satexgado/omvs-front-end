import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Event, NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carburant',
  templateUrl: './carburant.component.html'
})
export class CarburantComponent implements OnInit, OnDestroy{
  icon:string;
  title:string;
  subscription: Subscription = new Subscription();
  
  constructor( public route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.subscription.add(
      this.router.events.subscribe((event: Event) => {
        switch (true) {
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.onLoadChild();
            break;
          }
          default: {
            break;
          }
        }
      })
      )


    this.onLoadChild();
  }

  onLoadChild() {
    if(this.route.firstChild) {
       return this.route.firstChild.data.subscribe(
        (data)=> {
          this.icon = data.icon ? data.icon : 'fa-address-card';
          this.title = data.title ? data.title : 'Annuaire';
        }
       )
    }
  }

  ngOnDestroy()
  {
      this.subscription.unsubscribe();
  }
}
