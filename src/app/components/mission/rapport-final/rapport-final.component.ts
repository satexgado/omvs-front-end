import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { ActivatedRoute } from '@angular/router';
import { RapportFinalService } from 'src/app/services/rapport-final.service';
import { FileConfig } from 'src/app/shared-module/file-manager/file.config';

@Component({
  selector: 'app-rapport-final',
  templateUrl: './rapport-final.component.html',
  styleUrls: ['./rapport-final.component.css']
})
export class RapportFinalComponent extends BaseComponent implements OnInit {

  @Input() mission_id: number;
  @Input() personnel_id: number;
  fileConfig: FileConfig;

  constructor(private service: RapportFinalService,
    private routeObserver: ActivatedRoute, ) {
    super(service, '', '');

    this.canInitData = false;
    this.canInitPaginate = false;

  }

  ngOnInit() {
    super.ngOnInit();

    if (this.mission_id) {
      this.canInitData = true;
      this.initData();
    }
    
  }

  add() {
    this.requesting = true;
    let formValue = {
      mission_id: this.mission_id,
      personnel_id: this.personnel_id
    };
    

    this.service.post(this.service.getServerUrl(), formValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.service.add(res.data);
          this.toggleView('edit');
          this.currentItem = res.data;
          //init file edit
          this.setFileConfig();

          this.requesting = false;
          this.service.setLoading(false);
        }
        else {
          this.service.notify('error', 'ERROR');
          this.requesting = false;
          this.service.setLoading(false);
        }
      },
      // (error) => {
      //   this.service.notify('error', "serverError");
      //   this.requesting = false;
      //   this.service.setLoading(false);
      // }
    );
  }

  private setFileConfig() {
    this.fileConfig = {
      tableName: 'rapport_final',
      parent_id: this.currentItem.id,
      type: 2,
      acceptedFiles: '.pdf',
      canUploadFiles: true,
      validatorPaterns: 'application/pdf',
      canShowDiapo: false,
      canGetFiles: true,
      mediaTypeToGet: 2,
      canShowFiles: true,
      canDelete: true,
      maxFileToUpload: 1,
      maxFileSize: 2000000,
      editFileName: false
    };
  }

  private initData() {
    this.toggleView('list');
    this.service.setLoading(true);
    this.service.get('rapport-final/par-mission/' + this.mission_id).subscribe(
      (res: any) => {
        if (res.data) {
          if (res.data.length) {
            this.SOURCE = res
            this.currentItem = res.data[0];
            this.service.setLoading(false);
            //init file edit
            if (!this.fileConfig) this.setFileConfig();
          }
          else {
            this.add();
          }
        }
      }
    );
  }
}
