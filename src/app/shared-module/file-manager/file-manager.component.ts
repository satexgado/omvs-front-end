import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileManagerService } from 'src/app/shared-module/file-manager/file-manager.service';
import { FileConfig } from './file.config';
import * as serverInfo from '../../services/server';


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

 
  // FRONT END CONFIG
  @Input() fileConfig: FileConfig;
  @Output() result = new EventEmitter<any>();  // Notez le type `number`


  // COMPONET CUSTOM PROPERTIES
  private SOURCE = [];
  private requestings: any; // contains all request state
  public serverFilePath = serverInfo.Server.serverFilePath;
  private currentItem;
  currentIndex: number;

  constructor(public service: FileManagerService) {
    this.requestings = {};
  }

  ngOnInit() {
    this.init();
    
  } // END ngOnInit


  private init() {
    let url = 'media/show-media/' + this.fileConfig.mediaTypeToGet + '/' + this.fileConfig.tableName + '/' + this.fileConfig.parent_id;
    this.requestings.init = true;
    this.service.get(url).subscribe(
      (res: any) => {
        if (res.success) {
          res.data ? this.SOURCE = res.data : this.SOURCE = [];
        }
        this.requestings.init = false;
      }
    )
  }

  // only process image
   processFiles(event: any, dropped?: boolean) {
    let limiFile  = this.fileConfig.maxFileToUpload - this.SOURCE.length;
    let file: File[] = this.service.formatFile(event, { size: this.fileConfig.maxFileSize, fileType: [this.fileConfig.validatorPaterns] }, limiFile, dropped);
    if (file) {
      // create f=ne form data and parse files with others params
      let input = new FormData();
      input.append('type', this.fileConfig.type.toString());
      input.append('table', this.fileConfig.tableName);
      input.append('parent_id', this.fileConfig.parent_id.toString());
      file.forEach((item: File) => {        
        input.append("files[]", item);
      });
      this.upload(input);
    }

  }


  // upload all files
  private upload(formValue: FormData) {
    this.requestings.image = true;
    this.service.postFile('media', formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.SOURCE = this.SOURCE.concat(res.data);
          this.service.notify("success", 'SUCCESS');
          this.requestings.image = false;
          this.onUploadFinish();

        }
        else {
          this.service.notify('error', 'ERROR');
          this.requestings.image = false;
        }
      },
      (error) => {
        this.service.notify('error', "serverError");
        this.requestings.image = false;
      }
    );
  }

  private promptDelete(item: Object, index: number) {
    this.currentItem = null;
    this.currentItem = item;
    this.currentItem.index = index;
    this.delete();
  }

  private delete() {
    this.requestings.delete = true;
    this.service.delete('media/' + this.currentItem.id).subscribe(
      (res: any) => {
        if (res.success) {
          this.SOURCE.splice(this.currentItem.index, 1);
          this.service.notify("success", 'SUCCESS');
          this.onUploadFinish();
        }
        else {
          this.service.notify('default', 'ERROR');
        }
        this.currentItem = null;
        this.requestings.delete = false;
      },
      (error) => {
        this.service.closeModal('#confirmModal');
        this.service.notify('default', "serverError");
        this.service.notify('default', 'elementToDeleteNotFound');
        this.requestings.delete = false;
      }
    );
  }

  initEdit(item: any, index: number){
    this.currentItem = item;
    this.currentIndex = index;
  }


  edit(name: string) {
    const formValue = {name: name};
    this.requestings['form'+this.currentIndex] = true;
    console.log(this.requestings);
    
    this.service.put('media/'+this.currentItem.id, formValue).subscribe(
      (res: any) => {
        if (res.success) {

          this.SOURCE[this.currentIndex].name= res.data.name; 
          this.service.notify("success", 'SUCCESS');
           this.requestings['form'+this.currentIndex] = false;
           this.onUploadFinish();

        }
        else {
          this.service.notify('error', 'ERROR');
           this.requestings['form'+this.currentIndex] = false;
        }
      },
      (error) => {
        this.service.notify('error', "serverError");
         this.requestings['form'+this.currentIndex] = false;
      }
    );
  }

  getClass(arrayLength: number): string{
    if( arrayLength == 1){ //4 ELEMENT
      return 'col-md-3';
    }
    else if(arrayLength > 1 &&  arrayLength < 3 ) // 2 ELEMENTS
    {
      return 'col-md-3';
    }
    else if(arrayLength >= 3)
    {
      return 'col-md-3';
    }
  }


  private onUploadFinish() {
    this.result.emit(this.SOURCE);
  }

}

