"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, BarChart3, FolderGit2, LogOut, ShieldCheck, Sparkles, Users, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { portfolioRoutes } from "@/lib/routes"
import { SiteConfigModal } from "./site-config-modal"
import { SiteContentModal } from "./site-content-modal"
import { ContactContentModal } from "./contact-content-modal"
import { ProjectsAdminTable } from "./projects-admin-table"
import type { Locale } from "@/lib/locale"
import type { ApiStats } from "@/lib/api"
import { Container } from "@/components/portfolio/container"
import type { Project } from "@/components/portfolio/project-card"
import type { SiteConfig } from "@/lib/site-config"

interface AdminDashboardProps {
  locale: Locale
  siteConfig: SiteConfig
  stats: ApiStats
  projects: Project[]
}

function sumEventPrefix(events: Record<string, number>, prefix: string) {
  return Object.entries(events).reduce((total, [key, value]) => {
    return key.startsWith(prefix) ? total + value : total
  }, 0)
}

function getTopProjectEvent(events: Record<string, number>) {
  const entries = Object.entries(events).filter(([key]) => key.startsWith("project:view:"))

  if (entries.length === 0) {
    return null
  }

  return entries.sort((a, b) => b[1] - a[1])[0]
}

export function AdminDashboard({ locale, siteConfig, stats, projects }: AdminDashboardProps) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [isConfigEditorOpen, setIsConfigEditorOpen] = useState(false)
  const [isContentEditorOpen, setIsContentEditorOpen] = useState(false)
  const [isContactEditorOpen, setIsContactEditorOpen] = useState(false)
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(portfolioRoutes.login)
    }
  }, [isLoading, isAuthenticated, router])

  const pageViews = sumEventPrefix(stats.events, "page:")
  const ctaClicks = sumEventPrefix(stats.events, "cta:")
  const projectViews = sumEventPrefix(stats.events, "project:view:")
  const topProject = getTopProjectEvent(stats.events)
  const topProjectLabel = topProject
    ? projects.find((project) => project.id === topProject[0].replace("project:view:", ""))?.title ??
      topProject[0].replace("project:view:", "")
    : null

  const metricCards = [
    {
      icon: FolderGit2,
      label: locale === "en" ? "Projects" : "Projetos",
      value: projects.length,
      description:
        locale === "en" ? "Published cases available for visitors." : "Cases publicados disponíveis para visitantes.",
    },
    {
      icon: Users,
      label: locale === "en" ? "Visitors" : "Visitantes",
      value: stats.visitors,
      description:
        locale === "en" ? "Accumulated traffic registered by the backend." : "Tráfego acumulado registrado no backend.",
    },
    {
      icon: BarChart3,
      label: locale === "en" ? "Page views" : "Visualizações",
      value: pageViews,
      description:
        locale === "en" ? "Tracked page opens across the portfolio." : "Aberturas de página rastreadas no portfólio.",
    },
    {
      icon: Sparkles,
      label: locale === "en" ? "CTA clicks" : "Cliques em CTA",
      value: ctaClicks,
      description:
        locale === "en" ? "Primary conversion actions captured so far." : "Ações principais de conversão capturadas até agora.",
    },
  ]

  if (!isClient || isLoading) {
    return (
      <Container className="pb-24">
        <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-sm">
          <div className="h-4 w-32 animate-pulse rounded-full bg-muted" />
          <div className="mt-4 h-10 w-2/3 animate-pulse rounded-2xl bg-muted" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-32 animate-pulse rounded-3xl bg-muted" />
            ))}
          </div>
        </div>
      </Container>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <Container className="pb-24">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-border bg-card/90 p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                {locale === "en" ? "Administrator workspace" : "Espaço do administrador"}
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">
                  {locale === "en" ? "Content control panel" : "Painel de controle do conteúdo"}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground text-pretty">
                  {locale === "en"
                    ? "Manage the portfolio from a single place: projects, metrics and the current site status."
                    : "Gerencie o portfólio em um único lugar: projetos, métricas e o status atual do site."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button as="a" href={portfolioRoutes.projects} variant="outline" className="rounded-full">
                {locale === "en" ? "Open projects" : "Abrir projetos"}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-full" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{locale === "en" ? "Logout" : "Sair"}</span>
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metricCards.map((card) => {
              const Icon = card.icon

              return (
                <div key={card.label} className="rounded-3xl border border-border bg-background/60 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="rounded-2xl border border-border bg-secondary/60 p-2">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-2xl font-semibold tracking-tight">{card.value}</div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="font-medium">{card.label}</div>
                    <p className="text-xs leading-5 text-muted-foreground">{card.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card/90 p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-border bg-secondary/60 p-3">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {locale === "en" ? "Current session" : "Sessão atual"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {locale === "en"
                  ? "Logged-in identity and fast access to actions."
                  : "Identidade autenticada e acesso rápido às ações."}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {locale === "en" ? "Email" : "Email"}
              </div>
              <div className="mt-2 font-medium">{user?.email}</div>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {locale === "en" ? "Role" : "Papel"}
              </div>
              <div className="mt-2 font-medium">
                {user?.role === "administrador"
                  ? locale === "en"
                    ? "Administrator"
                    : "Administrador"
                  : locale === "en"
                    ? "Visitor"
                    : "Visitante"}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {locale === "en" ? "Site" : "Site"}
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => setIsConfigEditorOpen(true)}
                  >
                    {locale === "en" ? "Edit site" : "Editar site"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => setIsContentEditorOpen(true)}
                  >
                    {locale === "en" ? "Edit content" : "Editar conteúdo"}
                  </Button>
                  <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => setIsContactEditorOpen(true)}>
                    {locale === "en" ? "Edit contact" : "Editar contato"}
                  </Button>
                </div>
              </div>
              <div className="mt-2 font-medium">{siteConfig.siteName}</div>
              <p className="mt-2 text-sm text-muted-foreground">{siteConfig.description}</p>
            </div>
          </div>
        </div>

        <SiteConfigModal
          key={isConfigEditorOpen ? siteConfig.updatedAt : "site-config-closed"}
          open={isConfigEditorOpen}
          config={siteConfig}
          locale={locale}
          onClose={() => setIsConfigEditorOpen(false)}
          onSaved={() => router.refresh()}
        />
        <SiteContentModal
          key={isContentEditorOpen ? `site-content-${siteConfig.updatedAt}` : "site-content-closed"}
          open={isContentEditorOpen}
          config={siteConfig}
          locale={locale}
          onClose={() => setIsContentEditorOpen(false)}
          onSaved={() => router.refresh()}
        />
        <ContactContentModal key={isContactEditorOpen ? `contact-${siteConfig.updatedAt}` : "contact-closed"} open={isContactEditorOpen} config={siteConfig} locale={locale} onClose={() => setIsContactEditorOpen(false)} onSaved={() => router.refresh()} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl border border-border bg-card/90 p-8 shadow-sm">
          <h3 className="text-xl font-semibold">
            {locale === "en" ? "Conversion snapshot" : "Resumo de conversão"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {locale === "en"
              ? "A compact view of the signals already captured by the API."
              : "Uma visão compacta dos sinais já capturados pela API."}
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-3">
              <span className="text-sm text-muted-foreground">
                {locale === "en" ? "Project opens" : "Aberturas de projeto"}
              </span>
              <span className="font-semibold">{projectViews}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-3">
              <span className="text-sm text-muted-foreground">
                {locale === "en" ? "Projects published" : "Projetos publicados"}
              </span>
              <span className="font-semibold">{projects.length}</span>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {locale === "en" ? "Top project" : "Projeto em destaque"}
              </div>
              <div className="mt-2 font-medium">
                {topProjectLabel ??
                  (locale === "en"
                    ? "No project has enough traffic yet"
                    : "Ainda não há tráfego suficiente")}
              </div>
            </div>
          </div>
        </div>

        <div id="project-manager" className="rounded-3xl border border-border bg-card/90 p-8 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">
                {locale === "en" ? "Project manager" : "Gerenciador de projetos"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {locale === "en"
                  ? "Create, edit and delete content without leaving the dashboard."
                  : "Crie, edite e exclua conteúdo sem sair do painel."}
              </p>
            </div>
            <Button as="a" href={`${portfolioRoutes.projects}#projects`} className="rounded-full">
              {locale === "en" ? "Open full manager" : "Abrir gerenciador completo"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6">
            <ProjectsAdminTable projects={projects} locale={locale} />
          </div>
        </div>
      </div>
    </Container>
  )
}
