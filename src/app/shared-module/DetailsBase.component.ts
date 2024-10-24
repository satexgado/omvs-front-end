import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { PageService } from '../services/page.service';
import { AccountService } from '../services/account/account.service';
import { BaseService } from '../services/base.service';
import { AppInjector } from '../services/injector';
import { Subject } from 'rxjs';



declare var $: any;


export class DetailsBaseComponent {

    // CONFIGURATION
    loading = true;
    modalTitle = '';
    formActionButton: string;
    profile;
    serverUrl;
    requesting = false;
    // DATA
    SOURCE;
    currentItem;
    currentIndex;
    title = '';
    functionToCall: any;
    lastElementInArray: any;
    //allow children (by inheritance) to process something if data were correctly initialized
    dataInitializedSubject = new Subject<any>();
    canIniData = true;
    protected currentView = 'list'; // toggle between view (list, edit,...)


    //INjector
    public pageService: PageService;
    public accountService: AccountService;
    private router: Router;

    constructor(private baseService: BaseService, 
        public paramName: string, 
        public id_element: string, 
        public localUrl: string, 
        public serverUrlSuffix: string = '')
    {
        //Dependencies Injection
        const injector = AppInjector.getInjector();
        this.accountService = injector.get(AccountService);
        this.router = injector.get(Router);

        //set navigation Base Url
        this.localUrl = localUrl;
        //Set param name
        this.paramName = paramName;
        // get profile information
    
        //DEFINE SERVER URL
        this.serverUrl = this.baseService.getServerUrl();
        //set current id param
        this.id_element = id_element;
        if (parseInt(this.id_element)) {
            
            if(this.canIniData){
                this.getByid();
            }

            this.baseService.dataSubject.subscribe(
                (res: any) => {
                    if (res.success == true) {
                        this.SOURCE = res.data;
                        // inform children
                        this.dataInitializedSubject.next();
                    }
                    else {
                        this.SOURCE = null;
                    }
                    this.loading = false;
                }
            )
        }
        else {
            this.router.navigate(['/' + this.localUrl]);
        }
    }
 

    invoke_function(myFunction=null) {
        if(myFunction){
            this[myFunction]();
        }
        else{
            if (this.functionToCall) {
                this[this.functionToCall]();
            }
        }
    }
    

    getByid(){
        this.baseService.init(this.baseService.getServerUrl()+'/'+ this.serverUrlSuffix + this.id_element);
    }

    toggleView(view: string){
        this.currentView = view;
    }



}
