import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// set locale language
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
// FOR CHART
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// PROVIDERS
import { AppInjector } from './services/injector';
import { AccountGuard } from './services/account/accountGuard.service';
import { BaseService } from './services/base.service';
import { UserService } from './services/account/user.service';
import { PaysService } from './services/pays.service';
import { VilleService } from './services/ville.service';
import { MaterielService } from './services/materiel.service';
import { DepartementService } from './services/departement.service';
import { PosteService } from './services/poste.service';
import { PersonnelService } from './services/personnel.service';
import { TypeMissionService } from './services/type-mission.service';
import { MissionService } from './services/mission.service.';
import { FileManagerService } from './shared-module/file-manager/file-manager.service';
import { ChargeService } from './services/charge.service';
import { EquipeService } from './services/equipe.service';
import { EquipementService } from './services/equipement.service';
import { ItineraireService } from './services/itineraire.service';
import { RapportQuotidienService } from './services/rapport-quotidien.service';
import { AngularEditorService } from '@kolkov/angular-editor';
import { RapportFinalService } from './services/rapport-final.service';
import { EvaluationService } from './services/evaluation.service';
import { ObjectionService } from './services/objection.service';
import { ArchiveService } from './services/archive.service';
import { RoleService } from './services/role.service';
import { ImputationService } from './services/imputation.service';
import { NoteService } from './services/note.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SnotifyModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    AppInjector,
    SnotifyService,
    AccountGuard, FileManagerService, UserService, PaysService, VilleService,
    MaterielService, DepartementService, PosteService, PersonnelService,
    TypeMissionService, MissionService, ChargeService, EquipeService, EquipementService,
    ItineraireService, RapportQuotidienService, AngularEditorService, RapportFinalService,
    EvaluationService, ObjectionService, ArchiveService, RoleService, ImputationService,
    NoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation FOR ngx-translate
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}