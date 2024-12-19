import { Controller, Get, Put, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Match } from '@prisma/client';
import { AdminGuard } from '../guards/admin.guard';

@Controller('matches')
@UseGuards(AdminGuard) // Protéger toutes les routes
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  async findAll(): Promise<Match[]> {
    return this.matchesService.findAll();
  }

  @Post()
  async create(@Body() data: Omit<Match, 'id'>): Promise<Match> {
    return this.matchesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<Match, 'id'>>,
  ): Promise<Match> {
    return this.matchesService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.matchesService.delete(Number(id));
  }
}
