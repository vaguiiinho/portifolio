import { fetchFromApi } from './api-base-url'

export interface SiteConfig {
  id: string
  siteName: string
  description: string
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
        updatedAt: new Date().toISOString(),
      }
    }

    return response.json() as Promise<SiteConfig>
  } catch {
    return {
      id: 'default',
      siteName: siteDefaults.siteName,
      description: siteDefaults.description,
      updatedAt: new Date().toISOString(),
    }
  }
}
