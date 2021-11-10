import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pasajero, PasajeroRelations, Avion} from '../models';
import {AvionRepository} from './avion.repository';

export class PasajeroRepository extends DefaultCrudRepository<
  Pasajero,
  typeof Pasajero.prototype.id,
  PasajeroRelations
> {

  public readonly avion: HasOneRepositoryFactory<Avion, typeof Pasajero.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AvionRepository') protected avionRepositoryGetter: Getter<AvionRepository>,
  ) {
    super(Pasajero, dataSource);
    this.avion = this.createHasOneRepositoryFactoryFor('avion', avionRepositoryGetter);
    this.registerInclusionResolver('avion', this.avion.inclusionResolver);
  }
}
