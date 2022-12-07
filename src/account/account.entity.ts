import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  // OneToMany,
} from 'typeorm';
import passwordEncDec from 'src/helpers/Bcrypt';
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

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInster(): Promise<void> {
    this.password = await passwordEncDec.encrypt(this.password);
  }

  // @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.account)
  // leaderboards: Leaderboard[];
}
