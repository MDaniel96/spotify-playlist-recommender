import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from '../config';

export const dbDataSource = new DataSource(config.connectionOptions);
