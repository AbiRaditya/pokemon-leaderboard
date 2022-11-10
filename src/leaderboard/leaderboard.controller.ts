import {
  Body,
  Controller,
  //   Delete,
  Get,
  Logger,
  //   Param,
  Post,
  //   ParseIntPipe,
} from '@nestjs/common';
import { CreateLeaderboardDto } from './dto/leaderboard.dto';
import { Leaderboard } from './leaderboard.entity';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}
  @Post()
  async create(
    @Body() createLeaderBoradDto: CreateLeaderboardDto,
  ): Promise<Leaderboard> {
    Logger.log(createLeaderBoradDto, 'createLeaderBoradDto');
    const response = await this.leaderboardService.create(createLeaderBoradDto);
    return response;
  }

  @Get()
  findAll(): Promise<Leaderboard[]> {
    return this.leaderboardService.findAll();
  }
}
