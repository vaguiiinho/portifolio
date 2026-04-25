import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { siteConfig } from '@/data/site'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

const defaultMetadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: siteConfig.title,
  description: siteConfig.description,
  generator: 'Next.js',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development'],
  authors: [{ name: siteConfig.name }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `https://${siteConfig.domain}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`https://${siteConfig.domain}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: `https://${siteConfig.domain}`,
  }
}

export const metadata: Metadata = defaultMetadata

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
    <html lang="pt-br" className="dark scroll-smooth bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
