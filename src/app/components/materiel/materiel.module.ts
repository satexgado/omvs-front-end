import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { Routes, RouterModule} from '@angular/router';
//COMPONENTS
import { StockComponent } from './stock/stock.component';
import { AddMaterielComponent } from './add-materiel/add-materiel.component';
import { PluginModule } from 'src/app/plugin/plugin.module';

const appRoute: Routes = [
  { path: '', component: StockComponent },
  { path: 'stock', component: StockComponent },
  { path: 'stock/page/:page', component: StockComponent },
];

@NgModule({
  declarations: [StockComponent, AddMaterielComponent],
  imports: [
    SharedModule,
    PluginModule,
    RouterModule.forChild(appRoute)
  ]
})

export class MaterielModule { }

