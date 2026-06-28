export type Locale = 'pt' | 'en';

export type LocalizedContent<T> = Partial<Record<Locale, T>>;

export interface ServiceCardContent {
  title: string;
  description: string;
  deliverables: string[];
}

export interface ServicesContent {
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  cards: ServiceCardContent[];
}

export interface TestimonialCardContent {
  quote: string;
  name: string;
  role: string;
  company: string;
  result: string;
}

export interface TestimonialsContent {
  cards: TestimonialCardContent[];
  trustPoints: string[];
}

export interface SiteContent {
  aboutBio: LocalizedContent<string[]>;
  servicesContent: LocalizedContent<ServicesContent>;
  testimonialsContent: LocalizedContent<TestimonialsContent>;
}
