import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateLeaderboardDto } from './dto/leaderboard.dto';
import { Leaderboard } from './leaderboard.entity';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Leaderboard)
    private readonly leaderboardRepository: Repository<Leaderboard>,
    private readonly playerService: PlayerService,
  ) {}
  async create(
    createLeaderboardDto: CreateLeaderboardDto,
    device_token: string,
  ): Promise<Leaderboard | any> {
    if (!device_token) {
      throw { message: { message: 'token not found' } };
    }
    const player = await this.playerService.findByToken(device_token);
    // const player = await this.findByToken.find(device_token);
    // Logger.log('player find', JSON.stringify(player), device_token);

    if (!player) {
      throw { message: { message: `player doesn't exist` } };
    }

    const leaderboard = new Leaderboard();
    leaderboard.type = createLeaderboardDto.type;
    leaderboard.score = createLeaderboardDto.score;
    leaderboard.playerId = player.id;
    const response = await this.leaderboardRepository.save(leaderboard);
    return { ...response, player: { player_name: player.player_name } };
  }
  async findAll(device_token: string): Promise<Leaderboard[] | any> {
    let player: { id: number | string };
    if (device_token) {
      player = await this.playerService.findByToken(device_token);
    }
    // Logger.log('player2222', JSON.stringify(player));

    const playerId = player ? player.id : null;
    const queryBuild = this.leaderboardRepository
      .createQueryBuilder('leaderboard')
      .leftJoinAndSelect('leaderboard.player', 'player')
      .select(['leaderboard', 'player.player_name'])
      .orderBy('leaderboard.score', 'DESC')
      .addOrderBy('leaderboard.created_at', 'ASC')
      .take(10);

    if (playerId) {
      queryBuild.where('leaderboard.player = :playerId', { playerId });
    }

    return queryBuild.getMany();
  }
}
