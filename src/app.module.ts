import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'leaderboard-pokemon',
      entities: [Account, Leaderboard, Player],
      synchronize: true,
    }),
    AccountModule,
    LeaderboardModule,
    PlayerModule,
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
