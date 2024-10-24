import { DocumentPermi } from 'src/app/core/models/transport/document-permi';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DocumentPermiFactory extends Factory<DocumentPermi> {
  protected readonly endpoint: string = 'transport/document-permis';

  constructor() {
    super(DocumentPermi)
  }
}
