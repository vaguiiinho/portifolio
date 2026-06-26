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
    'Full Stack Developer building scalable and modern applications. Specializing in React, Next.js, and cloud architecture.',
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export async function fetchSiteConfig(): Promise<SiteConfig> {
  try {
    const response = await fetch(`${API_BASE_URL}/config`, {
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
