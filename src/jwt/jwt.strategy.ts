import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../jwt/jwt.constant';
import { UserService } from '../user/user.service'; // Import your user service

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // The `payload` will contain the decoded JWT token
    // You can use this data to find the user from your database
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      // If user not found, you can throw an unauthorized exception
      // or handle it based on your application's requirements
    }
    return user;
  }
}
