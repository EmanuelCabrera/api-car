import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { VersionRepository } from './repositories/version.repository';
import { VERSION_REPOSITORY } from './interfaces/version.interface';

@Module({
  controllers: [VersionController],
  providers: [VersionService, 
    PrismaService, 
    { 
      provide: VERSION_REPOSITORY,
      useClass: VersionRepository
    }
  ]
})
export class VersionModule {}
