import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plugin-mission',
  templateUrl: './plugin-mission.component.html',
  styleUrls: ['./plugin-mission.component.sass']
})
export class PluginMissionComponent implements OnInit {
  mission: { name: string; budget: string; date: string; personne: number; }[];

  constructor() { }

  ngOnInit() {
    this.mission = [
      {name: 'Changement des turbines', budget: '13.000.000', date: 'Du 25 au 30 janvier à Thies', personne: 7},
      {name: 'Collecte des données ', budget: '5.230.000', date: 'Du 25 au 30 janvier à Kaye', personne: 10},

    ];
  }

}
