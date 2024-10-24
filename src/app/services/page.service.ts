import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PageService extends ConfigService {

  private pagination;
  paginationSubject = new Subject();

  constructor() {
    super();
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
