import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IBase } from 'src/app/core/models/base.interface';
import { Factory } from 'src/app/core/services/factory';

import { ItemSelectHelper } from 'src/app/shared/state';
@Component({
  selector: 'app-choose-multi-item-base',
  templateUrl: './choose-multi-item-base.component.html',
  styleUrls: ['./choose-multi-item-base.component.css']
})
export class ChooseMultiItemBaseComponent extends ItemSelectHelper implements OnInit, OnDestroy {
  @Input() name: string;
  @Output() multipleItemChoosen = new EventEmitter<any>();

  @Input() createModal;
  @Output() itemCreated = new EventEmitter<any>();
  @Output() creationService: Factory<IBase>;
  newItem: string;
  searchString: string;
  changeIndicator = 0;

  @Input() imageCol: string;
  @Input() otherCols: {libelle: string, value: string[]}[];
  @Input() placeholder = '';
  items: {id: number, libelle: string}[] = [];
  @Input() isLoading = false;
  @Input()
  set dataSource$(dataSource: Observable<any[]>) {
    this.isLoading = true;
    dataSource.subscribe(
      (data) => {
        this.items = data;
        this.isLoading = false;
      }
    );
  }
  @Input()
  set preselected(data: any[]) {
    this.addSelectedItem(data);
  }

  hasSelectedBase(item: IBase): boolean
  {
    let selectedItemCode = Array.from(this._selectedItems).map(
      (opt: IBase)=> opt.id
    );
    return selectedItemCode.includes(item.id);
  }


  constructor(public activeModal: NgbActiveModal,
    public cdRef: ChangeDetectorRef,
    public modalService: NgbModal) {
    super();
  }

  ngOnInit() {

  }

  onShowCreateForm() {
    if (this.createModal) {
        const modalRef = this.modalService.open(this.createModal, { size: 'lg', centered: true, backdrop: 'static' });
        modalRef.componentInstance.title = 'Créer';
        modalRef.componentInstance.isUpdating = false;
        modalRef.componentInstance.newItem.subscribe(
          (data: any) => {
            this.items.push(data);
            this.addSelectedItem(data);
            this.itemCreated.emit(data);
            this.changeIndicator++;
          }
        );
    }
  }

  onSaveItem() {
    if(!this.newItem) {
      return;
    }

    this.isLoading = true;


    this.creationService.create({
      libelle : this.newItem
    }).subscribe(
      (data)=>{
        this.items.unshift(data);
        this.addSelectedItem(data);
        this.itemCreated.emit(data);
        this.isLoading = false;
        this.newItem = '';
        this.cdRef.detectChanges();
        this.changeIndicator++;
      }
    )
  }

  onCloseModal(result: string) {
    this.activeModal.close(result);
  }

  trackByFn(index, item) {
    return item.id; // or index
  }

  ngOnDestroy() {
    this.multipleItemChoosen.emit(this.selectedItem);
  }
}
