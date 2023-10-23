
import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService,private readonly userService: UserService ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.userLogin(loginDto);
    // Assuming user credentials are valid, generate and return a JWT token
    const token = this.jwtService.signPayload({ userId: user.id, name: user.name, role: user.role});
    return { token };
  }
}