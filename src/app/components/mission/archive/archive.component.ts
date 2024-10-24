import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { ActivatedRoute } from '@angular/router';
import { ArchiveService } from 'src/app/services/archive.service'


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent extends BaseComponent implements OnInit {

  currentformStep: string;
  current_mission_id: number;
  billetMode: boolean = false;
  private addOrEdit = false
  private detailsItem = null;

  constructor(private service: ArchiveService,
    private routeObserver: ActivatedRoute,
    private formBuilder: FormBuilder) {
    super(service, '/archive', '', routeObserver);
    this.purgeCacheBefore = true;
  }
  ngOnInit() {

    super.ngOnInit();

    this.titles.window = 'listMission';

    this.activatedRoute.paramMap.subscribe(
      (param) => {
        // EXAMPLE
        if (param.has('billet')) {
          this.billetMode = true;
        }
      }
    )

    this.service.initExtraData();

  }

  private onEdit(item: any, index: number, step: string, billet = false) {
    this.currentIndex = index;
    this.currentItem = item;
    this.current_mission_id = item.id;
    this.currentformStep = step;
    this.billetMode = billet;
    this.addOrList();
    this.titles.window = 'editionMission';
    this.addOrEdit = false;
    this.service.toggleModal('#modal__details');

    setTimeout(() => {
      this.addOrEdit = true;
    }, 100);

  }

  removeItem() {
    this.currentItem = null;
  }

  private details(item: any, index: number) {
    this.currentIndex = index;
    this.detailsItem = item;
    this.service.toggleModal('#modal__details');
  }


}








