import type { SiteContent } from '../../domain/entities/site-content';

export interface ConfigResponseDto {
  id: string;
  siteName: string;
  description: string;
  aboutBio: SiteContent['aboutBio'];
  servicesContent: SiteContent['servicesContent'];
  testimonialsContent: SiteContent['testimonialsContent'];
  updatedAt: Date;
}
