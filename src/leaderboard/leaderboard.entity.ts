import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
// import { Account } from 'src/account/account.entity';
import { Player } from 'src/player/player.entity';

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

  @Column()
  playerId: number;

  @ManyToOne(() => Player, (player) => player.leaderboards)
  player: Player;
}
