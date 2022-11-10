import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from 'src/account/account.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from './constants';

console.log(
  jwtConstants.secret,
  '->>',
  process.env.JWT_SECRET,
  'process.env.JWT_SECRET',
);
const secret = 'secretawdawdawdaw';
@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: secret,
      //   secretOrPrivateKey: secret,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
