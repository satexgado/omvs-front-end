import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CacheService } from "src/app/shared/services";
import { IMateriel } from "src/app/core/models/materiel";
import { MaterielService } from "src/app/services/materiel.service";
import { map } from "rxjs/operators";
import { EditableListComponent } from "src/app/shared";
import { MaterielFormComponent } from "../materiel-form/materiel-form.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ResourceScrollableHelper } from "src/app/shared/state";
import { DefaultQueryOptionWithInsAndSeachString, DefaultQueryOptionWithSeachString, QueryOptions, Sort } from "src/app/shared/models/query-options";
import { MaterielFactory } from "src/app/core/services/materiel";

@Component({
  selector: "app-logistique-materiel-sidebar",
  templateUrl: "materiel-sidebar.component.html",
  styles: [
    `
      .card .card-header {
        color: #343a40;
        background-color: #fff;
        align-items: center;
        padding: 0.75rem 0.9375rem;
        text-decoration: none !important;
        border-bottom: 1px solid rgba(230, 230, 230, 0.7);
        outline: 0 !important;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
      }

      .card .card-header.card-header-inverse {
        background: #1a1a1a;
        color: #fff;
      }

      .card .card-header.card-header-inverse .card-header-title {
        font-weight: 600;
      }

      .card .card-header.card-header-inverse.card-header-with-tabs {
        border-bottom: 1px solid #343a40;
      }

      .card .card-header.card-header-inverse .card-header-tabs {
        border: 0;
      }

      .card
        .card-header.card-header-inverse
        .card-header-tabs
        .nav-link.active {
        background: #fff;
        border-color: transparent;
      }

      .card .card-header.card-header-inverse .card-header-tabs .nav-link:focus,
      .card .card-header.card-header-inverse .card-header-tabs .nav-link:hover {
        border-color: transparent;
      }

      .card .card-header.card-header-with-tabs {
        border-bottom: 1px solid #ccc;
      }

      .card .card-header .card-header-tabs {
        border: 0;
      }

      .card .card-header .card-header-tabs .nav-link.active {
        background: #fff;
      }

      .card .card-header .card-header-title {
        color: #001737;
        font-size: 14px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        margin: 0;
        text-transform: capitalize;
        font-family: "Trebuchet MS", sans-serif;
      }

      .card .card-header .card-header-btn {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
      }

      .card .card-header .card-header-btn .btn {
        padding: 0;
        width: 1.125rem;
        height: 1.125rem;
        line-height: 1rem;
        -webkit-border-radius: 0.1rem;
        -moz-border-radius: 0.1rem;
        -o-border-radius: 0.1rem;
        -ms-border-radius: 0.1rem;
        border-radius: 0.1rem;
      }

      .card .card-header .card-header-btn .btn + .btn {
        margin-left: 0.3125rem;
      }

      .card .card-body {
        -webkit-box-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
      }

      .card .card-footer,
      .card .card-loader {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
      }

      .card .card-footer {
        padding: 0.75rem 0.9375rem;
        background: #f2f2f2;
        border: 0;
      }

      .card .card-loader {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1020;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 0.375rem;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
      }

      .card .card-loader.card-loader-inverse {
        background: rgba(0, 0, 0, 0.9);
      }

      .card.card-inverse {
        background: #333;
      }

      .card.card-expand {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1060;
        border-radius: 0;
        margin: 0 !important;
      }

      .card.card-expand.card-loading {
        position: fixed;
      }

      .card.card-expand .card-body,
      .card.card-expand .card-header {
        border-radius: 0;
      }

      .card.card-expand .card-body {
        -webkit-box-flex: 1 0 0;
        -ms-flex: 1 0 0;
        flex: 1 0 0;
      }

      .card.card-loading .card-header {
        position: relative;
        z-index: 1030;
      }

      .card.card-loading,
      .card.card-loading .card-body {
        position: relative;
      }
    `,
  ],
})
export class MaterielSidebarComponent extends EditableListComponent {
  @Output() selectedMateriel = new EventEmitter<IMateriel>();
  parentData: { relationName: string; relationId: number } = null;
  selectedMaterielId: number;
  editModal = MaterielFormComponent;
  
  constructor(
      protected modalService: NgbModal) {
      super(
        new ResourceScrollableHelper(new MaterielFactory(),
            new QueryOptions().setSort([new Sort('name','ASC')])
        )
      );
      this.modalService = modalService;
      this.dataHelper.withoutPaginate = true;
    }   

  onSetSelected(materiel: IMateriel) {
    if (this.selectedMaterielId && this.selectedMaterielId == materiel.id) {
      this.selectedMaterielId = null;
      this.selectedMateriel.emit(null);
      return;
    }
    this.selectedMaterielId = materiel.id;
    this.selectedMateriel.emit(materiel);
  }

  trackByFn(index, item) {
    return item.id; // or index
  }
}
