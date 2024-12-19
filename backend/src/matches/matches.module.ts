import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AdminGuard } from '../guards/admin.guard';

@Module({
  controllers: [MatchesController],
  providers: [MatchesService, PrismaService, AdminGuard],
})
export class MatchesModule {}
