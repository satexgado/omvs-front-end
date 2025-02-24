import { FormatFileSizePipe } from './pipes/format-file-size.pipe';
import { DateagoPipe } from './pipes/dateago.pipe';
import { DateagoPipeFr } from './pipes/dateagofr.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificationModule } from './notification';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TreeviewModule } from 'ngx-treeview';
import { Select2Directive, Select2DefaultDirective, SelectFirstOptionDirective, NgbdSortableHeader } from './directives';
import { ColorPickerModule } from 'ngx-color-picker';
import { CallbackPipe } from './pipes/callback.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule as SharedOppo } from 'src/app/shared-module/shared.module';

import {
  ShortenPipe,
  CapitalizeFirstPipe,
  SlugifyPipe,
  ReplaceBarPipe,
  ShortNumberPipe,
  SortByPipe,
  RemoveBarPipe,
  SearchFilterPipe,
  FichierTypeFilterPipe,
  CountPipe,
  SelectedSortPipe,
  SearchFilterObsPipe,
  BaseColumnIdFilterPipe,
  ConvertToArrayPipe,
  BaseColumnFilterPipe
} from './pipes';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  declarations: [
    Select2Directive,
    Select2DefaultDirective,
    SelectFirstOptionDirective,
    NgbdSortableHeader,
    ShortenPipe,
    CapitalizeFirstPipe,
    SlugifyPipe,
    ReplaceBarPipe,
    RemoveBarPipe,
    ShortNumberPipe,
    SortByPipe,
    CallbackPipe,
    DateagoPipeFr,
    DateagoPipe,
    FormatFileSizePipe,
    SearchFilterPipe,
  FichierTypeFilterPipe,
  CountPipe,
  SelectedSortPipe,
  SearchFilterObsPipe,
  BaseColumnIdFilterPipe,
  ConvertToArrayPipe,
  BaseColumnFilterPipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ColorPickerModule,
    NotificationModule,
    // CKEditorModule,
    TreeviewModule,
    InfiniteScrollModule,
    AngularMultiSelectModule,
    SharedOppo
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    SharedOppo,
    Select2Directive,
    Select2DefaultDirective,
    SelectFirstOptionDirective,
    NgbdSortableHeader,
    NgbModule,
    ShortenPipe,
    CapitalizeFirstPipe,
    SlugifyPipe,
    ReplaceBarPipe,
    ShortNumberPipe,
    SortByPipe,
    RemoveBarPipe,
    RouterModule,
    ColorPickerModule,
    // CKEditorModule,
    TreeviewModule,
    InfiniteScrollModule,
    CallbackPipe,
    DateagoPipeFr,
    DateagoPipe,
    FormatFileSizePipe,
    FichierTypeFilterPipe,
    CountPipe,
    SelectedSortPipe,
    SearchFilterObsPipe,
    BaseColumnIdFilterPipe,
    ConvertToArrayPipe,
    BaseColumnFilterPipe,
    SearchFilterPipe
  ]
})
export class SharedModule {

}
