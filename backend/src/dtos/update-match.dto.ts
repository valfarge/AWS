import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMatchDto {
  @IsOptional()
  @IsString()
  team1?: string;

  @IsOptional()
  @IsString()
  team2?: string;

  @IsOptional()
  @IsNumber()
  team1Odds?: number;

  @IsOptional()
  @IsNumber()
  drawOdds?: number;

  @IsOptional()
  @IsNumber()
  team2Odds?: number;

  @IsOptional()
  @IsString()
  team1Logo?: string;

  @IsOptional()
  @IsString()
  team2Logo?: string;
}
