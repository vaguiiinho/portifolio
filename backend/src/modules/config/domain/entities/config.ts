import type { SiteContent } from './site-content';

export class Config {
  private _id: string;
  private _siteName: string;
  private _description: string;
  private _aboutBio: SiteContent['aboutBio'];
  private _servicesContent: SiteContent['servicesContent'];
  private _testimonialsContent: SiteContent['testimonialsContent'];
  private _updatedAt: Date;

  constructor(
    id: string,
    siteName: string,
    description: string,
    aboutBio: SiteContent['aboutBio'],
    servicesContent: SiteContent['servicesContent'],
    testimonialsContent: SiteContent['testimonialsContent'],
    updatedAt: Date,
  ) {
    this._id = id;
    this._siteName = siteName;
    this._description = description;
    this._aboutBio = aboutBio;
    this._servicesContent = servicesContent;
    this._testimonialsContent = testimonialsContent;
    this._updatedAt = updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get siteName(): string {
    return this._siteName;
  }

  get description(): string {
    return this._description;
  }

  get aboutBio(): SiteContent['aboutBio'] {
    return {
      pt: this._aboutBio.pt ? [...this._aboutBio.pt] : undefined,
      en: this._aboutBio.en ? [...this._aboutBio.en] : undefined,
    };
  }

  get servicesContent(): SiteContent['servicesContent'] {
    return this._servicesContent;
  }

  get testimonialsContent(): SiteContent['testimonialsContent'] {
    return this._testimonialsContent;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateSiteName(siteName: string): void {
    this._siteName = siteName;
    this._updatedAt = new Date();
  }

  updateDescription(description: string): void {
    this._description = description;
    this._updatedAt = new Date();
  }

  updateAboutBio(aboutBio: SiteContent['aboutBio']): void {
    this._aboutBio = {
      pt: aboutBio.pt ? [...aboutBio.pt] : undefined,
      en: aboutBio.en ? [...aboutBio.en] : undefined,
    };
    this._updatedAt = new Date();
  }

  updateServicesContent(servicesContent: SiteContent['servicesContent']): void {
    this._servicesContent = servicesContent;
    this._updatedAt = new Date();
  }

  updateTestimonialsContent(testimonialsContent: SiteContent['testimonialsContent']): void {
    this._testimonialsContent = testimonialsContent;
    this._updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      siteName: this.siteName,
      description: this.description,
      aboutBio: this.aboutBio,
      servicesContent: this.servicesContent,
      testimonialsContent: this.testimonialsContent,
      updatedAt: this.updatedAt,
    };
  }
}
