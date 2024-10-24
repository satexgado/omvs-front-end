import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { BaseComponent } from 'src/app/shared-module/base.component';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from 'src/app/services/mission.service.'


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent extends BaseComponent implements OnInit {

  currentformStep: string;
  current_mission_id: number;

  constructor(private service: MissionService,
    private routeObserver: ActivatedRoute,
    private formBuilder: FormBuilder) {
    super(service, '/mission/evaluation', '', routeObserver);

    this.canInitData = false;
    this.purgeCacheBefore = true;

  }

  ngOnInit() {

    super.ngOnInit();
    this.serverUrlWithParam = 'evaluation';
    this.init();
    this.titles.window = 'EVALUATION';

  }

  details(item: any) {
    this.currentItem = null;
    setTimeout(() => {
      this.currentItem = item;
      this.service.toggleModal('#modal__flat');
    }, 100);
  }

  missionDetails(url: string){
    this.service.toggleModal('#modal__flat');
    this.service.goTo(url);
  }


}













