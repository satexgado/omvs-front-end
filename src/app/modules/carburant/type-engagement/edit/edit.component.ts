import { Component, Input, ChangeDetectorRef} from '@angular/core';
import { BaseEditComponent } from 'src/app/shared/components/edit/base-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { BonTypeEngagement, IBonTypeEngagement } from 'src/app/core/models/transport/bon-type-engagement';
import { BonTypeEngagementFactory } from 'src/app/core/services/transport/bon-type-engagement';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends BaseEditComponent  {
  heading = 'type-engagement';
  @Input() item: IBonTypeEngagement = new BonTypeEngagement();

  constructor(
    protected cdRef: ChangeDetectorRef,
    activeModal: NgbActiveModal) {
    super(new BonTypeEngagementFactory(), cdRef, activeModal);
  }

  createFormGroup(item: IBonTypeEngagement) {
    return this.formBuilder.group({
      'libelle': [item.libelle, Validators.required],
      'id': [item.id]
    });
  }
}
