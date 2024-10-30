
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
import { ChooseMultiItem2Component } from 'src/app/modules/choose-item/multi2/choose-multi-item2.component';
import { CacheService } from 'src/app/shared/services';
import { IUser } from 'src/app/core/models/user';
import { UserFactory } from 'src/app/core/services/user.factory';
import { ResourceScrollableHelper } from 'src/app/shared/state';
import { filterGrp } from 'src/app/shared/models/query-options/query-options.model';
import { PersonnelService } from 'src/app/services/personnel.service';
import { DashboardService } from 'src/app/components/modules/tableau/dashboard/dashboard.service';

@Component({
  selector: 'app-user-choose-multi-item2',
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
export class UserChooseMultiItem2Component extends ChooseMultiItem2Component {

  view: 'card' | 'list' =  localStorage.getItem("userViewType") ? <'card' | 'list'>localStorage.getItem("userViewType"):  'card';
  onChangeView(view : 'card' | 'list') {
    this.view = view;
    localStorage.setItem('userViewType',view);
  }

  hasSelectedUser(item: IUser): boolean
  {
    let selectedItemCode = Array.from(this._selectedItems).map(
      (opt: IUser)=> opt.id
    );
    return selectedItemCode.includes(item.id);
  }

  UserHelper = this.dashService.allPersonnels$;
  @Input() userFilter: filterGrp[];
  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    protected cacheService: CacheService,
    public cdRef: ChangeDetectorRef,
    public dashService: DashboardService,
    public notificationService: NotificationService) {
    super(
      activeModal,  cdRef,  modalService
    )
    
  }

  ngOnInit() {
    super.ngOnInit();
  }


    ngOnDestroy() {
    }

    onEmitChoosenItem() {
      this.multipleItemChoosen.emit(this.selectedItem);
    }
}
