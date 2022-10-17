import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Leaderboard } from 'src/leaderboard/leaderboard.entity';

@Entity('account')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'Account PK',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  device_token: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    default: 'player',
  })
  type: string;

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.account)
  leaderboards: Leaderboard[];
}
