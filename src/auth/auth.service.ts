
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private revokedTokens: Set<string> = new Set();

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      name: user.name,
      surname: user.surname,
      picture: user.picture,
      role: user.role
    };


    // Generar token con duración de 15 minutos
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });

    return {
      access_token,

      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        picture: user.picture,
        role: user.role,
        provider: user.provider
      }
    };
  }

  async renewToken(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const payload = {
        email: user.email,
        sub: user.id,
        name: user.name,
        surname: user.surname,
        picture: user.picture,
        role: user.role
      };

      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '15m' })
      };
    } catch (error) {
      throw new UnauthorizedException('Error renewing token');
    }
  }

  revokeToken(token: string) {
    this.revokedTokens.add(token);
  }

  isTokenRevoked(token: string): boolean {
    return this.revokedTokens.has(token);
  }

} 