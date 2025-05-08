import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '@/jwt/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Iniciar autenticación con Google' })
  @ApiResponse({ status: 302, description: 'Redirecciona a la página de autenticación de Google.' })
  async googleAuth() {
    // This route will redirect to Google's OAuth page
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Callback de autenticación con Google' })
  @ApiResponse({ status: 302, description: 'Redirecciona al frontend con el token de acceso.' })
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const result = await this.authService.login(req.user);
    // Redirigir al frontend con el token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.access_token}`);
  }

  @Public()
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Iniciar autenticación con Facebook' })
  @ApiResponse({ status: 302, description: 'Redirecciona a la página de autenticación de Facebook.' })
  async facebookAuth() {
    // This route will redirect to Facebook's OAuth page
  }

  @Public()
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Callback de autenticación con Facebook' })
  @ApiResponse({ status: 302, description: 'Redirecciona al frontend con el token de acceso.' })
  async facebookAuthRedirect(@Req() req, @Res() res: Response) {
    const result = await this.authService.login(req.user);
    // Redirigir al frontend con el token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.access_token}`);
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verificar token de autenticación' })
  @ApiResponse({ status: 200, description: 'Token válido, devuelve la información del usuario.' })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado.' })
  async verifyToken(@Req() req) {
    return req.user;
  }

  @Post('renew')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Renovar token de autenticación' })
  @ApiResponse({ status: 200, description: 'Token renovado exitosamente.' })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado.' })
  @ApiResponse({ status: 400, description: 'Datos de usuario inválidos en el token.' })
  async renewToken(@Req() req) {
    if (!req.user || !req.user.id) {
      throw new Error('Invalid user data in token');
    }
    return this.authService.renewToken(req.user.id);
  }
} 