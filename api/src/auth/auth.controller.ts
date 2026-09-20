import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
import { Response } from 'express';
import { AuthService } from './auth.service';

class AuthDto { @IsEmail() email!: string; @IsString() @MinLength(12) password!: string; }
class RegisterDto extends AuthDto { @IsString() name!: string; @IsIn(['CANDIDATE', 'RECRUITER']) role!: 'CANDIDATE' | 'RECRUITER'; }
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('register') register(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response) { return this.issue(response, this.auth.register(dto.email, dto.password, dto.name, dto.role)); }
  @Post('login') login(@Body() dto: AuthDto, @Res({ passthrough: true }) response: Response) { return this.issue(response, this.auth.login(dto.email, dto.password)); }
  private async issue(response: Response, result: Promise<{ accessToken: string; refreshToken: string }>) { const tokens = await result; response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 }); return { accessToken: tokens.accessToken }; }
}
