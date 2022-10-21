import {
  Body,
  Controller,
  //   Delete,
  Get,
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
  create(
    @Body() createLeaderBoradDto: CreateLeaderboardDto,
  ): Promise<Leaderboard> {
    return this.leaderboardService.create(createLeaderBoradDto);
  }

  @Get()
  findAll(): Promise<Leaderboard[]> {
    return this.leaderboardService.findAll();
  }
}
