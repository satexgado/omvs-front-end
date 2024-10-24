import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { PageService } from '../services/page.service';
import * as moment from 'moment';

Injectable()

@Pipe({
    name: 'age'
})
export class AgePipe implements PipeTransform {
    constructor(private pageService: PageService) {
    }

    transform(debut: Date, fin: Date): String {
        let result = '0';
        let start = moment(debut);
        let end = moment(fin);
        const minute = end.diff(start, 'minutes');
        const heure = end.diff(start, 'hours');
        const jour = end.diff(start, 'days');
        const semaine = end.diff(start, 'weeks');
        const mois = end.diff(start, 'months');
        const annee = end.diff(start, 'years');

        if (minute > 0 && minute < 60) {
            // search the good translation for the given key
            this.pageService.getTranslation('MINUTE-P').subscribe(
                (translation: string) => {
                    result = minute + ' ' + translation;
                },
            )
        }
        if (heure > 0 && heure < 24) {
            // search the good translation for the given key
            this.pageService.getTranslation('HEURE-P').subscribe(
                (translation: string) => {
                    result = heure + ' ' + translation;
                },
            )
        }
        if (jour > 0 && jour <= 31) {
            // search the good translation for the given key
            this.pageService.getTranslation('JOUR-P').subscribe(
                (translation: string) => {
                    result = jour + ' ' + translation;
                },
            )
        }
        if (semaine > 0 && semaine <= 4) {
            // search the good translation for the given key
            this.pageService.getTranslation('SEMAINE-P').subscribe(
                (translation: string) => {
                    result = semaine + ' ' + translation;
                },
            )
        }
        if (mois > 0 && mois < 12) {
            // search the good translation for the given key
            this.pageService.getTranslation('MOIS-P').subscribe(
                (translation: string) => {
                   return  result = mois + ' ' + translation;
                    
                },
            )
        }
        if (annee) {
            // search the good translation for the given key
            this.pageService.getTranslation('ANNEE-P').subscribe(
                (translation: string) => {
                    result = annee + ' ' + translation;
                },
            )
        }

        // RETURN VALUE WITH UNIT (Ex: 11 H, 2 Jours, 3 MOis,.....)
        return result;
    }

}
