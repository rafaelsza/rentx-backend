import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSpecificationsCars1629852082992
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKSpecificationCar',
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        columnNames: ['specification_id'],
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKCarSpecification',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKCarSpecification',
    );
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKSpecificationCar',
    );
    await queryRunner.dropTable('specifications_cars');
  }
}
