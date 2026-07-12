import type { SiteContent } from '../domain/entities/site-content';
import { Config } from '../domain/entities/config';

export interface ConfigResult {
  id: string;
  siteName: string;
  description: string;
  aboutBio: SiteContent['aboutBio'];
  servicesContent: SiteContent['servicesContent'];
  testimonialsContent: SiteContent['testimonialsContent'];
  contactContent: SiteContent['contactContent'];
  updatedAt: Date;
}

export function toConfigResult(config: Config): ConfigResult {
  return {
    id: config.id,
    siteName: config.siteName,
    description: config.description,
    aboutBio: config.aboutBio,
    servicesContent: config.servicesContent,
    testimonialsContent: config.testimonialsContent,
    contactContent: config.contactContent,
    updatedAt: config.updatedAt,
  };
}
