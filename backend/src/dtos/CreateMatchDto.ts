import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateMatchDto {
  @IsString()
  team1: string;

  @IsString()
  team2: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  team1Odds: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  drawOdds: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  team2Odds: number;

  @IsOptional()
  @IsString()
  team1Logo?: string;

  @IsOptional()
  @IsString()
  team2Logo?: string;
}
