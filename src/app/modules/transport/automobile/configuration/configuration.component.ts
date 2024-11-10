import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppTitleService } from 'src/app/shared/services';

@Component({
  selector: 'app-configuration-transport',
  templateUrl: 'configuration.component.html',
})

export class ConfigurationTransportComponent implements OnInit {
    fragment: string;

    constructor(
        public route: ActivatedRoute,
        protected titleservice: AppTitleService
    ) { 
    this.titleservice.setTitle('Configuration Transport');
    }
    
    ngOnInit(): void {
        const detailsView = 'type,carburant,couleur,genre,marque,modele,serie,lieu';
        this.route.fragment.subscribe(fragment => {
        this.fragment = fragment;
        if(!detailsView.includes(fragment)) {
            this.fragment = 'type';
        }
        })
    }
}