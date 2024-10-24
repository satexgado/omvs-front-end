import { Component, OnInit } from '@angular/core';
//PROVIDERS
import {TranslateService} from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private translate: TranslateService){

  }

  ngOnInit() {
    $("body").addClass("bg-gradient-primary");
  }

}
