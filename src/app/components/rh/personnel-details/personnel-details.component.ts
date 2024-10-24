import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from 'src/app/services/mission.service.';

@Component({
  selector: 'app-personnel-details',
  templateUrl: './personnel-details.component.html',
  styleUrls: ['./personnel-details.component.css']
})
export class PersonnelDetailsComponent implements OnInit {

  @Input() personnel_id: number;

  requesting = false;
  SOURCE: any;

  constructor(private service: MissionService) {

  }

  ngOnInit() {
    if (this.personnel_id) this.missionByUser(this.personnel_id);

  }

  private missionByUser(user_id: number) {
    this.requesting = true;
    this.service.get('mission-by-user/' + user_id).subscribe(
      (res: any) => {
        if (res.data) {
          this.SOURCE = res.data;
          this.requesting = false;
        }
      }
    );
  }


}




