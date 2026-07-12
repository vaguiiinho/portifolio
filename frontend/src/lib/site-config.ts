import { fetchFromApi } from './api-base-url'
import type { ContactContent, SiteContentField } from './site-content'

export interface SiteConfig {
  id: string
  siteName: string
  description: string
  aboutBio?: SiteContentField<string[]>
  servicesContent?: SiteContentField<{
    ctaTitle: string
    ctaDescription: string
    ctaLabel: string
    cards: { title: string; description: string; deliverables: string[] }[]
  }>
  testimonialsContent?: SiteContentField<{
    cards: { quote: string; name: string; role: string; company: string; result: string }[]
    trustPoints: string[]
  }>
  contactContent?: SiteContentField<ContactContent>
  updatedAt: string
}

export const siteDefaults = {
  domain: 'joaosilva.dev',
  email: 'hello@joaosilva.dev',
  github: 'https://github.com/joaosilva',
  linkedin: 'https://linkedin.com/in/joaosilva',
  siteName: 'João Silva',
  description:
    'Full Stack Developer focado em conversão, portfólios, dashboards e APIs com arquitetura limpa.',
}

export async function fetchSiteConfig(): Promise<SiteConfig> {
  try {
    const response = await fetchFromApi('/config', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return {
        id: 'default',
        siteName: siteDefaults.siteName,
        description: siteDefaults.description,
        aboutBio: undefined,
        servicesContent: undefined,
        testimonialsContent: undefined,
        contactContent: undefined,
        updatedAt: new Date().toISOString(),
      }
    }

    return response.json() as Promise<SiteConfig>
  } catch {
    return {
      id: 'default',
      siteName: siteDefaults.siteName,
      description: siteDefaults.description,
      aboutBio: undefined,
      servicesContent: undefined,
      testimonialsContent: undefined,
      contactContent: undefined,
      updatedAt: new Date().toISOString(),
    }
  }
}
