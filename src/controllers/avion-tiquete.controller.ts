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
  Avion,
  Tiquete,
} from '../models';
import {AvionRepository} from '../repositories';

export class AvionTiqueteController {
  constructor(
    @repository(AvionRepository) protected avionRepository: AvionRepository,
  ) { }

  @get('/avions/{id}/tiquete', {
    responses: {
      '200': {
        description: 'Avion has one Tiquete',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tiquete),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tiquete>,
  ): Promise<Tiquete> {
    return this.avionRepository.tiquete(id).get(filter);
  }

  @post('/avions/{id}/tiquete', {
    responses: {
      '200': {
        description: 'Avion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tiquete)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Avion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tiquete, {
            title: 'NewTiqueteInAvion',
            exclude: ['id'],
            optional: ['avionId']
          }),
        },
      },
    }) tiquete: Omit<Tiquete, 'id'>,
  ): Promise<Tiquete> {
    return this.avionRepository.tiquete(id).create(tiquete);
  }

  @patch('/avions/{id}/tiquete', {
    responses: {
      '200': {
        description: 'Avion.Tiquete PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tiquete, {partial: true}),
        },
      },
    })
    tiquete: Partial<Tiquete>,
    @param.query.object('where', getWhereSchemaFor(Tiquete)) where?: Where<Tiquete>,
  ): Promise<Count> {
    return this.avionRepository.tiquete(id).patch(tiquete, where);
  }

  @del('/avions/{id}/tiquete', {
    responses: {
      '200': {
        description: 'Avion.Tiquete DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tiquete)) where?: Where<Tiquete>,
  ): Promise<Count> {
    return this.avionRepository.tiquete(id).delete(where);
  }
}
