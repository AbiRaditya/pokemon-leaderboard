import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt';

import { CreateLoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(createLoginDto: CreateLoginDto) {}
}
