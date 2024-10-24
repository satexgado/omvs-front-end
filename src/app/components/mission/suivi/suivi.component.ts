import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.sass']
})
export class SuiviComponent implements OnInit {
  mission = [];

  constructor() { }

  ngOnInit() {
    this.mission = [
      { name: 'Changement des turbines', budget: '13.000.000', date: 'Du 25 au 30 janvier', personne: 7, materiel: 5, localisation: 'Mbour-Sénégal', statut: 'En cours' },
      { name: 'Collecte des données ', budget: '5.230.000', date: 'Du 25 au 30 janvier', personne: 10, materiel: 8, localisation: 'Thies-Sénégal', statut: 'En cours' },
      { name: 'Contrôle des installations', budget: '40.000.000', date: 'Du 25 au 30 janvier', personne: 5, materiel: 10, localisation: 'Kaye-Mali', statut: 'A venir' },
      { name: 'Suivi des effectifs', budget: '5.000.000', date: 'Du 25 au 30 janvier', personne: 2, materiel: 3, localisation: 'Tombouctou-Mali', statut: 'A venir' },
      { name: 'Evaluation du materiel', budget: '5.000.000', date: 'Du 25 au 30 janvier', personne: 2, materiel: 3, localisation: 'Tombouctou-Mali', statut: 'Termniné' },
      { name: 'Evaluation du materiel', budget: '5.000.000', date: 'Du 25 au 30 janvier', personne: 2, materiel: 3, localisation: 'Tombouctou-Mali', statut: 'Annulé' },
      { name: 'Changement des turbines', budget: '13.000.000', date: 'Du 25 au 30 janvier', personne: 7, materiel: 5, localisation: 'Mbour-Sénégal', statut: 'En cours' },
      { name: 'Collecte des données ', budget: '5.230.000', date: 'Du 25 au 30 janvier', personne: 10, materiel: 8, localisation: 'Thies-Sénégal', statut: 'En cours' },
      { name: 'Contrôle des installations', budget: '40.000.000', date: 'Du 25 au 30 janvier', personne: 5, materiel: 10, localisation: 'Kaye-Mali', statut: 'A venir' },
      { name: 'Suivi des effectifs', budget: '5.000.000', date: 'Du 25 au 30 janvier', personne: 2, materiel: 3, localisation: 'Tombouctou-Mali', statut: 'A venir' },
      { name: 'Evaluation du materiel', budget: '5.000.000', date: 'Du 25 au 30 janvier', personne: 2, materiel: 3, localisation: 'Tombouctou-Mali', statut: 'Termniné' },
      { name: 'Evaluation du materiel', budget: '5.000.000', date: 'Du 25 au 30 janvier', personne: 2, materiel: 3, localisation: 'Tombouctou-Mali', statut: 'Annulé' },
    ];
  }



  moneyFormat(x: any) {
    if (x == null) {
      return 0;
    }
    else {
      var parts = x.toString().split(" ");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(" ");
    }
  }

  randomData(start: number, limit: number): any[] {
    let i = 0;
    let result = [];
    while (i <= limit) {
      result[i] = start + 10;
      start += 10;
      i++;
    }
    return result;
  }

  getRandomColor(limit: number) {
    let i = 0;
    let result = [];
    while (i <= limit) {
      let color = Math.floor(0x1000000 * Math.random()).toString(16);
      let value = '#' + ('000000' + color).slice(-6);
      result[i] = value;
      i++;
    }
    return result;

  }

}




