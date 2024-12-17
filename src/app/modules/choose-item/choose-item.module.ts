import { ChooseItem2Component } from './single2/choose-item2.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChooseMultiItem2Component } from './multi2/choose-multi-item2.component';
import { UserChooseMultiItem2Component } from './user-choose/user-choose-multi-item2.component';
import { UserChooseItem2Component } from './user-choose/user-choose-item.component';
import { CoordonneeChooseMultiItem2Component } from './coordonnee-choose/coordonnee-choose-multi-item2.component';
import { CoordonneeChooseItem2Component } from './coordonnee-choose/coordonnee-choose-item.component';
import { UserSelectComponent } from './user-select/user-select.component';
import { ChooseMultiItemBaseComponent } from './multi/choose-multi-item-base.component';
import { ChooseStateComponent } from './choose-state/choose-state.component';

@NgModule({
    declarations: [
        ChooseMultiItem2Component,
        ChooseItem2Component,
        ChooseMultiItemBaseComponent,
        UserChooseMultiItem2Component,
        UserChooseItem2Component,
        UserSelectComponent,
        CoordonneeChooseMultiItem2Component,
        CoordonneeChooseItem2Component,
        ChooseStateComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        ChooseMultiItem2Component,
        ChooseItem2Component,
        UserChooseMultiItem2Component,
        ChooseMultiItemBaseComponent,
        UserChooseItem2Component,
        UserSelectComponent,
        CoordonneeChooseMultiItem2Component,
        CoordonneeChooseItem2Component,
        ChooseStateComponent
    ],
    entryComponents: [
        ChooseMultiItem2Component,
        ChooseItem2Component,
        UserChooseMultiItem2Component,
        UserChooseItem2Component,
        CoordonneeChooseMultiItem2Component,
        CoordonneeChooseItem2Component,
        UserSelectComponent,
        ChooseMultiItemBaseComponent,
        ChooseStateComponent
    ]
})
export class ChooseItemModule {

}