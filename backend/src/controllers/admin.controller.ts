import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminGuard } from '../guards/admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get('users')
  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        phoneNumber: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
