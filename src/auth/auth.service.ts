import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      name: user.name,
      surname: user.surname,
      picture: user.picture
    };

    return {
      access_token: this.jwtService.sign(payload),
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
} 