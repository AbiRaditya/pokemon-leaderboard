import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
} from 'typeorm';
// import { Leaderboard } from 'src/leaderboard/leaderboard.entity';

@Entity('account')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'Account PK',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    // select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    default: 'staff',
  })
  type: string;

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

  // @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.account)
  // leaderboards: Leaderboard[];
}
