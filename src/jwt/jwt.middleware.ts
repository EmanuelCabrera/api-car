import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService ) {}
  
  use(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.validToken(accessToken);
      req['user'] = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
