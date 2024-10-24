import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMateriel } from 'src/app/core/models/materiel';

@Component({
  selector: 'app-logistique-suivie',
  templateUrl: 'suivie.component.html'
})

export class SuivieComponent implements OnInit {
  selectedMaterielId: number;

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() { }

  onSetSelectedMateriel(materiel: IMateriel) {
    this.selectedMaterielId = materiel ? materiel.id : null;
  }
}
