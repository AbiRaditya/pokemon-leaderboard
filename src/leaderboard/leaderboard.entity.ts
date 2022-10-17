import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Account } from 'src/account/account.entity';

@Entity('leaderboard')
export class Leaderboard extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'Leaderboard PK',
  })
  id: number;

  @Column({
    type: 'int',
  })
  type: number;

  @Column({
    type: 'int',
  })
  score: number;

  @ManyToOne(() => Account, (account) => account.leaderboards)
  account: Account;
}
