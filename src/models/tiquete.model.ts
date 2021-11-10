import {Entity, model, property} from '@loopback/repository';

@model()
export class Tiquete extends Entity {
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
  idavuelta: string;

  @property({
    type: 'string',
    required: true,
  })
  asiento: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  vendedor: string;

  @property({
    type: 'string',
    required: true,
  })
  fechasalida: string;

  @property({
    type: 'string',
    required: true,
  })
  horasalida: string;

  @property({
    type: 'string',
  })
  avionId?: string;

  constructor(data?: Partial<Tiquete>) {
    super(data);
  }
}

export interface TiqueteRelations {
  // describe navigational properties here
}

export type TiqueteWithRelations = Tiquete & TiqueteRelations;
