import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'preset' })
export class PresetEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'created_at' })
  createdAt!: Date;
}
