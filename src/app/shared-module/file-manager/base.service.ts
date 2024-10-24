import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { isArray, isObject } from "util";
import * as frLocale from 'date-fns/locale/fr';

declare var $: any;

// hfrom this service we extends http methods
// notification and translation
import { ConfigService } from "./config.service";

@Injectable({
    providedIn: 'root'
})

export class BaseService extends ConfigService {

    private data: any; // store main data, it's the main source
    dataSubject = new Subject<any>(); // store the main data subject to allow other component to subscrive in
    dataSource = new BehaviorSubject([]);
    formSubject = new BehaviorSubject(false);
    public allData = new BehaviorSubject([]); // store all data by get_all methode
    public updateAllDataCache = true; // avoid to fetch data manuy time from server
    private serverUrl: string; // server link
    public sourceHasData: boolean = false; // say if source has data
    filter: any = {} // store current filter param //
    filterIdValues = []; // store filters value to send to the server to process the filter
    singleOne = {};

    constructor(serverUrl: string) {
        super();
        this.serverUrl = serverUrl;
        this.filter.all = true;
    }

    get single(): any {
        return this.singleOne;
    }

    set single(item: any) {
        this.singleOne = item;
    }

    getServerUrl(): string {
        return this.serverUrl;
    }

    setServerUrl(url: string) {
        this.serverUrl = url;
    }


    emitData() {
        this.dataSubject.next(this.data);
    }

    setData(data) {
        this.data = data;
        this.emitData();
    }

    getData() {
        return this.data;
    }

    add(item: any, unshiftOrPush='unshift') {
        // because of data can be added from anywhere we push data in SOURCE if only appropriate compnent were init.
        if (this.sourceHasData) {
            //check if data structure has pagination
            if (this.data.data.current_page) {
                this.data.data.data[unshiftOrPush](item);
            }
            else {
                this.data.data[unshiftOrPush](item);
                // this.data.data = this.data.data.slice();   
            }

            this.emitData();
        }

        let temp: Array<[]> = this.allData.value;
        temp.unshift(item);
        this.allData.next(temp);
    }

    setPropertie(propertie: string, value: any) {
        this.data[propertie] = value;
    }

    dataLength(): number {
        let length = 0;
        if (this.data.data.current_page) {
            length = this.data.data.data.length;
        }
        else {
            length = this.data.data.length;
        }

        return length;
    }

    edit(data, index: number = null) {
        if (this.data.data.current_page) {
            this.data.data.data[index] = data;
        }
        else {
            this.data.data[index] = data;
        }
        this.emitData();
        this.updateAllDataCache = true;
    }

    editByKey(target: string, index: number, value: any) {
        this.data[target][index] = value;
        this.emitData();
    }


    del(index) {
        if (this.data.data.current_page) {
            this.data.data.data.splice(index, 1);
        }
        else {
            this.data.data.splice(index, 1);
        }
        this.emitData();
        this.updateAllDataCache = true;
    }

    init($url: string = null, anyway: boolean = true) {
        if (!$url) {
            $url = this.serverUrl;
        }

        if (!this.sourceHasData || anyway) {
            this.setLoading(true);
            this.get($url)
                .subscribe(
                    (res: any) => {
                        this.data = res;
                        this.emitData();
                        if (res.success) {
                            if (res.data.data) {
                                this.dataSource.next(res.data.data);
                                this.sourceHasData = true;
                            }
                            else if (res.data) {
                                this.dataSource.next(res.data);
                                this.sourceHasData = true;
                            }
                            else {
                                this.dataSource.next(res);
                            }
                        }
                        this.setLoading(false);
                    },
                    (error) => {
                        this.create_notification("error", error);
                    }
                );
        }
    }

    filterData(filterName: string, filterValue: number, $url?: string) {
        // select or unselect hitten filter
        this.filter[filterName] ? this.filter[filterName] = false : this.filter[filterName] = true;

        // if selected filter doesn't exist
        let index = this.filterIdValues.indexOf(filterValue);
        if (index < 0) {
            this.filterIdValues.push(filterValue);
        }
        else {
            this.filterIdValues.splice(index, 1)[0];
        }

        if (!$url) {
            $url = this.serverUrl;
        }

        let formValue = { params: this.filterIdValues };
        this.setLoading(true);
        this.post($url + '/filter', formValue).subscribe(
            (res: any) => {
                if (res.success) {
                    this.data = res;
                    this.emitData();
                    if (res.data.data) {
                        this.dataSource.next(res.data.data);
                    }
                    else if (res.data) {
                        this.dataSource.next(res.data);
                    }
                    else {
                        this.dataSource.next(res);
                    }
                }
                else { // if incorrect parameters were sent to servers we unchecked the selected filter and abord operation
                    this.filter[filterName] = false;
                    this.notify('error', 'wrongFilterParameter')

                }
                this.setLoading(false);
            },
            (error) => {
                this.create_notification("error", error);
            }
        );
    }

