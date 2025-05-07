import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Post, User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

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