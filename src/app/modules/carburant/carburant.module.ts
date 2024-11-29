import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../../shared/shared.module';
import { DropdownSelectModule } from '../dropdown-select/dropdown-select.module';
import { CarburantComponent } from './carburant.component';
import { CarburantRoutingModule } from './carburant-routing.module';


@NgModule({
  declarations: [
    CarburantComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    CarburantRoutingModule,
    SharedModule,
    DropdownSelectModule
  ],
  exports: [
  ],
  providers: []
})
export class CarburantModule {

}