    getById(id: number, enableRequesting=false) {
        
        if(enableRequesting) this.setLoading(true);

        this.get(this.serverUrl + '/' + id).subscribe(
            (res: any) => {
                if (res.data) {
                    this.single = res.data;
                    if(enableRequesting) this.setLoading(false);
                }
            }
        );
    }

    search_one(param): Observable<any> {
        return this.get(this.serverUrl + '/search/one/' + param);
    }

    search_globally(param): Observable<any> {
        return this.get(this.serverUrl + '/search/globally/' + param);
    }

    // get all the data without any pagination
    getAll($url = null) {
        if (this.updateAllDataCache) {
            $url ? null : $url = this.serverUrl + '/get-all';
            this.get($url).subscribe(
                (res: any) => {
                    if (res.data) {
                        this.allData.next(res.data);
                        this.updateAllDataCache = false;
                    }
                }
            );
        }
    }

    refresh() {
        this.emitData();
    }

    translateArrayItem(obj: Array<any>, key: string) {
        // a empty array to store all result
        let arr = [];
        // the current translated item
        let translatedItem: {};

        if (obj) {
            obj.forEach(item => {
                // Store each element
                translatedItem = item;
                // search the good translation for the given key
                this.getTranslation(item[key]).subscribe(
                    (translation: string) => {
                        // set translation
                        translatedItem[key] = translation;
                        arr.push(translatedItem);
                    },
                    (notFound) => {
                        arr.push(translatedItem);
                    }
                )

            });
        }

        return arr;
    }

    // pagination
    checkPaginationParam(page): string {
        // we check if the param is availble
        if (parseInt(page)) {
            return this.serverUrl + '/?page=' + page;
        }
        else // If param given isn't a number
        {
            this.notify("error", 'urlParamError');
            return this.serverUrl;
        }
    }

    // renome les références d'objet dans un tableau
    // $key structure [{currentKey: '', newKey: ''}]
    rename_reference($arr: Array<any>, $key: any): Array<any> {
        let result = [];

        //on vérifie si on a vraiment reçu un tableau
        if (isArray($arr)) {
            // on vérifie que le tableau repond à la bonne structure
            // enoncée dans key
            if ($arr[0][$key[0]['currentKey']]) {
                $arr.forEach(element => {
                    // renome chaque référence par sa nouvelle clé equivalente
                    // Ensuite efface l'ancienne référence
                    $key.forEach((item: any) => {
                        Object.defineProperty(element, item.newKey,
                            Object.getOwnPropertyDescriptor(element, item.currentKey));
                        delete element[item.currentKey];

                        // Enregistre le nouvel objet fraichement modifié
                        result.push(element);
                    });
                });
            }
            else {
                result = $arr;
            }

        }
        else {
            result = $arr;
        }

        return result;

    }

    // supprime des références d'objet dans un tableau
    remove_reference($arr: Array<any>, $key: Array<any>): Array<any> {
        let result = [];
        if (isArray($arr) && $arr[0]) {
            // on vérifie que le tableau repond à la bonne structure
            // comme enoncée dans $key
            if ($key[0] in $arr[0]) {
                $arr.forEach(element => {
                    // efface chaque element 
                    // en fonction des references précisées dans $key
                    $key.forEach((item: any) => {
                        delete element[item];
                        // Enregistre le nouvel objet fraichement modifié
                        result.push(element);
                    });
                });
            }
            else {
                result = $arr;
            }
        }
        else {
            result = $arr;
        }

        return result;
    }


    // get array values for an given key without reference
    get_array_key_values($arr: Array<any>, $key: string): Array<any> {
        let result = [];

        if (isArray($arr) && $arr[0]) {
            // on vérifie que le tableau repond à la bonne structure
            // enoncée dans key
            if ($arr[0][$key]) {
                $arr.forEach(element => {
                    // enregitre chaque valeur de la reference 
                    result.push(element[$key]);
                });
            }
            else {
                result = $arr;
            }
        }
        else {
            result = $arr;
        }

        return result;
    }

    // get array values for an given key without reference
    array_extract_single_reference($arr: Array<any>, $key: string): Array<any> {
        let result = [];

        if (isArray($arr) && $arr[0]) {
            // on vérifie que le tableau repond à la bonne structure
            // enoncée dans key
            if ($arr[0][$key]) {
                $arr.forEach(element => {
                    // enregitre chaque valeur de la reference 
                    result.push({ [$key]: element[$key] });
                });
            }
            else {
                result = $arr;
            }
        }
        else {
            result = $arr;
        }

        return result;
    }

    arrayLastElement(lastElement: Array<any>): Object {
        let result = {};
        //get last element of an array
        if (lastElement[0]) {
            lastElement.forEach(item => {
                result[item] = this.data.data[item][this.data.data[item].length - 1];
            })
        }

        return result;
    }

