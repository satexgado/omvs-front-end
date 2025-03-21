import { ResourceScrollableHelper } from 'src/app/shared/state/resource.scrollable.helper';
import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/shared/services';
import { QueryOptions, Filter, Sort } from 'src/app/shared/models/query-options';
import { MaterielFactory } from 'src/app/core/services/materiel';
import { IMateriel } from 'src/app/core/models/materiel';

@Component({
  selector: 'app-logistique-materiel',
  templateUrl: 'materiel.component.html'
})

export class MaterielComponent implements OnInit {

  parentData: {relationName: string,relationId: number} = null;
  materielHelper: ResourceScrollableHelper;
  selectedMaterielId: number;
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
          [],
          8,
          1,
          [new Sort('libelle_materiel','ASC')]
        );
        this.parentData = data;
        this.materielHelper = new ResourceScrollableHelper(new MaterielFactory(), queryOptions);
        this.materielHelper.withoutPaginate = true;
        this.materielHelper.loadData();
      }
    )
  }

  onSetSelected(materiel: IMateriel) {
    this.selectedMaterielId = materiel ? materiel.id : null;
  }
}
