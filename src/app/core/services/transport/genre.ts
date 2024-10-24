import { Genre } from './../../models/transport/genre';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class GenreFactory extends Factory<Genre> {
  protected readonly endpoint: string = 'transport/genres';

  constructor() {
    super(Genre)
  }
}
