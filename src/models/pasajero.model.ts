import {Entity, model, property, hasOne} from '@loopback/repository';
import {Avion} from './avion.model';

@model()
export class Pasajero extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @hasOne(() => Avion)
  avion: Avion;

  constructor(data?: Partial<Pasajero>) {
    super(data);
  }
}

export interface PasajeroRelations {
  // describe navigational properties here
}

export type PasajerpWithRelations = Pasajero & PasajeroRelations;
