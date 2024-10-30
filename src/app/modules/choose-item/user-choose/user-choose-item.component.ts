
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/shared';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ChooseItem2Component } from 'src/app/modules/choose-item/single2/choose-item2.component';
import { CacheService } from 'src/app/shared/services';
import { IUser } from 'src/app/core/models/user';
import { PersonnelService } from 'src/app/services/personnel.service';
import { DashboardService } from 'src/app/components/modules/tableau/dashboard/dashboard.service';

@Component({
  selector: 'app-user-choose-item2',
  templateUrl: './user-choose-multi-item2.component.html',
  styleUrls: ['./user-choose-multi-item2.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class UserChooseItem2Component extends ChooseItem2Component {
  view: 'card' | 'list' =  localStorage.getItem("userViewType") ? <'card' | 'list'>localStorage.getItem("userViewType"):  'card';
  onChangeView(view : 'card' | 'list') {
    this.view = view;
    localStorage.setItem('userViewType',view);
  }
  UserHelper = this.dashService.allPersonnels$;
  selectedItem = null;

  get name() {
    return this.title;
  }

  hasSelectedUser(item: IUser): boolean
  {
    return item.id == this.selectedItem.id;
  }

  toggleSelectedItem(item) {
    this.selectedItem = item;
  }


  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    public cdRef: ChangeDetectorRef,
    protected cacheService: CacheService,
    public  dashService: DashboardService,
    public notificationService: NotificationService) {
    super(
      activeModal,  modalService,  notificationService
    )
  }

  ngOnInit() {
    super.ngOnInit();
  }

    ngOnDestroy() {
    }

    onEmitChoosenItem() {
      this.onChooseItem(this.selectedItem);
    }
}
