import 'reflect-metadata';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// TODO: get values from config
export const dbDataSourceOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5436,
  username: 'postgres',
  password: 'secret',
  database: 'postgres',
  entities: ['src/entity/*-entity.ts'],
  synchronize: true,
  logging: false
};
