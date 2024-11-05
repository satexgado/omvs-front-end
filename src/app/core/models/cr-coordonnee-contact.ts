import { IBase } from 'src/app/core/models/base.interface';

export interface ICrCoordonneeContact extends IBase {
  email: string;
  statut: string;
  telephone: number;
  coordonnee_id: number;
}

export class CrCoordonneeContact implements ICrCoordonneeContact {
    id: number = 0;
    libelle: string = '';
    email = '';
    statut = '';
    telephone: number = 0;
    coordonnee_id: number = 0;
}