import { dbDataSource } from '../config/db-data-source';

export async function clearPresetTable(): Promise<void> {
  await dbDataSource.createEntityManager().query('TRUNCATE TABLE preset CASCADE;');
}

export async function clearUserTable(): Promise<void> {
  await dbDataSource.createEntityManager().query('TRUNCATE TABLE user_ CASCADE;');
}
