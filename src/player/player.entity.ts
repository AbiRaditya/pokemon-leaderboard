import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Leaderboard } from 'src/leaderboard/leaderboard.entity';

@Entity('player')
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'Player PK',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  device_token: string;

  @Column({
    unique: true,
    nullable: false,
  })
  player_name: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.player)
  leaderboards: Leaderboard[];
}
