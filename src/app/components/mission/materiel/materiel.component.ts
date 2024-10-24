import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EquipementService } from 'src/app/services/equipement.service';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.sass']
})
export class MaterielComponent extends BaseComponent implements OnInit {

  @Input() mission_id: number;
  config: any;
  items: [] = [];
  searchSubject = new BehaviorSubject('');

  constructor(private service: EquipementService, private formBuilder: FormBuilder,
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
      displayKey: "name", //if objects array passed which key to be displayed defaults to description
      search: true, //true/false for the search functionlity defaults to false,
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Selectionner',// text to be displayed when no item is selected defaults to Select,
      customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: this.items.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'plus', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Rien à afficher!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'recherche',// label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
      clearOnSelection: false // clears search criteria when an option is selected if set to true, default is false
    }

    this.initAddForm(false);

    this.searchSubject.pipe(debounceTime(1000))
      .subscribe(
        (keyword: string) => {
          if (keyword) {
            this.requestings.search = true;
            this.service.get('materiel/search/' + keyword).subscribe(
              (res: any) => {
                this.requestings.search = false;
                this.items = res.data;
              }
            );
          }
        }
      );


    // this.service.stockService.allData.subscribe(
    //   (data: any) => {
    //     this.items = data;

    //   }
    // );

  }


  initAddForm(ingoreCurrentView: boolean = true) {
    this.forms.add = this.formBuilder.group({
      designation: [null, Validators.required],
      quantite: [null, [Validators.required, Validators.min(1)]]
    })

    if (ingoreCurrentView) {
      this.toggleView('add');
    }

  }

  add() {
    let formValue = this.forms.add.value;
    this.requesting = true;
    formValue.mission_id = this.mission_id;
    formValue.designation_id = formValue.designation.id;


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

