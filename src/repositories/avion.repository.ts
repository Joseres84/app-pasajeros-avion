import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Avion, AvionRelations, Pasajero, Tiquete} from '../models';
import {PasajeroRepository} from './pasajero.repository';
import {TiqueteRepository} from './tiquete.repository';

export class AvionRepository extends DefaultCrudRepository<
  Avion,
  typeof Avion.prototype.id,
  AvionRelations
> {

  public readonly pasajero: BelongsToAccessor<Pasajero, typeof Avion.prototype.id>;

  public readonly tiquete: HasOneRepositoryFactory<Tiquete, typeof Avion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PasajeroRepository') protected pasajeroRepositoryGetter: Getter<PasajeroRepository>, @repository.getter('TiqueteRepository') protected tiqueteRepositoryGetter: Getter<TiqueteRepository>,
  ) {
    super(Avion, dataSource);
    this.tiquete = this.createHasOneRepositoryFactoryFor('tiquete', tiqueteRepositoryGetter);
    this.registerInclusionResolver('tiquete', this.tiquete.inclusionResolver);
    this.pasajero = this.createBelongsToAccessorFor('pasajero', pasajeroRepositoryGetter,);
    this.registerInclusionResolver('pasajero', this.pasajero.inclusionResolver);
  }
}
