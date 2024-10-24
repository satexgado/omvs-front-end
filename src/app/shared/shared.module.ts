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
import { ShortenPipe, CapitalizeFirstPipe, SlugifyPipe, ReplaceBarPipe, ShortNumberPipe, SortByPipe, RemoveBarPipe } from './pipes';
import { ColorPickerModule } from 'ngx-color-picker';
import { CallbackPipe } from './pipes/callback.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule as SharedOppo } from 'src/app/shared-module/shared.module';


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
    FormatFileSizePipe
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
    SharedOppo
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    FormatFileSizePipe
  ]
})
export class SharedModule {

}
