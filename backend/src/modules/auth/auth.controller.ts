import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from '../../common/guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  // Kicks off the Google OAuth handshake. GoogleAuthGuard returns a clear
  // 503 here instead of crashing if GOOGLE_CLIENT_ID/SECRET aren't set.
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {}

  // Google redirects back here; issue our own JWTs and hand off to the frontend.
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: any, @Res() res: Response) {
    const result = await this.authService.loginOrRegisterWithGoogle(req.user);
    const redirectUrl = new URL('/auth/callback', process.env.FRONTEND_URL || 'http://localhost:3000');
    redirectUrl.searchParams.set('accessToken', result.accessToken);
    redirectUrl.searchParams.set('refreshToken', result.refreshToken);
    res.redirect(redirectUrl.toString());
  }
}
