import { getRepository, Repository } from 'typeorm';

import Specification from '@modules/cars/infra/typeorm/entities/Specification';
import ISpecificationsRepository, {
  ICreateSpecification,
} from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  async create({
    name,
    description,
  }: ICreateSpecification): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }
}

export default SpecificationsRepository;