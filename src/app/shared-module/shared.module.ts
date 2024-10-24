import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//COMPONENTS
import { PaginationComponent } from './pagination/pagination.component';

// SERVICES
import { TranslateModule } from '@ngx-translate/core';
import { PopoverModule } from "ngx-smart-popover";

//DOWNLOADED
import { SelectDropDownModule } from 'ngx-select-dropdown';

//CREATED
import { AffectateurComponent } from './affectateur/affectateur.component';
import { AgePipe } from '../pipes/age.pipe';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HelperMenuComponent } from './helper-menu/helper-menu.component';
import { NodataComponent } from './nodata/nodata.component';
import { LoadingComponent } from './loading/loading.component';
import { TruncateStrPipe } from '../pipes/truncate-str.pipe';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { DragDropDirective } from './file-manager/dragfile.directive';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { TranlateObjectPipe } from '../pipes/tranlate-object.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PopoverModule,
    SelectDropDownModule
  ],
  declarations: [
    PaginationComponent, AgePipe, TruncateStrPipe, TranlateObjectPipe, DragDropDirective, AffectateurComponent, FileManagerComponent,
    FooterComponent, HeaderComponent, SidebarComponent, HelperMenuComponent,
    NodataComponent, LoadingComponent, InlineEditComponent],

  exports: [PaginationComponent, AffectateurComponent, FileManagerComponent, FooterComponent, HeaderComponent, SidebarComponent,
    CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, HelperMenuComponent,
    RouterModule, TranslateModule, NodataComponent, LoadingComponent,
    AgePipe, DragDropDirective, PopoverModule, SelectDropDownModule, TruncateStrPipe, TranlateObjectPipe,
    SidebarComponent,
  ]
})
export class SharedModule { }
