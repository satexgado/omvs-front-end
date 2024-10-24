import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent as DossierConducteurEditComponent } from '../../edit/edit.component';
import { ImageModalComponent } from 'src/app/shared/components/image-modal/image-modal.component';
import { AppTitleService } from 'src/app/shared/services';
import { IDossierConducteur } from 'src/app/core/models/transport/dossier-conducteur';

@Component({
  selector: 'app-dossier-conducteur-details-edit',
  templateUrl: './dossier-conducteur-details-edit.component.html'
})
export class DossierConducteurDetailsEditComponent implements OnInit {

    subscription: Subscription = new Subscription();
    dossierconducteur: IDossierConducteur;
    arreter = "j'ai arreté";
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        protected titleService: AppTitleService,
        protected modalService: NgbModal
    ) { }

    ngOnInit() {
        let sub = this.route.data
        .subscribe((data: { dossierconducteur: IDossierConducteur }) =>
          {
            if(!data.dossierconducteur)
            {
              this.router.navigate(['/transport/mes-conducteurs']);
              return;
            }
            this.dossierconducteur = data.dossierconducteur;
            this.titleService.setTitle(this.dossierconducteur.conducteur.nom_complet);
          });
    }

    onUpdateForm() {
        const modalRef = this.modalService.open(DossierConducteurEditComponent, { size: 'lg', centered: true,  backdrop: 'static' });
        modalRef.componentInstance.title = 'Modifier';
        modalRef.componentInstance.item = this.dossierconducteur;
        modalRef.componentInstance.isUpdating = true;
        modalRef.componentInstance.newItem.subscribe(
            (data)=>{
            this.dossierconducteur = data[0];
            }
        )
    }

    onImageModal(image) {
      const modalRef = this.modalService.open(ImageModalComponent, { size: 'lg', centered: true,  backdrop: 'static' });
      modalRef.componentInstance.images_url = [this.dossierconducteur.conducteur.avatar];
      modalRef.componentInstance.current_image = image;
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
        this.dossierconducteur = null;
    }

}
