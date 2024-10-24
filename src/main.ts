import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppInjector } from './app/services/injector';
import { AppInjector as inject2 } from './app/shared/services'; 
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef:any) => { AppInjector.setInjector(moduleRef.injector); inject2.setInjector(moduleRef.injector);  })
  .catch(err => console.error(err));