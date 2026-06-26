import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateConfigDto {
  @IsOptional()
  @IsString({ message: 'siteName must be a string' })
  @MinLength(2, { message: 'siteName must be at least 2 characters' })
  siteName?: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  @MinLength(10, { message: 'description must be at least 10 characters' })
  description?: string;
}
