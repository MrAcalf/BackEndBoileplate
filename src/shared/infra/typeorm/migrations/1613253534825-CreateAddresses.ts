import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAddresses1613253534825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'userId',
            type: 'uuid'
          },
          {
            name: 'zipCode',
            type: 'varchar'
          },
          {
            name: 'state',
            type: 'varchar'
          },
          {
            name: 'city',
            type: 'varchar'
          },
          {
            name: 'street',
            type: 'varchar'
          },
          {
            name: 'number',
            type: 'varchar'
          },
          {
            name: 'complement',
            type: 'varchar'
          },
          {
            name: 'lat',
            type: 'varchar'
          },
          {
            name: 'long',
            type: 'varchar'
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'AddressesUsers',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('addresses')
  }
}
