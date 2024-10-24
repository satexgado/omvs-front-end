import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AppService extends ConfigService {

  //informations sur l'application
  public APP_CONFIG = {
    name: 'MUNTU',
    version: '1.0'
  };

  public pays;
  public ville;
  currentItem;
  public quartier;
  public typeHopital;
  public domaineHopital;
  public categorieHopital;
  public profession;
  public services;
  public serviceAutonome;


  //stok la ville actuelle pour faciliter les recherches
  currentVille: {} = { IDville: 0, ville: 'Ville' };
  private pagination;
  paginationSubject = new Subject();


  constructor() {
    super();

    if (!this.pays) {
      this.initPays();
    }

    if (!this.typeHopital) {
      this.initTypeHopital();
    }

    if (!this.domaineHopital) {
      this.initDomaineHopital();
    }

    if (!this.categorieHopital) {
      this.initCategorieHopital();
    }

    if (!this.services) {
      this.initServices();
    }

    if (!this.serviceAutonome) {
      this.initServiceAutonome();
    }


  }

  setCurrentVille(item: {}) {
    this.currentVille = item;
  }

  /*******************
  **COMMON SERVER DATA
  ********************/
  initPays(cascade = true) {
    this.get('pays').subscribe(
      (data) => {
        if (data[0] && cascade) {
          this.initVille(data[0].id_pays);
        }
        this.pays = data;
      },
      (error) => {
        this.create_notification("error", error);
      }
    );
  }

  initVille(id_pays, cascade = true) {
    if (id_pays) {
      this.get('ville/' + id_pays).subscribe(
        (data) => {
          if (data[0] && cascade) {
            this.initQuartier(data[0].id_ville);
          }
          this.ville = data;
        },
        (error) => {
          this.create_notification("error", error);
        }
      );
    }
  }

  initQuartier(id_ville) {
    if (id_ville) {
      this.get('quartier/ville/' + id_ville).subscribe(
        (data) => {
          this.currentItem = id_ville;
          this.quartier = data;
        },
        (error) => {
          this.create_notification("error", error);
        }
      );
    }
  }


  initTypeHopital() {
    this.get('type-hopital').subscribe(
      (data) => {
        this.typeHopital = data;
      },
      (error) => {
        this.create_notification("error", error);
      }
    );
  }

  initDomaineHopital() {
    this.get('domaine-hopital').subscribe(
      (data) => {

        this.domaineHopital = data;
      },
      (error) => {
        this.create_notification("error", error);
      }
    );
  }

  initCategorieHopital() {
    this.get('categorie-hopital').subscribe(
      (data) => {

        this.categorieHopital = data;
      },
      (error) => {
        this.create_notification("error", error);
      }
    );
  }


  initServices() {
    this.get('service-medical').subscribe(
      (data) => {
        this.services = data;
      },
      (error) => {
        this.create_notification("error", error);
      }
    );
  }

  initServiceAutonome() {
    this.get('service-autonome').subscribe(
      (data) => {
        this.serviceAutonome = data;
      },
      (error) => {
        this.create_notification("error", error);
      }
    );
  }

  //manage and return pagination items
  paginate(from, totalPage) {

    let pagination = { before: false, pages: [], after: false };
    let i = 1;
    let currentPage = from;

    //on vérifie s'il ya plus d'une page
    if (totalPage > 1) {

      //on conserve l'historique des deux precedentes pages si possible
      if (from >= 3) {
        from -= 2;
      }
      // à 2 pages vers la fin on remet le système initial de 5 pages à afficher
      if (from >= (totalPage - 2)) {
        //put code here
      }

      //au delà de 5 pages, le système doit fonctionner de la ma nière suivante
      //On affichera les deux precedentes pages en fonction de l'inice actuel (from) 
      //ensuite les deux suivantes toujours en fonction de l'indice actuel (from)
      if ((totalPage > 5) && (currentPage <= totalPage) && (currentPage >= 3)) {

        while (from <= totalPage) {

          pagination.pages.push(from);
          if (i == 5) {
            break;
          }
          from++;
          i++;
        }
      }
      else {
        while (from <= totalPage) {
          pagination.pages.push(i);
          if (i == 5) {
            break;
          }
          from++;
          i++;
        }
      }
    }

    // permet d'indiquer à l'utilisateur l'existence d'autres pages en arrière 
    // en fonction de celle qu'elle est actuellement en train de visiter (from)
    if (currentPage > 3) {
      pagination.before = true;
    }
    // permet d'indiquer à l'utilisateur l'existence d'autres pages devant 
    // en fonction de celle qu'elle est actuellement en train de visiter (from)
    if (from < totalPage) {
      pagination.after = true;
    }

    this.pagination = pagination;
  }

  getPaginationSubject() {
    return this.paginationSubject.next(this.pagination);
  }

  getPagination() {
    return this.pagination;
  }

  setPagination(from, last_page, url) {
    this.paginate(from, last_page);
    this.pagination.url = url;
    this.pagination.from = from;
    this.pagination.last_page = last_page;
    this.getPaginationSubject();
  }



}
