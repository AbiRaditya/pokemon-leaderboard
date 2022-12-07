import { UseGuards, Controller, Post, Request, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller(`login`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post()
  login(@Request() req: { user: { username: string; password: string } }) {
    return this.authService.login(req.user);
  }
}
