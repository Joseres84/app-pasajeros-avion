import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import { Pasajero, Tiquete } from '.';

@model()
export class Avion extends Entity {
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
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  aerolinea: string;

  @property({
    type: 'string',
    required: true,
  })
  destinosalida: string;

  @property({
    type: 'string',
    required: true,
  })
  destinollegada: string;

  @property({
    type: 'string',
    required: true,
  })
  clase: string;

  @property({
    type: 'string',
    required: true,
  })
  id_tiquete: string;

  @belongsTo(() => Pasajero)
  pasajeroId: string;

  @hasOne(() => Tiquete)
  tiquete: Tiquete;


  constructor(data?: Partial<Avion>) {
    super(data);
  }
}

export interface AvionRelations {
  // describe navigational properties here
}

export type AvionWithRelations = Avion & AvionRelations;
