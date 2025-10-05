import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Post, User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTestEmail(to: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Prueba de correo electrónico',
        html: `
          <h1>Prueba de correo electrónico</h1>
          <p>Este es un correo de prueba para verificar la configuración del servicio de correo.</p>
          <p>Si recibes este correo, significa que la configuración es correcta.</p>
          <br>
          <p>Saludos,</p>
          <p>El equipo de Car App</p>
        `,
      });
      return { message: 'Correo enviado exitosamente' };
    } catch (error) {
      throw new Error(`Error al enviar el correo: ${error.message}`);
    }
  }

  async sendExpirationNotification(post: Post, user: User) {
    const daysUntilExpiration = Math.ceil(
      (post.expiredAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Tu publicación "${post.title}" está por vencer`,
      html: `
        <h1>Aviso de vencimiento de publicación</h1>
        <p>Hola ${user.name},</p>
        <p>Tu publicación "${post.title}" vencerá en ${daysUntilExpiration} días.</p>
        <p>Si deseas mantener activa tu publicación, por favor actualízala antes de que expire.</p>
        <br>
        <p>Saludos,</p>
        <p>El equipo de Car App</p>
      `,
    });
  }
} 