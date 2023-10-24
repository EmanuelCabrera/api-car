import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../jwt/jwt.constant' 

@Injectable()
export class JwtService {
  signPayload(payload: any): string {
    return jwt.sign(payload, jwtConstants.secret, { expiresIn: jwtConstants.expiresIn, algorithm: 'HS256' });
  }
  validToken(token: string){
    return jwt.verify(token, jwtConstants.secret, { algorithms: ['HS256'] }); 
  }
}
