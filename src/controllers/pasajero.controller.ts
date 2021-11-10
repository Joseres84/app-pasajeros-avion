import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pasajero} from '../models';
import {PasajeroRepository} from '../repositories';

export class PasajeroController {
  constructor(
    @repository(PasajeroRepository)
    public pasajeroRepository : PasajeroRepository,
  ) {}

  @post('/pasajeros')
  @response(200, {
    description: 'Pasajero model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pasajero)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pasajero, {
            title: 'NewPasajero',
            exclude: ['id'],
          }),
        },
      },
    })
    pasajero: Omit<Pasajero, 'id'>,
  ): Promise<Pasajero> {
    return this.pasajeroRepository.create(pasajero);
  }

  @get('/pasajeros/count')
  @response(200, {
    description: 'Pasajero model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pasajero) where?: Where<Pasajero>,
  ): Promise<Count> {
    return this.pasajeroRepository.count(where);
  }

  @get('/pasajeros')
  @response(200, {
    description: 'Array of Pasajero model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pasajero, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pasajero) filter?: Filter<Pasajero>,
  ): Promise<Pasajero[]> {
    return this.pasajeroRepository.find(filter);
  }

  @patch('/pasajeros')
  @response(200, {
    description: 'Pasajero PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pasajero, {partial: true}),
        },
      },
    })
    pasajero: Pasajero,
    @param.where(Pasajero) where?: Where<Pasajero>,
  ): Promise<Count> {
    return this.pasajeroRepository.updateAll(pasajero, where);
  }

  @get('/pasajeros/{id}')
  @response(200, {
    description: 'Pasajero model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pasajero, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pasajero, {exclude: 'where'}) filter?: FilterExcludingWhere<Pasajero>
  ): Promise<Pasajero> {
    return this.pasajeroRepository.findById(id, filter);
  }

  @patch('/pasajeros/{id}')
  @response(204, {
    description: 'Pasajero PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pasajero, {partial: true}),
        },
      },
    })
    pasajero: Pasajero,
  ): Promise<void> {
    await this.pasajeroRepository.updateById(id, pasajero);
  }

  @put('/pasajeros/{id}')
  @response(204, {
    description: 'Pasajero PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pasajero: Pasajero,
  ): Promise<void> {
    await this.pasajeroRepository.replaceById(id, pasajero);
  }

  @del('/pasajeros/{id}')
  @response(204, {
    description: 'Pasajero DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pasajeroRepository.deleteById(id);
  }
}
