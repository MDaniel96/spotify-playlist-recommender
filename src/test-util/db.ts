import { dbDataSource } from '../config/db-data-source';
import { PresetEntity } from '../entity/preset.entity';
import { UserEntity } from '../entity/user.entity';

export async function clearPresetTable(): Promise<void> {
  await dbDataSource.createEntityManager().query('TRUNCATE TABLE preset CASCADE;');
}

export async function clearUserTable(): Promise<void> {
  await dbDataSource.createEntityManager().query('TRUNCATE TABLE user_ CASCADE;');
}

export async function insertPresetToDb(preset: PresetEntity): Promise<PresetEntity> {
  const repository = dbDataSource.getRepository(PresetEntity);
  return await repository.save(preset);
}

export async function insertUserToDb(user: UserEntity): Promise<UserEntity> {
  const repository = dbDataSource.getRepository(UserEntity);
  return await repository.save(user);
}

export async function getFirstPresetFromDb(): Promise<PresetEntity | null> {
  const repository = dbDataSource.getRepository(PresetEntity);
  return await repository.findOne({ where: {}, relations: { user: true } });
}

export async function countPresetsInDb(): Promise<number> {
  const repository = dbDataSource.getRepository(PresetEntity);
  return await repository.count();
}
