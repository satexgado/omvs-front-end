import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMateriel } from 'src/app/core/models/materiel';

@Component({
  selector: 'app-logistique-suivie',
  templateUrl: 'suivie.component.html'
})

export class SuivieComponent implements OnInit {
  selectedMaterielId: number;
  fragment: string;
  subscription: Subscription = new Subscription();

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() { 

    const detailsView = 'defectueux,panne';
    this.subscription.add(
      this.route.fragment.subscribe(fragment => {
        this.fragment = fragment;
        if(!detailsView.includes(fragment)) {
          this.fragment = 'panne';
        }
      })
      )
  }

  onSetSelectedMateriel(materiel: IMateriel) {
    this.selectedMaterielId = materiel ? materiel.id : null;
  }

  ngOnDestroy()
  {
      this.subscription.unsubscribe();
  }
}
