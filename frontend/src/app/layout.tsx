import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import { fetchSiteConfig, siteDefaults } from '@/lib/site-config'
import { getLocale } from "@/lib/locale-server"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()
  const locale = await getLocale()
  const siteName = config.siteName || siteDefaults.siteName
  const description =
    config.description ||
    (locale === "en"
      ? "Full Stack Developer focused on conversion, portfolios, dashboards and APIs with clean architecture."
      : siteDefaults.description)
  const title = locale === "en" ? `${siteName} | Full Stack Developer` : `${siteName} | Desenvolvedor Full Stack`

  return {
    metadataBase: new URL(`https://${siteDefaults.domain}`),
    title,
    description,
    generator: 'Next.js',
    keywords:
      locale === "en"
        ? ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'NestJS', 'Portfolio']
        : ['Desenvolvedor Full Stack', 'React', 'Next.js', 'TypeScript', 'NestJS', 'Portfólio'],
    authors: [{ name: siteName }],
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      type: 'website',
      locale: locale === "en" ? 'en_US' : 'pt_BR',
      url: `https://${siteDefaults.domain}`,
      siteName: title,
      title,
      description,
      images: [
        {
          url: '/opengraph-image',
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
      images: ['/twitter-image'],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale === "en" ? "en" : "pt-br"} suppressHydrationWarning className="scroll-smooth">
      <body className="font-sans antialiased bg-background">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
