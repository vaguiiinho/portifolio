import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import { fetchSiteConfig, siteDefaults } from '@/lib/site-config'

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()
  const siteName = config.siteName || siteDefaults.siteName
  const description = config.description || siteDefaults.description
  const title = `${siteName} | Full Stack Developer`

  return {
    metadataBase: new URL(`https://${siteDefaults.domain}`),
    title,
    description,
    generator: 'Next.js',
    keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development'],
    authors: [{ name: siteName }],
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `https://${siteDefaults.domain}`,
      siteName: title,
      title,
      description,
      images: [
        {
          url: `https://${siteDefaults.domain}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://${siteDefaults.domain}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `https://${siteDefaults.domain}`,
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning className="scroll-smooth">
      <body className="font-sans antialiased bg-background">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
