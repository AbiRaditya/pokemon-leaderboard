import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from 'src/account/account.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from './constants';

console.log(
  jwtConstants.secret,
  '->>',
  process.env.JWT_SECRET,
  process.env.secret,
  'process.env.JWT_SECRET',
);
const secret = 'secretawdawdawdaw';
@Module({
  imports: [
    AccountModule,
    PassportModule,
    // JwtModule.register({
    //   secret: secret,
    //   //   secretOrPrivateKey: secret,
    //   // signOptions: { expiresIn: '60s' },
    // }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        console.log(
          config.get<string>('SECRET'),
          'hello',
          config.get<string | number>('JWT_EXPIRATION_TIME'),
        );
        return {
          secret: config.get<string>('SECRET'),
          // secretOrPrivateKey: config.get<string>('SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
