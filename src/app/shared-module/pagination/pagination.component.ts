import { Component, OnInit } from '@angular/core';

import {PageService} from '../../services/page.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  pagination;

  constructor(public pageService: PageService) { }

  ngOnInit() {

    this.pageService.paginationSubject.subscribe(
      (pagination)=>{
        this.pagination = pagination;
      }
    );

    this.pageService.getPaginationSubject();
  }

}
