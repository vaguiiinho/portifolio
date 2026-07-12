import type {
  Locale,
  LocalizedContent,
  ServicesContent,
  SiteContent,
  TestimonialsContent,
} from './site-content';

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
    this._id = this.required(id, 'Config id');
    this._siteName = this.required(siteName, 'Config site name');
    this._description = this.required(description, 'Config description');
    this._aboutBio = this.normalizeAboutBio(aboutBio);
    this._servicesContent = this.normalizeServicesContent(servicesContent);
    this._testimonialsContent =
      this.normalizeTestimonialsContent(testimonialsContent);
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
    return this.cloneLocalized(this._servicesContent, (content) => ({
      ctaTitle: content.ctaTitle,
      ctaDescription: content.ctaDescription,
      ctaLabel: content.ctaLabel,
      cards: content.cards.map((card) => ({
        title: card.title,
        description: card.description,
        deliverables: [...card.deliverables],
      })),
    }));
  }

  get testimonialsContent(): SiteContent['testimonialsContent'] {
    return this.cloneLocalized(this._testimonialsContent, (content) => ({
      cards: content.cards.map((card) => ({ ...card })),
      trustPoints: [...content.trustPoints],
    }));
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateSiteName(siteName: string): void {
    this._siteName = this.required(siteName, 'Config site name');
    this._updatedAt = new Date();
  }

  updateDescription(description: string): void {
    this._description = this.required(description, 'Config description');
    this._updatedAt = new Date();
  }

  updateAboutBio(aboutBio: SiteContent['aboutBio']): void {
    this._aboutBio = this.normalizeAboutBio(aboutBio);
    this._updatedAt = new Date();
  }

  updateServicesContent(servicesContent: SiteContent['servicesContent']): void {
    this._servicesContent = this.normalizeServicesContent(servicesContent);
    this._updatedAt = new Date();
  }

  updateTestimonialsContent(
    testimonialsContent: SiteContent['testimonialsContent'],
  ): void {
    this._testimonialsContent =
      this.normalizeTestimonialsContent(testimonialsContent);
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

  private required(value: string, field: string): string {
    const normalized = value.trim();
    if (!normalized) throw new Error(`${field} must not be empty`);
    return normalized;
  }

  private normalizeAboutBio(
    content: SiteContent['aboutBio'],
  ): SiteContent['aboutBio'] {
    return this.normalizeLocalized(content, 'Config about bio', (value) => {
      if (!Array.isArray(value) || value.length === 0) {
        throw new Error('Config about bio must contain at least one paragraph');
      }
      return value.map((paragraph) =>
        this.required(paragraph, 'Config about bio paragraph'),
      );
    });
  }

  private normalizeServicesContent(
    content: SiteContent['servicesContent'],
  ): SiteContent['servicesContent'] {
    return this.normalizeLocalized(
      content,
      'Config services content',
      (value) => {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
          throw new Error('Config services content must be an object');
        }
        if (!Array.isArray(value.cards)) {
          throw new Error('Config service cards must be an array');
        }

        return {
          ctaTitle: this.required(value.ctaTitle, 'Config service CTA title'),
          ctaDescription: this.required(
            value.ctaDescription,
            'Config service CTA description',
          ),
          ctaLabel: this.required(value.ctaLabel, 'Config service CTA label'),
          cards: value.cards.map((card) => {
            if (!Array.isArray(card.deliverables)) {
              throw new Error('Config service deliverables must be an array');
            }
            return {
              title: this.required(card.title, 'Config service card title'),
              description: this.required(
                card.description,
                'Config service card description',
              ),
              deliverables: card.deliverables.map((deliverable) =>
                this.required(deliverable, 'Config service deliverable'),
              ),
            };
          }),
        };
      },
    );
  }

  private normalizeTestimonialsContent(
    content: SiteContent['testimonialsContent'],
  ): SiteContent['testimonialsContent'] {
    return this.normalizeLocalized(
      content,
      'Config testimonials content',
      (value) => {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
          throw new Error('Config testimonials content must be an object');
        }
        if (!Array.isArray(value.cards) || !Array.isArray(value.trustPoints)) {
          throw new Error('Config testimonials fields must be arrays');
        }

        return {
          cards: value.cards.map((card) => ({
            quote: this.required(card.quote, 'Config testimonial quote'),
            name: this.required(card.name, 'Config testimonial name'),
            role: this.required(card.role, 'Config testimonial role'),
            company: this.required(card.company, 'Config testimonial company'),
            result: this.required(card.result, 'Config testimonial result'),
          })),
          trustPoints: value.trustPoints.map((point) =>
            this.required(point, 'Config trust point'),
          ),
        };
      },
    );
  }

  private normalizeLocalized<T>(
    content: LocalizedContent<T>,
    field: string,
    normalize: (value: T) => T,
  ): LocalizedContent<T> {
    if (!content || typeof content !== 'object' || Array.isArray(content)) {
      throw new Error(`${field} must be a localized object`);
    }

    const locales = (Object.keys(content) as Locale[]).filter(
      (locale) => locale === 'pt' || locale === 'en',
    );
    if (locales.length === 0) {
      throw new Error(`${field} must contain at least one locale`);
    }

    return Object.fromEntries(
      locales.map((locale) => {
        const value = content[locale];
        if (value === undefined) {
          throw new Error(`${field} for ${locale} must be defined`);
        }
        return [locale, normalize(value)];
      }),
    ) as LocalizedContent<T>;
  }

  private cloneLocalized<T>(
    content: LocalizedContent<T>,
    clone: (value: T) => T,
  ): LocalizedContent<T> {
    return {
      pt: content.pt ? clone(content.pt) : undefined,
      en: content.en ? clone(content.en) : undefined,
    };
  }
}
