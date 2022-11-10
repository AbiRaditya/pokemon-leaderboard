import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService, AuthService, JwtService],
  controllers: [AccountController],
  exports: [AccountService, AuthService],
})
export class AccountModule {}
