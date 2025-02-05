import { CustomCheckBoxComponent } from './custom-checkbox/custom-checkbox.component';
import { NgbDateTimePicker } from './ngb-datetime/ngb-datetime.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomSelectIconComponent } from './custom-select-icon/custom-select-icon.component';
import { SelectFormGroupComponent } from './customselect/select.formgroup.component';
import { MapsPluginModule } from 'src/app/components/maps/maps-plugin.module';
import { AddEmplacementComponent } from 'src/app/components/maps/add-emplacement/add-emplacement.component';

@NgModule({
    declarations: [
        CustomSelectIconComponent,
        SelectFormGroupComponent,
        CustomCheckBoxComponent,
        NgbDateTimePicker
    ],
    imports: [
        CommonModule,
        SharedModule,
        MapsPluginModule
    ],
    exports: [
        CustomSelectIconComponent,
        SelectFormGroupComponent,
        CustomCheckBoxComponent,
        NgbDateTimePicker
    ],
    providers: [],
    entryComponents: [AddEmplacementComponent]
})
export class CustomInputModule {
}
