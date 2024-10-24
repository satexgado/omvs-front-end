import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logistique-template',
  templateUrl: './template.component.html'
})
export class LogistiqueTemplateComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(

  ) {
  }

}
