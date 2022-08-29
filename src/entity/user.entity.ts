import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PresetEntity } from './preset.entity';

@Entity({ name: 'user_' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => PresetEntity, preset => preset.user)
  presets!: PresetEntity[];
}
