import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Account } from './account/account.entity';
import { Leaderboard } from './leaderboard/leaderboard.entity';
import { Player } from './player/player.entity';

import { AccountModule } from './account/account.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { QuizModules } from './quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'leaderboard-pokemon.c6zsylxpudzb.ap-southeast-1.rds.amazonaws.com',
      // host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Account, Leaderboard, Player],
      synchronize: true,
    }),
    AccountModule,
    LeaderboardModule,
    PlayerModule,
    QuizModules,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
