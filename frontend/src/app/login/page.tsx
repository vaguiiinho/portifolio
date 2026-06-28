import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { Container } from "@/components/portfolio/container"
import { fetchSiteConfig } from "@/lib/site-config"
import { createRouteMetadata } from "@/lib/metadata"
import { getLocale } from "@/lib/locale-server"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()
  const locale = await getLocale()

  return createRouteMetadata({
    siteName: config.siteName,
    title: locale === "en" ? "Admin login" : "Login administrativo",
    description:
      locale === "en"
        ? "Authenticate to manage portfolio content."
        : "Autentique-se para gerenciar o conteúdo do portfólio.",
    path: "/login",
  })
}

export default async function LoginPage() {
  const locale = await getLocale()

  return (
    <main className="relative min-h-screen overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_45%),linear-gradient(180deg,_rgba(15,23,42,0.04),_transparent_30%)]" />
      <Container className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <div className="w-full max-w-xl">
          <LoginForm locale={locale} />
        </div>
      </Container>
    </main>
  )
}
