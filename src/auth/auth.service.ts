import {
  Injectable,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { CreateLoginDto } from 'src/login/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

import passwordEncDec from 'src/helpers/Bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async validateUser(
    username: string,
    password: string,
  ): Promise<CreateLoginDto | null> {
    const account = await this.accountService.findOne(username);

    if (account) {
      const isPasswordCorrect = await passwordEncDec.comparePassword(
        password,
        account.password,
      );
      if (isPasswordCorrect) {
        return new CreateLoginDto(account);
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
