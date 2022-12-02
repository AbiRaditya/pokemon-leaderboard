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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Account, Leaderboard, Player],
        synchronize: true,
      }),
      inject: [ConfigService],
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
