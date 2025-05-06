import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PostExpirationService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkExpiringPosts() {
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 5);

    // Find posts that will expire in the next 5 days
    const expiringPosts = await this.prisma.post.findMany({
      where: {
        expiredAt: {
          gte: today,
          lte: threeDaysFromNow,
        },
        published: true,
      },
      include: {
        author: true,
      },
    });

    // Update posts that are about to expire and send notifications
    for (const post of expiringPosts) {
      await this.prisma.post.update({
        where: { id: post.id },
        data: {
          published: false,
        },
      });

      if (post.author && post.author.email) {
        await this.mailService.sendExpirationNotification(post, post.author);
      }
    }

    return expiringPosts;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkExpiredPosts() {
    const today = new Date();

    // Find posts that have already expired
    const expiredPosts = await this.prisma.post.findMany({
      where: {
        expiredAt: {
          lt: today,
        },
        published: true,
      },
      include: {
        author: true,
      },
    });

    // Update expired posts and send notifications
    for (const post of expiredPosts) {
      await this.prisma.post.update({
        where: { id: post.id },
        data: {
          published: false,
        },
      });

      if (post.author && post.author.email) {
        await this.mailService.sendExpirationNotification(post, post.author);
      }
    }

    return expiredPosts;
  }
} 