import {
  IsString,
  IsArray,
  IsOptional,
  IsUrl,
  MinLength,
  Matches,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

function parseTechStack(value: unknown): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.map((tech) => String(tech).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((tech) => tech.trim())
      .filter(Boolean);
  }

  return undefined;
}

function emptyToUndefined(value: unknown): unknown {
  if (typeof value === 'string' && !value.trim()) {
    return undefined;
  }

  return value;
}

function normalizeText(value: unknown): unknown {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return value;
}

function parseBoolean(value: unknown): boolean | undefined {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();

    if (['true', '1', 'on', 'yes'].includes(normalized)) {
      return true;
    }

    if (['false', '0', 'off', 'no'].includes(normalized)) {
      return false;
    }
  }

  return undefined;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  description?: string;

  @Transform(({ value }) => parseTechStack(value))
  @IsOptional()
  @IsArray({ message: 'TechStack must be an array' })
  @IsString({ each: true, message: 'Each tech must be a string' })
  techStack?: string[];

  @IsOptional()
  @Transform(({ value }) => emptyToUndefined(value))
  @IsUrl({}, { message: 'GitHub URL must be a valid URL' })
  githubUrl?: string;

  @IsOptional()
  @Transform(({ value }) => emptyToUndefined(value))
  @IsUrl({}, { message: 'Live URL must be a valid URL' })
  liveUrl?: string;

  @IsOptional()
  @Transform(({ value }) => emptyToUndefined(value))
  @IsString({ message: 'Video URL must be a string' })
  @Matches(/^(https?:\/\/|data:video\/|\/uploads\/)/, {
    message: 'Video URL must be a valid URL, upload path, or video data URI',
  })
  videoUrl?: string;

  @IsOptional()
  @Transform(({ value }) => normalizeText(value))
  @IsString({ message: 'Problem title must be a string' })
  problemTitle?: string;

  @IsOptional()
  @Transform(({ value }) => normalizeText(value))
  @IsString({ message: 'Problem description must be a string' })
  problemDescription?: string;

  @IsOptional()
  @Transform(({ value }) => normalizeText(value))
  @IsString({ message: 'Solution title must be a string' })
  solutionTitle?: string;

  @IsOptional()
  @Transform(({ value }) => normalizeText(value))
  @IsString({ message: 'Solution description must be a string' })
  solutionDescription?: string;

  @IsOptional()
  @Transform(({ value }) => normalizeText(value))
  @IsString({ message: 'Result title must be a string' })
  resultTitle?: string;

  @IsOptional()
  @Transform(({ value }) => normalizeText(value))
  @IsString({ message: 'Result description must be a string' })
  resultDescription?: string;

  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean({ message: 'Featured must be a boolean' })
  featured?: boolean;
}
