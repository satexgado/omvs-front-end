import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder,  Validators, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AutomobileService } from 'src/app/services/automobile.service';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { Filter, QueryOptions } from 'src/app/shared/models/query-options';

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.sass']
})
export class AutomobileComponent extends BaseComponent implements OnInit {

  @Input() mission_id: number;
  config: any;
  items: [] = [];
  searchSubject = new BehaviorSubject('');

  constructor(private service: AutomobileService, private formBuilder: FormBuilder,
    private routeObserver: ActivatedRoute, ) {
    super(service, '', '');

    this.canInitData = false;
    this.canInitPaginate = false;

  }

  ngOnInit() {
    super.ngOnInit();

    if (this.mission_id) {
      this.canInitData = true;
      this.init('/par-mission/' + this.mission_id);
    }

    this.config = {
      displayKey: "libelle", //if objects array passed which key to be displayed defaults to description
      search: true, //true/false for the search functionlity defaults to false,
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Selectionner',// text to be displayed when no item is selected defaults to Select,
      customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: this.items.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'plus', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Rien à afficher!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'recherche',// label thats displayed in search input,
      searchOnKey: 'libelle', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
      clearOnSelection: false // clears search criteria when an option is selected if set to true, default is false
    }

    this.initAddForm(false);

    this.searchSubject.pipe(debounceTime(1000))
      .subscribe(
        (keyword: string) => {
          if (keyword) {
            this.requestings.search = true;
            const service = new AutomobileFactory();
            service.list(new QueryOptions().setFilterGroups(
              [
                {or: true, filters:[new Filter('searchString', keyword, 'ct')]},
              ]
            )).subscribe(
              (res: any) => {
                this.requestings.search = false;
                this.items = res.data;
              }
            )
          }
        }
      );


      const service = new AutomobileFactory();
      service.list().subscribe(
        (res: any) => {
          console.log(res);
          this.requestings.search = false;
          this.items = res.data;
        }
      )
  }


  initAddForm(ingoreCurrentView: boolean = true) {
    this.forms.add = this.formBuilder.group({
      auto: [null, Validators.required],
    })

    if (ingoreCurrentView) {
      this.toggleView('add');
    }

  }

  add() {
    let formValue = this.forms.add.value;
    this.requesting = true;
    formValue.mission_id = this.mission_id;
    formValue.auto_id = formValue.auto.id;


    this.service.post(this.service.getServerUrl(), formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.service.add(res.data);
          this.service.notify("success", 'SUCCESS');
          this.toggleView('list');
          this.requesting = false;
        }
        else {
          this.service.notify('error', 'ERROR');
          this.requesting = false;
        }
      },
      (error) => {
        this.service.notify('error', "serverError");
        this.requesting = false;
      }
    );
  }

  initEditForm(item: any, index: any) {
    //set Modal Title Form
    this.modalTitle = 'EDITING';
    //save current item
    this.currentItem = item;
    //save current item index in array data from our service
    this.currentIndex = index;
    //init our edit form
    this.forms.edit = this.formBuilder.group({
      quantite: [item.quantite, [Validators.required, Validators.min(1)]]
    });

    this.toggleView('edit');
  }


  edit() {
    let formValue = this.forms.edit.value;
    this.requesting = true;
    this.service.put(this.service.getServerUrl() + '/' + this.currentItem.id, formValue).subscribe(
      (res: any) => {
        if (res.success) {

          this.service.edit(res.data, this.currentIndex);
          this.service.notify("success", 'SUCCESS');
          this.toggleView('list');
          this.currentItem = null;
          this.requesting = false;

        }
        else {
          this.service.notify('error', 'ERROR');
          this.requesting = false;
        }
      },
      (error) => {
        this.service.notify('error', "serverError");
        this.requesting = false;
      }
    );
  }

  search(keyword: string) {
    if (!(/^ *$/.test(keyword)) && keyword.length) {
      this.searchSubject.next(keyword)
    }
  }

}

