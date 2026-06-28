import { IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';

export class TrackStatsEventDto {
  @IsString({ message: 'Key must be a string' })
  @Matches(/^[a-z0-9:_/-]+$/i, { message: 'Key contains invalid characters' })
  key: string;

  @IsOptional()
  @IsInt({ message: 'Increment must be an integer' })
  @Min(1, { message: 'Increment must be at least 1' })
  increment?: number;
}
