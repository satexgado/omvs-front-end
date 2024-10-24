import { FournisseurFactory } from 'src/app/core/services/logistique/fournisseur';
import { IFournisseur } from 'src/app/core/models/logistique/fournisseur';
import { ResourceScrollableHelper } from 'src/app/shared/state/resource.scrollable.helper';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CacheService } from 'src/app/shared/services';
import { QueryOptions, Filter, Sort } from 'src/app/shared/models/query-options';


@Component({
  selector: 'app-logistique-fournisseur-sidebar',
  templateUrl: 'fournisseur-sidebar.component.html'
})

export class FournisseurSidebarComponent implements OnInit {

  @Output() selectedFournisseur = new EventEmitter<IFournisseur>();
  parentData: {relationName: string,relationId: number} = null;
  fournisseurHelper: ResourceScrollableHelper;
  selectedFournisseurId: number;
  constructor(
    protected cacheService: CacheService,
  ) {}

  ngOnInit() {
    this.cacheService.get('affectation-parent').subscribe(
      (data: {relationName: string,relationId: number})=>{
        const queryOptions = new QueryOptions(
          [
            {or: false, filters: [new Filter(`${data.relationName}_by_id`, data.relationId, 'eq')]}
          ],
          ['visi_type_fournisseur_materiel', 'fournisseur_inscription']
        );
        this.parentData = data;
        this.fournisseurHelper = new ResourceScrollableHelper(new FournisseurFactory(), queryOptions);
        this.fournisseurHelper.withoutPaginate = true;
        this.fournisseurHelper.loadData();
      }
    )
  }

  onSetSelected(fournisseur: IFournisseur) {
    if(this.selectedFournisseurId && this.selectedFournisseurId == fournisseur.id) {
      this.selectedFournisseurId = null;
      this.selectedFournisseur.emit(null);
      return;
    }
    this.selectedFournisseurId = fournisseur.id;
    this.selectedFournisseur.emit(fournisseur);
  }
}
