import { OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PageService } from '../services/page.service';
import { AccountService } from '../services/account/account.service';
import { BaseService } from '../services/base.service';
import { AppInjector } from '../services/injector';
import { Subject } from 'rxjs';

declare var $: any;

export class BaseComponent implements OnInit {

    // CONFIGURATION
    protected loading = false;
    protected modalTitle = '';
    protected titles;
    protected profile = null;
    protected serverUrl; // server base url for current root
    protected canInitData = true; // say if data have to be initialized
    protected canInitPaginate = true; // say if paginations have to be initialized
    protected requesting = false; // fire when requesting something to the server
    protected requestings: any; // is the same like requesting but contains many state requesting (object)
    // DATA
    protected SOURCE; // we store data from server here
    protected currentItem; // contains the current item
    protected currentIndex: number; // contains the current index for element we want to edit, delete,....
    protected paramsAreReady = false; // fire when all plugin options have been initialized
    protected redirect = false; // say if we have to redirect the user after an action like add, edit, delete
    protected functionToCall: any; // allow to store a function we ant to fire dynamicly
    protected params: any; //store param from routes state that can be used in children component if needed
    protected localUrlWithParam: string = '';
    protected serverUrlWithParam: string = '';
    protected getDataAnyway: boolean = true;
    protected canGetProfileInfo = true;
    protected purgeCacheBefore = false;
    protected currentView = 'list'; // switch between view (list, edit,...)
    protected tabs = 'default';  // switch between tabs (using url for example)
    protected canSubscribeToData = true; // enable data subscription
    protected id: number;
    protected canGetById = false;
    protected messages: any;
    //allow children (by inheritance) to process something if data were correctly initialized
    protected baseSubject = new Subject<any>();
    protected serverPaginationUrl = '';

    // store all the forms
    // {add:{}, edit:{}}
    protected forms;
    protected steps;

    //INjector
    protected pageService: PageService;
    protected accountService: AccountService;

    constructor(private baseService: BaseService,
        public localUrl: string,
        public serverAdditionalUrlParam: string = '',
        public activatedRoute?: ActivatedRoute) {
        const injector = AppInjector.getInjector();
        this.pageService = injector.get(PageService);
        this.accountService = injector.get(AccountService);
        this.localUrlWithParam = this.localUrl;
        this.forms = {};
        this.titles = {};
        this.steps = {};
        this.requestings = {};
        this.messages = {}
    }

    ngOnInit() {
        //DEFINE SERVER URL
        this.serverUrl = this.baseService.getServerUrl() + this.serverAdditionalUrlParam;
        this.serverUrlWithParam = this.serverUrl;
        this.localUrlWithParam = this.localUrl;
        //Init route param container
        this.params = {};

        if (this.canGetProfileInfo) {
            this.accountService.profile.subscribe(
                (data: any) => {
                    this.profile = data;
                });
        }

        if (this.purgeCacheBefore) {
            this.baseService.setData([]);
        }

        // Subscribe to service Data
        if (this.canSubscribeToData) {
            this.baseService.dataSubject.subscribe(
                (res: any) => {
                    if (res) {
                        this.SOURCE = res;

                        if (this.canInitPaginate && res.data) {
                            //SEND PAGINATION INFO TO PROVIDER FOR PROCESSING if necessary 
                            if (res.data.current_page) {
                                this.pageService.setPagination(res.data.current_page, res.data.last_page, this.localUrlWithParam);
                            }
                            else {
                                this.pageService.setPagination(res.current_page, res.last_page, this.localUrlWithParam);
                            }
                        }
                        this.serverPaginationUrl = '';
                    }
                    else {
                        this.SOURCE = [];
                    }
                }
            );

            this.baseService.emitData();
        }

        if (!this.activatedRoute && this.canInitData) {
            this.init();
        }

        //listen to route param changes in serverUrl
        if (this.activatedRoute) {
            this.activatedRoute.paramMap.subscribe(
                (param) => {

                    // EXAMPLE
                    if (param.has('stock')) {
                        this.serverUrlWithParam = this.serverUrl + '/get/' + param.get('stock');
                        this.params.stock = param.get('stock');
                        // add stock param to local url navigation
                        this.localUrlWithParam = this.localUrl + '/' + param.get('stock');
                    }

                    //generate good link for pagination if exist
                    if (param.has('page')) {
                        this.serverPaginationUrl = '?page=' + param.get('page');

                    }

                    // check if data have been got from server were component is init
                    if (this.canInitData) {
                        this.init();
                    }

                    // AVAILBLE ONLY FOR DETAILS (show details)
                    if (this.canGetById) {
                        if (param.has('id')) {
                            this.id = parseInt(param.get('id'));
                            if (this.id) {
                                this.baseService.getById(this.id, true);
                            }
                            else {
                                this.messages.invalidUrParam = 'invalidParam';
                            }
                        }
                    }

                }
            )
        }

    }


