import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Avion,
  Pasajero,
} from '../models';
import {AvionRepository} from '../repositories';

export class AvionPasajeroController {
  constructor(
    @repository(AvionRepository)
    public avionRepository: AvionRepository,
  ) { }

  @get('/avions/{id}/pasajero', {
    responses: {
      '200': {
        description: 'Pasajero belonging to Avion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pasajero)},
          },
        },
      },
    },
  })
  async getPasajero(
    @param.path.string('id') id: typeof Avion.prototype.id,
  ): Promise<Pasajero> {
    return this.avionRepository.pasajero(id);
  }
}
