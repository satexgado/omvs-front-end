import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import { AppInjector } from './injector';
import { Title } from '@angular/platform-browser';
import * as serverInfo from './server';
import { Router } from '@angular/router';


declare var jquery: any;
declare var $: any;
declare var jqueryfademenu;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private http: HttpClient;
  private snotify: SnotifyService;
  private translate: TranslateService;

  private router: Router;

  private baseUrl: string = serverInfo.Server.baseUrl;
  private domaineUrl: string = serverInfo.Server.domaineUrl;

  //tell if data were already initialized
  private tokenAlreadyInitialized = true;
  private loading = false;

  private token = null;

  private alreadyTranslated = false;

  private showFooter = true;
  showFooterSubject = new Subject<boolean>();
  menuInitialized = false;
  private titleService: Title;


  constructor() {
    const injector = AppInjector.getInjector();
    this.http = injector.get(HttpClient);
    this.router = injector.get(Router);
    this.snotify = injector.get(SnotifyService);
    this.translate = injector.get(TranslateService);
    this.titleService = injector.get(Title);
  }


  getBaseUrl() {
    return this.baseUrl;
  }

  getDomaine() {
    return this.domaineUrl;
  }


  //CHANGE HttpHeaders depending of current token validity
  getHttpOptions(): {} {
    if (localStorage.getItem('token')) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + this.token
        })
      };
    }
    else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      };
    }
  }

  /*************
  * HTTP METHODS
  **************/
  post(hote: string, param: {} = {}) {
    const url = this.baseUrl + hote;
    return this.http.post(url, param, this.getHttpOptions());
  }

  put(hote: string, param: {} = {}) {
    const url = this.baseUrl + hote;
    return this.http.put(url, param, this.getHttpOptions());
  }

  delete(hote: string) {
    const url = this.baseUrl + hote;
    return this.http.delete(url, this.getHttpOptions());
  }

  get(hote: string) {
    let url = this.baseUrl + hote;
    return this.http.get(url, this.getHttpOptions());
  }

  postFile(hote: string, formdata) {

    const url = this.baseUrl + hote;
    return this.http.post(url, formdata);
  }

  //create notification
  create_notification(type = "info", message: string, hide = false, timeout=2000) {
    if (hide) {
      this.snotify.clear();
    }
    
    this.snotify[type](message, {
      timeout: timeout,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
  }
  //create notifiaction depending of translate file
  notify(type = "info", key: string, hide = false, timeout= 2000) {

    if (hide) {
      this.snotify.clear();
    }

    this.translate.get(key).subscribe(
      (message) => {
        this.snotify[type](message, {
          timeout: timeout,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
    )

  }

  //create notification
  create_snotify(type: string, message: string) {
    this.snotify[type](message, {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
  }


  // hide oldest notification
  hide_notification() {
    this.snotify.clear();
  }

  // translate an element
  getTranslation(key: string): Observable<any> {
    return this.translate.get(key);
  }

  isLoading(): boolean {
    return this.loading;
  }

  setLoading(state: boolean) {
    this.loading = state;
  }

  // PRINT MESSAGE TO CONSOLE
  console() {
    console.clear();
    this.getTranslation('KONSOLE').subscribe(
      (translation) => {
        console.log("%c" + translation, "color: red; font-size: x-large");
      }
    );

    this.getTranslation('KonsoleDescription').subscribe(
      (translation) => {
        console.log("%c" + translation, "color: black; font-size: 20px");
      }
    );
  }

  // footer
  emitFooter() {
    return this.showFooterSubject.next(this.showFooter);
  }

  toggleFooter(state: boolean) {
    this.showFooter = state;
    this.emitFooter();
  }

  setPageTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


  slugify(string): string {

    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'

    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'

    const p = new RegExp(a.split('').join('|'), 'g')



    return string.toString().toLowerCase()

      .replace(/\s+/g, '-') // Replace spaces with -

      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters

      .replace(/&/g, '-and-') // Replace & with 'and'

      .replace(/[^\w\-]+/g, '') // Remove all non-word characters

      .replace(/\-\-+/g, '-') // Replace multiple - with single -

      .replace(/^-+/, '') // Trim - from start of text

      .replace(/-+$/, '') // Trim - from end of text

  }

  public goTo(url: string){
    this.router.navigate([url]);
  }

  //FILE PATH
  getApiFileLocation() {
    return serverInfo.Server.serverFilePath;
  }
}
