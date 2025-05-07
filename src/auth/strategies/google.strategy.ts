import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from '@/jwt/enums/roles.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const userData = {
      email: emails[0].value,
      name: name.givenName,
      surname: name.familyName,
      picture: photos[0].value,
      role: UserRole.CUSTOMER,
      provider: 'google',
      password: null
    };

    // Check if user exists in database
    let dbUser = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    // If user doesn't exist, create new user
    if (!dbUser) {
      dbUser = await this.prisma.user.create({
        data: userData,
      });
    }

    done(null, dbUser);
  }
} 