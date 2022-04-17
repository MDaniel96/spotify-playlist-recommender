import 'reflect-metadata';
import { DataSource } from 'typeorm';

// TODO: get values from config
export const dbDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5436,
  username: 'postgres',
  password: 'secret',
  database: 'postgres',
  entities: ['src/entity/*-entity.ts'],
  synchronize: true,
  logging: false
});
