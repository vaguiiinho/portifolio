"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Eye, PencilLine, Plus, Search, Star, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/portfolio/badge"
import { ProjectFormModal } from "@/components/portfolio/project-form-modal"
import { ProjectModal } from "@/components/portfolio/project-modal"
import type { Project } from "@/components/portfolio/project-card"
import { deleteProject, updateProject } from "@/lib/api"
import type { Locale } from "@/lib/locale"
import { useAuth } from "@/components/auth/auth-provider"

interface ProjectsAdminTableProps {
  projects: Project[]
  locale: Locale
}

type FeaturedFilter = "all" | "featured" | "normal"
type SortMode = "recent" | "title" | "featured"

export function ProjectsAdminTable({ projects, locale }: ProjectsAdminTableProps) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [featuredFilter, setFeaturedFilter] = useState<FeaturedFilter>("all")
  const [sortMode, setSortMode] = useState<SortMode>("recent")

  const canManageProjects = isAuthenticated && user?.role === "administrador"
  const normalizedQuery = searchQuery.trim().toLowerCase()

  const visibleProjects = useMemo(() => {
    const filtered = projects
      .map((project, index) => ({ project, index }))
      .filter(({ project }) => {
        if (featuredFilter === "featured" && !project.featured) {
          return false
        }

        if (featuredFilter === "normal" && project.featured) {
          return false
        }

        if (!normalizedQuery) {
          return true
        }

        const searchableText = [project.title, project.description, ...project.techStack].join(" ").toLowerCase()
        return searchableText.includes(normalizedQuery)
      })

    filtered.sort((left, right) => {
      if (sortMode === "title") {
        return left.project.title.localeCompare(right.project.title, locale)
      }

      if (sortMode === "featured") {
        if (left.project.featured !== right.project.featured) {
          return left.project.featured ? -1 : 1
        }

        return left.index - right.index
      }

      return left.index - right.index
    })

    return filtered.map(({ project }) => project)
  }, [featuredFilter, locale, normalizedQuery, projects, sortMode])

  const hasActiveFilters = Boolean(normalizedQuery) || featuredFilter !== "all" || sortMode !== "recent"

  async function handleDelete(project: Project) {
    const confirmationMessage =
      locale === "en"
        ? `Delete the project "${project.title}"? This cannot be undone.`
        : `Excluir o projeto "${project.title}"? Esta ação não pode ser desfeita.`

    if (!window.confirm(confirmationMessage)) {
      return
    }

    try {
      setActionError(null)
      await deleteProject(project.id)
      setSelectedProject(null)
      setEditingProject(null)
      router.refresh()
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : locale === "en"
            ? "Failed to delete the project"
            : "Falha ao excluir o projeto",
      )
    }
  }

  async function handleToggleFeatured(project: Project) {
    try {
      setActionError(null)
      await updateProject(project.id, {
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        videoUrl: project.videoUrl,
        problemTitle: project.problemTitle,
        problemDescription: project.problemDescription,
        solutionTitle: project.solutionTitle,
        solutionDescription: project.solutionDescription,
        resultTitle: project.resultTitle,
        resultDescription: project.resultDescription,
        featured: !project.featured,
      })
      router.refresh()
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : locale === "en"
            ? "Failed to update featured status"
            : "Falha ao atualizar o destaque",
      )
    }
  }

  const emptyStateText = locale === "en" ? "No published case yet." : "Nenhum case publicado ainda."

  return (
    <>
      {!isLoading && canManageProjects && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {locale === "en"
              ? "Use the table below to manage each project individually."
              : "Use a tabela abaixo para gerenciar cada projeto individualmente."}
          </p>
          <Button
            onClick={() => {
              setActionError(null)
              setEditingProject(null)
              setIsCreateOpen(true)
            }}
            className="rounded-full"
          >
            <Plus className="h-4 w-4" />
            {locale === "en" ? "New project" : "Novo projeto"}
          </Button>
        </div>
      )}

      {actionError && (
        <div className="mb-6 flex items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 py-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {actionError}
        </div>
      )}

      <div className="mb-4 rounded-3xl border border-border bg-card/70 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">{locale === "en" ? "Search projects" : "Buscar projetos"}</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={locale === "en" ? "Search by title, tech or description" : "Buscar por título, tecnologia ou descrição"}
                className="h-10 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/40"
              />
            </label>

            <label className="flex min-w-[170px] flex-col gap-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span>{locale === "en" ? "Featured filter" : "Filtro de destaque"}</span>
              <select
                value={featuredFilter}
                onChange={(event) => setFeaturedFilter(event.target.value as FeaturedFilter)}
                className="h-10 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary/40"
              >
                <option value="all">{locale === "en" ? "All projects" : "Todos os projetos"}</option>
                <option value="featured">{locale === "en" ? "Featured only" : "Só destacados"}</option>
                <option value="normal">{locale === "en" ? "Non-featured" : "Sem destaque"}</option>
              </select>
            </label>

            <label className="flex min-w-[170px] flex-col gap-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span>{locale === "en" ? "Sort" : "Ordenar"}</span>
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value as SortMode)}
                className="h-10 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary/40"
              >
                <option value="recent">{locale === "en" ? "Recent first" : "Mais recentes"}</option>
                <option value="featured">{locale === "en" ? "Featured first" : "Destacados primeiro"}</option>
                <option value="title">{locale === "en" ? "Title A-Z" : "Título A-Z"}</option>
              </select>
            </label>
          </div>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => {
                setSearchQuery("")
                setFeaturedFilter("all")
                setSortMode("recent")
              }}
            >
              <X className="h-4 w-4" />
              {locale === "en" ? "Clear filters" : "Limpar filtros"}
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-background/70">
        {visibleProjects.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
            {hasActiveFilters
              ? locale === "en"
                ? "No projects match the current filters."
                : "Nenhum projeto corresponde aos filtros atuais."
              : emptyStateText}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">
                    {locale === "en" ? "Project" : "Projeto"}
                  </th>
                  <th className="px-6 py-4 font-medium">
                    {locale === "en" ? "Technologies" : "Tecnologias"}
                  </th>
                  <th className="px-6 py-4 font-medium">
                    {locale === "en" ? "Featured" : "Destaque"}
                  </th>
                  <th className="px-6 py-4 font-medium">
                    {locale === "en" ? "Actions" : "Ações"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visibleProjects.map((project) => (
                  <tr key={project.id} className="bg-card/40 align-top">
                    <td className="px-6 py-5">
                      <div className="max-w-sm space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="font-semibold text-foreground">{project.title}</div>
                          {project.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                              <Star className="h-3.5 w-3.5" />
                              {locale === "en" ? "Featured" : "Destaque"}
                            </span>
                          )}
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground text-pretty">
                          {project.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex max-w-md flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="glow">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                        {project.featured
                          ? locale === "en"
                            ? "Yes"
                            : "Sim"
                          : locale === "en"
                            ? "No"
                            : "Não"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => {
                            setActionError(null)
                            setSelectedProject(project)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          {locale === "en" ? "Details" : "Detalhes"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => {
                            setActionError(null)
                            setEditingProject(project)
                          }}
                        >
                          <PencilLine className="h-4 w-4" />
                          {locale === "en" ? "Edit" : "Editar"}
                        </Button>
                        <Button
                          type="button"
                          variant={project.featured ? "secondary" : "outline"}
                          size="sm"
                          className="rounded-full"
                          onClick={() => void handleToggleFeatured(project)}
                        >
                          <Star className="h-4 w-4" />
                          {project.featured
                            ? locale === "en"
                              ? "Unfeature"
                              : "Remover destaque"
                            : locale === "en"
                              ? "Feature"
                              : "Destacar"}
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="rounded-full"
                          onClick={() => void handleDelete(project)}
                        >
                          <Trash2 className="h-4 w-4" />
                          {locale === "en" ? "Delete" : "Excluir"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        locale={locale}
        onClose={() => setSelectedProject(null)}
        canManage={canManageProjects}
        onEdit={(project) => {
          setActionError(null)
          setSelectedProject(null)
          setIsCreateOpen(false)
          setEditingProject(project)
        }}
        onDelete={(project) => void handleDelete(project)}
      />
      <ProjectFormModal
        key={editingProject?.id ?? (isCreateOpen ? "create" : "closed")}
        open={isCreateOpen || Boolean(editingProject)}
        project={editingProject}
        onClose={() => {
          setIsCreateOpen(false)
          setEditingProject(null)
        }}
        onSaved={() => router.refresh()}
        locale={locale}
      />
    </>
  )
}
