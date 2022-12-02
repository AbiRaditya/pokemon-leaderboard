import { Module } from '@nestjs/common';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { QuizController } from './quiz.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [LeaderboardModule, HttpModule],
  //   providers: [LeaderboardService],
  controllers: [QuizController],
})
export class QuizModules {}
