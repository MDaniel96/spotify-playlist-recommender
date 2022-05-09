import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const dbDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_DB_HOST,
  port: Number(process.env.POSTGRES_DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: [process.env.POSTGRES_DB_ENTITIES || ''],
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
  logging: process.env.POSTGRES_LOGGING === 'true'
});
