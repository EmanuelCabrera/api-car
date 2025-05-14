import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from '@/jwt/enums/roles.enum';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const userData = {
      email: emails[0].value,
      name: name.givenName,
      surname: name.familyName,
      picture: photos[0].value,
      role: UserRole.CUSTOMER,
      provider: 'facebook',
      password: null,
    };

    try {
      let user = await this.prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: userData,
        });
      }

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
} 