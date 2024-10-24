import { Component, OnInit } from '@angular/core';
import { AffectateurService } from 'src/app/services/shared/affectateur.service';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-affectateur',
  templateUrl: './affectateur.component.html',
  styleUrls: ['./affectateur.component.css']
})
export class AffectateurComponent implements OnInit {

  private params: {
    directUrl: string,
    searchUrl: string,
    renamePattern: any,
    multiSelection: boolean
  };
  private SOURCE: any; // the data source
  private selectedItems: any[];
  private requesting = false; 
  private currentPage: number;
  private search = new BehaviorSubject('');
  private keyword: string;
  private lastKeyword: string;
  constructor(public service: AffectateurService) { }

  ngOnInit() {
    // listening to source data
    // and will update if needed
    this.service.dataSubject.subscribe(
      (res: any) => {
        if (res.success || res.data) {
          this.SOURCE = res;
          // fire if some references in array have to be renamed
          // default are: id for a primary key, and name for libelle
          if (this.service.params.renamePattern && res.data.data.length) {
            this.SOURCE.data.data = this.service.rename_reference(this.SOURCE.data.data, this.service.params.renamePattern);
          }
          this.requesting = false;
        }
      }
    );

    // listening to selected or affected items
    this.service.affectedItemsSubject.subscribe(
      (affectedItems: any) => {
        this.selectedItems = affectedItems;
      }
    );

    // fire when user triggers search
    this.search
      .pipe(debounceTime(500))
      .subscribe(
        (keyword: string) => {
          if (this.service.params) {
            this.service.currentPage = 1;
            this.keyword = keyword;
            this.searchData();
          }
        }
      );

    // fire when others components call this plugin
    // and init the plugin to be used
    this.service.affectateurSubject.subscribe(
      (params: any) => {
        this.params = params;
        if (this.params) {
          this.currentPage = this.service.currentPage;
          this.service.setServerUrl(params.directUrl);
          this.service.init(this.params.directUrl, true);
        }
      }
    );
  }

  // add item to selected items
  affect(index: number) {
    if (!this.params.multiSelection && this.selectedItems) {
      this.desaffect(0);
    }
    this.service.setSelectedItems(this.SOURCE.data.data.splice(index, 1)[0]);
  }

  // remove item from selected items
  desaffect(index: number) {
    let item = this.service.removeSelectedItems(index);
    if(item){
      this.SOURCE.data.data.push(item);
    }
  }

  // fire when user hits on pagination button
  // it determines what direction to go (forward or Go back)
  pagination(goForward = true) {
    // setting right page
    if (goForward) {
      this.currentPage++
    }
    else {
      this.currentPage--;
    }
    //update service
    this.service.currentPage = this.currentPage;

    // only send request to server if all params are correct
    // if the keyword contains at least one word, we fire search
    // if it's empty, we reset data 
    // because user can reset the keyword by deleting his content
    // in that case we have to reset data from the first page
    if (this.keyword && this.keyword.length) {
      this.searchData();
    }
    else {
      this.getData();
    }
  }

  private getData() {
    this.requesting = true;
    this.service.init(this.params.directUrl + this.service.getPaginationUrl(this.currentPage), true);
  }

  private searchData() {
    if (!(/^ *$/.test(this.keyword)) && this.keyword.length) {
      this.requesting = true;
      this.service.init(this.params.searchUrl + '/' + this.keyword + this.service.getPaginationUrl(this.currentPage), true);
    }
    else if (this.keyword == '' && this.keyword != this.lastKeyword) {
      this.service.currentPage = 1;
      this.getData();
    }
    // prevent multi init when user reset search input to retrieve default data 
    // VERY IMPORTANT DO NOT REMOVE
    this.lastKeyword = this.keyword;
  }





}
