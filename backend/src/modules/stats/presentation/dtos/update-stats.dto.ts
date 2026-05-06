import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateStatsDto {
  @IsOptional()
  @IsNumber({}, { message: 'ProjectsCount must be a number' })
  @Min(0, { message: 'ProjectsCount must be at least 0' })
  projectsCount?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Visitors must be a number' })
  @Min(0, { message: 'Visitors must be at least 0' })
  visitors?: number;
}
