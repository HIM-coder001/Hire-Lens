import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwt: JwtService, private readonly config: ConfigService) {}
  canActivate(context: ExecutionContext) { const request = context.switchToHttp().getRequest(); const header = request.headers.authorization; if (!header?.startsWith('Bearer ')) throw new UnauthorizedException(); try { request.user = this.jwt.verify(header.slice(7), { secret: this.config.getOrThrow('JWT_ACCESS_SECRET') }); return true; } catch { throw new UnauthorizedException(); } }
}
