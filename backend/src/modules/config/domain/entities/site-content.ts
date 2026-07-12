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

export interface ContactPathContent {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface ContactContent {
  title: string;
  subtitle: string;
  contactTitle: string;
  contactDescription: string;
  contactNote: string;
  paths: ContactPathContent[];
  formLabels: { name: string; email: string; subject: string; message: string };
  formPlaceholders: { name: string; email: string; subject: string; message: string };
  submitButton: string;
  submittingText: string;
}

export interface SiteContent {
  aboutBio: LocalizedContent<string[]>;
  servicesContent: LocalizedContent<ServicesContent>;
  testimonialsContent: LocalizedContent<TestimonialsContent>;
  contactContent: LocalizedContent<ContactContent>;
}
