import {
  Injectable,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
// import { CreateLoginDto } from 'src/login/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

import passwordEncDec from 'src/helpers/Bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  async validateUser(
    username: string,
    password: string,
  ): Promise<{ username: string; password: string } | any> {
    const account = await this.accountService.findOne(username);
    Logger.log(JSON.stringify(account), 'account');
    if (account) {
      const isPasswordCorrect = await passwordEncDec.comparePassword(
        password,
        account.password,
      );
      if (isPasswordCorrect) {
        // account.
        return { username: account.username, id: account.id };
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
