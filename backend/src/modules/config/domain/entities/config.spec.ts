import { Config } from './config';
import type { SiteContent } from './site-content';

describe('Config', () => {
  const mockId = '1';
  const mockSiteName = 'My Portfolio';
  const mockDescription = 'A portfolio site';
  const mockAboutBio: SiteContent['aboutBio'] = {
    pt: ['Sobre um', 'Sobre dois'],
    en: ['About one', 'About two'],
  };
  const mockServicesContent: SiteContent['servicesContent'] = {
    pt: {
      ctaTitle: 'Need scope?',
      ctaDescription: 'I can adapt it.',
      ctaLabel: 'Request quote',
      cards: [],
    },
    en: {
      ctaTitle: 'Need scope?',
      ctaDescription: 'I can adapt it.',
      ctaLabel: 'Request quote',
      cards: [],
    },
  };
  const mockTestimonialsContent: SiteContent['testimonialsContent'] = {
    pt: {
      cards: [],
      trustPoints: ['Escopo claro'],
    },
    en: {
      cards: [],
      trustPoints: ['Clear scope'],
    },
  };
  const mockUpdatedAt = new Date();

  let config: Config;

  beforeEach(() => {
    config = new Config(
      mockId,
      mockSiteName,
      mockDescription,
      mockAboutBio,
      mockServicesContent,
      mockTestimonialsContent,
      mockUpdatedAt,
    );
  });

  it('should create config with correct properties', () => {
    expect(config.id).toBe(mockId);
    expect(config.siteName).toBe(mockSiteName);
    expect(config.description).toBe(mockDescription);
    expect(config.aboutBio).toEqual(mockAboutBio);
    expect(config.servicesContent).toBe(mockServicesContent);
    expect(config.testimonialsContent).toBe(mockTestimonialsContent);
    expect(config.updatedAt).toBe(mockUpdatedAt);
  });

  it('should update site name', () => {
    const newSiteName = 'Updated Portfolio';
    config.updateSiteName(newSiteName);
    expect(config.siteName).toBe(newSiteName);
    expect(config.updatedAt.getTime()).toBeGreaterThan(mockUpdatedAt.getTime());
  });

  it('should update description', () => {
    const newDescription = 'Updated description';
    config.updateDescription(newDescription);
    expect(config.description).toBe(newDescription);
    expect(config.updatedAt.getTime()).toBeGreaterThan(mockUpdatedAt.getTime());
  });

  it('should update about bio', () => {
    const newBio: SiteContent['aboutBio'] = { pt: ['Atualizado'], en: ['Updated'] };
    config.updateAboutBio(newBio);
    expect(config.aboutBio).toEqual(newBio);
    expect(config.updatedAt.getTime()).toBeGreaterThan(mockUpdatedAt.getTime());
  });
});
