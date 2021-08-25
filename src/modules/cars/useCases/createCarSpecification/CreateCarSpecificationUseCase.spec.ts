import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should not be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['23232'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Car description',
      daily_rate: 100.0,
      license_plate: 'ABC-1234',
      fine_amount: 200,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const specifications_id = ['23232'];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
