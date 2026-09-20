import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService, private readonly config: ConfigService) {}
  async register(email: string, password: string, name: string, role: 'CANDIDATE' | 'RECRUITER' = 'CANDIDATE') {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await this.prisma.user.create({ data: { email, passwordHash, name, role } });
    return this.tokens(user.id, user.email, user.role);
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw new UnauthorizedException('Invalid credentials');
    return this.tokens(user.id, user.email, user.role);
  }
  private tokens(id: string, email: string, role: string) {
    const payload = { sub: id, email, role };
    return { accessToken: this.jwt.sign(payload, { secret: this.config.getOrThrow('JWT_ACCESS_SECRET'), expiresIn: '15m' }), refreshToken: this.jwt.sign(payload, { secret: this.config.getOrThrow('JWT_REFRESH_SECRET'), expiresIn: '7d' }) };
  }
}
