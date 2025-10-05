import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@/jwt/guards/role.guard';
import { Role } from '@/jwt/decorators/role.decorator';
import { UserRole } from '@/jwt/enums/roles.enum';

@Controller('mail')
@UseGuards(JwtAuthGuard, RoleGuard)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('test')
  @Role(UserRole.ADMIN)
  async sendTestEmail(@Body('email') email: string) {
    return await this.mailService.sendTestEmail(email);
  }
} 