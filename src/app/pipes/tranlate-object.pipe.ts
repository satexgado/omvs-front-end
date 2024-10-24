import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { PageService } from '../services/page.service'; 

Injectable()

@Pipe({
  name: 'translateObject'
})
export class TranlateObjectPipe implements PipeTransform {
  constructor(private pageService: PageService){
  }

  transform(obj: [], key: string): Array<any> {
    // a empty array to store all result
    let arr = []; 
    // the current translated item
    let translatedItem : {};

    if(obj){
      obj.forEach(item => {
        // Store each element
        translatedItem = item;
        // search the good translation for the given key
        this.pageService.getTranslation(item[key]).subscribe(
          (translation: string)=>{
            // set translation
            translatedItem[key] = translation;
            arr.push(translatedItem);
          },
          (notFound)=>{
            arr.push(translatedItem);
          }
        )
  
      });
    }

    return arr;
  }

}
