import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth/jwt')
export class AuthController {
  constructor(private readonly jwtService: JwtService,private readonly userService: UserService ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    console.log(loginDto);
    const user = await this.userService.userLogin(loginDto);
    // Unificar el payload: usar 'sub' como identificador estándar JWT
    const token = this.jwtService.signPayload({ sub: user.id, name: user.name, role: user.role });
    return { token };
  }
}