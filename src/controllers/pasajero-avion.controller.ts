import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pasajero,
  Avion,
} from '../models';
import {PasajeroRepository} from '../repositories';

export class PasajeroAvionController {
  constructor(
    @repository(PasajeroRepository) protected pasajeroRepository: PasajeroRepository,
  ) { }

  @get('/pasajeros/{id}/avion', {
    responses: {
      '200': {
        description: 'Pasajero has one Avion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Avion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Avion>,
  ): Promise<Avion> {
    return this.pasajeroRepository.avion(id).get(filter);
  }

  @post('/pasajeros/{id}/avion', {
    responses: {
      '200': {
        description: 'Pasajero model instance',
        content: {'application/json': {schema: getModelSchemaRef(Avion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pasajero.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {
            title: 'NewAvionInPasajero',
            exclude: ['id'],
            optional: ['pasajeroId']
          }),
        },
      },
    }) avion: Omit<Avion, 'id'>,
  ): Promise<Avion> {
    return this.pasajeroRepository.avion(id).create(avion);
  }

  @patch('/pasajeros/{id}/avion', {
    responses: {
      '200': {
        description: 'Pasajero.Avion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {partial: true}),
        },
      },
    })
    avion: Partial<Avion>,
    @param.query.object('where', getWhereSchemaFor(Avion)) where?: Where<Avion>,
  ): Promise<Count> {
    return this.pasajeroRepository.avion(id).patch(avion, where);
  }

  @del('/pasajeros/{id}/avion', {
    responses: {
      '200': {
        description: 'Pasajero.Avion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Avion)) where?: Where<Avion>,
  ): Promise<Count> {
    return this.pasajeroRepository.avion(id).delete(where);
  }
}
