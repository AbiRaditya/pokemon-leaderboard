import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaderboard } from './leaderboard.entity';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Leaderboard])],
  providers: [LeaderboardService],
  controllers: [LeaderboardController],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
