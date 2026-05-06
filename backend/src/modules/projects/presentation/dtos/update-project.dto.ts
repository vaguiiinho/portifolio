import { IsString, IsArray, IsOptional, IsUrl, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  description?: string;

  @IsOptional()
  @IsArray({ message: 'TechStack must be an array' })
  @IsString({ each: true, message: 'Each tech must be a string' })
  techStack?: string[];

  @IsOptional()
  @IsUrl({}, { message: 'GitHub URL must be a valid URL' })
  githubUrl?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Live URL must be a valid URL' })
  liveUrl?: string;
}