    // check and format file
    formatFile(event, param: { size: number, fileType: any[] }, maxFile = 1, dropped = false): File[] | null {

        let file; // used to store files
        dropped ? file = event : file = event.target.files;
        let filesToReturn: File[] = []; // sotore files we will return

        for (let i = 0; i < file.length; i++) {
            // lilit number of file to be uploaded
            if (i <= maxFile - 1) {
                // check file integration
                if (file[i]) {
                    // check type
                    if (file[i].type.match(param.fileType)) {
                        // check size
                        if (file[i].size <= param.size) {
                            // file is correct, we store it
                            filesToReturn.push(file[i]);
                        }
                        else {
                            if (maxFile == 1) {
                                this.notify("error", 'fileSizeIncorrect', true);
                            }
                            else {

                                this.notify("error", 'fileGroupIncorrect', true);
                            }
                            this.notify("error", 'fileSizeIncorrect', true);
                        }
                    }
                    else {
                        if (maxFile == 1) {
                            this.notify("error", 'fileFormatIncorrect', true);
                        }
                        else {
                            this.notify("error", 'fileGroupIncorrect', true);
                        }
                    }
                }
                else {
                    this.notify("error", 'incorrectFile', true);
                }
            }
        }

        //  var pattern = /image-*/;
        // var pattern = /image-jpg|pdf|png/;

        return filesToReturn;
    }

    // check an element
    check_element(element: any, valueToReturnIfFalse: any): any {
        if (element) {
            return element;
        }
        else {
            return valueToReturnIfFalse;
        }
    }


    closeModal(element: string) {
        $(element).modal('toggle');
    }

    toggleModal(element: string) {
        $(element).modal('toggle');
    }

    /**************************
    * DATE AND CALENDAR METHODS
    **************************/
    yearFromNowOn(start) {
        let today = new Date();
        let years = [];
        while (start <= today.getFullYear()) {
            years.push(start);
            start++;
        }
        return years;
    }

    canInitnewDate(propertie: any, valueToReturnIfIncorrect: any) {
        if (propertie) {
            return new Date(propertie);
        }
        else {
            return valueToReturnIfIncorrect;
        }
    }


    dateInfo(d: Date): any {
        return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    }

    lastCurrentMonthDay() {
        let today = new Date();
        const dd = today.getDate();
        return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    }

    mysql_date_format(myDate) {
        let d = new Date(myDate);
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }

    today(): string {
        let myDate = new Date();
        let mm = myDate.getMonth() + 1;
        let dd = myDate.getDate();
        let yy = myDate.getFullYear();
        return yy + '-' + mm + '-' + dd;
    }

    launchMaterialStyleForm() {
        $(".input").focus(function () {
            $(this).parent().addClass("focus");
            console.log('focus');
        })
    }

    moneyFormat(x: any) {
        if (x == null) {
            return 0;
        }
        else {
            var parts = x.toString().split(" ");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(" ");
        }
    }

    randomData(start: number, limit: number): any[] {
        let i = 0;
        let result = [];
        while (i <= limit) {
            result[i] = start + 10;
            start += 10;
            i++;
        }
        return result;
    }

    getRandomColor(limit: number) {
        let i = 0;
        let result = [];
        while (i <= limit) {
            let color = Math.floor(0x1000000 * Math.random()).toString(16);
            let value = '#' + ('000000' + color).slice(-6);
            result[i] = value;
            i++;
        }
        return result;

    }

    popover() {
        $('[data-toggle="popover"]').popover({
            container: 'body',
            html: true,
            sanitize: false,
            content: () => {
                return $("#PopoverContent").html();
            }
        });

        this.formSubject.next(true);
    }

    toggleBlockSlide(toggle) {
        if (toggle) {
            $('.block-slide').show(500);
        }
        else {
            $('.block-slide').hide(500);
        }
    }

    hideBlockSlide() {
        $('.block-slide').hide();
    }


    setDateOptions(minYear: number = 1930, minDate: string = '1930-1-1', maxYear: number = 2100): Object {
        let placeholder = '';
        this.getTranslation('selectDate').subscribe(translation => placeholder = translation);
        let barTitleIfEmpty = '';
        this.getTranslation('moreOptionHere').subscribe(translation => barTitleIfEmpty = translation);
        return {
            locale: frLocale,
            minYear: minYear,
            maxYear: maxYear,
            displayFormat: 'D[,] MMM YYYY',
            barTitleFormat: 'MMMM YYYY',
            minDate: new Date(minYear + '-12-31'),
            maxDate: new Date(maxYear + '-12-31'),
            barTitleIfEmpty: barTitleIfEmpty,
            placeholder: placeholder
        };
    }

    // return an age
    age(myDate: Date): number {
        let result = null;
        if (myDate) {
            let date = new Date(myDate);
            result = (new Date().getFullYear() + 1) - (new Date(myDate).getFullYear() + 1);
        }
        return result;
    }
}