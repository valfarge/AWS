import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Match } from '@prisma/client';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Match[]> {
    return this.prisma.match.findMany();
  }

  async create(data: Omit<Match, 'id'>): Promise<Match> {
    return this.prisma.match.create({ data });
  }

  async update(id: number, data: Partial<Match>): Promise<Match> {
    return this.prisma.match.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.match.delete({ where: { id } });
  }
}
