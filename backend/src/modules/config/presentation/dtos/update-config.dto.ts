import { IsObject, IsOptional, IsString, MinLength } from 'class-validator';
import type { SiteContent } from '../../domain/entities/site-content';

export class UpdateConfigDto {
  @IsOptional()
  @IsString({ message: 'siteName must be a string' })
  @MinLength(2, { message: 'siteName must be at least 2 characters' })
  siteName?: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  @MinLength(10, { message: 'description must be at least 10 characters' })
  description?: string;

  @IsOptional()
  @IsObject({ message: 'aboutBio must be an object' })
  aboutBio?: SiteContent['aboutBio'];

  @IsOptional()
  @IsObject({ message: 'servicesContent must be an object' })
  servicesContent?: SiteContent['servicesContent'];

  @IsOptional()
  @IsObject({ message: 'testimonialsContent must be an object' })
  testimonialsContent?: SiteContent['testimonialsContent'];

  @IsOptional()
  @IsObject({ message: 'contactContent must be an object' })
  contactContent?: SiteContent['contactContent'];
}
