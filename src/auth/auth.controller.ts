import { Controller, Get, Post, Req, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @Get('/refreshtoken')
  async refresh(@Headers() headers) {
    const { authorization } = headers;

    const token = authorization.split(' ')[1];

    const auth = await this.authService.refreshToken(token);

    return auth;
  }
}
