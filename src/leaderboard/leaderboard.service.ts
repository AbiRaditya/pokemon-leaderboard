import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateLeaderboardDto } from './dto/leaderboard.dto';
import { Leaderboard } from './leaderboard.entity';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Leaderboard)
    private readonly leaderboardRepository: Repository<Leaderboard>,
  ) {}
  async create(
    createLeaderboardDto: CreateLeaderboardDto,
    // , dataSource: DataSource
  ): Promise<Leaderboard> {
    const leaderboard = new Leaderboard();
    leaderboard.type = createLeaderboardDto.type;
    leaderboard.score = createLeaderboardDto.score;
    // leaderboard.account.id = createLeaderboardDto.accountId;
    // await dataSource.manager.save(leaderboard);
    await this.leaderboardRepository.save(Leaderboard);
    return;
  }
  async findAll(): Promise<Leaderboard[]> {
    return this.leaderboardRepository.find();
  }
}