    initDelete(id, index) {
        this.modalTitle = 'DELETING';
        this.currentItem = id;
        this.currentIndex = index;
    }

    delete(modalToClose = '#confirmModal', initData = false, callback: string, customUrl?: string) {
        this.requesting = true;
        this.requestings.delete = true;
        let url = customUrl || this.serverUrl;
        const id = this.currentItem.id || this.currentItem;
        this.baseService.delete(url + '/' + id).subscribe(
            (res: any) => {
                if (res.success) {

                    if (!initData) {
                        this.baseService.del(this.currentIndex);
                    }
                    this.baseService.notify("success", 'SUCCESS');
                    modalToClose ? this.baseService.closeModal(modalToClose) : null;
                    this.currentItem = null;
                    this.requestings.delete = false;
                    this.requesting = false;
                    if (initData) {
                        this.init();
                    }
                }
                else {
                    this.baseService.notify('warning', 'ERROR');
                    this.requestings.delete = false;
                    this.requesting = false;
                }
            },
            (error) => {
                modalToClose ? this.baseService.closeModal(modalToClose) : null;
                this.baseService.notify('warning', 'elementToDeleteNotFound', true, 5000);
                this.requestings.delete = false;
                this.requesting = false;
            },
            () => {
                if (callback) {
                    this[callback]();
                }
            }
        );
    }

    init(optionnalParam = '') {
        this.baseService.init(this.serverUrlWithParam + optionnalParam + this.serverPaginationUrl, this.getDataAnyway);
    }

    setPropertieValue(properties: string, value: any) {
        if (this[properties] == value) {
            this[properties] = value;
        }
    }

    changeStep(properties: string, value: any) {
        this.steps[properties] = value;
    }

    invokeFunction(myFunction: string, value = null) {
        if (value) {
            this[myFunction](value);
        }
        else {
            this[myFunction]();
        }
    }

    toggleView(view: string) {
        this.currentView = view;
    }

    switchTabs(tabs: string) {
        if (tabs !== this.tabs) this.tabs = tabs;
    }

    addOrList() {
        this.currentView != 'add' ? this.currentView = 'add' : this.currentView = 'list';
    }

    setTitle(propertie: string, value: string) {
        this.titles[propertie] = value;
    }

    setFormControlValue(form: string, control: string, value: any) {
        this.forms[form].patchValue({ [control]: value });
    }

    // patch form controls value
    // shema [{control: '', value: ''}] for typical value
    // shema ['name'] form global value
    setArrayFormControlsValue(form: string, shema: any[], globalValue?: any) {
        if (globalValue) {
            shema.forEach((element: any) => {
                this.forms[form].patchValue({ [element]: globalValue });
            });
        }
        else {
            shema.forEach((element: any) => {
                this.forms[form].patchValue({ [element.control]: element.value });
            });
        }
    }

    getFormControlValue(form: string, control: string): string {
        return this.forms[form].controls[control].value;
    }

    checkIfControlHasError(form: string, field: string, error: string ) {
        return this.forms[form].controls[field].dirty && this.forms[form].controls[field].hasError(error);
    }

    setCurrentItem(item: Object) {
        this.currentItem = item;
    }

    // STILL WOrKING ON THIS....
    printNow(block: string) {
        const printContent = document.getElementById(block);
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="../../../assets/css/app.css">');
        WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="../../../assets/css/custom.css">');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        WindowPrt.close();
    }


}
