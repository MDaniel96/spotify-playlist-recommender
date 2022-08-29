import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'preset' })
export class PresetEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => UserEntity, user => user.presets)
  user!: UserEntity;

  @Column({ name: 'created_at' })
  createdAt!: Date;
}
