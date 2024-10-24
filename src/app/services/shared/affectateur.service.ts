import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { Subject, BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AffectateurService extends BaseService {

    public affectateurSubject = new Subject<Object>();
    public selectedItemsSubject = new Subject<any[]>();
    public affectedItemsSubject = new Subject<any[]>();

    public params: {
        directUrl: string,
        searchUrl: string,
        renamePattern: any,
        multiSelection: boolean
    };

    public keyToReturnAsFinalData: string = 'id';
    private selectedItems = [];
    private $_currentPage: number;
    public transformdata: {key1: string, key2: string} = null;

    constructor() {
        super('');
    }

    emitAffectateur() {
        this.affectateurSubject.next(this.params);
    }

    setParam(directUrl: string, searchUrl: string, multiSelection = true, renamePattern: any) {
        this.params =
            {
                directUrl: directUrl,
                searchUrl: searchUrl,
                renamePattern: renamePattern,
                multiSelection: multiSelection
            };
        this.emitAffectateur();
    }

    getParam(): object {
        return this.params;
    }

    restore() {
        this.params = undefined;
        this.emitAffectateur();
        this.selectedItems = [];
        this.transformdata = null;
        this.emitAffectedItemsSubject();
    }

    setSelectedItems(item: any) {
        this.selectedItems.push(item);
        this.emitAffectedItemsSubject()
    }


    removeSelectedItems(index: number): any {
        let itemRemoved = this.selectedItems.splice(index, 1)[0];
        this.emitAffectedItemsSubject();
        return itemRemoved;
    }

    set currentPage(page: number) {
        this.$_currentPage = page;
    }

    get currentPage(): number {
        return this.$_currentPage;
    }

    getPaginationUrl(page: any): string {
        if (page) {
            return '?page=' + page
        }
        else {
            return '';
        }
    }

    emitSelectedItems() {
        if (this.keyToReturnAsFinalData) {
            this.selectedItemsSubject.next(this.get_array_key_values(this.selectedItems, this.keyToReturnAsFinalData));
        }
        else{
            this.selectedItemsSubject.next(this.selectedItems);   
        }
    }

    private emitAffectedItemsSubject() {
        this.affectedItemsSubject.next(this.selectedItems);
    }

    // items : affected items are array
    initAffectedItems(affectedItems: any[]) {        
        if (this.params.renamePattern && affectedItems.length) {
            this.selectedItems = this.rename_reference(affectedItems, this.params.renamePattern);
        }
        else {
            this.selectedItems = affectedItems;
        }
        this.emitAffectedItemsSubject();
    }

    publishSelectedItems(forceExit = false) {
        if (forceExit) {
            // inform subscribers
            this.restore();
        }
        else {
            // inform subscribers
            this.emitSelectedItems();
            //restore all data
            this.restore();
        }

    }

}